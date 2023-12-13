import uuid

from core.utils.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from core.models.associations import songs_playlists_association


class Song(Base):
    __tablename__ = "songs"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    title = Column(String, index=True)
    artist_id = Column(UUID(as_uuid=True), ForeignKey("artists.id"), index=True)
    album_id = Column(UUID(as_uuid=True), ForeignKey("albums.id"), index=True)
    genre = Column(String, index=True)
    length = Column(Integer, index=True)

    artist = relationship("Artist", back_populates="songs")
    playlist = relationship(
        "Playlist", secondary=songs_playlists_association, back_populates="songs"
    )
    album = relationship("Album", back_populates="songs")
    ratings = relationship("Rating", back_populates="song")

    def __repr__(self):
        return (
            f"<Song {self.title} {self.artist} {self.album} {self.genre} {self.length}>"
        )
