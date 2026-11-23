import json
import logging
import sys
import time
from typing import Callable
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        log_obj = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(record.created)),
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
        }
        if hasattr(record, "request_id"):
            log_obj["request_id"] = getattr(record, "request_id")
        if record.exc_info:
            log_obj["exception"] = self.formatException(record.exc_info)
        return json.dumps(log_obj)

def setup_logging():
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JsonFormatter())
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    root_logger.handlers = [handler]

logger = logging.getLogger("quicksilver")

class StructuredLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        start_time = time.time()
        client_ip = request.client.host if request.client else "unknown"
        path = request.url.path

        try:
            response = await call_next(request)
            duration_ms = round((time.time() - start_time) * 1000, 2)
            logger.info(
                f"{request.method} {path} status={response.status_code} duration_ms={duration_ms} ip={client_ip}"
            )
            response.headers["X-Response-Time"] = f"{duration_ms}ms"
            return response
        except Exception as exc:
            duration_ms = round((time.time() - start_time) * 1000, 2)
            logger.error(
                f"{request.method} {path} error={str(exc)} duration_ms={duration_ms} ip={client_ip}",
                exc_info=True,
            )
            raise exc

