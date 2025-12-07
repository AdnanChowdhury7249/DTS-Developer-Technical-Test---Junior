import os
from databases import Database
from sqlalchemy import MetaData, create_engine
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
print("DB URL:", DATABASE_URL)

if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is not set in .env")

database = Database(DATABASE_URL)
metadata = MetaData()

engine = create_engine(DATABASE_URL)
