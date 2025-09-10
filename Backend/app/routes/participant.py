from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.db.database import get_db
from sqlalchemy.orm import Session
from app.db.models.participantModel import Participant

router = APIRouter()

class ParticipantStructure(BaseModel):
    first_name: str
    surname: str
    email: str
    location: str
    userId: str

@router.post("/participant")
async def PostParticipant(participant: ParticipantStructure, db: Session = Depends(get_db)):
    
    try:
        response = Participant(
            first_name=participant.first_name,
            surname=participant.surname,
            email=participant.email,
            location=participant.location,
            userId= participant.userId)
        
        db.add(response)
        db.commit()
        db.refresh(response)
        return{
            "status": 200,
            "message": "Participant successfully added."
            }
    except Exception as e:
       
        return {
            "status": 500,
            "message": f"Server Error: {str(e)}"
        }

    
@router.get("/getParticipants/{id}")
async def GetParticipants(id:str, db: Session = Depends(get_db)):

    try:
        participants = db.query(Participant).filter(Participant.userId == id).all()

        if participants:
            return{
                "status": 200,
                "message": "Successfully retrieved all participants.",
                "participants": participants
                }
        else:
            return{
                "status": 404,
                "message": "No participants found",
                "participants": []
            }
    except Exception as e:
       
        return {
            "status": 500,
            "message": f"Server Error: {str(e)}"
        }
    
    
