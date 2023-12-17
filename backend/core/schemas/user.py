from typing import Union, List
from pydantic import BaseModel, Field, EmailStr
from core.models.user import UserRole


class User(BaseModel):
    username: str = Field(..., example="username")
    email: EmailStr = Field(..., example="china@gmail.com")
    password: str = Field(..., example="password")
    role: UserRole = Field(..., example="admin")
    interests: List[str] = Field(..., example="['pop']")


class UserOpt(BaseModel):
    creds: Union[str, EmailStr] = Field(..., example="username/e-mail")
    password: str = Field(..., example="password")
