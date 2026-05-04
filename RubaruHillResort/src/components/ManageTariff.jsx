import { useEffect, useState } from "react";

export default function ManageTariff() {
  const [data, setData] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const load = async () => {
    const res = await fetch(`${API}/api/user/tariff`);
    const d = await res.json();
    setData(d);
  };

  const update = async (id, price) => {
    await fetch(`${API}/api/user/update-tariff?id=${id}&price=${price}`, {
      method: "PUT",
    });
    load();
  };

  const remove = async (id) => {
    await fetch(`${API}}/api/user/delete-tariff?id=${id}`, {
      method: "DELETE",
    });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h3>Tariff</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Room</th>
            <th>Price</th>
            <th>Season</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.roomtype}</td>

              <td>
                <input
                  defaultValue={item.price}
                  onBlur={(e) => update(item.id, e.target.value)}
                />
              </td>

              <td>{item.season}</td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => remove(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
