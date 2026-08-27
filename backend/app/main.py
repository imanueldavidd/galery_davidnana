from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routers import photos, playlist, visits

app = FastAPI(title="Digital Gift API")

# Bisa isi beberapa domain dipisah koma, contoh:
# "http://localhost:5173,https://untuk-kamu.vercel.app"
origins_raw = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
origins = [o.strip() for o in origins_raw.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(photos.router)
app.include_router(playlist.router)
app.include_router(visits.router)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}