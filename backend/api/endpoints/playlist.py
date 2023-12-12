from fastapi import APIRouter, Depends, status, Request

from sqlalchemy.orm import Session

from core.models.playlist import Playlist
from core.schemas.playlist import Playlist as PlaylistSchema

from core.utils.dependencies import get_db
from core.utils.errors import handle_exception, not_found_error
from core.utils.middlewares import authenticate_common

router = APIRouter(
    prefix="/playlist",
    tags=["Playlist"],
)


@router.post(
    "/create",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def create_playlist(
    request: Request, playlist: PlaylistSchema, db: Session = Depends(get_db)
):
    """
    Creates a new playlist.
    """

    user = request.state.user

    new_playlist = Playlist(title=playlist.title, user_id=user.id)

    try:
        db.add(new_playlist)
        db.commit()
        db.refresh(new_playlist)

        return {"message": "Playlist Created Successfully!", "data": new_playlist}
    except Exception as e:
        raise handle_exception(e)


@router.get(
    "/{playlist_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def get_playlist(playlist_id: int, db: Session = Depends(get_db)):
    """
    Returns the playlist with the given id.
    """

    find_playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()

    if not find_playlist:
        raise not_found_error("playlist")

    return {"message": "Playlist Found!", "data": find_playlist}


@router.put(
    "/{playlist_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def update_playlist(
    request: Request,
    playlist_id: int,
    playlist: PlaylistSchema,
    db: Session = Depends(get_db),
):
    """
    Updates the playlist with the given id.
    """

    user = request.state.user

    find_playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()

    if not find_playlist:
        raise not_found_error("playlist")

    if find_playlist.user_id != user.id:
        raise not_found_error("playlist")

    try:
        find_playlist.title = playlist.title

        db.commit()
        db.refresh(find_playlist)

        return {"message": "Playlist Updated Successfully!", "data": find_playlist}
    except Exception as e:
        raise handle_exception(e)


@router.delete(
    "/{playlist_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def delete_playlist(
    request: Request, playlist_id: int, db: Session = Depends(get_db)
):
    """
    Deletes the playlist with the given id.
    """

    user = request.state.user

    find_playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()

    if not find_playlist:
        raise not_found_error("playlist")

    if find_playlist.user_id != user.id:
        raise not_found_error("playlist")

    try:
        db.delete(find_playlist)
        db.commit()

        return {"message": "Playlist Deleted Successfully!"}
    except Exception as e:
        raise handle_exception(e)
