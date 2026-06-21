from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.controllers.chat_controller import router as chat_router
from src.middleware.logging import log_requests

# Create FastAPI app
app = FastAPI(title="ChatGPT Clone API")

# Allow frontend requests from localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Log every HTTP request
app.middleware("http")(log_requests)

# Register chat routes
app.include_router(
    chat_router,
    prefix="/api/chat"
)

# Health check endpoint
@app.get("/")
def root():
    return {
        "message": "Server is running"
    }
