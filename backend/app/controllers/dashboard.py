from app.models.customer import Customer
from app.models.order import Order
from app.models.product import Product

def get_dashboard(db):
    total_products = db.query(Product).count()
    total_customers = db.query(Customer).count()
    total_orders = db.query(Order).count()

    low_stock_products = (db.query(Product).filter(
            Product.quantity<10
        ).all()
    )

    return {
        "total_products":total_products,
        "total_customers":total_customers,
        "total_orders":total_orders,
        "low_stock_products": [
            {
                "id": product.id,
                "name": product.name,
                "quantity": product.quantity
            }
            for product in low_stock_products
        ],
    }