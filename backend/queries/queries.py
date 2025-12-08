from datetime import date
from fastapi import HTTPException
from ..db.database import database


async def create_task_query(title: str, description: str, status: str, due_at: date):
    query = """
        INSERT INTO tasks (title, description, status, due_at)
        VALUES (:title, :description, :status, :due_at)
        RETURNING id;
    """

    values = {
        "title": title,
        "description": description,
        "status": status,
        "due_at": due_at,
    }

    task_id_row = await database.fetch_one(query=query, values=values)

    if task_id_row is None:
        raise HTTPException(status_code=500, detail="Failed to create task")

    return task_id_row["id"]


async def get_tasks_query():
    query = """
  SELECT * from tasks 
    """
    result = await database.fetch_all(query=query)
    return result
