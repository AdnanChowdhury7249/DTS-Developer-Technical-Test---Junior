from fastapi import APIRouter, HTTPException, requests
from backend.queries.queries import create_task_query
from backend.schema.task_schemas import TaskCreate


router = APIRouter()


@router.post("/api/create_task", tags=["Tasks"])
async def create_task(task: TaskCreate):
    task_id = await create_task_query(
        title=task.title,
        description=task.description,
        status=task.status,
        due_at=task.due_at,
    )
    return {"Message": "Task created successfully", "task_id": task_id}
