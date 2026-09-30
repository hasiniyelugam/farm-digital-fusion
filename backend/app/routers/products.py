from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal
from app.models.product import Product
from app.models.user import User
from app.schemas.product import ProductCreate, ProductResponse
from app.services.product_service import (
    create_product,
    get_farmer_products,
)
from app.core.security import verify_access_token


router = APIRouter(
    prefix="/products",
    tags=["Products"],
)


# ==========================================
# OAUTH2
# ==========================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login/oauth2"
)


# ==========================================
# DATABASE
# ==========================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ==========================================
# CURRENT USER
# ==========================================

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    payload = verify_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    try:
        user_id = int(user_id)
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=401,
            detail="Invalid user ID in token",
        )

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    return user


# ==========================================
# ADD PRODUCT
# ==========================================

@router.post(
    "/",
    response_model=ProductResponse,
)
def add_product(
    product_data: ProductCreate,
    current_user: User = Depends(get_current_user),
):
    # Only farmers can add products
    if current_user.role != "farmer":
        raise HTTPException(
            status_code=403,
            detail="Only farmers can add products",
        )

    db = SessionLocal()

    try:
        product = create_product(
            db=db,
            product_data=product_data,
            farmer_id=current_user.id,
        )

        return product

    finally:
        db.close()


# ==========================================
# GET FARMER PRODUCTS
# ==========================================

@router.get(
    "/my-products",
    response_model=list[ProductResponse],
)
def my_products(
    current_user: User = Depends(get_current_user),
):
    # Only farmers can view their products
    if current_user.role != "farmer":
        raise HTTPException(
            status_code=403,
            detail="Only farmers can view their products",
        )

    db = SessionLocal()

    try:
        products = get_farmer_products(
            db=db,
            farmer_id=current_user.id,
        )

        return products

    finally:
        db.close()