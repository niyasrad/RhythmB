from core.utils.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class Artist(Base):
    __tablename__ = "artists"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    genre = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    songs = relationship("Song", back_populates="artist")
    albums = relationship("Album", back_populates="artist")

    def __repr__(self):
        return f"<Artist {self.name} {self.genre}>"
