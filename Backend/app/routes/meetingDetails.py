import datetime
from uuid import UUID
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.core.supabase_client import get_current_user
from app.db.models.meetingModel import Meeting
from datetime import date
from datetime import datetime


from typing import List, Optional

from app.db.models import meetingModel
from app.db.models.participantModel import Participant
router = APIRouter()



class MeetingDetailsStructure(BaseModel):
    meeting_title: str
    meeting_link: str
    meeting_desc: Optional[str] = None
    meeting_time: str
    meeting_date: str
    meeting_frequency:str
    rotational_freq: Optional[str] = None 
    rotational_updated_at: Optional[date] = None
    meeting_duration: str
    participant_emails: Optional[List[str]] = []  # optional now

#Parse date from type of dd-mm-yyyy to yyyy-mm-dd
def parse_date(value: str):
    for fmt in ("%Y-%m-%d", "%d-%m-%Y"):
        try:
            return datetime.strptime(value, fmt).date()
        except ValueError:
            pass
    raise ValueError("Invalid date format. Use YYYY-MM-DD or DD-MM-YYYY")

@router.post("/createMeeting")
async def PostMeetingDetails(
    meetingDetails: MeetingDetailsStructure, 
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    # print("JJJ",meetingDetails.meeting_frequency)
    try:
        update_time = None
        #if meetingDetails.rotational_freq and meetingDetails.rotational_freq.strip() != "" and meetingDetails.meeting_frequency != "Once":
        
        if meetingDetails.meeting_frequency != "Once":
            # now = datetime.now(datetime.UTC)
            update_time = parse_date(meetingDetails.meeting_date)
       
        # Create the meeting first
        meeting = Meeting(
            title=meetingDetails.meeting_title,
            link=meetingDetails.meeting_link,
            description=meetingDetails.meeting_desc,
            duration=meetingDetails.meeting_duration,
            date=parse_date(meetingDetails.meeting_date),

            time=meetingDetails.meeting_time,
            frequency = meetingDetails.meeting_frequency,
            rotational_freq=meetingDetails.rotational_freq,
            rotation_update_at = update_time,
            user_id = current_user.id
        )
        db.add(meeting)
        db.flush()  # assign meeting.id

        # Assign participants if any
        if meetingDetails.participant_emails:
           for email in meetingDetails.participant_emails:
                participant = db.query(Participant).filter_by(email=email, user_id=current_user.id).first()
                if participant:
                    meeting.participants.append(participant)

        db.commit()
        db.refresh(meeting)

        return {
            "status": 200,
            "message": "Meeting successfully created.",
            "meeting_id": meeting.id
        }

    except Exception as e:
        db.rollback()
        return {
            "status": 500,
            "message": f"Server Error: {str(e)}"
        }

    
@router.get("/getMeetingDetails")
async def GetMeetingDetails(
   
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        meetings = db.query(Meeting).filter(
            Meeting.user_id == current_user.id
        ).all()

        if meetings:
            return{
                "status": 200,
                "message": "Successfully retrieved all meetings.",
                "meetings": meetings
                }
        else:
            return{
                "status": 404,
                "message": "No meeting found",
                "meetings": []
            }
    except Exception as e:
       
        return {
            "status": 500,
            "message": f"Server Error: {str(e)}"
        }
    

@router.get("/getMeetingParticipants")
async def GetMeetingParticipants(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        MeetingParticipants = db.query(Participant).join(Meeting).filter(
        Meeting.user_id == current_user.id
        ).all()

        return MeetingParticipants

    except Exception as e:
       
        return {
            "status": 500,
            "message": f"Server Error: {str(e)}"
        }