import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export default function GalleryCard({
  img,
  index,
  onPreview,
  onDelete,
  isAdmin,
}) {
  const imageUrl = `https://localhost:7037/${img.imageUrl}`;

  return (
    <div
      className="group relative overflow-hidden rounded-xl shadow-lg"
      onClick={() => onPreview(index)}
    >
      <img
        src={imageUrl}
        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
      />

      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4 text-white">
        <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/50 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
            <ZoomIn size={24} className="text-white mx-auto mb-2" />
            <span className="font-body text-xs tracking-widest uppercase text-white">
              {img.roomType}
            </span>
          </div>
        </div>
        <h4 className="text-lg font-semibold">{img.roomName}</h4>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-body text-xs text-white/70 tracking-wider">
            {img.roomName}
          </span>
        </div>
        <p className="text-xs mt-1">
          {new Date(img.createdOn).toLocaleDateString()}
        </p>

        {isAdmin && (
          <button
            onClick={() => onDelete(img.imageId)}
            className="mt-3 text-xs bg-red-500 px-3 py-1 hover:bg-red-400"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
