from fastapi import APIRouter, Depends
from app.db.database import engine
from pydantic import BaseModel
from app.db.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()

class ScheduleStructure(BaseModel):
    name: str
    email:str
    location:str

@router.post("/shedule")
async def PostSchedule(schedule: ScheduleStructure, db: Session = Depends(get_db)):
    try:



