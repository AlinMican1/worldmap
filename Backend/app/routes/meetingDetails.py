from uuid import UUID
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.core.supabase_client import get_current_user
from app.db.models.meetingModel import Meeting

from typing import List, Optional

from app.db.models import meetingModel
from app.db.models.participantModel import Participant
router = APIRouter()



class MeetingDetailsStructure(BaseModel):
    meeting_title: str
    meeting_link: str
    meeting_description: Optional[str] = None
    meeting_time: str
    meeting_date: str
    rotational_freq: Optional[str] = None 
    meeting_duration: str
    participant_emails: Optional[List[str]] = []  # optional now
    

@router.post("/createMeeting")
async def PostMeetingDetails(
    meetingDetails: MeetingDetailsStructure, 
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    print(current_user.id)
    try:
        # Create the meeting first
        meeting = Meeting(
            title=meetingDetails.meeting_title,
            link=meetingDetails.meeting_link,
            description=meetingDetails.meeting_description,
            duration=meetingDetails.meeting_duration,
            date=meetingDetails.meeting_date,
            time=meetingDetails.meeting_time,
            rotational_freq=meetingDetails.rotational_freq,
            user_id = current_user.id
        )
        db.add(meeting)
        db.flush()  # assign meeting.id

        # Assign participants if any
        if meetingDetails.participant_emails:
            for email in meetingDetails.participant_emails:
                participant = db.query(Participant).filter_by(
                    email=email, user_id=current_user.id
                ).first()
                if participant:
                    participant.meetingId = meeting.id
                    db.add(participant)

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
    
