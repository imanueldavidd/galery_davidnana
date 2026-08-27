from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import asc
from typing import List

from app.core.database import get_db
from app.models.models import Photo
from app.schemas.schemas import PhotoOut

router = APIRouter(prefix="/api/photos", tags=["photos"])


@router.get("", response_model=List[PhotoOut])
def get_photos(db: Session = Depends(get_db)):
    photos = (
        db.query(Photo)
        .filter(Photo.is_active == True)
        .order_by(asc(Photo.sort_order))
        .all()
    )
    return photos