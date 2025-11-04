import uuid
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base 
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Meeting(Base):
    __tablename__ = 'Meeting'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    link = Column(String, nullable=False, unique=True)
    duration = Column(String, nullable=False)   
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    rotational_freq = Column(String, nullable=True)

    
    participants = relationship("Participant", back_populates="meeting")