from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.services.rag_engine import rag_engine

router = APIRouter(prefix="/api/twin", tags=["Architect Twin"])

class TwinChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_with_twin(payload: TwinChatRequest):
    """Server-Sent Events (SSE) stream answering with RAG-grounded citations."""
    generator = rag_engine.generate_streaming_response(payload.message)
    return StreamingResponse(
        generator,
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )

