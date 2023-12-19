from pydantic import BaseModel, Field
from typing import List, Optional


class Playlist(BaseModel):
    title: str = Field(..., example="name")
    user_id: str = Field(..., example="1")


class PlaylistConditional(BaseModel):
    title: str = Field(..., example="name")
    user_id: str = Field(..., example="1")
    num_songs: Optional[int] = Field(None, example="10")
    artists: List[str] = Field([], example="['shinee', 'bts']")
    genre: Optional[List[str]] = Field(None, example="['pop']")
