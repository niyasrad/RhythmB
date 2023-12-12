from sqlalchemy import Table, Column, Integer, ForeignKey

from core.utils.database import Base

songs_playlists_association = Table(
    "songs_playlists",
    Base.metadata,
    Column("song_id", Integer, ForeignKey("songs.id"), index=True),
    Column("playlist_id", Integer, ForeignKey("playlists.id"), index=True),
)
