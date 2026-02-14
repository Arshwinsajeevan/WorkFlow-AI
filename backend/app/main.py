from fastapi import FastAPI
from .database import Base, engine
from .routes import workflow_routes, run_routes, health_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Workflow Builder Lite API")

app.include_router(workflow_routes.router)
app.include_router(run_routes.router)
app.include_router(health_routes.router)


@app.get("/")
def root():
    return {"message": "Workflow Builder Lite Backend Running"}
