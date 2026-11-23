from fastapi import APIRouter
from app.schemas.portfolio import MetricsSchema
from app.services.content_service import content_service

router = APIRouter(prefix="/api/metrics", tags=["Metrics"])

@router.get("", response_model=MetricsSchema)
async def get_metrics():
    """Retrieve live enterprise metrics and impact benchmarks."""
    data = content_service.load_portfolio_data()
    return data.metrics

