import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { letterPages } from "../../data/letterContent";

/**
 * Surat multi-halaman dengan navigasi klik next/prev.
 * onFinish dipanggil saat halaman terakhir di-"next", untuk pindah ke section Gallery.
 */
export default function Letter({ onFinish }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const page = letterPages[pageIndex];
  const isFirst = pageIndex === 0;
  const isLast = pageIndex === letterPages.length - 1;

  const goNext = () => {
    if (isLast) {
      onFinish?.();
      return;
    }
    setDirection(1);
    setPageIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (isFirst) return;
    setDirection(-1);
    setPageIndex((i) => i - 1);
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* Progress dots */}
      <div className="absolute top-8 flex gap-2">
        {letterPages.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === pageIndex ? "w-6 bg-gold" : "w-1.5 bg-milk-brown-light"
            }`}
          />
        ))}
      </div>

      <div className="relative w-full max-w-xl min-h-[360px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={pageIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="w-full text-center"
          >
            {page.eyebrow && (
              <p className="font-serif-elegant italic text-dusty-rose-deep text-base md:text-lg mb-2">
                {page.eyebrow}
              </p>
            )}
            {page.heading && (
              <h2 className="font-serif-elegant text-3xl md:text-4xl text-milk-brown-dark mb-6">
                {page.heading}
              </h2>
            )}
            <div className="space-y-4">
              {page.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body-warm text-base md:text-lg leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="mt-10 flex items-center gap-6">
        <button
          onClick={goPrev}
          disabled={isFirst}
          className="px-5 py-2 rounded-full border border-milk-brown-light text-milk-brown-dark font-sans-clean text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ivory transition-colors"
        >
          ← Kembali
        </button>
        <button
          onClick={goNext}
          className="px-6 py-2 rounded-full bg-gold text-cream font-sans-clean text-sm hover:bg-gold-light transition-colors shadow-md"
        >
          {isLast ? "Lihat Galeri Foto →" : "Lanjut →"}
        </button>
      </div>
    </div>
  );
}