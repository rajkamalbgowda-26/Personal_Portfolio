import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, create_engine, SQLModel
from sqlmodel.pool import StaticPool

from app.main import app
from app.db.database import get_session
from app.services.content_service import content_service

@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        content_service.seed_database(session)
        yield session

@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()

