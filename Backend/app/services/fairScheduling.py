from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from app.db.database import Session
from app.db.models.meetingModel import Meeting


def rotatePerticipants():
    db = Session()
    meetings = db.query(Meeting).filter(Meeting.frequency != "Once").all()
    for m in meetings:
        print("ID:", m.id)
        print("Title:", m.title)
        print("Frequency:", m.frequency)
        print("Rotational freq:", m.rotational_freq)
        print("Rotation index:", m.rotation_index)
        print("Rotation update:", m.rotation_update_at)



    
    return meetings
    # print(meeting)
    # print("HIHIHIH")
