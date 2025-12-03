from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from app.db.database import Session
from app.db.models.meetingModel import Meeting





# def rotatePerticipants():
#     today_str = datetime.now(datetime.UTC).strftime("%d-%m-%Y") 
#     db = Session()
    
#     meetings = db.query(Meeting).filter(Meeting.frequency != "Once").all()

#     due_for_rotation = []
#     for meeting in meetings:
#         if not meeting.rotation_update_at:
#             continue
#         rotation_date = datetime.strptime(meeting.rotation_update_at, "%d-%m-%Y").date()
#         if (meeting.rotational_freq == "Weekly"):
#             if (rotation_date + timedelta(weeks=1) > today_str):
#                 print("MM")





    
    # return meetings
    # print(meeting)
    # print("HIHIHIH")
