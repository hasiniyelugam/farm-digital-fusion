from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.connection import engine

from app.models.user import User
from app.models.product import Product

from app.routers.auth import router as auth_router
from app.routers.products import router as products_router


app = FastAPI(
    title="Farm Digital Fusion API",
    description="Backend API for Farm Digital Fusion",
    version="1.0.0",
)


# ==========================================
# CORS
# ==========================================

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


# ==========================================
# ROUTES
# ==========================================

# Authentication routes
app.include_router(auth_router)

# Product routes
app.include_router(products_router)


# ==========================================
# ROOT
# ==========================================

@app.get("/")
def root():
    return {
        "message": "Farm Digital Fusion API is running!"
    }


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# ==========================================
# DATABASE TABLE CREATION
# ==========================================

Base.metadata.create_all(bind=engine)