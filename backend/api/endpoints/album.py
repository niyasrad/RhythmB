import requests
import os

from fastapi import APIRouter, Depends, status, UploadFile, File, Form

from sqlalchemy.orm import Session
from core.utils.search import es

from core.models.artist import Artist
from core.models.album import Album
from core.schemas.album import Album as AlbumSchema

from core.utils.dependencies import get_db
from core.utils.errors import handle_exception, not_found_error
from core.utils.middlewares import authenticate_common, authenticate_admin

router = APIRouter(
    prefix="/album",
    tags=["Album"],
)


@router.post(
    "/create",
    dependencies=[Depends(authenticate_admin)],
    status_code=status.HTTP_200_OK,
)
async def create_album(album: AlbumSchema, db: Session = Depends(get_db)):
    """
    Creates a new album.
    """

    find_artist = db.query(Artist).filter(Artist.user_id == album.artist_id)

    if not find_artist:
        raise not_found_error("artist")

    new_album = Album(title=album.title, artist_id=album.artist_id)

    try:
        db.add(new_album)
        db.commit()
        db.refresh(new_album)

        album_document = {
            "id": new_album.id,
            "title": new_album.title,
            "artist_id": new_album.artist_id,
            "artist_name": new_album.artist.name,
        }

        es.index(index="albums", id=new_album.id, body=album_document)

        return {"message": "Album Created Successfully!", "data": new_album}
    except Exception as e:
        raise handle_exception(e)


@router.get(
    "/{album_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def get_album(album_id: str, db: Session = Depends(get_db)):
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
    dependencies=[Depends(authenticate_admin)],
    status_code=status.HTTP_200_OK,
)
async def update_album(
    album_id: str, album: AlbumSchema, db: Session = Depends(get_db)
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

        album_document = {
            "title": find_album.title,
            "artist_id": find_album.artist_id,
        }

        es.update(index="albums", id=find_album.id, body={"doc": album_document})

        return {"message": "Album Updated Successfully!", "data": find_album}
    except Exception as e:
        raise handle_exception(e)


@router.delete(
    "/{album_id}",
    dependencies=[Depends(authenticate_admin)],
    status_code=status.HTTP_200_OK,
)
async def delete_album(album_id: str, db: Session = Depends(get_db)):
    """
    Deletes the album with the given id.
    """

    find_album = db.query(Album).filter(Album.id == album_id).first()

    if not find_album:
        raise not_found_error("album")

    del_query = {"query": {"term": {"album_id": find_album.id}}}

    try:
        db.delete(find_album)
        db.commit()

        es.delete_by_query(index="ratings", body=del_query)
        es.delete_by_query(index="songs", body=del_query)
        es.delete(index="albums", id=find_album.id)

        return {"message": "Album Deleted Successfully!"}
    except Exception as e:
        raise handle_exception(e)


@router.post(
    "/add-album-cover",
    dependencies=[Depends(authenticate_admin)],
    status_code=status.HTTP_200_OK,
)
async def add_album_cover(
    album_id: str = Form(...),
    file: UploadFile = File(None),
    img_url: str = Form(None),
    db: Session = Depends(get_db),
):

    """
    Adds the album cover to the album with the given id.
    """

    find_album = db.query(Album).filter(Album.id == album_id).first()

    if not find_album:
        raise not_found_error("album")

    file_name = f"{album_id}.png"

    os.makedirs(os.path.dirname(f"cdn_assets/albums/{file_name}"), exist_ok=True)

    if file:
        try:
            with open(f"cdn_assets/albums/{file_name}", "wb") as f:
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
            with open(f"cdn_assets/albums/{file_name}", "wb") as f:
                f.write(response.content)
        except Exception as e:
            raise handle_exception(e)
    else:
        raise not_found_error("file")

    return {"message": "Album Cover Added Successfully!"}


@router.delete(
    "/delete-album-cover/{album_id}",
    dependencies=[Depends(authenticate_admin)],
    status_code=status.HTTP_200_OK,
)
async def delete_album_cover(album_id: str, db: Session = Depends(get_db)):

    """
    Deletes the album cover of the album with the given id.
    """

    find_album = db.query(Album).filter(Album.id == album_id).first()

    if not find_album:
        raise not_found_error("album")

    file_name = f"{album_id}.png"

    try:
        os.remove(f"cdn_assets/albums/{file_name}")
    except Exception as e:
        raise handle_exception(e)

    return {"message": "Album Cover Deleted Successfully!"}
