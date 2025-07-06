from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.database import Base 
from sqlalchemy.dialects.postgresql import UUID
import uuid

class User(Base):
    __tablename__ = 'users'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email= Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    forms = relationship("Form", back_populates="user")