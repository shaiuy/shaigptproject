from sqlalchemy import Column, Integer, String, Text, DateTime, func
from pydantic import BaseModel as BaseSchema, Field
from src.utils.dal import BaseModel
from uuid import UUID

class ChatRequestSchema(BaseSchema):
    conversation_id: UUID
    message: str = Field(min_length=1, max_length=5000)


class ChatResponseSchema(BaseSchema):
    reply: str


class MessageModel(BaseModel):

    __tablename__ = "messages"
    id = Column(Integer,primary_key=True,autoincrement=True)
    conversation_id = Column(String(100),nullable=False)
    role = Column(String(20),nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime,server_default=func.now())


class ConversationModel(BaseModel):
    __tablename__ = "conversations"
    id = Column(String(100),primary_key=True)
    created_at = Column(DateTime,server_default=func.now())