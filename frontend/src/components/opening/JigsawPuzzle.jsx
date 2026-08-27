import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PuzzlePiece from "./PuzzlePiece";

const COLS = 2;
const ROWS = 3;
const TOTAL = COLS * ROWS;

// Ganti dengan foto kalian berdua — taruh file di folder frontend/public/
const PUZZLE_IMAGE = "/puzzle-photo.jpg";

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function JigsawPuzzle({ onSolved }) {
  const slotRefs = useRef([]);
  const [placed, setPlaced] = useState(() => Array(TOTAL).fill(false));
  const [trayOrder] = useState(() =>
    shuffle(Array.from({ length: TOTAL }, (_, i) => i))
  );

  const pieces = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, i) => ({
        index: i,
        col: i % COLS,
        row: Math.floor(i / COLS),
      })),
    []
  );

  const solvedCount = placed.filter(Boolean).length;
  const isComplete = solvedCount === TOTAL;

  const handleCheckDrop = (pieceIndex, point) => {
    if (placed[pieceIndex]) return;

    for (let slotIndex = 0; slotIndex < TOTAL; slotIndex++) {
      if (placed[slotIndex]) continue;
      const el = slotRefs.current[slotIndex];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const inside =
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom;

      if (inside && slotIndex === pieceIndex) {
        setPlaced((prev) => {
          const next = [...prev];
          next[pieceIndex] = true;
          return next;
        });
        if (solvedCount + 1 === TOTAL) {
          setTimeout(() => onSolved?.(), 500);
        }
        break;
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-serif-elegant italic text-milk-brown-dark text-base md:text-lg text-center">
        Susun puzzle ini buat dapetin hadiah pan ✨
      </p>

      {/* Slot grid — tempat kepingan diletakkan */}
      <div
        className="grid gap-1 p-1 bg-ivory/60 rounded-lg border border-gold-soft"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0,1fr))` }}
      >
        {pieces.map(({ index, col, row }) => (
          <div
            key={index}
            ref={(el) => (slotRefs.current[index] = el)}
            className="w-16 h-16 md:w-20 md:h-20 rounded-md border-2 border-dashed border-milk-brown-light flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence>
              {placed[index] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${PUZZLE_IMAGE})`,
                    backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                    backgroundPosition: `${(col / (COLS - 1)) * 100}% ${
                      (row / (ROWS - 1)) * 100
                    }%`,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Tray — kepingan acak yang bisa di-drag */}
      {!isComplete && (
        <div className="flex flex-wrap justify-center gap-3 max-w-xs">
          {trayOrder
            .filter((i) => !placed[i])
            .map((i) => (
              <PuzzlePiece
                key={i}
                imageUrl={PUZZLE_IMAGE}
                col={pieces[i].col}
                row={pieces[i].row}
                cols={COLS}
                rows={ROWS}
                onCheckDrop={(point) => handleCheckDrop(i, point)}
              />
            ))}
        </div>
      )}

      <p className="text-xs text-ink-soft font-sans-clean">
        {solvedCount} / {TOTAL} keping terpasang
      </p>
    </div>
  );
}