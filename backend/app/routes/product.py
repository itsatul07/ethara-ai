from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.product import ProductCreate
from app.controllers.product import create_product, get_all_products, getproduct_by_id, update_product, delete_product

router = APIRouter(
    prefix = "/products",
    tags = ["products"]
)

@router.post("/")
def add_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db)
):
    return create_product(db, product_data)


@router.get("/")
def get_products(
    db: Session = Depends(get_db)
):
    return get_all_products(db)

@router.get("/{product_id}")
def get_product(
    product_id:int,
    db:Session = Depends(get_db),
):
    return getproduct_by_id(db, product_id)

@router.put("/{product_id}")
def update_product_route(
    product_id:int,
    product_data:ProductCreate,
    db:Session = Depends(get_db),
):
    return update_product(db, product_id, product_data)

@router.delete("/{product_id}")
def delete_product_route(
    product_id:int,
    db:Session = Depends(get_db),
):
    return delete_product(db, product_id)