export default function Topbar() {
  return (
    <div className="bg-black text-white text-xs tracking-wide">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
        {/* LEFT - CONTACT INFO */}
        <div className="flex items-center gap-6 text-white/70">
          <a href="tel:+918132011879" className="hover:text-yellow-400">
            📞 +91 8132011879
          </a>

          <a
            href="mailto:info@rubarhillresort.com"
            className="hover:text-yellow-400 hidden sm:block"
          >
            ✉ info@rubarhillresort.com
          </a>
        </div>

        {/* RIGHT - SOCIAL + WHATSAPP */}
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/918132011879"
            target="_blank"
            rel="noreferrer"
            className="text-green-400 hover:text-green-300"
          >
            WhatsApp
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400"
          >
            Facebook
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-yellow-400"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
