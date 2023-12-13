from fastapi import APIRouter, Depends, status, Request

from sqlalchemy.orm import Session

from core.models.song import Song
from core.schemas.song import Song as SongSchema

from core.utils.dependencies import get_db
from core.utils.errors import handle_exception, not_found_error
from core.utils.middlewares import authenticate_common, authenticate_artist

router = APIRouter(
    prefix="/song",
    tags=["Song"],
)


@router.post(
    "/create",
    dependencies=[Depends(authenticate_artist)],
    status_code=status.HTTP_200_OK,
)
async def create_song(song: SongSchema, db: Session = Depends(get_db)):
    """
    Creates a new song.
    """

    new_song = Song(
        title=song.title,
        artist_id=song.artist_id,
        album_id=song.album_id,
        genre=song.genre,
        length=song.length,
    )

    try:
        db.add(new_song)
        db.commit()
        db.refresh(new_song)

        return {"message": "Song Created Successfully!", "data": new_song}
    except Exception as e:
        raise handle_exception(e)


@router.get(
    "/{song_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def get_song(song_id: str, db: Session = Depends(get_db)):
    """
    Returns the song with the given id.
    """

    find_song = db.query(Song).filter(Song.id == song_id).first()

    if not find_song:
        raise not_found_error("Song")

    return {"message": "Song Found!", "data": find_song}


@router.put(
    "/{song_id}",
    dependencies=[Depends(authenticate_artist)],
    status_code=status.HTTP_200_OK,
)
async def update_song(
    request: Request, song_id: str, song: SongSchema, db: Session = Depends(get_db)
):
    """
    Updates the song with the given id.
    """

    artist = request.state.user

    find_song = db.query(Song).filter(Song.id == song_id).first()

    if not find_song:
        raise not_found_error("Song")

    if find_song.artist_id != artist.id:
        raise not_found_error("Song")

    try:
        find_song.title = song.title
        find_song.artist_id = song.artist_id
        find_song.album_id = song.album_id
        find_song.genre = song.genre
        find_song.length = song.length

        db.commit()
        db.refresh(find_song)

        return {"message": "Song Updated Successfully!", "data": find_song}
    except Exception as e:
        raise handle_exception(e)


@router.delete(
    "/{song_id}",
    dependencies=[Depends(authenticate_artist)],
    status_code=status.HTTP_200_OK,
)
async def delete_song(request: Request, song_id: str, db: Session = Depends(get_db)):
    """
    Deletes the song with the given id.
    """

    artist = request.state.user

    find_song = db.query(Song).filter(Song.id == song_id).first()

    if not find_song:
        raise not_found_error("Song")

    if find_song.artist_id != artist.id:
        raise not_found_error("Song")

    try:
        db.delete(find_song)
        db.commit()

        return {"message": "Song Deleted Successfully!", "data": find_song}
    except Exception as e:
        raise handle_exception(e)
