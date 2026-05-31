from pydantic import BaseModel,Field,EmailStr

class CustomerCreate(BaseModel):
    name:str
    email:EmailStr 
    phone:str = Field(min_length=10,max_length=15)

