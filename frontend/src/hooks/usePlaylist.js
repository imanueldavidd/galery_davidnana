import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const FALLBACK_PLAYLIST = [
  {
    id: 0,
    title: "Judul Lagu Placeholder",
    artist: "Nama Artis",
    audio_url: "",
    cover_url: "",
    sort_order: 1,
  },
];

export default function usePlaylist() {
  const [playlist, setPlaylist] = useState(FALLBACK_PLAYLIST);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPlaylist() {
      try {
        const data = await apiGet("/api/playlist");
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setPlaylist(data);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchPlaylist();
    return () => {
      cancelled = true;
    };
  }, []);

  return { playlist, isLoading, error };
}