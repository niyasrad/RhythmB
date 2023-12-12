from pydantic import BaseModel, Field


class Rating(BaseModel):
    song_id: int = Field(..., example="1")
    rating: int = Field(..., example="10")
