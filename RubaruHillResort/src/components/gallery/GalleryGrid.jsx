import GalleryCard from "./GalleryCard";

export default function GalleryGrid({ images, onPreview, onDelete, isAdmin }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((img) => (
        <GalleryCard
          key={img.imageId}
          img={img}
          onPreview={onPreview}
          onDelete={onDelete}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}
