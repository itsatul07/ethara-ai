from fastapi import FastAPI
from app.database.db import Base, engine
from app.models.product import Product
from app.routes.product import router as product_router
from app.routes.customer import router as customer_router
from app.routes.order import router as order_router
from app.routes.dashboard import router as dashboard_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)

@app.get("/")
def home():
    return {"message":"Fast API is running!"}