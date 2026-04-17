export default function GalleryCard({ img, onPreview, onDelete, isAdmin }) {
  const imageUrl = `https://localhost:7037/${img.imageUrl}`;

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg">
      {/* Image */}
      <img
        src={imageUrl}
        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
        onClick={() => onPreview(imageUrl)}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4 text-white">
        <h4 className="text-lg font-semibold">{img.roomName}</h4>
        <p className="text-xs text-white/70">{img.roomType}</p>

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
