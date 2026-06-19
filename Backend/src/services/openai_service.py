from openai import OpenAI
from fastapi import HTTPException
from src.models.chat_model import (
    ChatRequestSchema, ConversationModel, MessageModel)
from src.utils.app_config import AppConfig
from src.utils.dal import dal


class OpenAIService:

    def __init__(self):
        self.session = dal.create_session()
        self.client = OpenAI(api_key=AppConfig.openai_api_key)

    async def send_message(
        self,
        chat_schema: ChatRequestSchema
    ):
        try:
            conversation_id = str(chat_schema.conversation_id)
            conversation = self.session.get(ConversationModel, conversation_id)

            if not conversation:
                conversation = ConversationModel(id=conversation_id)
                self.session.add(conversation)
                self.session.commit()

            user_message = MessageModel(
                conversation_id=conversation_id, role="user", content=chat_schema.message)

            self.session.add(user_message)
            self.session.commit()

            db_messages = (
                self.session.query(MessageModel)
                .filter(MessageModel.conversation_id == conversation_id)
                .order_by(MessageModel.id)
                .all()
            )

            messages = []

            for message in db_messages:
                messages.append({
                    "role": message.role,
                    "content": message.content})

            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages
            )

            reply = (
                response.choices[0]
                .message.content or ""
            )

            assistant_message = MessageModel(
                conversation_id=conversation_id,
                role="assistant",
                content=reply)

            self.session.add(assistant_message)
            self.session.commit()

            return reply

        except Exception as err:

            self.session.rollback()

            print(f"OpenAIService Error: {err}")

            raise HTTPException(
                status_code=500,
                detail="Failed to process chat request"
            )

    def close(self):
        self.session.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        self.close()
