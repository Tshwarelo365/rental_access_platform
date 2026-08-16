from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.core.database import Base, engine

# Models
from app.models.user import User
from app.models.property import Property
from app.models.application import Application
from app.models.property_image import PropertyImage

# Routes
from app.routes import auth
from app.routes import property as property_routes
from app.routes import application as application_routes
from fastapi.staticfiles import StaticFiles

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    property_routes.router,
    prefix="/properties",
    tags=["Properties"]
)

app.include_router(
    application_routes.router,
    prefix="/applications",
    tags=["Applications"]
)


@app.get("/")
def root():
    return {
        "message": "Rental Platform API running"
    }