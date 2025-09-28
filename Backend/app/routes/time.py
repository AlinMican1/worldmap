from datetime import datetime
import json
from fastapi import APIRouter
from zoneinfo import ZoneInfo

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

    
