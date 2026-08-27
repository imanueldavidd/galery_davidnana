from pydantic import BaseModel, field_validator
from datetime import date, datetime
from typing import Optional


class PhotoOut(BaseModel):
    id: str
    image_url: str
    caption: str
    alt_text: Optional[str] = ""
    sort_order: int
    taken_at: Optional[date] = None

    @field_validator("id", mode="before")
    @classmethod
    def stringify_id(cls, v):
        return str(v)

    class Config:
        from_attributes = True


class PlaylistOut(BaseModel):
    id: str
    title: str
    artist: str
    audio_url: str
    cover_url: Optional[str] = ""
    sort_order: int

    @field_validator("id", mode="before")
    @classmethod
    def stringify_id(cls, v):
        return str(v)

    class Config:
        from_attributes = True


class VisitCreate(BaseModel):
    user_agent: Optional[str] = ""
    note: Optional[str] = ""


class VisitOut(BaseModel):
    id: int
    visited_at: datetime

    class Config:
        from_attributes = True