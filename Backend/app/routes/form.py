from fastapi import APIRouter
from sqlalchemy import inspect
from app.db.database import engine
from pydantic import BaseModel

router = APIRouter()

class Form(BaseModel):
    name:str
    email: str
    location: str

@router.post("/form")
async def PostForm(form: Form):
    try:
        return {"message": form}
    except:
        return {"message": "Server Error"}
        
    