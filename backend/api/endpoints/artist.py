from fastapi import APIRouter, Depends, status

from urllib.parse import unquote

from sqlalchemy.orm import Session
from core.utils.search import es

from core.models.artist import Artist
from core.schemas.artist import Artist as ArtistSchema

from core.utils.dependencies import get_db
from core.utils.errors import (
    handle_exception,
    not_found_error,
)
from core.utils.middlewares import authenticate_common, authenticate_admin

router = APIRouter(
    prefix="/artist",
    tags=["Artist"],
)


@router.post(
    "/create",
    dependencies=[Depends(authenticate_admin)],
    status_code=status.HTTP_200_OK,
)
async def create_artist(artist: ArtistSchema, db: Session = Depends(get_db)):
    """
    Creates a new artist.
    """

    new_artist = Artist(name=artist.name, genre=artist.genre)

    try:
        db.add(new_artist)
        db.commit()
        db.refresh(new_artist)

        artist_document = {
            "id": new_artist.id,
            "name": new_artist.name,
            "genre": new_artist.genre,
        }

        es.index(index="artists", id=new_artist.id, body=artist_document)

        return {"message": "Artist Created Successfully!", "data": new_artist}
    except Exception as e:
        raise handle_exception(e)


@router.get(
    "/{artist_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def get_artist(artist_id: str, db: Session = Depends(get_db)):
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


@router.get(
    "/get/all",
    status_code=status.HTTP_200_OK,
)
async def get_all_artists(db: Session = Depends(get_db)):
    """
    Returns all the artists.
    """

    find_artists = db.query(Artist).all()

    if not find_artists:
        raise not_found_error("artists")

    return {
        "message": "Artists Found!",
        "data": find_artists,
    }


@router.get(
    "/genre/{genre}",
    status_code=status.HTTP_200_OK,
)
async def get_artists_by_genre(genre: str, db: Session = Depends(get_db)):
    """
    Returns the artists with the given genre.
    """

    decoded_genre = unquote(genre)

    find_artists = db.query(Artist).filter(Artist.genre == decoded_genre).all()

    if not find_artists:
        raise not_found_error("artists")

    return {
        "message": "Artists Found!",
        "data": find_artists,
    }


@router.put(
    "/{artist_id}",
    dependencies=[Depends(authenticate_admin)],
    status_code=status.HTTP_200_OK,
)
async def update_artist(
    artist_id: str,
    artist: ArtistSchema,
    db: Session = Depends(get_db),
):
    """
    Updates the artist with the given id.
    """

    find_artist = db.query(Artist).filter(Artist.id == artist_id).first()

    if not find_artist:
        raise not_found_error("artist")

    try:
        find_artist.name = artist.name
        find_artist.genre = artist.genre

        db.commit()
        db.refresh(find_artist)

        artist_document = {
            "name": find_artist.name,
            "genre": find_artist.genre,
        }

        es.update(index="artists", id=find_artist.id, body={"doc": artist_document})

        return {"message": "Artist Updated Successfully!", "data": find_artist}
    except Exception as e:
        raise handle_exception(e)


@router.delete(
    "/{artist_id}",
    dependencies=[Depends(authenticate_admin)],
    status_code=status.HTTP_200_OK,
)
async def delete_artist(artist_id: str, db: Session = Depends(get_db)):
    """
    Deletes the artist with the given id.
    """

    find_artist = db.query(Artist).filter(Artist.id == artist_id).first()

    if not find_artist:
        raise not_found_error("artist")

    del_query = {"query": {"term": {"artist_id": find_artist.id}}}
    del_playlist_song_query = {
        "script": {
            "source": "ctx._source.songs.removeIf(song -> song.artist_id == params.artist_id)",
            "lang": "painless",
            "params": {"artist_id": find_artist.id},
        }
    }

    try:
        db.delete(find_artist)
        db.commit()

        es.delete_by_query(index="ratings", body=del_query)
        es.update_by_query(index="playlists", body=del_playlist_song_query)
        es.delete_by_query(index="songs", body=del_query)
        es.delete_by_query(index="albums", body=del_query)
        es.delete(index="artists", id=find_artist.id)

        return {"message": "Artist Deleted Successfully!"}
    except Exception as e:
        raise handle_exception(e)
