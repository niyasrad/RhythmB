import uuid

from core.utils.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from core.models.associations import songs_playlists_association


class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    title = Column(String, index=True)
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )

    songs = relationship(
        "Song", secondary=songs_playlists_association, back_populates="playlist"
    )
    user = relationship("User", back_populates="playlists")

    def __repr__(self):
        return f"<Playlist {self.title} {self.songs}>"
