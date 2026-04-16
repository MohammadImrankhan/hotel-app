import { useEffect, useState } from "react";

export default function RoomManager() {
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState({
    roomID: "",
    roomTypeID: "",
    roomName: "",
    roomDescription: "",
    roomTypeDesc: "",
  });

  const [editId, setEditId] = useState(null);
  // 🔹 Load room Type
  const loadRoomsType = async () => {
    fetch("https://localhost:7037/api/user/RoomType")
      .then((res) => res.json())
      .then((data) => setRoomTypes(data));
  };
  // 🔹 Load rooms
  const loadRooms = async () => {
    try {
      const res = await fetch("https://localhost:7037/api/User/Rooms");
      if (!res.ok) {
        throw new Error("API failed: " + res.status);
      }
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    loadRoomsType();
    loadRooms();
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRoomTypeChange = (value) => {
    setForm({ ...form, roomTypeID: value });
  };
  // 🔹 Save (Add / Update)
  const handleSubmit = async () => {
    if (!form.roomName) {
      alert("Name & Price required");
      return;
    }

    if (editId) {
      const res = await fetch("https://localhost:7037/api/User/UpdateRoom", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
    } else {
      console.log(form);
      const payload = {
        roomID: editId ? form.roomID : 0,
        roomName: form.roomName,
        roomDescription: form.roomDescription,
        roomTypeID: parseInt(form.roomTypeID),
      };
      const res = await fetch("https://localhost:7037/api/User/Room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    setForm({
      roomID: "",
      roomTypeID: "",
      roomName: "",
      roomDescription: "",
      roomTypeDesc: "",
    });

    setEditId(null);
    loadRooms();
  };

  // 🔹 Edit
  const handleEdit = (room) => {
    setForm(room);
    setEditId(room.roomTypeID);
  };

  // 🔹 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    try {
      const res = await fetch(`https://localhost:7037/api/User/room/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result === true) {
        alert("Deleted successfully");
      } else {
        alert("Record not found");
      }

      loadRooms();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="feedback-section">
      <h2>Room Management</h2>
      <div className="feedback-card">
        {/* FORM */}
        <div className="form">
          {/* ROOM TYPE */}
          <select
            className="form-control mt-2"
            value={form.roomTypeID || ""}
            onChange={(e) => handleRoomTypeChange(e.target.value)}
          >
            <option value="">Select Room Type</option>
            {roomTypes.map((rt) => (
              <option key={rt.roomTypeID} value={rt.roomTypeID}>
                {rt.roomTypeName}
              </option>
            ))}
          </select>
          <input
            name="roomName"
            placeholder="Room Name"
            value={form.roomName}
            onChange={handleChange}
          />
          <input
            name="roomDescription"
            placeholder="Description"
            value={form.roomDescription}
            onChange={handleChange}
          />
          {/* <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
          /> */}

          <button onClick={handleSubmit}>
            {editId ? "Update Room" : "Add Room"}
          </button>
        </div>
      </div>
      {/* TABLE */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Room Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((r, index) => (
                <tr key={r.roomID}>
                  <td>{index + 1}</td>
                  <td>{r.roomName}</td>
                  <td>{r.roomDescription}</td>
                  <td>{r.roomTypeDesc}</td>

                  <td>
                    <button onClick={() => handleEdit(r)}>Edit</button>
                    <button onClick={() => handleDelete(r.roomID)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
