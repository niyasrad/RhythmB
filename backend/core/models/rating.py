from core.utils.database import Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    song_id = Column(Integer, ForeignKey("songs.id"), index=True)
    rating = Column(Integer, index=True)

    user = relationship("User", back_populates="ratings")
    song = relationship("Song", back_populates="ratings")

    def __repr__(self):
        return f"<Rating {self.from_user} {self.to_user} {self.rating}>"
