from pydantic import BaseModel, Field


class Rating(BaseModel):
    song_id: str = Field(..., example="1")
    user_id: str = Field(..., example="1")
    rating: int = Field(..., example="10")
