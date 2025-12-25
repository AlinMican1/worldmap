
import uuid
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base 
from sqlalchemy.dialects.postgresql import UUID

class WeightedData(Base):
    __tablename__ = 'weighted_data'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pain_score = Column(Integer, nullable=False)

    participant_id = Column(UUID(as_uuid=True), ForeignKey("participants.id"), nullable=False)
    participant = relationship("Participant", back_populates="weighted_data")

    meeting_id = Column(UUID(as_uuid=True), ForeignKey("meetings.id"), nullable=False)
    meeting = relationship("Meeting", back_populates="weighted_data")
