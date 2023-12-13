from pydantic import BaseModel, Field


class Song(BaseModel):
    title: str = Field(..., example="title")
    artist_id: str = Field(..., example="1")
    album_id: str = Field(..., example="1")
    genre: str = Field(..., example="genre")
    length: int = Field(..., example="20")
