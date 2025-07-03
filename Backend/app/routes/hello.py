from fastapi import APIRouter
from sqlalchemy import inspect
from app.db.database import engine

router = APIRouter()

@router.get("/hello")
async def hello():
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    return {"message": tables}
