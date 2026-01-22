from datetime import date, timedelta
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes import hello, time, form, schedule, participant, auth, profile, meetingDetails, user
from app.db.models.userModel import User
from app.db.models.meetingModel import Meeting
from app.db.models.participantModel import Participant
from app.db.models.formModel import Form
from app.db.database import Base, engine
from app.services.fairScheduling import rotateParticipants

from apscheduler.schedulers.background import BackgroundScheduler
from app.services.fairScheduling import rotateParticipants



app = FastAPI()
Base.metadata.create_all(bind=engine)
print("CORS allowed origins:", settings.get_origins)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Rotate participants -------
scheduler = BackgroundScheduler(timezone="UTC")
scheduler.add_job(
    rotateParticipants,
    trigger="cron",
    hour=0,
    minute=0,
)
# scheduler.add_job(
#     rotateParticipants,
#     trigger="interval",
#     seconds=5,
# )
scheduler.start()
#--------

# Routers
app.include_router(hello.router)
app.include_router(form.router)
app.include_router(schedule.router)
app.include_router(participant.router)
app.include_router(time.router)
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(meetingDetails.router)
app.include_router(user.router)


