from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas.portfolio import ProjectSchema
from app.services.content_service import content_service

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectSchema])
async def list_projects():
    """Retrieve all production AI case studies and client projects."""
    data = content_service.load_portfolio_data()
    return data.projects

@router.get("/{slug}", response_model=ProjectSchema)
async def get_project(slug: str):
    """Retrieve a single project by its unique slug."""
    data = content_service.load_portfolio_data()
    for proj in data.projects:
        if proj.slug == slug:
            return proj
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Project with slug '{slug}' not found",
    )

