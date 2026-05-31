from app.models.product import Product
from fastapi import HTTPException

def create_product(db, product_data):
    existing_product = db.query(Product).filter(
        Product.sku == product_data.sku
    ).first()

    if existing_product:
        raise HTTPException(
            status_code=400,
            detail="Model already exists",
        )
    #new models can be created
    product = Product(
        name = product_data.name,
        sku = product_data.sku,
        price = product_data.price,
        quantity = product_data.quantity
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return {
        "message":"Product posted Successfully",
        "product" : product,
       
    }

def get_all_products(db):
    return db.query(Product).all()

def getproduct_by_id(db, product_id):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")    
    return product

def update_product(db, product_id, product_data):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")    
    product.name = product_data.name
    product.sku = product_data.sku
    product.price = product_data.price
    product.quantity = product_data.quantity,
    db.commit()
    db.refresh(product)
    return {
        "message":"Product Updated Successfully",
        "product":product
    }

def delete_product(db,product_id):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {
        "message":"Product deleted successfully"
    }

