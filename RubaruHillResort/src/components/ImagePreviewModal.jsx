export default function ImagePreviewModal({ image, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <span
        className="absolute top-6 right-6 text-white text-2xl cursor-pointer"
        onClick={onClose}
      >
        ✖
      </span>

      <img src={image} className="max-h-[80%] max-w-[90%]" />
    </div>
  );
}
