"""Standalone CLI command to seed the database directly from content/portfolio.yaml."""
import sys
from sqlmodel import Session
from app.db.database import init_db, engine
from app.services.content_service import content_service
from app.core.logging import logger

def run_seed():
    print("Initializing database tables...")
    init_db()
    with Session(engine) as session:
        print("Reading content/portfolio.yaml and seeding records...")
        content_service.seed_database(session)
    print("Seeding complete!")

if __name__ == "__main__":
    run_seed()

