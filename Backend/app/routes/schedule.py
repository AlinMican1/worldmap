from fastapi import APIRouter, Depends
from app.db.database import engine
from pydantic import BaseModel
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.db.models.formModel import Form
from typing import Dict, List
from app.core.supabase_client import get_current_user
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class ScheduleStructure(BaseModel):
    name: str
    email:str
    location:str
    dates: Dict[str, List[str]] 
    userId: str

@router.post("/schedule")
async def PostSchedule(schedule: ScheduleStructure, db: Session = Depends(get_db),current_user=Depends(get_current_user)):
    try:
        logger.info("Before DB insert")
        response = Form(
            name=schedule.name,
            email=schedule.email,
            location=schedule.location,
            dates=schedule.dates,
            userId=current_user.id,
        )
        db.add(response)
        db.commit()
        db.refresh(response)
        logger.info(f"Saved form: {response}")
        return {
            "status": 200,
            "message": "Schedule successfully submitted."
        }
    except Exception as e:
        logger.exception("Failed to save form")
        return {
            "status": 500,
            "message": f"Server Error: {str(e)}"
        }