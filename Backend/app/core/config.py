from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # Environment
    ENV: str = "development"
    DEBUG: bool = False

    # Public (frontend) settings
    NEXT_PUBLIC_TIME_API: str
    NEXT_PUBLIC_DEV_URL: str
    DB_URL: str

    # Auth / JWT settings
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    #Auth with Supabase
    SUPABASE_URL: str
    SUPABASE_KEY: str

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
            "http://localhost:3000",  # Next.js default
            # "http://127.0.0.1:3000",  # Next.js alternative
            "http://localhost:8000",   # FastAPI (for API-to-API calls)
            
            self.NEXT_PUBLIC_DEV_URL,  # Your configured URL
        ]

    class Config:
        env_file = ".env"


# Singleton to import elsewhere
settings = Settings()
