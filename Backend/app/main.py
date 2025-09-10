from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes import hello, time, form, schedule, participant
from app.db.database import Base, engine
from app.db.models.formModel import Form
from app.db.models.userModel import User
from app.db.models.participantModel import Participant



app = FastAPI()
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Routers
app.include_router(hello.router)
app.include_router(form.router)
app.include_router(schedule.router)
app.include_router(participant.router)
# app.include_router(time.router)
