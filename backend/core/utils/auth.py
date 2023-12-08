from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta

from pydantic import EmailStr
from sqlalchemy.orm import Session
from typing import Union
from core.models.user import User

from dotenv import load_dotenv
from os import getenv

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_secret_key():
    return getenv("SECRET_KEY")


def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, get_secret_key(), algorithm="HS256")
    return encoded_jwt


def decode_access_token(token: str):
    try:
        decoded_token = jwt.decode(token, get_secret_key(), algorithms=["HS256"])
        return decoded_token
    except JWTError:
        return None


def check_existing_user(creds: Union[str, EmailStr], db: Session):
    email_check = db.query(User).filter(User.email == creds).first()
    if email_check:
        return email_check
    username_check = db.query(User).filter(User.username == creds).first()
    if username_check:
        return username_check


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
