from fastapi import APIRouter
from app.schemas.portfolio import LeadershipSchema
from app.services.content_service import content_service

router = APIRouter(prefix="/api/leadership", tags=["Leadership"])

@router.get("", response_model=LeadershipSchema)
async def get_leadership():
    """Retrieve squad leadership structure, roles, and delivery rituals."""
    data = content_service.load_portfolio_data()
    return data.leadership

