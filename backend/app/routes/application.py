
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_role
from app.models.application import Application
from app.models.property import Property
from app.models.user import User

router = APIRouter()


# ==========================================
# TENANT - APPLY FOR PROPERTY
# ==========================================

@router.post("/")
def apply_for_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("tenant"))
):

    # Check property exists
    property = db.query(Property).filter(
        Property.id == property_id
    ).first()

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    # Check if property is available
    if not property.is_available:
        raise HTTPException(
            status_code=400,
            detail="This property is no longer available"
        )

    # Prevent duplicate application
    existing_application = db.query(Application).filter(
        Application.property_id == property_id,
        Application.tenant_id == current_user.id
    ).first()

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="You have already applied to this property"
        )

    # Create application
    application = Application(
        tenant_id=current_user.id,
        property_id=property_id
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return application


# ==========================================
# LANDLORD - VIEW APPLICATIONS
# ==========================================

@router.get("/landlord")
def get_landlord_applications(
    db: Session = Depends(get_db),
    current_user=Depends(require_role("landlord"))
):

    applications = (
        db.query(Application, Property, User)
        .join(
            Property,
            Application.property_id == Property.id
        )
        .join(
            User,
            Application.tenant_id == User.id
        )
        .filter(
            Property.landlord_id == current_user.id
        )
        .all()
    )

    result = []

    for application, property, user in applications:

        result.append({
            "id": application.id,
            "status": application.status,
            "tenant_email": user.email,
            "property_title": property.title,
            "property_id": property.id
        })

    return result


# ==========================================
# LANDLORD - APPROVE / REJECT APPLICATION
# ==========================================

@router.put("/{application_id}/status")
def update_application_status(
    application_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("landlord"))
):

    # Validate status
    if status not in ["approved", "rejected"]:
        raise HTTPException(
            status_code=400,
            detail="Status must be 'approved' or 'rejected'"
        )

    # Get application
    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    # Get property
    property = db.query(Property).filter(
        Property.id == application.property_id
    ).first()

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    # Make sure this landlord owns the property
    if property.landlord_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to modify this application"
        )

    # Prevent changing an already processed application
    if application.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Application already processed"
        )

    # Update status
    application.status = status

    # If approved
    if status == "approved":

        # Reject other pending applications
        db.query(Application).filter(
            Application.property_id == application.property_id,
            Application.id != application.id,
            Application.status == "pending"
        ).update({
            "status": "rejected"
        })

        # Mark property unavailable
        property.is_available = False

    db.commit()
    db.refresh(application)

    return application


# ==========================================
# TENANT - VIEW MY APPLICATIONS
# ==========================================

@router.get("/my")
def get_my_applications(
    db: Session = Depends(get_db),
    current_user=Depends(require_role("tenant"))
):

    applications = (
        db.query(Application, Property)
        .join(
            Property,
            Application.property_id == Property.id
        )
        .filter(
            Application.tenant_id == current_user.id
        )
        .all()
    )

    result = []

    for application, property in applications:

        result.append({
            "id": application.id,
            "status": application.status,
            "created_at": application.created_at,
            "property_id": property.id,
            "property_title": property.title,
            "property_location": property.location,
            "property_price": property.price
        })

    return result

