import { motion } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";

export default function LuxuryRoomCard({
  room,
  nights,
  onPreview,
  onSelect,
  delay,
}) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ y: -8 }}
        className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 group ${
          room.highlight
            ? "ring-2 ring-yellow-500 shadow-2xl shadow-yellow-500/20"
            : "shadow-lg hover:shadow-xl"
        }`}
      >
        {/* Badge */}
        {room.badge && (
          <div className="absolute top-4 right-4 z-10 bg-yellow-500 text-black text-xs px-4 py-1.5 tracking-widest uppercase">
            {room.badge}
          </div>
        )}

        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={room.image}
            onClick={() => onPreview(room.image)}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Room Size */}
          <div className="absolute bottom-4 left-4 text-white text-xs tracking-wide">
            {room.size}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col h-full">
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-500 mb-1">
            {room.subtitle}
          </p>

          <h3 className="text-2xl font-serif text-gray-900 mb-3">
            {room.name}
          </h3>

          <div className="w-8 h-px bg-yellow-500 mb-6" />

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-serif text-gray-900">
                ₹{(room.price * nights).toLocaleString("en-IN")}
              </span>
            </div>

            <span className="text-xs text-gray-400">
              ₹{room.price} / night · {nights} night
              {nights > 1 ? "s" : ""}
            </span>
          </div>

          {/* Features */}
          <ul className="space-y-2 mb-8 flex-1">
            {room.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                ✔ {f}
              </li>
            ))}
          </ul>

          {/* Button */}
          <button
            onClick={() => onSelect(room)}
            className={`w-full text-center text-xs tracking-[0.2em] uppercase py-4 transition ${
              room.highlight
                ? "bg-yellow-500 text-black hover:bg-yellow-400"
                : "border border-gray-300 hover:bg-black hover:text-white"
            }`}
          >
            Reserve This Room
          </button>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
