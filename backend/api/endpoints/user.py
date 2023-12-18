import requests
import os

from fastapi import APIRouter, Depends, status, Request, UploadFile, File, Form
from sqlalchemy.orm import Session
from core.utils.search import es

from core.models.user import User
from core.schemas.user import User as UserSchema, UserOpt as UserOptSchema
from core.utils.dependencies import get_db
from core.utils.errors import (
    handle_exception,
    conflict_error,
    not_found_error,
    credential_error,
)
from core.utils.auth import (
    pwd_context,
    verify_password,
    create_access_token,
    check_existing_user,
)
from core.utils.middlewares import authenticate_common

router = APIRouter(
    prefix="/user",
    tags=["User"],
)


@router.post("/sign-up", status_code=status.HTTP_201_CREATED)
async def sign_up(user: UserSchema, db: Session = Depends(get_db)):

    """
    Creates a new user, and returns bearer token.
    """

    if check_existing_user(user.username, db):
        raise conflict_error("username")
    if check_existing_user(user.email, db):
        raise conflict_error("email")

    hashed_password = pwd_context.hash(user.password)

    try:
        new_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password,
            role=user.role,
            interests=user.interests,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        user_document = {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "role": str(user.role),
            "hashed_password": new_user.hashed_password,
            "interests": new_user.interests,
        }

        es.index(index="users", id=new_user.id, body=user_document)

        access_token = create_access_token(data={"username": new_user.username})
        return {
            "message": "User Created Successfully!",
            "data": {"token": access_token, "username": new_user.username},
        }
    except Exception as e:
        raise handle_exception(e)


@router.post("/sign-in", status_code=status.HTTP_200_OK)
async def sign_in(user: UserOptSchema, db: Session = Depends(get_db)):

    """
    Checks the credentials of the user, returns the bearer token.
    """

    user_find = check_existing_user(user.creds, db)

    if user_find is None:
        raise not_found_error("user")

    if not verify_password(user.password, user_find.hashed_password):
        raise credential_error()

    access_token = create_access_token(data={"username": user_find.username})

    return {
        "message": "User Logged In Successfully!",
        "data": {"token": access_token, "username": user_find.username},
    }


@router.get(
    "/profile",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def get_profile(request: Request, db: Session = Depends(get_db)):

    """
    Returns the profile of the user.
    """
    user = request.state.user

    return {
        "message": "User Profile Fetched Successfully!",
        "data": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "playlists": user.playlists,
        },
    }


@router.get(
    "/get-ratings",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def get_ratings(request: Request, db: Session = Depends(get_db)):

    """
    Returns the ratings of the user.
    """
    user = request.state.user
    ratings = user.ratings

    return {
        "message": "User Ratings Fetched Successfully!",
        "data": {
            "ratings": [
                {"id": rating.id, "song": rating.song, "rating": rating.rating}
                for rating in ratings
            ]
        },
    }


@router.post(
    "/add-picture",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def add_picture(
    request: Request, file: UploadFile = File(None), img_url: str = Form(None)
):

    """
    Adds a profile picture to the user.
    """
    user = request.state.user
    file_name = f"{user.id}.png"

    os.makedirs(os.path.dirname(f"cdn_assets/profiles/{file_name}"), exist_ok=True)

    if file:
        try:
            with open(f"cdn_assets/profiles/{file_name}", "wb") as f:
                f.write(file.file.read())
        except Exception as e:
            raise handle_exception(e)
    elif img_url:
        try:
            response = requests.get(img_url)
        except Exception as e:
            raise handle_exception(e)
        if response.status_code != 200:
            raise not_found_error("image")

        try:
            with open(f"cdn_assets/profiles/{file_name}", "wb") as f:
                f.write(response.content)
        except Exception as e:
            raise handle_exception(e)
    else:
        raise not_found_error("file")

    return {"message": "User Picture Added Successfully!"}


@router.delete(
    "/delete-picture",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def delete_picture(request: Request):

    """
    Deletes the profile picture of the user.
    """
    user = request.state.user
    file_name = f"{user.id}.png"

    try:
        os.remove(f"cdn_assets/profiles/{file_name}")
    except Exception as e:
        raise handle_exception(e)

    return {"message": "User Picture Deleted Successfully!"}
