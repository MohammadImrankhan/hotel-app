import { useEffect, useState } from "react";

export default function TariffAdmin() {
  const [rooms, setRooms] = useState([]);
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    id: 0,
    roomId: "",
    season: "",
    price: "",
    fromDate: "",
    toDate: "",
    isActive: true,
  });

  // Load Rooms
  const loadRooms = async () => {
    const API = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API}/api/user/rooms`);
    const data = await res.json();
    setRooms(data);
  };

  // Load Tariff
  const loadData = async () => {
    const res = await fetch(`${API}/api/user/tariff`);
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    loadRooms();
    loadData();
  }, []);

  // Save
  const save = async () => {
    if (!form.roomId || !form.price) {
      alert("Room and price required");
      return;
    }

    await fetch(`${API}/api/user/save-tariff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    loadData();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      id: 0,
      roomId: "",
      season: "",
      price: "",
      fromDate: "",
      toDate: "",
      isActive: true,
    });
  };

  // Edit
  const edit = (item) => {
    setForm({
      id: item.id,
      roomId: item.roomId,
      season: item.season,
      price: item.price,
      fromDate: item.fromDate?.split("T")[0],
      toDate: item.toDate?.split("T")[0],
      isActive: item.isActive,
    });
  };

  // Delete
  const remove = async (id) => {
    if (!window.confirm("Delete this tariff?")) return;

    await fetch(`${API}/api/user/tariff/${id}`, {
      method: "DELETE",
    });

    loadData();
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <h2 className="text-2xl font-serif">Manage Tariff</h2>

      {/* FORM CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ROOM */}
          <select
            className="border p-3 rounded focus:ring-2 focus:ring-yellow-500"
            value={form.roomId || ""}
            onChange={(e) =>
              setForm({ ...form, roomId: Number(e.target.value) })
            }
          >
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r.roomID} value={r.roomID}>
                {r.roomName}
              </option>
            ))}
          </select>

          {/* SEASON */}
          <input
            className="border p-3 rounded"
            placeholder="Season (e.g. Summer)"
            value={form.season}
            onChange={(e) => setForm({ ...form, season: e.target.value })}
          />

          {/* PRICE */}
          <input
            className="border p-3 rounded"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          {/* FROM */}
          <input
            type="date"
            className="border p-3 rounded"
            value={form.fromDate}
            onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
          />

          {/* TO */}
          <input
            type="date"
            className="border p-3 rounded"
            value={form.toDate}
            onChange={(e) => setForm({ ...form, toDate: e.target.value })}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={save}
            className="bg-black text-white px-6 py-2 text-sm uppercase hover:bg-gray-800"
          >
            {form.id === 0 ? "Add Tariff" : "Update Tariff"}
          </button>

          {form.id !== 0 && (
            <button
              onClick={resetForm}
              className="border px-6 py-2 text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Room</th>
              <th className="p-3">Season</th>
              <th className="p-3">Price</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.roomName}</td>
                <td className="p-3">{item.season}</td>
                <td className="p-3 font-medium">₹ {item.price}</td>
                <td className="p-3">{item.fromDate}</td>
                <td className="p-3">{item.toDate}</td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => edit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-400">
                  No tariff data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
