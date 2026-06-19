from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.controllers.chat_controller import router as chat_router
from src.middleware.logging import log_requests

app = FastAPI(title="ChatGPT Clone API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging middleware
app.middleware("http")(log_requests)

# Routes
app.include_router(
    chat_router,
    prefix="/api/chat"
)

@app.get("/")
def root():
    return {
        "message": "Server is running"
    }