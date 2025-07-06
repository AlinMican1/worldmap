from fastapi import APIRouter, Depends
from app.db.database import engine
from pydantic import BaseModel
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.db.models.formModel import Form

router = APIRouter()


class FormStructure(BaseModel):
    name:str
    email: str
    location: str

@router.post("/form")
async def PostForm(form: FormStructure, db: Session = Depends(get_db)):
    try:
        
        response = Form(name=form.name,email=form.email,location=form.location)
        db.add(response)
        db.commit()
        db.refresh(response)
        return {
            "status": 200,
            "message": "form successfully submitted."
            }
    except:
        return {
            "status":500,
            "message": "Server Error"
            }
    
        
    