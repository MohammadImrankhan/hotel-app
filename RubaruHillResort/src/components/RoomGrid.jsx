import LuxuryRoomCard from "./LuxuryRoomCard";

export default function RoomGrid({ rooms, nights, onPreview, onSelect }) {
  return (
    <section className="py-20 px-6 bg-[#f8f6f2]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.map((room, i) => (
          <LuxuryRoomCard
            key={room.id}
            room={room}
            nights={nights}
            delay={i * 120}
            onPreview={onPreview}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
