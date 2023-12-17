import enum
import uuid
from sqlalchemy import Enum, Column, ARRAY, String
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from core.utils.database import Base


class UserRole(enum.Enum):
    ADMIN = "admin"
    ARTIST = "artist"
    COMMON = "common"


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.COMMON)
    interests = Column(ARRAY(String), default=['Pop', 'R&B', 'EDM', 'Rock'])

    playlists = relationship("Playlist", back_populates="user", cascade="all, delete")
    ratings = relationship("Rating", back_populates="user", cascade="all, delete")

    def __repr__(self):
        return f"<User {self.username} {self.email}>"
