from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class PropertyImage(Base):
    __tablename__ = "property_images"

    id = Column(Integer, primary_key=True, index=True)

    property_id = Column(
        Integer,
        ForeignKey("properties.id"),
        nullable=False
    )

    image_url = Column(String, nullable=False)

    is_profile = Column(
        Boolean,
        default=False,
        nullable=False
    )

    property = relationship(
    "Property",
    back_populates="images"
    )