from pydantic import BaseModel
from typing import Optional
from datetime import date


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: str
    due_at: date
