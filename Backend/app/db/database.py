from sqlalchemy import create_engine, text
from app.core.config import settings
from sqlalchemy.orm import declarative_base


Base = declarative_base()

engine = create_engine(settings.DATABASE_URL)


try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("Database connection successful:", result.scalar())
except Exception as e:
    print("Database connection failed:", e)