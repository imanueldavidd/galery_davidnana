from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import Visit
from app.schemas.schemas import VisitCreate, VisitOut

router = APIRouter(prefix="/api/visits", tags=["visits"])


@router.post("", response_model=VisitOut)
def log_visit(payload: VisitCreate, db: Session = Depends(get_db)):
    visit = Visit(user_agent=payload.user_agent, note=payload.note)
    db.add(visit)
    db.commit()
    db.refresh(visit)
    return visit