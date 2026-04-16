import { useState } from "react";
//import ReactWhatsapp from "react-whatsapp";

export default function BookingModal({ room, nights, onClose }) {
  const today = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const submit = () => {
    if (arrivalDate < today) {
      alert("Invalid arrival date");
      return;
    }
    if (departureDate < today) {
      alert("Invalid arrival date");
      return;
    }
    if (!name || !mobile || !arrivalDate || !departureDate) {
      alert("Please fill all fields");
      return;
    }
    const msg = `Booking Request:
                Room: ${room.roomName}
                Type: ${room.roomType}
                Price: ₹${room.price * nights}                
                Nights: ${nights}
                Name: ${name}
                Mobile: ${mobile}
                Arrival Date: ${arrivalDate}
                Departure Date: ${departureDate}`;

    window.open(`https://wa.me/918132011879?text=${encodeURIComponent(msg)}`);
  };
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Book {room.name}</h2>

          <button onClick={onClose} className="text-xl hover:text-red-500">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          <p>
            <strong>Price:</strong> ₹{room.price * nights}
            <br />
            <span className="text-xs text-gray-400">
              ₹{room.price} / night · {nights} night
              {nights > 1 ? "s" : ""}
            </span>
          </p>

          <input
            className="w-full border p-3 rounded"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            className="w-full border p-3 rounded"
            placeholder="Mobile Number"
            value={mobile}
            maxLength={10}
            inputMode="numeric"
            pattern="[0-9]{10}"
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
          />

          <input
            type="date"
            min={today}
            value={arrivalDate}
            className="w-full border p-3 rounded"
            onChange={(e) => setArrivalDate(e.target.value)}
          />

          <input
            type="date"
            min={arrivalDate || today}
            value={departureDate}
            className="w-full border p-3 rounded"
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t">
          <button onClick={onClose} className="flex-1 border py-3 rounded">
            Cancel
          </button>

          <button
            onClick={submit}
            className="flex-1 bg-yellow-500 py-3 rounded font-semibold"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
  //   return (
  //     <div
  //       className="modal fade show d-block"
  //       style={{ background: "#00000088" }}
  //     >
  //       <div className="modal-dialog">
  //         <div className="modal-content">
  //           {/* HEADER */}
  //           <div className="modal-header">
  //             <h5 className="modal-title">Book {room.roomName}</h5>
  //             <button className="btn-close" onClick={onClose}></button>
  //           </div>

  //           {/* BODY */}
  //           <div className="modal-body">
  //             {/* <p>
  //               <strong>Type:</strong> {room.roomType}
  //             </p> */}
  //             <p>
  //               <strong>Price:</strong> ₹{room.price}
  //             </p>
  //             <input
  //               className="form-control mb-2"
  //               placeholder="Your Name"
  //               onChange={(e) => setName(e.target.value)}
  //             />
  //             <input
  //               className="form-control mb-2"
  //               placeholder="Mobile Number"
  //               onChange={(e) => setMobile(e.target.value)}
  //             />
  //             <div className="form-floating mb-2">
  //               <label>Arrival Date</label>
  //               <br />
  //               <input
  //                 type="date"
  //                 className="form-control mb-2"
  //                 onChange={(e) => setArrivalDate(e.target.value)}
  //               />
  //               {/* <input
  //                 type="text"
  //                 placeholder="Arrival Date"
  //                 onChange={(e) => setArrivalDate(e.target.value)}
  //                 onFocus={(e) => (e.target.type = "date")}
  //                 onBlur={(e) => (e.target.type = "text")}
  //               /> */}
  //             </div>{" "}
  //             <div className="form-floating mb-2">
  //               <label>Departure Date</label>
  //               <br />
  //               <input
  //                 type="date"
  //                 className="form-control mb-2"
  //                 onChange={(e) => setDepartureDate(e.target.value)}
  //               />
  //             </div>
  //           </div>

  //           {/* FOOTER */}
  //           <div className="modal-footer">
  //             <button className="btn btn-secondary" onClick={onClose}>
  //               Cancel
  //             </button>

  //             <button className="btn btn-warning" onClick={submit}>
  //               Confirm Booking
  //             </button>
  //             {/* <ReactWhatsapp
  //               number="918132011879"
  //               message={msg}
  //               className="btn btn-warning"
  //             >
  //               Confirm Booking
  //             </ReactWhatsapp> */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
