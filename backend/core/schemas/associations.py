from pydantic import BaseModel, Field


class SongPlaylistAssociation(BaseModel):
    playlist_id: str = Field(..., example="1")
    song_id: str = Field(..., example="1")
