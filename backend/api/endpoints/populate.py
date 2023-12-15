import requests
import pandas as pd

from fastapi import APIRouter, Depends, status, UploadFile, File, Form

from sqlalchemy.orm import Session

from core.models.artist import Artist
from core.models.album import Album
from core.models.song import Song

from core.utils.search import es
from core.utils.dependencies import get_db
from core.utils.middlewares import authenticate_admin
from core.utils.errors import not_found_error, handle_exception

router = APIRouter(
    prefix="/populate",
    tags=["Populate"],
)


@router.post(
    "/csv", dependencies=[Depends(authenticate_admin)], status_code=status.HTTP_200_OK
)
async def populate_csv(
    csv_file: UploadFile = File(None),
    csv_url: str = Form(None),
    db: Session = Depends(get_db),
):
    """
    Populates the database with data from a CSV file.
    """
    try:
        if csv_file:
            df = pd.read_csv(csv_file.file)
        elif csv_url:
            csv_url_response = requests.get(csv_url)
            df = pd.read_csv(csv_url_response.content)
        else:
            raise not_found_error("CSV File")

        artist_names = df["artist_name"].unique()

        for artist_name in artist_names:

            artist_df = df[df["artist_name"] == artist_name]
            artist_genre = artist_df["genre"].value_counts().idxmax()

            artist_db = Artist(name=artist_name, genre=artist_genre)

            db.add(artist_db)
            db.commit()
            db.refresh(artist_db)

            artist_document = {
                "id": artist_db.id,
                "name": artist_db.name,
                "genre": artist_db.genre,
            }

            es.index(index="artists", id=artist_db.id, body=artist_document)

            artist_album_names = artist_df["album_title"].unique()

            for artist_album_name in artist_album_names:

                album_db = Album(title=artist_album_name, artist_id=artist_db.id)

                db.add(album_db)
                db.commit()
                db.refresh(album_db)

                album_document = {
                    "id": album_db.id,
                    "title": album_db.title,
                    "artist_id": album_db.artist_id,
                }

                es.index(index="albums", id=album_db.id, body=album_document)

                artist_album_songs = artist_df[
                    artist_df["album_title"] == artist_album_name
                ]

                for _, artist_album_song in artist_album_songs.iterrows():

                    song_db = Song(
                        title=artist_album_song["title"],
                        artist_id=artist_db.id,
                        album_id=album_db.id,
                        genre=artist_album_song["genre"],
                        length=artist_album_song["length_ms"],
                    )

                    db.add(song_db)
                    db.commit()
                    db.refresh(song_db)

                    song_document = {
                        "id": song_db.id,
                        "title": song_db.title,
                        "artist_id": song_db.artist_id,
                        "album_id": song_db.album_id,
                        "artist_name": artist_db.name,
                        "album_title": album_db.title,
                        "genre": song_db.genre,
                        "length": song_db.length,
                    }

                    es.index(index="songs", id=song_db.id, body=song_document)
    except Exception as e:
        raise handle_exception(e)

    return {"message": "CSV File Uploaded Successfully!"}
