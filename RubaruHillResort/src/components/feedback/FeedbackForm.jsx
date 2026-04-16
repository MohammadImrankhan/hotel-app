import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "../ui/ScrollReveal";

export default function FeedbackForm({ feedbacks, refresh }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });
  const avgRating = feedbacks.length
    ? (feedbacks.reduce((s, r) => s + r.rating, 0) / feedbacks.length).toFixed(
        1,
      )
    : "5.0";
  const submitFeedback = async (e) => {
    e.preventDefault();
    if (form.rating === 0) return;
    setSubmitting(true);
    const res = await fetch(
      "https://localhost:7037/api/Feedback/save-feedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      },
    );
    setSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", rating: 0, message: "" });
      refresh();
    }
    alert("Thank you for your feedback!");
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="relative py-28 px-6 bg-charcoal-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-15" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold-400 mb-4">
            Guest Voices
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">
            Reviews & Feedback
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
          <div className="flex items-center justify-center gap-3">
            <span className="font-serif text-4xl text-gold-400">
              {avgRating}
            </span>
            <div>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-gold-500 text-gold-500"
                  />
                ))}
              </div>
              <span className="font-body text-xs text-white/50 tracking-wider">
                Based on {feedbacks.length} verified feedbacks
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Reviews List */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="font-serif text-3xl text-charcoal-900 mb-2">
                  Guest Stories
                </h2>
                <div className="w-10 h-px bg-gold-500 mb-8" />
              </ScrollReveal>

              {feedbacks.length === 0 ? (
                <div className="bg-white p-12 text-center shadow-sm">
                  <p className="font-serif text-xl text-charcoal-400">
                    No feedbacks yet. Be the first to share!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {feedbacks.map((feedback, i) => (
                    <ScrollReveal key={feedback.id} delay={i * 80}>
                      <div className="bg-white p-8 shadow-sm border-l-2 border-gold-400 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold-100 flex items-center justify-center font-serif text-gold-600 text-lg">
                              {feedback.name?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p className="font-body text-sm font-bold text-charcoal-800">
                                {feedback.name}
                              </p>
                              {/* <p className="font-body text-xs text-charcoal-400">
                                  {review.room_type}
                                </p> */}
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  size={13}
                                  className={
                                    s <= feedback.rating
                                      ? "fill-gold-500 text-gold-500"
                                      : "text-charcoal-200"
                                  }
                                />
                              ))}
                            </div>
                            <span className="font-body text-xs text-charcoal-300 mt-1">
                              {new Date(feedback.createdon).toLocaleDateString(
                                "en-IN",
                                {
                                  year: "numeric",
                                  month: "short",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                        <p className="font-serif text-base italic text-charcoal-700 leading-relaxed">
                          "{feedback.message}"
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <ScrollReveal>
                  <div className="bg-white shadow-lg p-8">
                    <h3 className="font-serif text-2xl text-charcoal-900 mb-1">
                      Share Your Experience
                    </h3>
                    <div className="w-8 h-px bg-gold-400 mb-6" />

                    {submitted ? (
                      <div className="text-center py-8">
                        <CheckCircle
                          size={40}
                          className="text-gold-500 mx-auto mb-4"
                        />
                        <p className="font-serif text-xl text-charcoal-800 mb-2">
                          Thank You!
                        </p>
                        <p className="font-body text-sm text-charcoal-500 leading-relaxed">
                          Your review has been submitted and will appear after
                          our team reviews it.
                        </p>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="mt-6 font-body text-xs tracking-[0.2em] uppercase text-gold-600 hover:underline"
                        >
                          Submit Another
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={submitFeedback} className="space-y-5">
                        <div>
                          <label className="font-body text-xs tracking-wider uppercase text-charcoal-500 block mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) =>
                              setForm({ ...form, name: e.target.value })
                            }
                            className="w-full border border-charcoal-200 px-4 py-3 font-body text-sm text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors bg-ivory"
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <label className="font-body text-xs tracking-wider uppercase text-charcoal-500 block mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) =>
                              setForm({ ...form, email: e.target.value })
                            }
                            className="w-full border border-charcoal-200 px-4 py-3 font-body text-sm text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors bg-ivory"
                            placeholder="your@email.com"
                          />
                        </div>
                        {/* <div>
                            <label className="font-body text-xs tracking-wider uppercase text-charcoal-500 block mb-2">
                              Room Type
                            </label>
                            <select
                              value={form.room_type}
                              onChange={(e) =>
                                setForm({ ...form, room_type: e.target.value })
                              }
                              className="w-full border border-charcoal-200 px-4 py-3 font-body text-sm text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors bg-ivory"
                            >
                              <option value="">Select room type</option>
                              {roomTypes.map((r) => (
                                <option key={r} value={r}>
                                  {r}
                                </option>
                              ))}
                            </select>
                          </div> */}
                        <div>
                          <label className="font-body text-xs tracking-wider uppercase text-charcoal-500 block mb-2">
                            Your Rating *
                          </label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onMouseEnter={() => setHoverRating(s)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setForm({ ...form, rating: s })}
                                className="transition-transform hover:scale-110"
                              >
                                <Star
                                  size={24}
                                  className={`transition-colors ${
                                    s <= (hoverRating || form.rating)
                                      ? "fill-gold-500 text-gold-500"
                                      : "text-charcoal-200"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>

                          {form.rating === 0 && (
                            <p className="font-body text-xs text-charcoal-400 mt-1">
                              Please select a rating
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="font-body text-xs tracking-wider uppercase text-charcoal-500 block mb-2">
                            Your Review *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={form.message}
                            onChange={(e) =>
                              setForm({ ...form, message: e.target.value })
                            }
                            className="w-full border border-charcoal-200 px-4 py-3 font-body text-sm text-charcoal-800 focus:outline-none focus:border-gold-400 transition-colors resize-none bg-ivory"
                            placeholder="Share your experience at Serenova..."
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={submitting || form.rating === 0}
                          className="w-full flex items-center justify-center gap-2 bg-gold-500 text-charcoal-900 font-body text-xs tracking-[0.2em] uppercase py-4 hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting ? "Submitting..." : "Submit Review"}
                          <Send size={13} />
                        </button>
                      </form>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* imran */}
    </div>
  );
}
