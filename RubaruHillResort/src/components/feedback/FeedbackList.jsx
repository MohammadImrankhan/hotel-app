export default function FeedbackList({ feedbacks }) {
  const getRating = (r) => {
    return "⭐".repeat(r);
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-serif mb-10 text-center">Guest Feedback</h2>

      <div className="bg-white shadow-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Rating</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((f, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-4">{i + 1}</td>
                <td className="p-4">{f.name}</td>
                <td className="p-4">{f.email}</td>
                <td className="p-4">{f.message}</td>
                <td className="p-4 text-yellow-500">
                  {getRating(Number(f.rating))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
