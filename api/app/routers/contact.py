import hashlib
import uuid
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlmodel import Session
from app.db.database import get_session
from app.schemas.portfolio import ContactFormRequest, ContactFormResponse
from app.models.entities import ContactSubmission
from app.core.rate_limit import contact_rate_limiter
from app.core.logging import logger

router = APIRouter(prefix="/api/contact", tags=["Contact Console"])

@router.post("", response_model=ContactFormResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(
    payload: ContactFormRequest,
    request: Request,
    session: Session = Depends(get_session),
):
    """Secure channel to transmit project inquiries and advisory requests."""
    # 1. Honeypot bot protection
    if payload.honeypot:
        logger.warning("Spam bot trapped by contact honeypot field.")
        # Return fake success to confuse bots
        return ContactFormResponse(
            success=True,
            transmission_id=f"TX-{uuid.uuid4().hex[:8].upper()}",
            message="Transmission verified and queued.",
        )

    # 2. Rate limiting check
    client_ip = request.client.host if request.client else "127.0.0.1"
    allowed, _, _ = contact_rate_limiter.is_allowed(client_ip)
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Contact transmission frequency limit reached. Please wait before retrying.",
        )

    # 3. Hash IP address for privacy compliance
    ip_hash = hashlib.sha256(client_ip.encode()).hexdigest()[:16]

    # 4. Generate verifiable transmission ID
    transmission_id = f"TX-{uuid.uuid4().hex[:8].upper()}"

    # 5. Persist record in database
    submission = ContactSubmission(
        transmission_id=transmission_id,
        name=payload.name,
        email=payload.email,
        company=payload.company,
        message=payload.message,
        budget=payload.budget,
        ip_hash=ip_hash,
    )
    session.add(submission)
    session.commit()

    logger.info(f"Received verified contact inquiry: {transmission_id} from {payload.email}")

    return ContactFormResponse(
        success=True,
        transmission_id=transmission_id,
        message="Transmission securely compressed and received by architect console.",
    )

