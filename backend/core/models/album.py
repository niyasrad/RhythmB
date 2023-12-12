from core.utils.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class Album(Base):
    __tablename__ = "albums"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    artist_id = Column(Integer, ForeignKey("artists.id"), index=True)

    artist = relationship("Artist", back_populates="albums")
    songs = relationship("Song", back_populates="album")

    def __repr__(self):
        return f"<Album {self.title} {self.artist}>"
