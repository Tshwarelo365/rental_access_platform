from sqlalchemy import Column, Integer, String, Float, ForeignKey, UniqueConstraint, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base


class Property(Base):
    __tablename__ = "properties"

    __table_args__ = (
        UniqueConstraint(
            "title",
            "location",
            "landlord_id",
            name="unique_property_per_landlord"
        ),
    )

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    location = Column(String, nullable=False)

    landlord_id = Column(Integer, ForeignKey("users.id"))

    is_available = Column(Boolean, default=True, nullable=False)
    images = relationship(
    "PropertyImage",
    back_populates="property",
    cascade="all, delete-orphan"
    )