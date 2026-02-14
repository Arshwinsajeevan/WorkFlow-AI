import os
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("/")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")

        return {
            "backend": "ok",
            "database": "ok",
            "llm_mode": os.getenv("AI_MODE", "mock")
        }

    except Exception as e:
        return {
            "backend": "ok",
            "database": "error",
            "error": str(e)
        }
