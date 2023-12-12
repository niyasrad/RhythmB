from pydantic import BaseModel, Field


class Playlist(BaseModel):
    title: str = Field(..., example="name")
