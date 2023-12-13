from pydantic import BaseModel, Field


class Playlist(BaseModel):
    title: str = Field(..., example="name")
    user_id: str = Field(..., example="1")
