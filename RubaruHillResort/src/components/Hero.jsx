import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/images/Hero1.jpeg",
    title: "Rubaru Hill Resort",
    subtitle: "Experience peace, nature & luxury",
  },
  {
    image: "/images/Hero2.jpeg",
    title: "Relax in the Hills",
    subtitle: "Fresh air, scenic views, bird songs",
  },
  {
    image: "/images/Hero3.jpeg",
    title: "Perfect Getaway",
    subtitle: "Romantic & family stays",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // 🔄 Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[index].image}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6 z-10">
        <div className="max-w-3xl">
          <motion.h1
            key={slides[index].title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif text-white mb-6"
          >
            {slides[index].title}
          </motion.h1>

          <motion.p
            key={slides[index].subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white/70 text-lg mb-10"
          >
            {slides[index].subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <Link
              to="/tariff"
              className="bg-yellow-500 text-black px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-yellow-400 transition"
            >
              Explore Rooms
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              i === index ? "bg-yellow-500" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
