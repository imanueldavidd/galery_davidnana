import { motion } from "framer-motion";
import GoldenParticles from "../opening/GoldenParticles";
import { closingContent } from "../../data/closingContent";

export default function Closing() {
  const { eyebrow, heading, message, signOff, signatureName } = closingContent;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <GoldenParticles count={18} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 max-w-lg text-center"
      >
        <p className="font-serif-elegant italic text-dusty-rose-deep text-base md:text-lg mb-2">
          {eyebrow}
        </p>
        <h2 className="font-serif-elegant text-3xl md:text-5xl text-milk-brown-dark mb-8">
          {heading}
        </h2>

        <div className="space-y-4 mb-10">
          {message.map((paragraph, i) => (
            <p
              key={i}
              className="font-body-warm text-base md:text-lg leading-relaxed text-ink-soft"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="pt-6 border-t border-gold-soft inline-block"
        >
          <p className="font-serif-elegant italic text-ink-soft text-base mb-1">
            {signOff}
          </p>
          <p className="font-serif-elegant text-2xl md:text-3xl text-gold">
            {signatureName}
          </p>
        </motion.div>
      </motion.div>

      {/* Small heart / gift icon di bawah sebagai penutup visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mt-10 text-3xl"
      >
        🤎
      </motion.div>
    </div>
  );
}