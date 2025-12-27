from datetime import datetime, timedelta, timezone
from sqlalchemy import func, distinct

from app.db.database import Session
from app.db.models.meetingModel import Meeting
from app.db.models.participantModel import Participant
from app.db.models.meetingParticipantsModel import meeting_participant


#Check if due for rotation
def is_due_for_rotation(meeting, today):
    if not meeting.rotation_update_at:
        return True  # first rotation ever

    if meeting.rotational_freq == "Weekly":
        return today >= meeting.rotation_update_at + timedelta(weeks=1)

    if meeting.rotational_freq == "Monthly":
        return today >= meeting.rotation_update_at + timedelta(days=30)

    return False


# Get Unique timezones
def get_number_of_unique_timezones(db, meeting_id):
    return (
        db.query(func.count(distinct(Participant.timezone)))
        .join(
            meeting_participant,
            Participant.id == meeting_participant.c.participant_id,
        )
        .filter(meeting_participant.c.meeting_id == meeting_id)
        .scalar()
    )


#Rotation
def rotateParticipants(test_today=None):
    db = Session()
    # today = datetime.now(timezone.utc).date()
    today = test_today or datetime.now(timezone.utc).date()

    try:
        meetings = (
            db.query(Meeting)
            .filter(Meeting.frequency != "Once")
            .all()
        )

        for meeting in meetings:
            if not is_due_for_rotation(meeting, today):
                continue

            num_timezones = get_number_of_unique_timezones(db, meeting.id)

            # Safety guard
            if not num_timezones or num_timezones == 0:
                continue

            # Rotate fairly
            meeting.rotation_index = (
                meeting.rotation_index + 1
            ) % num_timezones

            meeting.rotation_update_at = today

            print(
                f"[ROTATED] {meeting.title} → "
                f"index={meeting.rotation_index}, "
                f"timezones={num_timezones}"
            )

        db.commit()

    except Exception as e:
        db.rollback()
        print("Rotation error:", e)

    finally:
        db.close()
