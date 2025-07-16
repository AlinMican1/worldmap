from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Environment
    ENV: str = "development"
    DEBUG: bool = False

    # Public (frontend) settings
    NEXT_PUBLIC_TIME_API: str
    NEXT_PUBLIC_DEV_URL: str

    # Database connection pieces
    # DB_USER: str
    # DB_PASS: str
    # DB_HOST: str
    # DB_NAME: str
    # DB_PORT: str
    DB_URL: str

    # Assembled full database URL
    @property
    def DATABASE_URL(self) -> str:
        return (
            # f"postgresql://{self.DB_USER}:{self.DB_PASS}"
            # f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
            self.DB_URL
        )

    # CORS origins
    @property
    def get_origins(self) -> List[str]:
        if self.ENV == "production":
            return [self.NEXT_PUBLIC_DEV_URL]
        return [
            "http://localhost:3000",
            "http://127.0.0.1:8080",
            "http://127.0.0.1:8000",
        ]

    class Config:
        env_file = ".env"


# Singleton to import elsewhere
settings = Settings()
