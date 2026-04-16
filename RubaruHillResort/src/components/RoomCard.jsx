export default function RoomCard({ room, onPreview, onSelect }) {
  const imageUrl = `https://localhost:7037/${room.imageurl}`;

  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition rounded-xl overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition"
          onClick={() => onPreview(imageUrl)}
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{room.roomName}</h3>

        <p className="text-sm text-gray-500">{room.season}</p>

        <h2 className="text-2xl font-bold text-gold-600 mt-2">
          ₹ {room.price}
        </h2>

        <p className="text-xs text-gray-400 mb-4">per night</p>

        <button
          onClick={() => onSelect(room)}
          className="w-full border border-gold-500 text-gold-600 py-2 hover:bg-gold-500 hover:text-white transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
