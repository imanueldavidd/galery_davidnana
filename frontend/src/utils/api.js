/**
 * Base URL API — dikontrol lewat environment variable.
 * - Development: kosong ("") karena Vite proxy /api ke localhost:8000 (lihat vite.config.js)
 * - Production: bisa diisi domain backend kalau frontend & backend beda domain,
 *   atau tetap kosong kalau satu domain (Vercel serverless, /api otomatis ke backend)
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}