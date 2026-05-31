from fastapi import HTTPException
from app.models.order import Order
from app.models.customer import Customer
from app.models.product import Product

def create_order(db,order_data):
    customer = db.query(Customer).filter(
        Customer.id ==order_data.customer_id,
    ).first()   
    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )
    product = db.query(Product).filter(
        Product.id == order_data.product_id
    ).first()
    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )
    if product.quantity<order_data.quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock",
        )
    total_amount = (
        product.price*order_data.quantity
    )
    product.quantity -= order_data.quantity
    
    order = Order(
        customer_id = order_data.customer_id,
        product_id = order_data.product_id,
        quantity = order_data.quantity,
        total_amount = total_amount
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order

def get_all_orders(db):
    return db.query(Order).all()

def get_order_by_id(db,order_id):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail = "Order Not Found",
        )
    return order

def delete_order(db,order_id):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()
    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found",
        )
    db.delete(order)
    db.commit()
    return {
        "message": "Order Deleted Successfully"
    }