import { useState } from "react";
//import ReactWhatsapp from "react-whatsapp";

export default function BookingModal({ room, onClose }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const submit = () => {
    if (!name || !mobile || !arrivalDate || !departureDate) {
      alert("Please fill all fields");
      return;
    }
    const msg = `Booking Request:
                Room: ${room.roomName}
                 Type: ${room.roomType}
                Price: ₹${room.price}
                Name: ${name}
                Mobile: ${mobile}
                Arrival Date: ${arrivalDate}
                Departure Date: ${departureDate}`;

    window.open(`https://wa.me/918132011879?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000088" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">Book {room.roomName}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* <p>
              <strong>Type:</strong> {room.roomType}
            </p> */}
            <p>
              <strong>Price:</strong> ₹{room.price}
            </p>
            <input
              className="form-control mb-2"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
            />
            <div className="form-floating mb-2">
              <label>Arrival Date</label>
              <br />
              <input
                type="date"
                className="form-control mb-2"
                onChange={(e) => setArrivalDate(e.target.value)}
              />
              {/* <input
                type="text"
                placeholder="Arrival Date"
                onChange={(e) => setArrivalDate(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              /> */}
            </div>{" "}
            <div className="form-floating mb-2">
              <label>Departure Date</label>
              <br />
              <input
                type="date"
                className="form-control mb-2"
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button className="btn btn-warning" onClick={submit}>
              Confirm Booking
            </button>
            {/* <ReactWhatsapp
              number="918132011879"
              message={msg}
              className="btn btn-warning"
            >
              Confirm Booking
            </ReactWhatsapp> */}
          </div>
        </div>
      </div>
    </div>
  );
}
