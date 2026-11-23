from typing import List
from fastapi import APIRouter
from app.schemas.portfolio import CapabilitySchema
from app.services.content_service import content_service

router = APIRouter(prefix="/api/skills", tags=["Skills & Capabilities"])

@router.get("", response_model=List[CapabilitySchema])
async def list_skills():
    """Retrieve full constellation of capabilities and technology competencies."""
    data = content_service.load_portfolio_data()
    return data.capabilities

