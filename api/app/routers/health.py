import time
from fastapi import APIRouter
from app.config import settings
from app.schemas.portfolio import HealthResponse

router = APIRouter(tags=["Health"])

START_TIME = time.time()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """System health check and container uptime."""
    uptime = round(time.time() - START_TIME, 2)
    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        uptime_seconds=uptime,
    )

