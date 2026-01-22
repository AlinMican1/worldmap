import uuid
from sqlalchemy import ARRAY, Column, String, ForeignKey, Integer, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.db.models.meetingParticipantsModel import meeting_participant

class  Meeting(Base):
    __tablename__ = "meetings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    link = Column(String, nullable=False, unique=True)
    duration = Column(String, nullable=False, default="1 hour")
    date = Column(Date, nullable=False)
    time = Column(String, nullable=False)
    frequency = Column(String, nullable=False, default="Once")
    rotational_freq = Column(String, nullable=True)
    rotation_index = Column(Integer, default=0)
    rotation_update_at = Column(Date, nullable=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    timezone_order = Column(ARRAY(String), nullable=True)
    
    # Relationship
    participants = relationship(
        "Participant",
        secondary=meeting_participant,
        back_populates="meetings"
    )
    user = relationship("User", back_populates="meetings")
   