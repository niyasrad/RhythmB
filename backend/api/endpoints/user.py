from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session

from core.models.user import User
from core.schemas.user import User as UserSchema, UserOpt as UserOptSchema
from core.utils.dependencies import get_db
from core.utils.auth import (
    pwd_context,
    verify_password,
    create_access_token,
    check_existing_user,
)
from core.utils.middlewares import authenticate_user

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
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists!"
        )
    if check_existing_user(user.email, db):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="E-mail already exists!"
        )

    hashed_password = pwd_context.hash(user.password)

    try:
        user = User(
            username=user.username, email=user.email, hashed_password=hashed_password
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        access_token = create_access_token(data={"username": user.username})
        return {
            "message": "User Created Successfully!",
            "data": {"token": access_token, "username": user.username},
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/sign-in", status_code=status.HTTP_200_OK)
async def sign_in(user: UserOptSchema, db: Session = Depends(get_db)):

    """
    Checks the credentials of the user, returns the bearer token.
    """

    user_find = check_existing_user(user.creds, db)

    if user_find is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found!"
        )

    if not verify_password(user.password, user_find.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password!"
        )

    access_token = create_access_token(data={"username": user_find.username})

    return {
        "message": "User Logged In Successfully!",
        "data": {"token": access_token, "username": user_find.username},
    }


@router.get(
    "/profile",
    dependencies=[Depends(authenticate_user)],
    status_code=status.HTTP_200_OK,
)
async def get_profile(request: Request, db: Session = Depends(get_db)):

    """
    Returns the profile of the user.
    """

    username = request.state.username
    try:
        user = db.query(User).filter(User.username == username).first()
        return {
            "message": "User Profile Fetched Successfully!",
            "data": {"username": user.username, "email": user.email},
        }
    except Exception as e:
        return HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
