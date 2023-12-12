from fastapi import Request, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from core.models.user import User, UserRole
from core.utils.auth import decode_access_token
from core.utils.errors import unauthorized_error
from core.utils.dependencies import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def init_middlewares(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )


async def authenticate_user(
    request: Request,
    role: str,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
):
    if not token:
        raise unauthorized_error()

    try:
        payload = decode_access_token(token)
        username: str = payload.get("username")
        if username is None:
            raise unauthorized_error()
        user = db.query(User).filter(User.username == username).first()

        if role == "common" and user.role in [
            UserRole.ARTIST,
            UserRole.ADMIN,
            UserRole.COMMON,
        ]:
            pass
        elif role == "artist" and user.role in [UserRole.ADMIN, UserRole.ARTIST]:
            pass
        elif role == "admin" and user.role == UserRole.ADMIN:
            pass
        else:
            raise unauthorized_error()

        request.state.user = user

    except:
        raise unauthorized_error()


async def authenticate_admin(
    request: Request, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    await authenticate_user(request, "admin", token, db)


async def authenticate_artist(
    request: Request, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    await authenticate_user(request, "artist", token, db)


async def authenticate_common(
    request: Request, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    await authenticate_user(request, "common", token, db)
