from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    tenant_id = Column(Integer, ForeignKey("users.id"))
    property_id = Column(Integer, ForeignKey("properties.id"))

    status = Column(String, default="pending")  # pending / approved / rejected

    created_at = Column(DateTime, default=datetime.utcnow)

    tenant = relationship("User")
    property = relationship("Property")