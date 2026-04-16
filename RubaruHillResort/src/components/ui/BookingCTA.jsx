import { Link } from "react-router-dom";

export default function BookingCTA() {
  return (
    <section className="py-24 px-6 bg-black text-center text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif mb-6">
          Begin Your Luxury Experience
        </h2>

        <p className="text-white/60 mb-10">
          Reserve your stay and immerse yourself in comfort, elegance, and
          curated hospitality.
        </p>

        <Link
          to="/tariff"
          className="inline-block bg-yellow-500 text-black px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-yellow-400 transition"
        >
          Explore Rooms
        </Link>
      </div>
    </section>
  );
}
