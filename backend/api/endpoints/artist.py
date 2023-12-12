from fastapi import APIRouter, Depends, status, Request

from sqlalchemy.orm import Session

from core.models.artist import Artist
from core.schemas.artist import Artist as ArtistSchema

from core.utils.dependencies import get_db
from core.utils.errors import handle_exception, not_found_error, conflict_error
from core.utils.middlewares import authenticate_common, authenticate_artist

router = APIRouter(
    prefix="/artist",
    tags=["Artist"],
)


@router.post(
    "/create",
    dependencies=[Depends(authenticate_artist)],
    status_code=status.HTTP_200_OK,
)
async def create_artist(
    request: Request, artist: ArtistSchema, db: Session = Depends(get_db)
):
    """
    Creates a new artist.
    """

    user = request.state.user

    find_artist = db.query(Artist).filter(Artist.user_id == user.id).first()

    if find_artist:
        raise conflict_error("artist")

    new_artist = Artist(name=artist.name, genre=artist.genre, user_id=user.id)

    try:
        db.add(new_artist)
        db.commit()
        db.refresh(new_artist)

        return {"message": "Artist Created Successfully!", "data": new_artist}
    except Exception as e:
        raise handle_exception(e)


@router.get(
    "/{artist_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def get_artist(artist_id: int, db: Session = Depends(get_db)):
    """
    Returns the artist with the given id.
    """

    find_artist = db.query(Artist).filter(Artist.id == artist_id).first()

    if not find_artist:
        raise not_found_error("artist")

    return {
        "message": "Artist Found!",
        "data": {
            "artist_id": find_artist.id,
            "name": find_artist.name,
            "genre": find_artist.genre,
            "albums": find_artist.albums,
            "songs": find_artist.songs[0:5],
        },
    }


@router.put(
    "/{artist_id}",
    dependencies=[Depends(authenticate_artist)],
    status_code=status.HTTP_200_OK,
)
async def update_artist(
    request: Request,
    artist_id: int,
    artist: ArtistSchema,
    db: Session = Depends(get_db),
):
    """
    Updates the artist with the given id.
    """

    user = request.state.user

    find_artist = db.query(Artist).filter(Artist.user_id == user.id).first()

    if not find_artist:
        raise not_found_error("artist")

    try:
        find_artist.name = artist.name
        find_artist.genre = artist.genre

        db.commit()
        db.refresh(find_artist)

        return {"message": "Artist Updated Successfully!", "data": find_artist}
    except Exception as e:
        raise handle_exception(e)


@router.delete(
    "/{artist_id}",
    dependencies=[Depends(authenticate_artist)],
    status_code=status.HTTP_200_OK,
)
async def delete_artist(
    request: Request, artist_id: int, db: Session = Depends(get_db)
):
    """
    Deletes the artist with the given id.
    """

    user = request.state.user

    find_artist = db.query(Artist).filter(Artist.user_id == user.id).first()

    if not find_artist:
        raise not_found_error("artist")

    try:
        db.delete(find_artist)
        db.commit()

        return {"message": "Artist Deleted Successfully!"}
    except Exception as e:
        raise handle_exception(e)
