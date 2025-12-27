from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.core.supabase_client import get_current_user
from app.db.models.userModel import User


router = APIRouter()


@router.get("/getUserTimezone")
async def GetUserTimezone(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    try: 
        user_timezone = db.query(User).filer(User.id == current_user.id).first()
        return{
            "status": 200,
            "timezone" : user_timezone
        
        }
    except Exception as e:
        return{
            "status": 500,
            "message": f"Server error {e}."
        }
