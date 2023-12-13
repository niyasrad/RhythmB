from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from core.utils.database import Base

songs_playlists_association = Table(
    "songs_playlists",
    Base.metadata,
    Column("song_id", UUID(as_uuid=True), ForeignKey("songs.id"), index=True),
    Column("playlist_id", UUID(as_uuid=True), ForeignKey("playlists.id"), index=True),
)
