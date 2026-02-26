from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import require_role
from app.models.application import Application
from app.models.property import Property
from fastapi import HTTPException

router = APIRouter()


@router.post("/")
def apply_for_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_role("tenant"))
):

    # 1️⃣ Check property exists
    property = db.query(Property).filter(Property.id == property_id).first()

    if not property:
        raise HTTPException(status_code=404, detail="Property not found")

    # 2️⃣ Prevent duplicate application
    existing_application = db.query(Application).filter(
        Application.property_id == property_id,
        Application.tenant_id == current_user.id
    ).first()

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="You have already applied to this property"
        )

    # 3️⃣ Create application
    application = Application(
        tenant_id=current_user.id,
        property_id=property_id
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return application

@router.get("/landlord")
def view_applications_for_landlord(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("landlord"))
):

    applications = db.query(Application).join(
        Property,
        Application.property_id == Property.id
    ).filter(
        Property.landlord_id == current_user.id
    ).all()

    return applications

@router.put("/{application_id}/status")
def update_application_status(
    application_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_user = Depends(require_role("landlord"))
):

    # 1️⃣ Get application
    application = db.query(Application).filter(
        Application.id == application_id
    ).first()

    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    # 2️⃣ Ensure landlord owns the property
    property = db.query(Property).filter(
        Property.id == application.property_id
    ).first()

    if property.landlord_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to modify this application"
        )

    # 3️⃣ Prevent double approval/rejection
    if application.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Application already processed"
        )

    # 4️⃣ Validate status
    if status not in ["approved", "rejected"]:
        raise HTTPException(
            status_code=400,
            detail="Status must be 'approved' or 'rejected'"
        )

    # 5️⃣ Update status
    application.status = status
    if status == "approved":
        # Reject all other pending applications for same property
        db.query(Application).filter(
            Application.property_id == application.property_id,
            Application.id != application.id,
            Application.status == "pending"
        ).update({"status": "rejected"})

        # Optional: mark property unavailable
        property.is_available = False

    db.commit()
    db.refresh(application)

    return application