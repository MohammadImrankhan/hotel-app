import { motion } from "framer-motion";

export default function TariffHeader() {
  return (
    <div className="relative py-32 px-6 overflow-hidden">
      <img
        src="https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto text-center text-white"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-yellow-400 mb-4">
          Accommodations
        </p>

        <h1 className="text-6xl font-serif mb-6">Tariff & Packages</h1>

        <div className="w-16 h-px bg-yellow-400 mx-auto mb-6" />

        <p className="text-white/70 text-sm max-w-xl mx-auto">
          Experience refined luxury with curated stays designed for comfort and
          elegance.
        </p>
      </motion.div>
    </div>
  );
}
