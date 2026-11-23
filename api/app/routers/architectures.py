from typing import List
from fastapi import APIRouter, HTTPException, status
from app.schemas.portfolio import ArchitectureSchema
from app.services.content_service import content_service

router = APIRouter(prefix="/api/architectures", tags=["Architectures"])

@router.get("", response_model=List[ArchitectureSchema])
async def list_architectures():
    """Retrieve all reference system architectures with request topologies."""
    data = content_service.load_portfolio_data()
    return data.architectures

@router.get("/{slug}", response_model=ArchitectureSchema)
async def get_architecture(slug: str):
    """Retrieve an individual architecture spec by id."""
    data = content_service.load_portfolio_data()
    for arch in data.architectures:
        if arch.id == slug:
            return arch
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Architecture '{slug}' not found",
    )

