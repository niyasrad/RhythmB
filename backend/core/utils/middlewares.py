from fastapi import Request, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

from core.utils.auth import decode_access_token

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


async def authenticate_user(request: Request, token: str = Depends(oauth2_scheme)):
    if not token:
        raise HTTPException(status_code=401, detail="Invalid Token!")

    try:
        payload = decode_access_token(token)
        username: str = payload.get("username")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid Token!")
        request.state.username = username

    except:
        raise HTTPException(status_code=401, detail="Invalid Token!")
