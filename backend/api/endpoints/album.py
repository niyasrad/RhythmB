from fastapi import APIRouter, Depends, status, Request

from sqlalchemy.orm import Session

from core.models.album import Album
from core.schemas.album import Album as AlbumSchema

from core.utils.dependencies import get_db
from core.utils.errors import handle_exception, not_found_error
from core.utils.middlewares import authenticate_common, authenticate_artist

router = APIRouter(
    prefix="/album",
    tags=["Album"],
)


@router.post(
    "/create",
    dependencies=[Depends(authenticate_artist)],
    status_code=status.HTTP_200_OK,
)
async def create_album(album: AlbumSchema, db: Session = Depends(get_db)):
    """
    Creates a new album.
    """

    new_album = Album(title=album.title, artist_id=album.artist_id)

    try:
        db.add(new_album)
        db.commit()
        db.refresh(new_album)

        return {"message": "Album Created Successfully!", "data": new_album}
    except Exception as e:
        raise handle_exception(e)


@router.get(
    "/{album_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def get_album(album_id: int, db: Session = Depends(get_db)):
    """
    Returns the album with the given id.
    """

    find_album = db.query(Album).filter(Album.id == album_id).first()

    if not find_album:
        raise not_found_error("album")

    return {
        "message": "Album Found!",
        "data": {
            "album_id": find_album.id,
            "title": find_album.title,
            "songs": find_album.songs,
            "artist": find_album.artist,
        },
    }


@router.put(
    "/{album_id}",
    dependencies=[Depends(authenticate_artist)],
    status_code=status.HTTP_200_OK,
)
async def update_album(
    album_id: int, album: AlbumSchema, db: Session = Depends(get_db)
):
    """
    Updates the album with the given id.
    """

    find_album = db.query(Album).filter(Album.id == album_id).first()

    if not find_album:
        raise not_found_error("album")

    try:
        find_album.title = album.title
        find_album.artist_id = album.artist_id

        db.commit()
        db.refresh(find_album)

        return {"message": "Album Updated Successfully!", "data": find_album}
    except Exception as e:
        raise handle_exception(e)


@router.delete(
    "/{album_id}",
    dependencies=[Depends(authenticate_artist)],
    status_code=status.HTTP_200_OK,
)
async def delete_album(album_id: int, db: Session = Depends(get_db)):
    """
    Deletes the album with the given id.
    """

    find_album = db.query(Album).filter(Album.id == album_id).first()

    if not find_album:
        raise not_found_error("album")

    try:
        db.delete(find_album)
        db.commit()

        return {"message": "Album Deleted Successfully!", "data": find_album}
    except Exception as e:
        raise handle_exception(e)
