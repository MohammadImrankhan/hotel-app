import { useState } from "react";
// import UploadImage from "../../components/UploadImage";
import UploadImageMulti from "../../components/UploadImageMulti";
//import ManageTariff from "../../components/ManageTariff";
import TariffAdmin from "../../components/TariffAdmin";
import Gallery from "../../components/gallery/Gallery";
import RoomManager from "../../components/RoomManager";
import Feedback from "../../components/feedback/Feedback";
import "../../css/Admin.css";
import { useAuth } from "../../components/AuthContext";

export default function AdminDashboard() {
  const [tab, setTab] = useState("dashboard");
  const { user, logout } = useAuth();
  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      {/* <div className="sidebar">
        <h4>Admin Panel</h4>

        <button onClick={() => setTab("upload")}>Upload Images</button>
        <button onClick={() => setTab("gallery")}>Gallery</button>
        <button onClick={() => setTab("rooms")}>Rooms</button>
        <button onClick={() => setTab("tariff")}>Tariff</button>
        <button onClick={() => setTab("feedback")}>Feedback</button>
        <button onClick={logout}>Logout</button>
      </div> */}

      {/* CONTENT */}
      {/* <div className="content">
        {tab === "dashboard" && <h2>Admin Dashboard</h2>}
        {tab === "upload" && <UploadImageMulti />}
        {tab === "gallery" && <Gallery />}
        {tab === "rooms" && <RoomManager />}
        {tab === "tariff" && <TariffAdmin />}
        {tab === "feedback" && <Feedback />}
      </div> */}
    </div>
  );
}
