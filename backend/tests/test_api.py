from fastapi.testclient import TestClient
from backend.main import app


def test_root():
    with TestClient(app) as client:
        resp = client.get("/")
        assert resp.status_code == 200
        assert resp.json() == {"message": "Hello World"}


def test_create_task_and_get_tasks():
    payload = {
        "title": "Test from pytest",
        "description": "pytest description",
        "status": "pending",
        "due_at": "2025-12-31",
    }

    with TestClient(app) as client:

        create_resp = client.post("/api/create_task", json=payload)
        assert create_resp.status_code == 200

        get_resp = client.get("/api/get_tasks")
        assert get_resp.status_code == 200
        tasks = get_resp.json()

        assert any(t["title"] == "Test from pytest" for t in tasks)


def test_create_task_without_status():
    payload = {
        "title": "Test from pytest",
        "description": "pytest description",
        "due_at": "2025-12-31",
    }

    with TestClient(app) as client:
        create_resp = client.post("/api/create_task", json=payload)
        assert create_resp.status_code == 422


def description():
    payload = {
        "title": "Test from pytest",
        "status": "pending",
        "due_at": "2025-12-31",
    }

    with TestClient(app) as client:
        create_resp = client.post("/api/create_task", json=payload)
        assert create_resp.status_code == 200
