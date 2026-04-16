import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "Admin";
  return (
    <header>
      {/* 🧑‍💼 ADMIN HEADER */}
      {isAdmin && (
        <div className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
            <h1 className="text-lg font-serif tracking-wide">Admin Panel</h1>

            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70">{user?.username}</span>

              <button
                onClick={logout}
                className="border border-white/30 px-4 py-1 text-xs uppercase tracking-wider hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🌐 PUBLIC HEADER */}
      {!isAdmin && (
        <>
          <Topbar />
          <Navbar />
        </>
      )}
    </header>
  );
}
