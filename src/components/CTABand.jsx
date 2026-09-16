import { Link } from "react-router-dom";
import BUSINESS from "../data/business";
import Reveal from "./motion/Reveal";
import MagneticButton from "./motion/MagneticButton";

// The closing "book a consultation" band. Every page ends with the same
// one: a real clinic photo under a neutral scrim, rather than a solid
// brand-colour panel - the deep green is a small mark on this site now,
// not something big blocks of the page get filled with.
export default function CTABand({
  eyebrow = BUSINESS.shortName,
  title = "Your Consultation Awaits",
  lede = "Book online in under a minute, or message us on WhatsApp. Your first consultation is complimentary.",
}) {
  return (
    <section className="relative py-section-padding-mobile md:py-section-padding-desktop px-gutter text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?auto=format&fit=crop&w=1600&q=85"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
      </div>

      <Reveal className="max-w-2xl mx-auto relative z-10 text-white" as="div">
        <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] mb-5 block text-white/70">
          {eyebrow}
        </span>
        <h2
          className="font-display-lg mb-6"
          style={{ fontSize: "clamp(1.875rem, 3.5vw, 3rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
        <p className="font-body-lg text-body-lg text-white/85 mb-10">{lede}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton>
            <Link
              to="/book-consultation"
              className="inline-flex justify-center items-center bg-primary text-on-primary px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors w-full"
            >
              Book Your Consultation
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href={BUSINESS.externalBooking.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center border border-white/50 text-white px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-white/10 transition-colors w-full"
            >
              {BUSINESS.externalBooking.label}
            </a>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
