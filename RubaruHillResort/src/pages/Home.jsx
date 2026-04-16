import Hero from "../components/Hero";
import AboutAmenities from "../components/AboutAmenities";
import Recreation from "../components/Recreation";
import ScrollReveal from "../components/ui/ScrollReveal";
import BookingCTA from "../components/ui/BookingCTA";

export default function Home() {
  return (
    <div className="bg-[#f8f6f2]">
      {/* HERO (no animation needed) */}
      <Hero />

      {/* ABOUT */}
      <ScrollReveal>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <AboutAmenities />
          </div>
        </section>
      </ScrollReveal>

      {/* RECREATION */}
      <ScrollReveal delay={100}>
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <Recreation />
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <BookingCTA />
    </div>
  );
}
