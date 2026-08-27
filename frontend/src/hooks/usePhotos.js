import { useEffect, useState } from "react";
import { apiGet } from "../utils/api";

const FALLBACK_PHOTOS = [
  {
    id: 0,
    image_url: "https://via.placeholder.com/500x650.png?text=Foto+Kamu",
    caption: "Ganti dengan foto & caption kamu sendiri",
    alt_text: "Placeholder foto",
    sort_order: 1,
  },
];

export default function usePhotos() {
  const [photos, setPhotos] = useState(FALLBACK_PHOTOS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPhotos() {
      try {
        const data = await apiGet("/api/photos");
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setPhotos(data);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchPhotos();
    return () => {
      cancelled = true;
    };
  }, []);

  return { photos, isLoading, error };
}