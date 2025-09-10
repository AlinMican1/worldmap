from sqlalchemy import create_engine
from app.core.config import settings
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()
engine = create_engine(settings.DATABASE_URL)
Session = sessionmaker(bind = engine, autocommit=False, autoflush=False)


def get_db():
    DataBase = Session()
    try:
        yield DataBase
    finally:
        DataBase.close()

