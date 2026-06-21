from fastapi import APIRouter
from src.models.chat_model import ChatRequestSchema, ChatResponseSchema
from src.services.openai_service import OpenAIService

router = APIRouter()

# Receive message and return AI reply
@router.post("/send", response_model=ChatResponseSchema)
async def send_message(chat_schema: ChatRequestSchema):

    with OpenAIService() as openai_service:
        reply = await openai_service.send_message(chat_schema)
        return ChatResponseSchema(reply=reply)
