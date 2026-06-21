from dotenv import load_dotenv
from os import getenv

# Load environment variables from .env file
load_dotenv()


class AppConfig:

    connection_string: str = str(
        getenv("CONNECTION_STRING")
    )

    openai_api_key: str = str(
        getenv("OPENAI_API_KEY")
    )
