from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base

meeting_participant = Table(
    "meeting_participant",
    Base.metadata,
    Column("meeting_id", UUID(as_uuid=True), ForeignKey("meetings.id"), primary_key=True),
    Column("participant_id", UUID(as_uuid=True), ForeignKey("participants.id"), primary_key=True)
)