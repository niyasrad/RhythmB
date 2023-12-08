from typing import Union
from pydantic import BaseModel, Field, EmailStr


class User(BaseModel):
    username: str = Field(..., example="username")
    email: EmailStr = Field(..., example="china@gmail.com")
    password: str = Field(..., example="password")


class UserOpt(BaseModel):
    creds: Union[str, EmailStr] = Field(..., example="username/e-mail")
    password: str = Field(..., example="password")
