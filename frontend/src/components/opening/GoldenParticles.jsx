import { useMemo } from "react";

/**
 * Partikel bokeh keemasan lembut — pengganti "bunga berjatuhan" generik.
 * Pure CSS animation, ringan, tidak pakai library eksternal.
 */
export default function GoldenParticles({ count = 25 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 10,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.5,
      blur: Math.random() > 0.6,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold-light"
          style={{
            left: `${p.left}%`,
            bottom: "-5%",
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: p.blur ? "blur(2px)" : "blur(0.5px)",
            animation: `float-up ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity, 0.6);
          }
          50% {
            transform: translateY(-50vh) translateX(15px);
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) translateX(-10px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}