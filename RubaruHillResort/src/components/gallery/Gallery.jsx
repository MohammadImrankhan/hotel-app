import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import GalleryGrid from "./GalleryGrid";
import ImagePreviewModal from "../ImagePreviewModal";

export default function Gallery() {
  const [previewIndex, setPreviewIndex] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  console.log(API);
  const categories = ["All", "Rooms & Suites", "Amenities", "Dining", "Nature"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const { user } = useAuth();
  let loadImages = null;
  useEffect(() => {
    loadImages = async () => {
      try {
        let res = await fetch(`${API}/api/Upload/images`);
        let data = await res.json();
        setImages(data);
      } catch (err) {
        console.error(err);
      }
    };
  }, [previewIndex]);

  const deleteImage = async (id) => {
    await fetch(`${API}/api/upload/delete-image?id=${id}`, {
      method: "DELETE",
    });
    loadImages();
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="pt-20 bg-[#f8f6f2] min-h-screen">
      {/* Header */}
      <div className="relative py-28 px-6 bg-charcoal-900 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Gallery"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-400 mb-4">
            Visual Journey
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Gallery
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
          <p className="font-body text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
            A glimpse into the world that awaits you at Serenova — through
            light, texture, and unforgettable moments.
          </p>
        </div>
      </div>
      {/* Filter */}
      <div className="sticky top-20 z-30 bg-ivory border-b border-charcoal-100 py-5 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto scrollbar-hide justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 font-body text-xs tracking-[0.2em] uppercase px-6 py-2.5 transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-charcoal-900 text-white border-charcoal-900"
                  : "border-charcoal-200 text-charcoal-500 hover:border-gold-400 hover:text-gold-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <section className="py-12 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"></div>
          <GalleryGrid
            images={images}
            onPreview={setPreviewIndex}
            onDelete={deleteImage}
            isAdmin={!!user}
          />
          {previewIndex !== null && (
            <ImagePreviewModal
              images={images.map((img) => `${API}/${img.imageUrl}`)}
              index={previewIndex}
              onClose={() => setPreviewIndex(null)}
            />
          )}
          {/* {preview && (
            <ImagePreviewModal
              image={preview}
              onClose={() => setPreview(null)}
            />
          )} */}
        </div>
      </section>
    </div>
  );
}
