import uuid

from core.utils.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID


class Album(Base):
    __tablename__ = "albums"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    title = Column(String, index=True)
    artist_id = Column(UUID(as_uuid=True), ForeignKey("artists.id"), index=True)

    artist = relationship("Artist", back_populates="albums")
    songs = relationship("Song", back_populates="album")

    def __repr__(self):
        return f"<Album {self.title} {self.artist}>"
