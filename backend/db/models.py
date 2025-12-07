from sqlalchemy import Table, Column, Integer, String, Text, DateTime
from .database import metadata

tasks = Table(
    "tasks",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String(255), nullable=False),
    Column("description", Text, nullable=True),
    Column("status", String(50), nullable=False),
    Column("due_at", DateTime, nullable=False),
)
