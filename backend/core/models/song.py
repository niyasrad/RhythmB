from core.utils.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from core.models.associations import songs_playlists_association


class Song(Base):
    __tablename__ = "songs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    artist_id = Column(Integer, ForeignKey("artists.id"), index=True)
    album_id = Column(Integer, ForeignKey("albums.id"), index=True)
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
