from fastapi import FastAPI
from app.routes import auth
from app.routes import application as application_routes
from app.routes import property as property_routes
from app.core.database import engine
from dotenv import load_dotenv
from app.models import property, user, application


load_dotenv()

# Create tables
user.Base.metadata.create_all(bind=engine)
property.Base.metadata.create_all(bind=engine)
application.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(property_routes.router, prefix="/properties", tags=["Properties"])
app.include_router(application_routes.router, prefix="/applications", tags=["Applications"])

@app.get("/")
def root():
    return {"message": "Rental Platform API running"}