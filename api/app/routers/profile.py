from fastapi import APIRouter
from app.schemas.portfolio import ProfileSchema
from app.services.content_service import content_service

router = APIRouter(prefix="/api/profile", tags=["Profile"])

@router.get("", response_model=ProfileSchema)
async def get_profile():
    """Retrieve architect profile, bio, philosophy, and delivery lifecycle."""
    data = content_service.load_portfolio_data()
    return data.profile

