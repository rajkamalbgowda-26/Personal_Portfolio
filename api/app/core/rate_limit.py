import time
from collections import defaultdict
from typing import Dict, List, Tuple
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from app.config import settings

class RateLimiter:
    """Sliding-window in-memory rate limiter per client IP."""
    def __init__(self, requests_per_minute: int = 60):
        self.limit = requests_per_minute
        self.window = 60.0  # seconds
        self.history: Dict[str, List[float]] = defaultdict(list)

    def is_allowed(self, client_ip: str) -> Tuple[bool, int, int]:
        now = time.time()
        window_start = now - self.window
        # Evict old timestamps
        timestamps = [t for t in self.history[client_ip] if t > window_start]
        self.history[client_ip] = timestamps

        remaining = max(0, self.limit - len(timestamps))
        reset_time = int(self.window - (now - timestamps[0])) if timestamps else int(self.window)

        if len(timestamps) >= self.limit:
            return False, 0, reset_time

        self.history[client_ip].append(now)
        return True, remaining - 1, reset_time

global_rate_limiter = RateLimiter(requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)
contact_rate_limiter = RateLimiter(requests_per_minute=settings.CONTACT_RATE_LIMIT_PER_HOUR)

class RateLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Exempt preflight OPTIONS, health check, and docs
        if request.method == "OPTIONS" or request.url.path in ["/health", "/docs", "/openapi.json"]:
            return await call_next(request)

        client_ip = request.client.host if request.client else "127.0.0.1"
        allowed, remaining, reset_time = global_rate_limiter.is_allowed(client_ip)

        if not allowed:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Please throttle requests.",
                headers={
                    "X-RateLimit-Limit": str(global_rate_limiter.limit),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": str(reset_time),
                    "Retry-After": str(reset_time),
                },
            )

        response = await call_next(request)
        response.headers["X-RateLimit-Limit"] = str(global_rate_limiter.limit)
        response.headers["X-RateLimit-Remaining"] = str(remaining)
        response.headers["X-RateLimit-Reset"] = str(reset_time)
        return response

