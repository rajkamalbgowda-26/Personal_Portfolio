from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class ContactSubmission(SQLModel, table=True):
    __tablename__ = "contact_submissions"

    id: Optional[int] = Field(default=None, primary_key=True)
    transmission_id: str = Field(index=True, unique=True)
    name: str
    email: str
    company: Optional[str] = None
    message: str
    budget: Optional[str] = None
    ip_hash: str
    created_at: datetime = Field(default_factory=utc_now)
    status: str = Field(default="received")

class TelemetryEventRecord(SQLModel, table=True):
    __tablename__ = "telemetry_events"

    id: Optional[int] = Field(default=None, primary_key=True)
    event_id: str = Field(index=True, unique=True)
    event_type: str = Field(index=True)
    section: Optional[str] = None
    metadata_json: Optional[str] = None
    created_at: datetime = Field(default_factory=utc_now)

class ProjectRecord(SQLModel, table=True):
    __tablename__ = "projects"

    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(index=True, unique=True)
    title: str
    domain: str
    role: str
    summary: str
    architecture_id: str
    cover_image: str
    data_json: str  # Complete JSON representation
    created_at: datetime = Field(default_factory=utc_now)

class ArchitectureRecord(SQLModel, table=True):
    __tablename__ = "architectures"

    id: Optional[int] = Field(default=None, primary_key=True)
    spec_id: str = Field(index=True, unique=True)
    title: str
    category: str
    description: str
    data_json: str  # Complete JSON representation
    created_at: datetime = Field(default_factory=utc_now)

class CapabilityRecord(SQLModel, table=True):
    __tablename__ = "capabilities"

    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(index=True, unique=True)
    name: str
    category: str
    proficiency: int
    years: int
    data_json: str
    created_at: datetime = Field(default_factory=utc_now)
