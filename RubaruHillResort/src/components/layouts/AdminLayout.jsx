import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f8f6f2]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-6 hidden md:block">
        <h2 className="text-2xl font-serif mb-8">Admin Panel</h2>

        <nav className="space-y-4 text-sm">
          <Link to="/admin" className="block hover:text-yellow-400">
            Dashboard
          </Link>
          <Link to="/admin/upload" className="block hover:text-yellow-400">
            Upload Images
          </Link>
          <Link to="/admin/gallery" className="block hover:text-yellow-400">
            Gallery
          </Link>

          <Link to="/admin/feedback" className="block hover:text-yellow-400">
            Feedback
          </Link>

          <Link to="/admin/tariff" className="block hover:text-yellow-400">
            Tariff
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.username}</span>

            <button
              onClick={handleLogout}
              className="border px-4 py-1 text-xs hover:bg-black hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
