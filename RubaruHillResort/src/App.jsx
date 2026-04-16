import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layouts/PublicLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import PropertyRules from "./pages/PropertyRules";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Tariff from "./components/Tariff";
import Policies from "./components/Policies";
import Contact from "./components/Contact";
import Gallery from "./components/gallery/Gallery";
import Feedback from "./components/feedback/Feedback";
import UploadImageMulti from "./components/UploadImageMulti";

import ProtectedRoute from "./components/ProtectedRoute";
import TariffAdmin from "./components/TariffAdmin";

export default function App() {
  return (
    <Routes>
      {/* 🌐 PUBLIC LAYOUT */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tariff" element={<Tariff />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/property" element={<PropertyRules />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* 🔐 ADMIN LAYOUT */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="upload" element={<UploadImageMulti />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="tariff" element={<TariffAdmin />} />
      </Route>
    </Routes>
  );
}
