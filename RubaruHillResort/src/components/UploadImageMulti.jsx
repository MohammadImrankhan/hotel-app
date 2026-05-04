import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadImage() {
  const [files, setFiles] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [progress, setProgress] = useState(0);
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomTypeId, setRoomTypeId] = useState("");

  // Load Room Types
  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
    fetch(`${API}/api/user/RoomType`)
      .then((res) => res.json())
      .then((data) => setRoomTypes(data));
  }, []);

  const handleRoomTypeChange = async (id) => {
    setRoomTypeId(id);

    const res = await fetch(`${API}/api/user/Rooms?roomtypeid=${id}`);
    const data = await res.json();
    setRooms(data);
  };

  // Drag & Drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const upload = async () => {
    if (files.length === 0 || !roomId) {
      alert("Select files and room");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("Files", file));
    formData.append("RoomId", parseInt(roomId));

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API}/api/Upload/UploadMultiple`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        setProgress(0);
        setFiles([]);
        alert("Upload successful");
      } else {
        alert("Upload failed");
      }
    };

    xhr.send(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-xl">
      <h2 className="text-2xl font-serif mb-6">Upload Room Images</h2>

      {/* ROOM TYPE */}
      <select
        className="w-full border border-gray-300 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        onChange={(e) => handleRoomTypeChange(e.target.value)}
      >
        <option value="">Select Room Type</option>
        {roomTypes.map((rt) => (
          <option key={rt.roomTypeID} value={rt.roomTypeID}>
            {rt.roomTypeName}
          </option>
        ))}
      </select>

      {/* ROOM */}
      <select
        className="w-full border border-gray-300 p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        onChange={(e) => setRoomId(e.target.value)}
      >
        <option value="">Select Room</option>
        {rooms.map((r) => (
          <option key={r.roomID} value={r.roomID}>
            {r.roomName}
          </option>
        ))}
      </select>

      {/* DRAG DROP */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-10 text-center cursor-pointer transition ${
          isDragActive
            ? "border-yellow-500 bg-yellow-50"
            : "border-gray-300 hover:border-yellow-400"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? "Drop files here..."
            : "Drag & drop images here, or click to select"}
        </p>
      </div>

      {/* FILE PREVIEW */}
      {files.length > 0 && (
        <div className="mt-4 space-y-1 text-sm text-gray-700">
          {files.map((file, i) => (
            <p key={i}>📄 {file.name}</p>
          ))}
        </div>
      )}

      {/* PROGRESS */}
      {progress > 0 && (
        <div className="mt-4 w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-yellow-500 h-2 rounded"
            style={{ width: progress + "%" }}
          />
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={upload}
        className="mt-6 w-full bg-black text-white py-3 uppercase text-sm tracking-wider hover:bg-gray-800 transition"
      >
        Upload Images
      </button>
    </div>
  );
}
