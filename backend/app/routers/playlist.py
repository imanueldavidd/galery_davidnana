from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import asc
from typing import List

from app.core.database import get_db
from app.models.models import PlaylistSong
from app.schemas.schemas import PlaylistOut

router = APIRouter(prefix="/api/playlist", tags=["playlist"])


@router.get("", response_model=List[PlaylistOut])
def get_playlist(db: Session = Depends(get_db)):
    songs = (
        db.query(PlaylistSong)
        .filter(PlaylistSong.is_active == True)
        .order_by(asc(PlaylistSong.sort_order))
        .all()
    )
    return songs