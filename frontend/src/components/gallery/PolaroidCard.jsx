import { motion } from "framer-motion";

// Rotasi acak kecil & posisi washi-tape supaya tiap kartu terasa "ditempel manual"
const rotations = [-4, 3, -2, 5, -3, 2];
const tapePositions = ["left", "right", "center"];

export default function PolaroidCard({ photo, index }) {
  const rotate = rotations[index % rotations.length];
  const tapeSide = tapePositions[index % tapePositions.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ rotate: 0, scale: 1.03, zIndex: 10 }}
      className="relative bg-paper p-3 pb-14 shadow-lg rounded-sm cursor-default select-none"
      style={{ transformOrigin: "center" }}
    >
      {/* Washi tape */}
      <div
        className={`absolute -top-3 h-6 w-16 bg-dusty-rose/60 rotate-[-6deg] shadow-sm ${
          tapeSide === "left"
            ? "left-3"
            : tapeSide === "right"
            ? "right-3"
            : "left-1/2 -translate-x-1/2"
        }`}
        style={{
          backdropFilter: "blur(1px)",
          opacity: 0.85,
        }}
      />

      {/* Photo */}
      <div className="w-full aspect-[4/5] overflow-hidden bg-milk-brown-light">
        <img
          src={photo.image_url}
          alt={photo.alt_text || photo.caption}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Caption */}
      <p className="absolute bottom-3 left-0 right-0 text-center font-serif-elegant italic text-sm text-ink-soft px-4">
        {photo.caption}
      </p>
    </motion.div>
  );
}