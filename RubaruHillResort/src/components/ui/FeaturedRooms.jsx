import { Link } from "react-router-dom";

function FeaturedRooms() {
  return (
    <section className="py-20 px-6 bg-[#f8f6f2] text-center">
      <h2 className="text-4xl font-serif mb-6">Our Rooms</h2>

      <p className="text-gray-600 mb-10">
        Discover refined spaces designed for relaxation and comfort.
      </p>

      <Link
        to="/tariff"
        className="border px-8 py-3 hover:bg-black hover:text-white transition"
      >
        View All Rooms
      </Link>
    </section>
  );
}
