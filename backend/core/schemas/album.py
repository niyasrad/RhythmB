from pydantic import BaseModel, Field


class Album(BaseModel):
    title: str = Field(..., example="title")
    artist_id: int = Field(..., example="1")
