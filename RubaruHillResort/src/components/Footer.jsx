import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-serif mb-4">Rubaru Hill Resort</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Experience luxury, nature, and serenity in the heart of the hills. A
            perfect destination for relaxation and unforgettable memories.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm uppercase tracking-widest mb-4 text-yellow-500">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/" className="hover:text-yellow-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tariff" className="hover:text-yellow-400">
                Tariff
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-yellow-400">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="hover:text-yellow-400">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm uppercase tracking-widest mb-4 text-yellow-500">
            Contact
          </h3>

          <ul className="space-y-2 text-sm text-white/70">
            <li>📍 Rubaru Hill Resort</li>
            <li>📞 +91 8132011879</li>
            <li>✉ info@rubarhillresort.com</li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10 mt-12" />

      {/* BOTTOM */}
      <div className="text-center py-6 text-sm text-white/50">
        <p>© 2026 Rubaru Hill Resort. All rights reserved.</p>
        <p className="mt-1">
          Designed by <span className="text-yellow-500">WIB Consultancy</span>
        </p>
      </div>
    </footer>
  );
}
