import ScrollReveal from "../components/ui/ScrollReveal";

export default function Policies() {
  return (
    <div className="pt-20 bg-[#f8f6f2]">
      {/* Header */}
      <div className="relative py-24 px-6 text-center bg-black text-white">
        <h1 className="text-5xl font-serif mb-4">Policies</h1>
        <div className="w-16 h-px bg-yellow-500 mx-auto mb-6" />
        <p className="text-white/60 max-w-xl mx-auto text-sm">
          Please review our policies to ensure a smooth and pleasant stay
          experience.
        </p>
      </div>

      {/* Policies Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Cancellation Policy */}
          <ScrollReveal>
            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition border border-gray-100">
              <h3 className="text-2xl font-serif mb-4 text-gray-900">
                Cancellation Policy
              </h3>
              <div className="w-10 h-px bg-yellow-500 mb-6" />

              <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <li>✔ Cancellation 15 days before arrival – Full refund</li>
                <li>✔ Cancellation 7–14 days before arrival – 50% refund</li>
                <li>✔ Cancellation within 7 days – No refund</li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Booking Policy */}
          <ScrollReveal delay={100}>
            <div className="bg-white p-8 shadow-lg hover:shadow-xl transition border border-gray-100">
              <h3 className="text-2xl font-serif mb-4 text-gray-900">
                Booking Policy
              </h3>
              <div className="w-10 h-px bg-yellow-500 mb-6" />

              <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <li>✔ 30%–50% advance payment required to confirm booking</li>
                <li>
                  ✔ Remaining balance payable before check-in or at arrival
                </li>
                <li>✔ Payment via UPI, bank transfer, or card</li>
                <li>✔ Additional guests may incur extra charges</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-12 px-6 bg-white border-t">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500 leading-relaxed">
          All policies are subject to change without prior notice. For special
          requests, group bookings, or clarifications, please contact our
          reservations team.
        </div>
      </section>
    </div>
  );
}
