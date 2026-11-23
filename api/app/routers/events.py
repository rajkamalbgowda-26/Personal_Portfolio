import json
import uuid
from fastapi import APIRouter, Depends, status
from sqlmodel import Session
from app.db.database import get_session
from app.schemas.portfolio import EventTelemetryRequest, EventTelemetryResponse
from app.models.entities import TelemetryEventRecord
from app.core.logging import logger

router = APIRouter(prefix="/api/events", tags=["Telemetry & Events"])

@router.post("", response_model=EventTelemetryResponse, status_code=status.HTTP_201_CREATED)
async def record_telemetry_event(
    payload: EventTelemetryRequest,
    session: Session = Depends(get_session),
):
    """Privacy-preserving client telemetry recorder."""
    event_id = f"EVT-{uuid.uuid4().hex[:12]}"
    metadata_str = json.dumps(payload.metadata) if payload.metadata else None

    record = TelemetryEventRecord(
        event_id=event_id,
        event_type=payload.event_type,
        section=payload.section,
        metadata_json=metadata_str,
    )
    session.add(record)
    session.commit()

    logger.debug(f"Recorded telemetry event {event_id}: {payload.event_type} on {payload.section}")

    return EventTelemetryResponse(recorded=True, event_id=event_id)

