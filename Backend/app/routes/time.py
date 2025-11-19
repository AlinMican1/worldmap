from datetime import datetime
import json
from pydantic import BaseModel
from fastapi import APIRouter,  Depends
from zoneinfo import ZoneInfo
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.supabase_client import get_current_user
from app.db.models.userModel import User

router = APIRouter()

with open("app/utils/countryDetails.json", "r") as f:
    COUNTRY_TIMEZONES = json.load(f)
    



@router.get("/timezoneDetails/{country}/{timezone:path}")
async def GetTimeZoneDetails(country:str,timezone:str):
    # country = ""
    # for key in COUNTRY_TIMEZONES:
    #     if timezone in COUNTRY_TIMEZONES[key]:
    #         country = key
    #         break
    try:
        # continent, city = timezone.split(" ")
        # test = continent + "/" + city
        # print(continent)
        # print(test)
        tz = ZoneInfo(timezone)
        now = datetime.now(tz)

        return {
        "status": 200,
        "country": country,
        "timezones": tz.key,
        "date": now.strftime("%Y-%m-%d"),
        "time": now.strftime("%H:%M:%S")
    }
    except Exception as e:
       
        return {
            "status": 500,
            "message": f"Server Error: {str(e)}"
        }

class UserTimezoneDetails(BaseModel):
    timezone: str

    
@router.put("/updateUserTimezone")
async def UpdateUserTimezone(userDetails: UserTimezoneDetails,db: Session = Depends(get_db),current_user=Depends(get_current_user) ):
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        return{
            "status" : 404,
            "message": "User not found."
        }
    try:
        user.timezone = userDetails.timezone
        db.commit()
        return {
            "status": 200,
            "message": "Successfully added timezone"
        }
    except Exception as e:
        return{
            "status": 500,
            "message": f"Server error {e}."
        }
    

         
