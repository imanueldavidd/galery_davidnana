import { useEffect, useRef } from "react";
import { apiPost } from "../utils/api";

/**
 * Log satu kunjungan ke backend saat dipanggil.
 * useRef memastikan hanya terkirim sekali meskipun komponen re-render.
 */
export default function useLogVisit(trigger) {
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!trigger || hasLogged.current) return;
    hasLogged.current = true;

    apiPost("/api/visits", {
      user_agent: navigator.userAgent,
      note: "opened gift website",
    }).catch(() => {
      // Diamkan error — visit logging tidak boleh mengganggu pengalaman user
    });
  }, [trigger]);
}