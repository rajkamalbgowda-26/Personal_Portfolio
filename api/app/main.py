from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session

from app.config import settings
from app.core.logging import setup_logging, StructuredLoggingMiddleware, logger
from app.core.rate_limit import RateLimitMiddleware
from app.core.telemetry import setup_opentelemetry
from app.db.database import init_db, engine
from app.services.content_service import content_service

from app.routers import (
    health,
    profile,
    projects,
    architectures,
    skills,
    timeline,
    metrics,
    leadership,
    contact,
    events,
    twin,
)

# Setup structured logging
setup_logging()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB and seed from YAML
    logger.info("Initializing Quicksilver API database and seeding content...")
    init_db()
    with Session(engine) as session:
        content_service.seed_database(session)
    logger.info("Quicksilver API is ready.")
    yield
    # Shutdown
    logger.info("Quicksilver API shutting down.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="High-performance async intelligence API serving architecture specs, case studies, and telemetry.",
    lifespan=lifespan,
)

# 1. CORS Middleware (locked to configured origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-RateLimit-Limit", "X-RateLimit-Remaining", "X-RateLimit-Reset", "X-Response-Time"],
)

# 2. Rate Limiting Middleware
app.add_middleware(RateLimitMiddleware)

# 3. Structured Logging Middleware
app.add_middleware(StructuredLoggingMiddleware)

# 4. OpenTelemetry Tracing
setup_opentelemetry(app)

# 5. Include Routers
app.include_router(health.router)
app.include_router(profile.router)
app.include_router(projects.router)
app.include_router(architectures.router)
app.include_router(skills.router)
app.include_router(timeline.router)
app.include_router(metrics.router)
app.include_router(leadership.router)
app.include_router(contact.router)
app.include_router(events.router)
app.include_router(twin.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

