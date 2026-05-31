from app.models.customer import Customer
from fastapi import HTTPException

def create_customer(db,customer_data):
    
    existing_customer = db.query(Customer).filter(
        Customer.email == customer_data.email
    ).first()

    if existing_customer:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )
    #user can be created now
    customer = Customer(
        name = customer_data.name,
        email = customer_data.email,
        phone = customer_data.phone
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return {
        "message":"Customer Created Successfully",
        "Customer":customer
    }

def get_all_customers(db):
    return db.query(Customer).all()

def get_customer_by_id(db,customer_id):
    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()
    if not customer:
        raise HTTPException(
            status_code=404,
            detail="User Not Found"
        )
    return customer

def delete_customer(db,customer_id):
    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()
    if not customer:
        raise HTTPException(
            status_code=404,
            detail="User Not Found"
        )
    db.delete(customer)
    db.commit()
    return {
        "message":"User Deleted Successfully"
    }