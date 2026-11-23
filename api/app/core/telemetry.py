import logging
from app.config import settings

logger = logging.getLogger("quicksilver.telemetry")

def setup_opentelemetry(app):
    """Initializes OpenTelemetry tracing if enabled in settings."""
    if not settings.OTEL_ENABLED:
        logger.info("OpenTelemetry is disabled in current configuration.")
        return

    try:
        from opentelemetry import trace
        from opentelemetry.sdk.trace import TracerProvider
        from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter
        from opentelemetry.sdk.resources import Resource

        resource = Resource.create({"service.name": settings.OTEL_SERVICE_NAME})
        provider = TracerProvider(resource=resource)
        processor = BatchSpanProcessor(ConsoleSpanExporter())
        provider.add_span_processor(processor)
        trace.set_tracer_provider(provider)
        logger.info("OpenTelemetry successfully initialized.")
    except Exception as e:
        logger.warning(f"Could not initialize OpenTelemetry: {e}")

