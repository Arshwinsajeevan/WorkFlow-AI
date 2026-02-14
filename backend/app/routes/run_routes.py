import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..workflow_engine import execute_workflow

router = APIRouter(prefix="/runs", tags=["Runs"])


@router.post("/")
def create_run(run: schemas.RunCreate, db: Session = Depends(get_db)):

    workflow = db.query(models.Workflow).filter(
        models.Workflow.id == run.workflow_id
    ).first()

    if not workflow:
        return {"error": "Workflow not found"}

    result = execute_workflow(workflow.steps_json, run.input_text)

    db_run = models.Run(
        workflow_id=run.workflow_id,
        input_text=run.input_text,
        outputs_json=json.dumps(result)
    )

    db.add(db_run)
    db.commit()
    db.refresh(db_run)

    return db_run


@router.get("/latest")
def get_latest_runs(db: Session = Depends(get_db)):
    return db.query(models.Run).order_by(
        models.Run.created_at.desc()
    ).limit(5).all()
