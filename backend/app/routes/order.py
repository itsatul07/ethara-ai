from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.order import OrderCreate
from app.controllers.order import (
    create_order,
    get_all_orders,
    get_order_by_id,
    delete_order
)

router = APIRouter(
    prefix="/orders",
    tags=["orders"]
)


@router.post("/")
def add_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db)
):
    return create_order(db, order_data)


@router.get("/")
def all_orders(
    db: Session = Depends(get_db)
):
    return get_all_orders(db)


@router.get("/{order_id}")
def order_by_id(
    order_id: int,
    db: Session = Depends(get_db)
):
    return get_order_by_id(db, order_id)


@router.delete("/{order_id}")
def remove_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    return delete_order(db, order_id)