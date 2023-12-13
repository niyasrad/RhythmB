import uuid

from core.utils.database import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID


class Rating(Base):
    __tablename__ = "ratings"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), index=True)
    song_id = Column(UUID(as_uuid=True), ForeignKey("songs.id"), index=True)
    rating = Column(Integer, index=True)

    user = relationship("User", back_populates="ratings")
    song = relationship("Song", back_populates="ratings")

    def __repr__(self):
        return f"<Rating {self.from_user} {self.to_user} {self.rating}>"
