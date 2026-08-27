from dotenv import load_dotenv
load_dotenv()

from app.core.database import engine
from sqlalchemy import text

with engine.connect() as conn:
    result = conn.execute(text("SELECT COUNT(*) FROM photos"))
    count = result.scalar()
    print(f"✅ Koneksi ke TiDB berhasil! Jumlah data di tabel photos: {count}")