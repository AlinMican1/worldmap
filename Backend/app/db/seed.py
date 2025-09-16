# from app.db.database import Base, engine, Session
# from app.db.models.userModel import User

# def seed():
#     with Session() as session:
#         user = User(
#             name="Admin User",
#             email="admin@example.com",
#             password="test1234"
#         )
#         session.add(user)
#         try:
#             session.commit()
#             print("✅ User seeded successfully")
#         except:
#             session.rollback()
#             print("⚠️ User already exists")

# if __name__ == "__main__":
#     seed()
from app.db.database import SessionLocal
from app.db.models.userModel import User

db = SessionLocal()

user = db.query(User).filter_by(id="32beab94-f0db-4b63-9fb0-805545f17165").first()
print(user)

db.close()