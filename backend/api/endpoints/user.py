from fastapi import APIRouter, Depends, status, Request
from sqlalchemy.orm import Session

from core.models.user import User, UserRole
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
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

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
