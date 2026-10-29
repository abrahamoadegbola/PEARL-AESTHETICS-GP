import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import BUSINESS from "../data/business";
import Reveal from "./motion/Reveal";
import MagneticButton from "./motion/MagneticButton";
import OrganicBlob from "./motion/OrganicBlob";

// The closing "book a consultation" band, on every page. `bg-primary` sits
// underneath the photo as a real background colour, not just a gradient -
// so if the image is slow, blocked, or fails outright, this still reads as
// a solid dark-green panel with legible white text, rather than falling
// through to the plain white page background with a half-opacity black
// gradient on top of it (which is exactly the "text isn't visible" failure
// mode: a light gradient stop over white is barely darker than white at
// all). The gold radial glow + blob, and the gold-filled primary button,
// match the gold CTA used everywhere else on the site.
export default function CTABand({
  eyebrow = BUSINESS.shortName,
  title = "Your Consultation Awaits",
  lede = "Book online in under a minute, or message us on WhatsApp. Your first consultation is complimentary.",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-section-padding-mobile md:py-section-padding-desktop px-gutter text-center overflow-hidden bg-primary text-on-primary">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?auto=format&fit=crop&w=1600&q=85"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/70" />
      </div>

      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(254,214,91,0.18), transparent 55%)" }}
        initial={{ opacity: 0.3 }}
        animate={reduceMotion ? { opacity: 0.4 } : { opacity: [0.3, 0.5, 0.3] }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 -z-10 opacity-[0.1] blur-2xl pointer-events-none" aria-hidden="true">
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
        <p className="font-body-lg text-body-lg text-on-primary/85 mb-10">{lede}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton>
            <Link
              to="/book-consultation"
              className="inline-flex justify-center items-center bg-secondary-container text-on-secondary-container px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors w-full"
            >
              Book Your Consultation
            </Link>
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
