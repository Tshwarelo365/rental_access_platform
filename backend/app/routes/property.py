from fastapi import APIRouter, Depends, Query, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import Optional, List
import os
import uuid

from app.core.database import get_db
from app.core.security import require_role
from app.models.property import Property
from app.models.property_image import PropertyImage
from app.schemas.property import PropertyCreate, PropertyResponse

router = APIRouter()


@router.post("/", response_model=PropertyResponse)
def create_property(
    title: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    location: str = Form(...),

    images: List[UploadFile] = File(...),
    profile_image_index: int = Form(0),

    db: Session = Depends(get_db),
    current_user=Depends(require_role("landlord"))
):
    # Make sure at least one image was uploaded
    if not images:
        raise HTTPException(
            status_code=400,
            detail="At least one property image is required"
        )
    # Maximum 20 images per property
    if len(images) > 20:
        raise HTTPException(
            status_code=400,
            detail="You can upload a maximum of 20 images"
        )

    # Make sure the selected profile image exists
    if profile_image_index < 0 or profile_image_index >= len(images):
        raise HTTPException(
            status_code=400,
            detail="Invalid profile image selection"
        )

    # Make sure the selected profile image exists
    if profile_image_index < 0 or profile_image_index >= len(images):
        raise HTTPException(
            status_code=400,
            detail="Invalid profile image selection"
        )

    # Create property
    property = Property(
        title=title,
        description=description,
        price=price,
        location=location,
        landlord_id=current_user.id
    )

    try:
        db.add(property)
        db.commit()
        db.refresh(property)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="Property already exists for this landlord at this location"
        )

    # Create uploads directory
    upload_directory = "uploads/properties"
    os.makedirs(upload_directory, exist_ok=True)

    # Save images
    for index, image in enumerate(images):

        # Generate unique filename
        extension = os.path.splitext(image.filename)[1]
        filename = f"{uuid.uuid4()}{extension}"

        file_path = os.path.join(
            upload_directory,
            filename
        )

        # Save file
        with open(file_path, "wb") as buffer:
            buffer.write(image.file.read())

        # Save image information in database
        property_image = PropertyImage(
            property_id=property.id,
            image_url=f"/uploads/properties/{filename}",
            is_profile=(index == profile_image_index)
        )

        db.add(property_image)

    db.commit()

    return property

#agination + Filtering
@router.get("/", response_model=List[PropertyResponse])
def get_properties(
    limit: int = Query(100, ge=1),
    offset: int = Query(0, ge=0),
    location: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Property)

    if location:
        query = query.filter(
            Property.location.ilike(f"%{location}%")
        )

    properties = query.offset(offset).limit(limit).all()

    return properties


#landlord see only theyre properties
@router.get("/my-properties")
def get_my_properties(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("landlord"))
):
    return db.query(Property).filter(
        Property.landlord_id == current_user.id
    ).all()
    
@router.delete("/{property_id}")
def delete_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("landlord"))
):
    # Find the property
    property = db.query(Property).filter(
        Property.id == property_id
    ).first()

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    # Make sure the landlord owns this property
    if property.landlord_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You are not authorized to delete this property"
        )

    # Delete the property
    db.delete(property)
    db.commit()

    return {
        "message": "Property deleted successfully"
    }
