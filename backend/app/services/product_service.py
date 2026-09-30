from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate


def create_product(
    db: Session,
    product_data: ProductCreate,
    farmer_id: int,
):
    product = Product(
        farmer_id=farmer_id,
        name=product_data.name,
        category=product_data.category,
        price=product_data.price,
        quantity=product_data.quantity,
        description=product_data.description,
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


def get_farmer_products(
    db: Session,
    farmer_id: int,
):
    return (
        db.query(Product)
        .filter(Product.farmer_id == farmer_id)
        .order_by(Product.created_at.desc())
        .all()
    )