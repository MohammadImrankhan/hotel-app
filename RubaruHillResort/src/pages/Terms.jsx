import ScrollReveal from "../components/ui/ScrollReveal";

export default function Terms() {
  return (
    <div className="pt-20 bg-[#f8f6f2]">
      {/* Header */}
      <div className="relative py-24 px-6 text-center bg-black text-white">
        <h1 className="text-5xl font-serif mb-4">Terms & Conditions</h1>
        <div className="w-16 h-px bg-yellow-500 mx-auto mb-6" />
        <p className="text-white/60 max-w-xl mx-auto text-sm">
          Please review the following terms to ensure a comfortable and seamless
          stay experience.
        </p>
      </div>

      {/* Terms Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Check-in / Check-out */}
          <ScrollReveal>
            <div className="bg-white p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-serif text-gray-900 mb-4">
                Check-in & Check-out
              </h3>
              <div className="w-10 h-px bg-yellow-500 mb-6" />

              <ul className="space-y-3 text-gray-600 text-sm">
                <li>
                  ✔ Check-in time: <strong>1:00 PM</strong>
                </li>
                <li>
                  ✔ Check-out time: <strong>11:00 AM</strong>
                </li>
                <li>
                  ✔ Early check-in and late check-out are subject to
                  availability
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Identification */}
          <ScrollReveal delay={100}>
            <div className="bg-white p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-serif text-gray-900 mb-4">
                Identification Policy
              </h3>
              <div className="w-10 h-px bg-yellow-500 mb-6" />

              <ul className="space-y-3 text-gray-600 text-sm">
                <li>
                  ✔ A valid <strong>government-issued ID</strong> is required
                  for all guests at check-in
                </li>
                <li>
                  ✔ Foreign nationals must present a valid passport and visa
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* General Rules */}
          <ScrollReveal delay={200}>
            <div className="bg-white p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-serif text-gray-900 mb-4">
                General Rules
              </h3>
              <div className="w-10 h-px bg-yellow-500 mb-6" />

              <ul className="space-y-3 text-gray-600 text-sm">
                <li>✔ Pets are not allowed on the property</li>
                <li>
                  ✔ Guests are requested to maintain decorum and respect other
                  guests
                </li>
                <li>✔ Any damage to property will be charged accordingly</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 px-6 bg-white border-t">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          These terms are subject to change without prior notice. For any
          clarifications, please contact our front desk or reservations team.
        </div>
      </section>
    </div>
  );
}
