from typing import List
from fastapi import APIRouter
from app.schemas.portfolio import TimelineItemSchema
from app.services.content_service import content_service

router = APIRouter(prefix="/api/timeline", tags=["Timeline"])

@router.get("", response_model=List[TimelineItemSchema])
async def get_timeline():
    """Retrieve career milestones and architectural launches."""
    data = content_service.load_portfolio_data()
    return data.timeline

