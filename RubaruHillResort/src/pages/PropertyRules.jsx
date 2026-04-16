import ScrollReveal from "../components/ui/ScrollReveal";

export default function PropertyRules() {
  return (
    <div className="pt-20 bg-[#f8f6f2]">
      {/* Header */}
      <div className="relative py-24 px-6 text-center bg-black text-white">
        <h1 className="text-5xl font-serif mb-4">Property Rules</h1>
        <div className="w-16 h-px bg-yellow-500 mx-auto mb-6" />
        <p className="text-white/60 max-w-xl mx-auto text-sm">
          To ensure a pleasant and comfortable stay for all guests, please
          follow our property guidelines.
        </p>
      </div>

      {/* Rules Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* General Rules */}
          <ScrollReveal>
            <div className="bg-white p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-serif text-gray-900 mb-4">
                General Guidelines
              </h3>
              <div className="w-10 h-px bg-yellow-500 mb-6" />

              <ul className="space-y-3 text-gray-600 text-sm">
                <li>✔ Outside food and beverages are not allowed</li>
                <li>✔ Property is couple-friendly</li>
                <li>
                  ✔ Guests are expected to maintain cleanliness and decorum
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Safety & Conduct */}
          <ScrollReveal delay={100}>
            <div className="bg-white p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-serif text-gray-900 mb-4">
                Safety & Conduct
              </h3>
              <div className="w-10 h-px bg-yellow-500 mb-6" />

              <ul className="space-y-3 text-gray-600 text-sm">
                <li>✔ Illegal activities are strictly prohibited</li>
                <li>
                  ✔ Loud music or disturbance is not allowed after designated
                  hours
                </li>
                <li>
                  ✔ Management reserves the right to deny service if rules are
                  violated
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 px-6 bg-white border-t">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          These rules are designed to ensure safety, comfort, and a premium
          experience for all our guests.
        </div>
      </section>
    </div>
  );
}
