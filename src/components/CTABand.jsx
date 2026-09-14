import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import BUSINESS from "../data/business";
import Reveal from "./motion/Reveal";
import MagneticButton from "./motion/MagneticButton";
import OrganicBlob from "./motion/OrganicBlob";

// The closing "book a consultation" band. Every page ended with its own
// slightly different version of this; now they all end with the same one.
export default function CTABand({
  eyebrow = BUSINESS.shortName,
  title = "Your Consultation Awaits",
  lede = "Book online in under a minute, or message us on WhatsApp. Your first consultation is complimentary.",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-section-padding-mobile md:py-section-padding-desktop px-gutter bg-primary text-on-primary text-center overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(254,214,91,0.15), transparent 55%)" }}
        initial={{ opacity: 0.3 }}
        animate={reduceMotion ? { opacity: 0.4 } : { opacity: [0.3, 0.5, 0.3] }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* A slow, barely-there morphing blob in the far corner - ambient
          texture rather than a focal shape, which is why it sits at low
          opacity behind everything and never competes with the copy. */}
      <div className="absolute -bottom-32 -left-24 w-96 h-96 opacity-[0.08] blur-2xl pointer-events-none" aria-hidden="true">
        <OrganicBlob colorFrom="#fed65b" colorTo="#a4d0c1" />
      </div>

      <Reveal className="max-w-2xl mx-auto relative z-10" as="div">
        <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] mb-5 block text-secondary-container">
          {eyebrow}
        </span>
        <h2
          className="font-display-lg mb-6"
          style={{ fontSize: "clamp(1.875rem, 3.5vw, 3rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}
        >
          {title}
        </h2>
        <p className="font-body-lg text-body-lg text-on-primary/80 mb-10">{lede}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton>
            <Link
              to="/book-consultation"
              className="inline-flex justify-center items-center bg-secondary-container text-on-secondary-container px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors w-full"
            >
              Book Your Consultation
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href={BUSINESS.externalBooking.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center border border-on-primary/40 px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-on-primary/10 transition-colors w-full"
            >
              {BUSINESS.externalBooking.label}
            </a>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
