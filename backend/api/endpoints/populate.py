import requests
import urllib3

import yt_dlp

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
from urllib.parse import quote

import pandas as pd
from dotenv import load_dotenv
from os import getenv, makedirs, path


from fastapi import APIRouter, Depends, status, UploadFile, File, Form

from sqlalchemy.orm import Session

from core.models.artist import Artist
from core.models.album import Album
from core.models.song import Song

from core.utils.search import es
from core.utils.dependencies import get_db
from core.utils.middlewares import authenticate_admin
from core.utils.errors import not_found_error, handle_exception

load_dotenv()

LAST_FM_API_KEY = getenv("LAST_FM_API_KEY")


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

        try:
            last_fm_response = requests.get(
                f"https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist={artist_name}&api_key={LAST_FM_API_KEY}&format=json"
            )
            response_json = last_fm_response.json()
            if "tags" in response_json["artist"]:
                if isinstance(response_json["artist"]["tags"], str):
                    artist_tags = [artist_db.genre]
                else:
                    tags = response_json["artist"]["tags"]["tag"]
                    if isinstance(tags, list):
                        artist_tags = [tag["name"] for tag in tags]
                    elif isinstance(tags, dict):
                        artist_tags = [tags["name"]]
                    else:
                        artist_tags = [artist_db.genre]
            else:
                artist_tags = [artist_db.genre]
        except Exception as e:
            raise handle_exception(e)

        artist_document = {
            "id": artist_db.id,
            "name": artist_db.name,
            "genre": artist_db.genre,
            "tags": artist_tags,
        }

        es.index(index="artists", id=artist_db.id, body=artist_document)

        artist_album_names = artist_df["album_title"].unique()

        for artist_album_name in artist_album_names:

            album_db = Album(title=artist_album_name, artist_id=artist_db.id)

            db.add(album_db)
            db.commit()
            db.refresh(album_db)

            artist_album_songs = artist_df[
                artist_df["album_title"] == artist_album_name
            ]

            makedirs(path.dirname(f"cdn_assets/songs/"), exist_ok=True)

            encoded_album_name = quote(artist_album_name)

            try:
                last_fm_response = requests.get(
                    f"https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key={LAST_FM_API_KEY}&artist={artist_name}&album={encoded_album_name}&format=json"
                )
                response_json = last_fm_response.json()
                images = response_json["album"]["image"]
                if "tags" in response_json["album"]:
                    if isinstance(response_json["album"]["tags"], str):
                        album_tags = [artist_tags]
                    else:
                        tags = response_json["album"]["tags"]["tag"]
                        if isinstance(tags, list):
                            album_tags = [tag["name"] for tag in tags]
                        elif isinstance(tags, dict):
                            album_tags = [tags["name"]]
                        else:
                            album_tags = [artist_tags]
                else:
                    album_tags = [artist_tags]
            except Exception as e:
                raise handle_exception(e)
            if last_fm_response.status_code != 200:
                raise not_found_error("album")

            for image in images:
                if "size" in image and image["size"] == "extralarge":
                    img_url = image.get("#text")
                    break

            file_name = f"{album_db.id}.jpg"
            makedirs(path.dirname(f"cdn_assets/albums/"), exist_ok=True)

            if not img_url:
                continue

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

            album_document = {
                "id": album_db.id,
                "title": album_db.title,
                "artist_id": album_db.artist_id,
                "tags": album_tags,
            }

            es.index(index="albums", id=album_db.id, body=album_document)

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
                    "tags": album_tags,
                }

                es.index(index="songs", id=song_db.id, body=song_document)

                ydl_opts = {
                    "format": "worstaudio/worst",
                    "postprocessors": [
                        {
                            "key": "FFmpegExtractAudio",
                            "preferredcodec": "mp3",
                            "preferredquality": "64",
                        }
                    ],
                    "outtmpl": f"cdn_assets/songs/{song_db.id}.%(ext)s",
                    "noplaylist": True,
                }

                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    try:
                        info_dict = ydl.extract_info(
                            f'ytsearch1:{artist_name}-{artist_album_song["title"]}',
                            download=False,
                        )["entries"][0]
                        if info_dict:
                            video_url = info_dict["url"]
                            ydl.download([video_url])
                    except yt_dlp.utils.DownloadError as e:
                        continue

    return {"message": "CSV File Uploaded Successfully!"}
