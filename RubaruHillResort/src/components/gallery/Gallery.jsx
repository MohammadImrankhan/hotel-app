import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import GalleryGrid from "./GalleryGrid";
import ImagePreviewModal from "../ImagePreviewModal";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const { user } = useAuth();

  const loadImages = async () => {
    try {
      const res = await fetch("https://localhost:7037/api/Upload/images");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async (id) => {
    await fetch(`https://localhost:7037/api/upload/delete-image?id=${id}`, {
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
      <div className="py-20 text-center">
        <h1 className="text-5xl font-serif mb-4">Gallery</h1>
        <div className="w-16 h-px bg-yellow-500 mx-auto mb-4" />
        <p className="text-gray-500 text-sm">
          Explore moments and experiences from our resort
        </p>
      </div>

      <GalleryGrid
        images={images}
        onPreview={setPreview}
        onDelete={deleteImage}
        isAdmin={!!user}
      />

      {preview && (
        <ImagePreviewModal image={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  );
}
