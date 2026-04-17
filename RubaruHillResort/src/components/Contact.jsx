import LocationMap from "./LocationMap";
import ScrollReveal from "../components/ui/ScrollReveal";

const Contact = () => {
  const phone = "918132011879";

  const openWhatsApp = () => {
    const msg = "Hello, I want to book a room at Rubaru Hill Resort.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <div className="pt-20 bg-[#f8f6f2]">
      {/* Header */}
      <div className="relative py-24 px-6 text-center bg-black text-white">
        <h1 className="text-5xl font-serif mb-4">Contact Us</h1>
        <div className="w-16 h-px bg-yellow-500 mx-auto mb-6" />
        <p className="text-white/60 max-w-xl mx-auto text-sm">
          We’re here to assist you with bookings, inquiries, and personalized
          experiences.
        </p>
      </div>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Map */}
          <ScrollReveal>
            <div className="w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
              <LocationMap />
            </div>
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal delay={100}>
            <div className="bg-white p-10 shadow-xl border border-gray-100 flex flex-col justify-center">
              <h2 className="text-3xl font-serif mb-6 text-gray-900">
                Get in Touch
              </h2>

              <div className="w-10 h-px bg-yellow-500 mb-6" />

              <div className="space-y-4 text-gray-600 text-sm">
                <p>
                  <strong>📍 Address:</strong>
                  <br />
                  Rubaru Hill Resort
                </p>

                <p>
                  <strong>📞 Phone:</strong>
                  <br />
                  +91 8132011879
                </p>

                <p>
                  <strong>✉ Email:</strong>
                  <br />
                  info@rubarhillresort.com
                </p>

                <p>
                  <strong>🕒 Working Hours:</strong>
                  <br />
                  9:00 AM – 9:00 PM (All Days)
                </p>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={openWhatsApp}
                className="mt-8 bg-green-500 text-white py-4 uppercase text-xs tracking-[0.2em] hover:bg-green-400 transition"
              >
                Chat on WhatsApp
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-black text-center text-white">
        <h2 className="text-3xl font-serif mb-4">Ready to Book Your Stay?</h2>

        <p className="text-white/60 mb-8">
          Reach out now and let us plan your perfect getaway.
        </p>

        <button
          onClick={openWhatsApp}
          className="bg-yellow-500 text-black px-10 py-4 uppercase text-xs tracking-[0.2em] hover:bg-yellow-400 transition"
        >
          Book via WhatsApp
        </button>
      </section>
    </div>
  );
};

export default Contact;
