import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import GoldenParticles from "./GoldenParticles";
import JigsawPuzzle from "./JigsawPuzzle";

export default function Opening({ onOpen, recipientName = "Sayang" }) {
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 py-10">
      <GoldenParticles count={22} />
      <div className="pointer-events-none absolute inset-0 bg-radial-vignette" />

      <AnimatePresence mode="wait">
        {!isPuzzleSolved ? (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <p className="font-serif-elegant italic text-milk-brown-dark text-lg md:text-xl mb-4 text-center">
              Halo {recipientName}
            </p>
            <JigsawPuzzle onSolved={() => setIsPuzzleSolved(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="gift-box"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            <p className="font-serif-elegant italic text-milk-brown-dark text-lg md:text-xl mb-3 tracking-wide">
              yay, kamu berhasil! 🎉
            </p>

            <motion.button
              onClick={handleClick}
              whileHover={{ scale: isOpening ? 1 : 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative focus:outline-none"
              aria-label="Buka hadiah"
            >
              <motion.div
                animate={
                  isOpening
                    ? { scale: [1, 1.15, 0], rotate: [0, -5, 10, 0], opacity: [1, 1, 0] }
                    : { y: [0, -8, 0] }
                }
                transition={
                  isOpening
                    ? { duration: 1, ease: "easeInOut" }
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
                className="text-[7rem] md:text-[9rem] drop-shadow-lg select-none"
              >
                🎁
              </motion.div>
            </motion.button>

            {!isOpening && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 font-sans-clean text-sm md:text-base text-ink-soft tracking-wide"
              >
                Ketuk untuk membuka ✨
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            transition={{ duration: 1.1, times: [0, 0.5, 1] }}
            className="pointer-events-none absolute inset-0 bg-gold-soft z-20"
          />
        )}
      </AnimatePresence>
    </div>
  );
}