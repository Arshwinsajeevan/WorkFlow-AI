from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from ..database import get_db
from ..ai_service import test_llm_connection

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("/")
def health_check(db: Session = Depends(get_db)):

    # DB Check
    try:
        db.execute(text("SELECT 1"))
        db_status = "ok"
    except Exception as e:
        db_status = f"error: {str(e)}"

    # LLM Check
    llm_status = test_llm_connection()

    return {
        "backend": "ok",
        "database": db_status,
        "llm": llm_status
    }
