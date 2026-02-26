from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import hash_password
from app.core.security import verify_password, create_access_token
from fastapi import status
from app.schemas.user import LoginResponse
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security import get_current_user, require_role


router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    print("REGISTER FUNCTION HIT")

    try:
        existing_user = db.query(User).filter(User.email == user.email).first()

        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = hash_password(user.password)

        new_user = User(
            email=user.email,
            password=hashed_password,
            role=user.role
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        print("USER CREATED SUCCESSFULLY")

        return new_user

    except Exception as e:
        print("🔥 REGISTER ERROR:", str(e))
        db.rollback()
        raise e
  

@router.post("/login", response_model=LoginResponse)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(User.email == form_data.username).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(form_data.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email})

    return {
        "access_token": token,
        "token_type": "bearer",
        "email": db_user.email,
        "role": db_user.role
    }
    
@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/landlord-only")
def landlord_route(
    current_user = Depends(require_role("landlord"))
):
    return {
        "message": "Welcome landlord!",
        "user": current_user.email
    }