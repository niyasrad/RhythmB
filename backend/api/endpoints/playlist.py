from fastapi import APIRouter, Depends, status, Request

from sqlalchemy.orm import Session
from core.utils.search import es

from core.models.user import UserRole
from core.models.playlist import Playlist
from core.models.song import Song

from core.schemas.playlist import Playlist as PlaylistSchema, PlaylistConditional
from core.schemas.associations import SongPlaylistAssociation

from core.utils.dependencies import get_db
from core.utils.errors import handle_exception, not_found_error, unauthorized_error
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

        playlist_document = {
            "id": new_playlist.id,
            "title": new_playlist.title,
            "user_id": new_playlist.user_id,
            "username": new_playlist.user.username,
            "songs": new_playlist.songs,
        }

        es.index(index="playlists", id=new_playlist.id, body=playlist_document)

        return {"message": "Playlist Created Successfully!", "data": new_playlist}
    except Exception as e:
        raise handle_exception(e)


@router.post(
    "/create/conditional",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def create_playlist_conditional(
    request: Request, playlist: PlaylistConditional, db: Session = Depends(get_db)
):
    """
    Creates a new playlist, adds songs to it based on the given conditions.
    """

    user = request.state.user

    new_playlist = Playlist(title=playlist.title, user_id=user.id)

    search_query = {"query": {"bool": {"must": []}}}

    if playlist.genres and playlist.artists:
        combined_query = {
            "bool": {
                "must": [
                    {"terms": {"artist_id": playlist.artists}},
                    {"terms": {"genre": playlist.genres}},
                ]
            }
        }

        search_query["query"]["bool"]["must"].append(combined_query)
        search_query["size"] = playlist.num_songs if playlist.num_songs else 30
        results = es.search(index="songs", body=search_query)
        hits = results.get("hits", {}).get("hits", [])

        if len(hits) < 5:

            search_query["query"]["bool"]["must"] = []
            search_query["query"]["bool"]["must"].append(
                {"terms": {"genre": playlist.genres}}
            )
            results_genre = es.search(index="songs", body=search_query)
            genres_hits = results_genre.get("hits", {}).get("hits", [])
            hits.extend(genres_hits)

            search_query["query"]["bool"]["must"] = []
            search_query["query"]["bool"]["must"].append(
                {"terms": {"artist_id": playlist.artists}}
            )
            results_artist = es.search(index="songs", body=search_query)
            artist_hits = results_artist.get("hits", {}).get("hits", [])
            hits.extend(artist_hits)

    else:
        if playlist.genres:
            search_query["query"]["bool"]["must"].append(
                {"terms": {"genre": playlist.genres}}
            )
        elif playlist.artists:
            search_query["query"]["bool"]["must"].append(
                {"terms": {"artist_id": playlist.artists}}
            )

        search_query["size"] = playlist.num_songs if playlist.num_songs else 30
        results = es.search(index="songs", body=search_query)
        hits = results.get("hits", {}).get("hits", [])

    db.add(new_playlist)
    db.commit()
    db.refresh(new_playlist)

    try:
        for hit in hits:
            song = db.query(Song).filter(Song.id == hit["_id"]).first()
            new_playlist.songs.append(song)

        db.commit()
        db.refresh(new_playlist)

        songs_data = [
            {
                "id": hit["_id"],
                "title": hit["_source"].get("title", ""),
                "artist_id": hit["_source"].get("artist_id", ""),
                "album_id": hit["_source"].get("album_id", ""),
                "artist_name": hit["_source"].get("artist_name", ""),
                "album_title": hit["_source"].get("album_title", ""),
                "genre": hit["_source"].get("genre", ""),
                "length": hit["_source"].get("length", 0),
                "tags": hit["_source"].get("tags", []),
            }
            for hit in hits
        ]

        playlist_document = {
            "id": new_playlist.id,
            "title": new_playlist.title,
            "user_id": new_playlist.user_id,
            "username": new_playlist.user.username,
            "songs": songs_data,
        }

        es.index(index="playlists", id=new_playlist.id, body=playlist_document)

        return {"message": "Playlist Created Successfully!", "data": playlist_document}
    except Exception as e:
        raise handle_exception(e)


@router.get(
    "/{playlist_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def get_playlist(playlist_id: str, db: Session = Depends(get_db)):
    """
    Returns the playlist with the given id.
    """

    find_playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()

    if not find_playlist:
        raise not_found_error("playlist")

    return {
        "message": "Playlist Found!",
        "data": {
            "playlist_id": find_playlist.id,
            "title": find_playlist.title,
            "songs": find_playlist.songs,
            "user": find_playlist.user.username,
        },
    }


@router.put(
    "/{playlist_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def update_playlist(
    request: Request,
    playlist_id: str,
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

    if find_playlist.user_id != user.id and user.role != UserRole.ADMIN:
        raise unauthorized_error()

    try:
        find_playlist.title = playlist.title

        db.commit()
        db.refresh(find_playlist)

        playlist_document = {
            "title": find_playlist.title,
        }

        es.index(
            index="playlists", id=find_playlist.id, body={"doc": playlist_document}
        )

        return {"message": "Playlist Updated Successfully!", "data": find_playlist}
    except Exception as e:
        raise handle_exception(e)


@router.delete(
    "/{playlist_id}",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def delete_playlist(
    request: Request, playlist_id: str, db: Session = Depends(get_db)
):
    """
    Deletes the playlist with the given id.
    """

    user = request.state.user

    find_playlist = db.query(Playlist).filter(Playlist.id == playlist_id).first()

    if not find_playlist:
        raise not_found_error("playlist")

    if find_playlist.user_id != user.id and user.role != UserRole.ADMIN:
        raise unauthorized_error()

    try:
        db.delete(find_playlist)
        db.commit()

        es.delete(index="playlists", id=find_playlist.id)

        return {"message": "Playlist Deleted Successfully!"}
    except Exception as e:
        raise handle_exception(e)


@router.post(
    "/add-song",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def add_song_to_playlist(
    request: Request,
    association: SongPlaylistAssociation,
    db: Session = Depends(get_db),
):
    """
    Adds a song to the playlist with the given id.
    """

    user = request.state.user

    find_playlist = (
        db.query(Playlist).filter(Playlist.id == association.playlist_id).first()
    )

    if not find_playlist:
        raise not_found_error("playlist")

    if find_playlist.user_id != user.id and user.role != UserRole.ADMIN:
        raise unauthorized_error()

    find_song = db.query(Song).filter(Song.id == association.song_id).first()

    if not find_song:
        raise not_found_error("song")

    if find_song in find_playlist.songs:
        return {
            "message": "Song Already Exists in Playlist!",
            "data": {
                "playlist_id": find_playlist.id,
                "title": find_playlist.title,
                "songs": find_playlist.songs,
                "user": find_playlist.user.username,
            },
        }

    try:
        find_playlist.songs.append(find_song)
        db.commit()
        db.refresh(find_playlist)

        find_song = es.get(index="songs", id=find_song.id).get("_source", {})

        song_document = {
            "id": find_song.get("id", ""),
            "title": find_song.get("title", ""),
            "artist_id": find_song.get("artist_id", ""),
            "album_id": find_song.get("album_id", ""),
            "artist_name": find_song.get("artist_name", ""),
            "album_title": find_song.get("album_title", ""),
            "genre": find_song.get("genre", ""),
            "length": find_song.get("length", 0),
            "tags": find_song.get("tags", []),
        }

        es.update(
            index="playlists",
            id=find_playlist.id,
            body={
                "script": {
                    "source": "ctx._source.songs.add(params.song)",
                    "params": {"song": song_document},
                }
            },
        )

        return {
            "message": "Song Added to Playlist Successfully!",
            "data": {
                "playlist_id": find_playlist.id,
                "title": find_playlist.title,
                "songs": find_playlist.songs,
                "user": find_playlist.user.username,
            },
        }
    except Exception as e:
        raise handle_exception(e)


@router.post(
    "/remove-song",
    dependencies=[Depends(authenticate_common)],
    status_code=status.HTTP_200_OK,
)
async def remove_song_from_playlist(
    request: Request,
    association: SongPlaylistAssociation,
    db: Session = Depends(get_db),
):
    """
    Removes a song from the playlist with the given id.
    """

    user = request.state.user

    find_playlist = (
        db.query(Playlist).filter(Playlist.id == association.playlist_id).first()
    )

    if not find_playlist:
        raise not_found_error("playlist")

    if find_playlist.user_id != user.id and user.role != UserRole.ADMIN:
        raise unauthorized_error()

    find_song = db.query(Song).filter(Song.id == association.song_id).first()

    if not find_song:
        raise not_found_error("song")

    if find_song not in find_playlist.songs:
        return {
            "message": "Song Does Not Exist in Playlist!",
            "data": {
                "playlist_id": find_playlist.id,
                "title": find_playlist.title,
                "songs": find_playlist.songs,
                "user": find_playlist.user.username,
            },
        }

    try:
        find_playlist.songs.remove(find_song)
        db.commit()
        db.refresh(find_playlist)

        es.update(
            index="playlists",
            id=find_playlist.id,
            body={
                "script": {
                    "source": "ctx._source.songs.removeIf(song -> song.id == params.id)",
                    "params": {"id": find_song.id},
                },
            },
        )

        return {
            "message": "Song Removed from Playlist Successfully!",
            "data": {
                "playlist_id": find_playlist.id,
                "title": find_playlist.title,
                "songs": find_playlist.songs,
                "user": find_playlist.user.username,
            },
        }
    except Exception as e:
        raise handle_exception(e)
