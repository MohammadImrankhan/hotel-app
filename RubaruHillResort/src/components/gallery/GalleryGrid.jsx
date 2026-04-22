import { useState } from "react";
import GalleryCard from "./GalleryCard";
import ScrollReveal from "../../components/ui/ScrollReveal";
export default function GalleryGrid({ images, onPreview, onDelete, isAdmin }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((img, index) => (
        <ScrollReveal
          key={`${img.src}-${index}`}
          delay={index * 40}
          className="break-inside-avoid"
        >
          <div
            // className={`relative overflow-hidden cursor-pointer group ${img.tall ? "h-80" : "h-56"}`}
            className={`relative overflow-hidden cursor-pointer group "h-56"}`}
            onClick={() => openLightbox(index)}
          >
            <GalleryCard
              img={img}
              index={index}
              onPreview={onPreview}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
