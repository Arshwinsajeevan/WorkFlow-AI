import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/workflows", tags=["Workflows"])


@router.post("/")
def create_workflow(workflow: schemas.WorkflowCreate, db: Session = Depends(get_db)):
    db_workflow = models.Workflow(
        name=workflow.name,
        steps_json=json.dumps(workflow.steps)
    )
    db.add(db_workflow)
    db.commit()
    db.refresh(db_workflow)
    return db_workflow


@router.get("/")
def get_workflows(db: Session = Depends(get_db)):
    return db.query(models.Workflow).all()
