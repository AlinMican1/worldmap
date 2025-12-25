from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta, timezone
from app.db.database import Session
from app.db.models.meetingModel import Meeting
from app.db.models.meetingParticipantsModel import meeting_participant
from sqlalchemy import func, distinct
from app.db.models.participantModel import Participant



def is_due_for_rotation(meeting, today):
    if not meeting.rotation_update_at:
        return True  # first run

    if meeting.rotational_freq == "Weekly":
        return today >= meeting.rotation_update_at + timedelta(weeks=1)

    if meeting.rotational_freq == "Monthly":
        return today >= meeting.rotation_update_at + timedelta(days=30)

    return False

def get_number_of_unique_timezones(db, meeting_id):
    return db.query(func.count(distinct(Participant.timezone))).join(
        meeting_participant,
        Participant.id == meeting_participant.c.participant_id
    ).filter(meeting_participant.c.meeting_id == meeting_id).scalar()

def rotateParticipants():
    utc_now = datetime.now(timezone.utc) 
    today_str = utc_now.strftime("%Y-%m-%d")
    today = datetime.now(timezone.utc).date()
    db = Session()
    
    meetings = db.query(Meeting).filter(Meeting.frequency != "Once").all()

    # due_for_rotation = []
    for meeting in meetings:
        num = get_number_of_unique_timezones(db, meeting.id)
        print(f"Meeting {meeting.title} has {num} timezones")
        # if not is_due_for_rotation(meeting, today):
        #     continue
        
        # if (meeting.rotational_freq == "Weekly"):
        #     if (meeting.rotation_update_at + timedelta(weeks=1) > today_str):
        #         #use weighted data calculation funtion
                
        #         print("MM")
    




    
    return meetings
