from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base 
from sqlalchemy.dialects.postgresql import UUID
import uuid

class Form(Base):
    __tablename__ = 'forms'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email= Column(String, unique=True, nullable=False)
    location = Column(String, nullable=False)   
    userId = Column(ForeignKey("users.id"))
    user = relationship("User", back_populates="forms")