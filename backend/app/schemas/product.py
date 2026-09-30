from pydantic import BaseModel, Field
from typing import Optional


class ProductCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    category: str = Field(..., min_length=2, max_length=100)
    price: float = Field(..., gt=0)
    quantity: float = Field(..., gt=0)
    description: Optional[str] = None


class ProductResponse(BaseModel):
    id: int
    farmer_id: int
    name: str
    category: str
    price: float
    quantity: float
    description: Optional[str] = None

    class Config:
        from_attributes = True