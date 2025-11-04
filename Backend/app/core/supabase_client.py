# app/core/supabase_client.py
from supabase import create_client
from fastapi import Request, HTTPException, Depends
from app.core.config import settings
from fastapi import Request

# Initialize Supabase client once
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)



# async def get_current_user(request: Request):
#     token = request.headers.get("Authorization")
#     if not token:
#         raise HTTPException(status_code=401, detail="Missing token")
#     token = token.replace("Bearer ", "")
    
#     user = supabase.auth.api.get_user(token)
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     return user

# Dependency to get current user
# async def get_current_user(request: Request):
#     token = request.cookies.get("access_token")
#     if not token:
#         raise HTTPException(status_code=401, detail="Missing token")
#     user = supabase.auth.api.get_user(token)
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     return user

async def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    
    try:
        user_response = supabase.auth.get_user(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    if not user_response or user_response.user is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    return user_response.user