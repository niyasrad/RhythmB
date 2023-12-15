import uuid

from core.utils.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID


class Artist(Base):
    __tablename__ = "artists"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, index=True)
    genre = Column(String, index=True)

    songs = relationship("Song", back_populates="artist")
    albums = relationship("Album", back_populates="artist", cascade="all, delete")

    def __repr__(self):
        return f"<Artist {self.name} {self.genre}>"
