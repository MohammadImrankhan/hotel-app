import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ImagePreviewModal({ images, index, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(index);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  const prev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const next = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white/70 hover:text-white"
        onClick={onClose}
      >
        <X size={30} />
      </button>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      >
        <ChevronRight size={24} />
      </button>

      {/* Image */}
      <div
        className="max-w-5xl w-full mx-12 md:mx-20 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt="Preview"
          className="w-full max-h-[80vh] object-contain rounded-lg"
        />

        <p className="text-white/50 mt-4 text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
