from sqlalchemy import create_engine
from app.core.config import settings
from sqlalchemy.orm import declarative_base


Base = declarative_base()
engine = create_engine(settings.DATABASE_URL)


try:
    with engine.connect() as connection:
        print("Database connection successful!")
except Exception as e:
    print("Database connection failed:", e)