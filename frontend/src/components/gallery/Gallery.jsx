import { motion } from "framer-motion";
import usePhotos from "../../hooks/usePhotos";
import PolaroidCard from "./PolaroidCard";

export default function Gallery({ onFinish }) {
  const { photos, isLoading } = usePhotos();

  return (
    <div className="relative min-h-screen w-full px-6 py-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="font-serif-elegant italic text-dusty-rose-deep text-base md:text-lg mb-2">
          diabadikan dalam waktu
        </p>
        <h2 className="font-serif-elegant text-3xl md:text-4xl text-milk-brown-dark">
          Galeri Kenangan Kita
        </h2>
      </div>

      {isLoading ? (
        <p className="text-center text-ink-soft font-sans-clean">Memuat foto...</p>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 place-items-center">
          {photos.map((photo, i) => (
            <PolaroidCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>
      )}

      <div className="mt-16 flex justify-center">
        <motion.button
          onClick={onFinish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 py-2 rounded-full bg-gold text-cream font-sans-clean text-sm hover:bg-gold-light transition-colors shadow-md"
        >
          Lanjut ke Penutup →
        </motion.button>
      </div>
    </div>
  );
}