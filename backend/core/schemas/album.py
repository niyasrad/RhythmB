from pydantic import BaseModel, Field


class Album(BaseModel):
    title: str = Field(..., example="title")
    artist_id: str = Field(..., example="1")
