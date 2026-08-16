from pydantic import BaseModel
from typing import List


class PropertyCreate(BaseModel):
    title: str
    description: str
    price: float
    location: str


class PropertyImageResponse(BaseModel):
    id: int
    image_url: str
    is_profile: bool

    class Config:
        from_attributes = True


class PropertyResponse(BaseModel):
    id: int
    title: str
    description: str
    price: float
    location: str
    landlord_id: int
    is_available: bool
    images: List[PropertyImageResponse] = []

    class Config:
        from_attributes = True