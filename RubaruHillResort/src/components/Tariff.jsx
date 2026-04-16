import { useState, useEffect } from "react";
import TariffHeader from "./TariffHeader";
import NightSelector from "./NightSelector";
import RoomGrid from "./RoomGrid";
import ImagePreviewModal from "./ImagePreviewModal";
import BookingModal from "./BookingModal";

export default function Tariff() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedNights, setSelectedNights] = useState(1);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch("https://localhost:7037/api/user/tariff");
      const data = await res.json();

      // 🔥 Transform API → Luxury format
      const formatted = data.map((r, i) => ({
        id: r.ID,
        name: r.roomName,
        subtitle: r.season || "Premium Stay",
        price: r.price,
        image: `https://localhost:7037/${r.imageurl}`,
        size: "450 sq ft", // optional static or future API
        features: [
          "King Size Bed",
          "Free Wi-Fi",
          "Air Conditioning",
          "Room Service",
        ],
        highlight: i === 1, // highlight 2nd card
        badge: i === 1 ? "Best Value" : null,
      }));

      setRooms(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pt-20">
      <TariffHeader />

      <NightSelector
        selectedNights={selectedNights}
        setSelectedNights={setSelectedNights}
      />

      <RoomGrid
        rooms={rooms}
        nights={selectedNights}
        onPreview={setPreviewImage}
        onSelect={setSelectedRoom}
      />

      {previewImage && (
        <ImagePreviewModal
          image={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          nights={selectedNights}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}
