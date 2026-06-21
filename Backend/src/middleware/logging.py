from fastapi import Request


# Print request method and URL
async def log_requests(request: Request, call_next):
    print(f"{request.method} {request.url}")
    response = await call_next(request)
    return response
