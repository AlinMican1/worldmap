import uuid
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base 
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Participant(Base):
    __tablename__ = 'participants'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    first_name = Column(String, nullable=False)
    surname = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    location = Column(String, nullable=False)   

    userId = Column(ForeignKey("users.id"))
    user = relationship("User", back_populates="participants")