import json
import logging
from pathlib import Path
from typing import Optional
import yaml
from sqlmodel import Session, select
from app.config import settings
from app.schemas.portfolio import PortfolioDataSchema
from app.models.entities import ProjectRecord, ArchitectureRecord, CapabilityRecord

logger = logging.getLogger("quicksilver.content")

class ContentService:
    def __init__(self):
        self._cached_data: Optional[PortfolioDataSchema] = None

    def _resolve_yaml_path(self) -> Path:
        primary = Path(settings.PORTFOLIO_YAML_PATH)
        if primary.exists():
            return primary
        # Secondary fallback locations
        alt1 = Path(__file__).resolve().parent.parent.parent.parent / "content" / "portfolio.yaml"
        if alt1.exists():
            return alt1
        alt2 = Path("content/portfolio.yaml")
        if alt2.exists():
            return alt2
        raise FileNotFoundError(f"portfolio.yaml not found at {primary} or fallback locations")

    def load_portfolio_data(self, force_reload: bool = False) -> PortfolioDataSchema:
        if self._cached_data and not force_reload:
            return self._cached_data

        yaml_path = self._resolve_yaml_path()
        with open(yaml_path, "r", encoding="utf-8") as f:
            raw_dict = yaml.safe_load(f)

        validated = PortfolioDataSchema(**raw_dict)
        self._cached_data = validated
        logger.info(f"Loaded portfolio data from {yaml_path}: {len(validated.projects)} projects, {len(validated.architectures)} architectures")
        return validated

    def seed_database(self, session: Session) -> None:
        data = self.load_portfolio_data()

        # Clean existing records to guarantee exact sync with portfolio.yaml
        session.exec(select(ProjectRecord)).all()
        for p in session.exec(select(ProjectRecord)).all():
            session.delete(p)
        for a in session.exec(select(ArchitectureRecord)).all():
            session.delete(a)
        for c in session.exec(select(CapabilityRecord)).all():
            session.delete(c)
        session.commit()

        # Seed Projects
        for proj in data.projects:
            record = ProjectRecord(
                slug=proj.slug,
                title=proj.title,
                domain=proj.domain,
                role=proj.role,
                summary=proj.summary,
                architecture_id=proj.architecture_id,
                cover_image=proj.cover_image,
                data_json=json.dumps(proj.model_dump()),
            )
            session.add(record)

        # Seed Architectures
        for arch in data.architectures:
            record = ArchitectureRecord(
                spec_id=arch.id,
                title=arch.title,
                category=arch.category,
                description=arch.description,
                data_json=json.dumps(arch.model_dump()),
            )
            session.add(record)

        # Seed Capabilities
        for cap in data.capabilities:
            record = CapabilityRecord(
                slug=cap.id,
                name=cap.name,
                category=cap.category,
                proficiency=cap.proficiency,
                years=cap.years,
                data_json=json.dumps(cap.model_dump()),
            )
            session.add(record)

        session.commit()
        logger.info("Database successfully synchronized with content/portfolio.yaml")

content_service = ContentService()

