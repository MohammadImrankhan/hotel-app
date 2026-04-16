export default function NightSelector({ selectedNights, setSelectedNights }) {
  return (
    <div className="bg-white border-b py-6 px-6 sticky top-20 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <p className="text-sm text-gray-600">
          Showing rates for{" "}
          <span className="font-semibold text-black">
            {selectedNights} night{selectedNights > 1 ? "s" : ""}
          </span>
        </p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setSelectedNights(n)}
              className={`w-10 h-10 ${
                selectedNights === n ? "bg-yellow-500 text-white" : "border"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
