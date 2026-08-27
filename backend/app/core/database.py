import os
import ssl
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

TIDB_HOST = os.getenv("TIDB_HOST", "localhost")
TIDB_PORT = os.getenv("TIDB_PORT", "4000")
TIDB_USER = os.getenv("TIDB_USER", "root")
TIDB_PASSWORD = os.getenv("TIDB_PASSWORD", "")
TIDB_DATABASE = os.getenv("TIDB_DATABASE", "digital_gift")

ssl_context = ssl.create_default_context()

DATABASE_URL = (
    f"mysql+pymysql://{TIDB_USER}:{TIDB_PASSWORD}"
    f"@{TIDB_HOST}:{TIDB_PORT}/{TIDB_DATABASE}"
)

engine = create_engine(
    DATABASE_URL,
    connect_args={"ssl": ssl_context},
    pool_pre_ping=True,
    pool_recycle=280,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()