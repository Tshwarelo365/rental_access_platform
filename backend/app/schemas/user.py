from pydantic import BaseModel, EmailStr
from pydantic import BaseModel

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    email: str
    role: str
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: str  # tenant or landlord

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    role: str
    is_verified: bool

    class Config:
        from_attributes = True