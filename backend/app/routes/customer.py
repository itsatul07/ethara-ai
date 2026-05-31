from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.customer import CustomerCreate
from app.controllers.customer import create_customer,get_all_customers,get_customer_by_id,delete_customer

router = APIRouter(
    prefix = "/customers",
    tags = ["customers"],
)

@router.post("/",)
def add_customer(
    customer_data : CustomerCreate,
    db: Session = Depends(get_db),
):
    return create_customer(db,customer_data)
    
@router.get("/",)
def all_customers(
    db:Session = Depends(get_db),
):
    return get_all_customers(db)

@router.get("/{customer_id}")
def customer_by_id(
    customer_id : int,
    db:Session = Depends(get_db)
):
    return get_customer_by_id(db,customer_id)

@router.delete("/{customer_id}")
def delete_customer_route(
    customer_id : int,
    db:Session = Depends(get_db)
):
    return delete_customer(db,customer_id)


