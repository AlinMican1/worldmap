# from datetime import datetime, timedelta, timezone
# from typing import Annotated

# from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from jwt.exceptions import InvalidTokenError
# from pwdlib import PasswordHash
# from app.db.database import get_db
# from pydantic import BaseModel
# import jwt
# from app.db.models.userModel import User
# from app.db.database import get_db
# from sqlalchemy.orm import Session
# from app.core.config import settings
# from uuid import UUID
# SECRET_KEY = settings.SECRET_KEY
# ALGORITHM = settings.ALGORITHM
# ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

# router = APIRouter(prefix ='/auth', tags=['auth'])
# app = FastAPI()
# # db_dependency = Annotated(Session,Depends(get_db()))

# class CreateUserRequest(BaseModel):
#     name:str
#     email:str
#     password:str

# class LoginRequest(BaseModel):
#     email: str
#     password: str

# class Token(BaseModel):
#     access_token: str
#     token_type: str


# # class TokenData(BaseModel):
# #     username: str | None = None

# # class UserInDB(User):
# #     hashed_password: str

# password_hash = PasswordHash.recommended()
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl='auth/token')

# fake_users_db = {
#     "johndoe": {
#         "username": "johndoe",
#         "full_name": "John Doe",
#         "email": "johndoe@example.com",
#         "hashed_password": "$argon2id$v=19$m=65536,t=3,p=4$wagCPXjifgvUFBzq4hqe3w$CYaIb8sB+wtD+Vu/P4uod1+Qof8h+1g7bbDlBID48Rc",
#         "disabled": False,
#     }
# }




# def verify_password(plain_password, hashed_password):
#     return password_hash.verify(plain_password, hashed_password)


# def get_password_hash(password):
#     return password_hash.hash(password)

# @router.post("/", status_code=status.HTTP_201_CREATED)
# async def create_user(create_user_request: CreateUserRequest, db: Session = Depends(get_db)):
#     create_user_model = User(name = create_user_request.name, 
#                              email = create_user_request.email, 
#                              hashed_password  = get_password_hash(create_user_request.password))
    
#     db.add(create_user_model)
#     db.commit()


# @router.post("/token", response_model=Token)
# async def login_for_access_token(login: LoginRequest, db: Session = Depends(get_db)):
#     user = authenticate_user(login.email, login.password, db)
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail= "Could not validate user")
#     #Here the token will expire after 20 minutes. make sure to add a way to reset the timer if the user is still using the app.
#     token = create_access_token(user.email, user.id, timedelta(minutes=20))
#     return {'access_token': token, 'token_type': 'bearer'}


# def authenticate_user(email: str, password:str, db):
#     user = db.query(User).filter(User.email == email).first()
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user


# def create_access_token(email:str, user_id: UUID, expires_delta:timedelta):
#     encode = {'sub' : email, "id": str(user_id)}
#     expires = datetime.now(timezone.utc) + expires_delta
#     encode.update({"exp": expires})
#     return jwt.encode(encode, SECRET_KEY, algorithm = ALGORITHM)
    
# async def get_current_user(token: login_for_access_token):
#     try:
#         payload = jwt.decode(token, SECRET_KEY,algorithms =[ALGORITHM])
#         email: str = payload.get('sub')
#         user_id: str = payload.get("id")
#         if email is None or user_id is None:
#             raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED, detail = "Could not find user")
#         return {"email" : email, "id": user_id}
#     except:
#         raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")

from supabase import create_client
from app.core.config import settings
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models.userModel import User
from pydantic import BaseModel
from app.core.supabase_client import supabase
from fastapi.responses import JSONResponse



router = APIRouter(prefix="/auth", tags=["auth"])


class CreateUser(BaseModel):
    name:str
    email:str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str



@router.post("/signup",status_code=status.HTTP_201_CREATED)
async def signup(new_user: CreateUser, db: Session = Depends(get_db)):
    # 1. Create user in Supabase
    response = supabase.auth.sign_up({
        "email": new_user.email,
        "password": new_user.password
    })
    
    if response.user is None:
        raise HTTPException(status_code=400, detail="Supabase signup failed")
    
    # 2. Sync user to your local DB with Supabase ID as primary key
    user = User(
        id=response.user.id,  # use Supabase UUID
        name=new_user.name,
        email=new_user.email
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return {"id": user.id, "email": user.email}


# @router.post("/login")
# async def login(login: LoginRequest):
#     response = supabase.auth.sign_in_with_password({
#     "email": login.email,
#     "password": login.password
# })
    
#     if response.user is None:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
#     # Supabase returns JWT automatically
#     return {"access_token": response.session.access_token, "refresh_token": response.session.refresh_token}
@router.post("/login")
async def login(login: LoginRequest):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": login.email,
            "password": login.password
        })
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if response.user is None:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = response.session.access_token
    res = JSONResponse({"message": "Login successful"})
    res.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # for localhost
        samesite="lax" # for local  samesite="strict", # stricter CSRF protection
       # max_age=3600       # token lifetime
    )
    return res

@router.post("/logout")
async def logout():
    try:
        response = supabase.auth.sign_out()
        if response is None:
            # Supabase returns None if sign out succeeds
            res = JSONResponse({"message": "Logout successful"}, status_code=status.HTTP_200_OK)
            res.delete_cookie("access_token")
            return res
        
        # If response contains error info, raise exception
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Logout failed")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# async def get_current_user(request: Request):
#     token = request.headers.get("Authorization")
#     if not token:
#         raise HTTPException(status_code=401, detail="Missing token")
    
#     token = token.replace("Bearer ", "")
#     user = supabase.auth.api.get_user(token)
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     return user

