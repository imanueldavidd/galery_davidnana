import { motion } from "framer-motion";

/**
 * Satu keping puzzle yang bisa di-drag.
 * imageUrl, cols, rows menentukan potongan mana dari foto yang ditampilkan (via background-position).
 * onDragEnd mengirim posisi pointer terakhir untuk dicek cocok/tidak dengan slot.
 */
export default function PuzzlePiece({
  imageUrl,
  col,
  row,
  cols,
  rows,
  onCheckDrop,
}) {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.15}
      dragMomentum={false}
      whileDrag={{ scale: 1.08, zIndex: 50, cursor: "grabbing" }}
      onDragEnd={(event, info) => onCheckDrop(info.point)}
      className="w-16 h-16 md:w-20 md:h-20 rounded-md shadow-md border-2 border-paper cursor-grab touch-none"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: `${cols * 100}% ${rows * 100}%`,
        backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
      }}
    />
  );
}