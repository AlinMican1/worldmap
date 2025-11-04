
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.supabase_client import get_current_user


router = APIRouter()
@router.get("/profile")
async def profile(user=Depends(get_current_user)):
    return {"email": user.email, "id": user.id}
