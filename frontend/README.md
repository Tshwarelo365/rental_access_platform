# Rental Access Platform

A full-stack rental property management platform that connects landlords and tenants through a single web application.

The platform allows landlords to create and manage rental property listings, upload property images, select a profile image, and manage tenant applications. Tenants can browse available properties and submit rental applications.

---

##  Project Overview

Rental Access is a full-stack web application designed to simplify the rental process for both landlords and tenants.

### Tenants can:

- Create an account
- Log in securely
- Browse available rental properties
- View property information and images
- Submit rental applications
- View their application status

### Landlords can:

- Create an account as a landlord
- Log in securely
- Create rental property listings
- Upload multiple property images
- Select a profile image for a property
- View their listed properties
- Delete their own properties
- View tenant applications
- Approve or reject applications

The application uses a role-based system to ensure that tenants and landlords have access to the appropriate functionality.

---

##  Technologies Used

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- JavaScript
- HTML
- CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- JWT Authentication

### Database

- PostgreSQL
- pgAdmin

### Development Tools

- Git
- GitHub
- VS Code
- Postman / Swagger UI

---

##  Project Architecture

```text
rental-access-platform/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── property.py
│   │   │   ├── property_image.py
│   │   │   └── application.py
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── property.py
│   │   │   └── application.py
│   │   │
│   │   ├── schemas/
│   │   │   └── property.py
│   │   │
│   │   └── main.py
│   │
│   ├── uploads/
│   │   ├── properties/
│   │   └── ...
│   │
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── PropertyCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Properties.jsx
│   │   │   ├── CreateProperty.jsx
│   │   │   ├── LandlordDashboard.jsx
│   │   │   ├── LandlordApplications.jsx
│   │   │   └── MyApplications.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
