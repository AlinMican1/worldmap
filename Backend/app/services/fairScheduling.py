from datetime import datetime, timedelta, timezone
from sqlalchemy import func, distinct
from uuid import UUID
from app.db.database import Session
from app.db.models.meetingModel import Meeting
from app.db.models.participantModel import Participant
from app.db.models.meetingParticipantsModel import meeting_participant
from app.utils.timezone import convert_time

def update_timezone_order(db, meeting_id: UUID, order: list[str]):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()

    if not meeting:
        raise ValueError("Meeting not found")

    meeting.timezone_order = order
    meeting.rotation_index = 0
    meeting.rotation_update_at = None

    db.commit()
    db.refresh(meeting)

    return meeting

def get_meeting_participants_for_period(meeting, db):
    active_tz = meeting.timezone_order[meeting.rotation_index]

    participants = (
        db.query(Participant)
        .join(meeting_participant)
        .filter(meeting_participant.c.meeting_id == meeting.id)
        .all()
    )

    result = []
    for p in participants:
        local_time = convert_time(
            meeting.time,
            from_tz=active_tz,
            to_tz=p.timezone
        )

        result.append({
            "participant": p,
            "local_time": local_time,
            "is_priority": p.timezone == active_tz
        })

    return result

#Check if due for rotation
def is_due_for_rotation(meeting, today):
    if not meeting.rotation_update_at:
        return True  # first rotation ever
    

    if meeting.rotational_freq == "Daily":
        return today >= meeting.rotation_update_at + timedelta(days=1)

    if meeting.rotational_freq == "Weekly":
        return today >= meeting.rotation_update_at + timedelta(weeks=1)
    

    if meeting.rotational_freq == "Biweekly":
        return today >= meeting.rotation_update_at + timedelta(weeks=2)

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
    today = test_today or datetime.now(timezone.utc).date()

    try:
        meetings = (
            db.query(Meeting)
            .filter(Meeting.rotational_freq != "Once")
            .all()
        )

        for meeting in meetings:
            if not meeting.timezone_order:
                continue

            if not is_due_for_rotation(meeting, today):
                continue

            total = len(meeting.timezone_order)

            meeting.rotation_index = (meeting.rotation_index + 1) % total
            meeting.rotation_update_at = today

            active_timezone = meeting.timezone_order[meeting.rotation_index]

            print(
                f"[ROTATION] {meeting.title} "
                f"{active_timezone} (index {meeting.rotation_index})"
            )

        db.commit()

    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

# def rotateParticipants(test_today=None, force=False):
#     db = Session()
#     today = test_today or datetime.now(timezone.utc).date()

#     try:
#         meetings = db.query(Meeting).filter(Meeting.rotational_freq != "Once").all()

#         for meeting in meetings:
#             if not meeting.timezone_order:
#                 continue

#             if not force and not is_due_for_rotation(meeting, today):
#                 continue  # skip if not due

#             total = len(meeting.timezone_order)

#             meeting.rotation_index = (meeting.rotation_index + 1) % total
#             meeting.rotation_update_at = today

#             active_timezone = meeting.timezone_order[meeting.rotation_index]

#             print(f"[ROTATION] {meeting.title} {active_timezone} (index {meeting.rotation_index})")

#         db.commit()

#     except Exception as e:
#         db.rollback()
#         raise e
#     finally:
#         db.close()

