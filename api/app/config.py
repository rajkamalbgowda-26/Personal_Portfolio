from typing import List
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    PROJECT_NAME: str = "Quicksilver AI Portfolio API"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str = "sqlite:///./portfolio.db"

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3005",
        "https://rajkamalgowda.dev",
        "https://quicksilver.azurewebsites.net"
    ]

    # Content source path
    PORTFOLIO_YAML_PATH: str = "../content/portfolio.yaml"

    # Security & Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    CONTACT_RATE_LIMIT_PER_HOUR: int = 5

    # Telemetry
    OTEL_ENABLED: bool = False
    OTEL_SERVICE_NAME: str = "quicksilver-api"

settings = Settings()

