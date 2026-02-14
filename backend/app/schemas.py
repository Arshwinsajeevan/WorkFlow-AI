from pydantic import BaseModel
from typing import List, Dict


class WorkflowCreate(BaseModel):
    name: str
    steps: List[Dict]


class WorkflowResponse(BaseModel):
    id: int
    name: str
    steps_json: str

    class Config:
        from_attributes = True


class RunCreate(BaseModel):
    workflow_id: int
    input_text: str


class RunResponse(BaseModel):
    id: int
    workflow_id: int
    input_text: str
    outputs_json: str

    class Config:
        from_attributes = True
