from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import require_role
from app.models.property import Property

router = APIRouter()


@router.post("/")
def create_property(
    title: str,
    description: str,
    price: float,
    location: str,
    db: Session = Depends(get_db),
    current_user = Depends(require_role("landlord"))
):

    property = Property(
        title=title,
        description=description,
        price=price,
        location=location,
        landlord_id=current_user.id
    )

    db.add(property)
    db.commit()
    db.refresh(property)

    return property 