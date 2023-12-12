from core.utils.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from core.models.associations import songs_playlists_association


class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    songs = relationship(
        "Song", secondary=songs_playlists_association, back_populates="playlist"
    )
    user = relationship("User", back_populates="playlists")

    def __repr__(self):
        return f"<Playlist {self.title} {self.songs}>"
