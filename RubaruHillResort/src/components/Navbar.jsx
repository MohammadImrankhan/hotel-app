import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tariff", path: "/tariff" },
    { name: "Policies", path: "/policies" },
    { name: "Terms", path: "/terms" },
    { name: "Property", path: "/property" },
    { name: "Feedback", path: "/feedback" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Admin Login", path: "/login" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* LOGO */}
        <Link to="/" className="flex flex-col items-start">
          <span className="font-serif text-2xl text-gold-400 leading-none tracking-wide">
            Rubaru
          </span>
          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-white/60 mt-0.5">
            Hill Resort
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`transition hover:text-yellow-400 ${
                  location.pathname === item.path
                    ? "text-yellow-400"
                    : "text-white/80"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* CTA */}
          <Link
            to="/tariff"
            className="bg-yellow-500 text-black px-5 py-2 text-xs uppercase tracking-wider hover:bg-yellow-400 transition"
          >
            Book Now
          </Link>
        </ul>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-black px-6 pb-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block text-white/80 hover:text-yellow-400"
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/tariff"
            onClick={() => setOpen(false)}
            className="block bg-yellow-500 text-black text-center py-3 mt-4 uppercase text-xs"
          >
            Book Now
          </Link>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block text-center border border-white/30 py-2 text-xs uppercase"
          >
            Admin Login
          </Link>
        </div>
      )}
    </nav>
  );
}
