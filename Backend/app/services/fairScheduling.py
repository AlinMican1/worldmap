from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from app.db.database import Session
from app.db.models.meetingModel import Meeting


def rotatePerticipants():
    db = Session()
    meeting = db.query(Meeting).filter(Meeting.frequency != "Once").all()
    print(meeting)
    return meeting
    # print(meeting)
    # print("HIHIHIH")
