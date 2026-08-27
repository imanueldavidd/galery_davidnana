from sqlalchemy import BigInteger, Boolean, Column, Date, String, DateTime, Integer
from sqlalchemy.sql import func
from app.core.database import Base


class Photo(Base):
    __tablename__ = "photos"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    image_url = Column(String(500), nullable=False)
    caption = Column(String(300), nullable=False, default="")
    alt_text = Column(String(200), default="")
    sort_order = Column(Integer, nullable=False, default=0)
    taken_at = Column(Date, nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class PlaylistSong(Base):
    __tablename__ = "playlist"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    artist = Column(String(200), nullable=False, default="")
    audio_url = Column(String(500), nullable=False)
    cover_url = Column(String(500), default="")
    sort_order = Column(Integer, nullable=False, default=0)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class Visit(Base):
    __tablename__ = "visits"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    visited_at = Column(DateTime, server_default=func.now())
    user_agent = Column(String(300), default="")
    note = Column(String(200), default="")