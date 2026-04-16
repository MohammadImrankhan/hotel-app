import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
