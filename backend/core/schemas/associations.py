from pydantic import BaseModel, Field


class SongPlaylistAssociation(BaseModel):
    playlist_id: int = Field(..., example="1")
    song_id: int = Field(..., example="1")
