from zoneinfo import ZoneInfo
from datetime import datetime

def convert_time(
    time_str: str,
    from_tz: str,
    to_tz: str,
    fmt: str = "%H:%M",
) -> str:
    """
    Convert a time string from one timezone to another.

    Example:
        "15:00", "Europe/London" → "America/New_York"
    """

    # Parse time (today is arbitrary, we only care about time)
    today = datetime.now().date()
    naive_dt = datetime.strptime(time_str, fmt)
    dt = datetime.combine(today, naive_dt.time())

    # Attach source timezone
    dt = dt.replace(tzinfo=ZoneInfo(from_tz))

    # Convert to target timezone
    converted = dt.astimezone(ZoneInfo(to_tz))

    return converted.strftime(fmt)