from pydantic import BaseModel,Field

class ProductCreate(BaseModel):
    name:str
    sku:str
    price:float = Field(gt=0)
    quantity:int = Field(ge=0)

