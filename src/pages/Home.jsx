import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import BUSINESS from "../data/business";
import useDbCollection from "../hooks/useDbCollection";
import { getActiveTreatments } from "../lib/db";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";
import Reveal from "../components/motion/Reveal";
import StaggeredText from "../components/motion/StaggeredText";
import MagneticButton from "../components/motion/MagneticButton";
import Marquee from "../components/motion/Marquee";
import CountUp from "../components/motion/CountUp";
import OrganicBlob from "../components/motion/OrganicBlob";
import HeroVideo from "../components/HeroVideo";
import SectionHeader from "../components/SectionHeader";
import CTABand from "../components/CTABand";
import { useDeclareDarkHero } from "../context/DarkHeroContext";

function TestimonialCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;
  const t = testimonials[index];

  return (
    <div className="max-w-3xl mx-auto text-center">
      <span className="material-symbols-outlined text-secondary-container text-5xl mb-6 inline-block" style={{ fontVariationSettings: "'FILL' 1" }}>
        format_quote
      </span>
      <motion.div key={index} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex justify-center text-secondary mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="material-symbols-outlined fill text-xl">star</span>
          ))}
        </div>
        <p className="font-display-lg text-headline-md md:text-display-lg text-primary leading-tight mb-8">"{t.quote}"</p>
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-10 rounded-full bg-primary-fixed/30 text-primary flex items-center justify-center font-label-caps text-label-caps font-bold flex-shrink-0">
            {t.name.charAt(0)}
          </span>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-left">
            {t.name} · {t.source}
          </p>
        </div>
      </motion.div>
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 active:scale-90 ${i === index ? "w-8 bg-primary" : "w-1.5 bg-outline-variant hover:bg-primary/40"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [treatments] = useDbCollection(getActiveTreatments);
  const reduceMotion = useReducedMotion();
  useDeclareDarkHero();
  const featured = treatments.find((t) => t.featured) || treatments[0];
  const rest = treatments.filter((t) => t.id !== featured?.id);

  return (
    <>
      {/* ---------- HERO - the video is the page. It runs the full width of
          the viewport and starts immediately; the copy sits on top of it
          under a scrim rather than beside it in a panel, so nothing crops
          the footage. ---------- */}
      <section className="relative isolate -mt-[88px] md:-mt-[104px] flex min-h-[100svh] flex-col justify-end overflow-hidden text-on-primary">
        <motion.div
          className="absolute inset-0 -z-20"
          initial={reduceMotion ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVideo
            className="h-full w-full"
            alt="A clinical skin treatment in progress at Pearl Aesthetics"
            videoSrc="https://videos.pexels.com/video-files/30365364/13014604_1440_2560_24fps.mp4"
          />
        </motion.div>

        {/* Two scrims rather than one: the horizontal pass keeps the type
            side legible, the vertical pass anchors the copy at the foot and
            hands off cleanly to the section below. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/95 via-primary/65 to-primary/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/25 to-primary/45" />

        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-16 pt-32 md:pb-24 md:pt-40">
          <Reveal delay={0.05}>
            <span className="font-label-caps text-label-caps text-secondary-container uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <span className="w-10 h-px bg-secondary-container/60" />
              {BUSINESS.address.line2} · {BUSINESS.address.city}
            </span>
          </Reveal>

          <h1
            className="font-display-lg mb-8 max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            <StaggeredText text={BUSINESS.tagline} startDelay={0.15} wordDelay={0.05} />
          </h1>

          <Reveal delay={0.5}>
            <p className="font-body-lg text-body-lg text-on-primary/80 mb-12 max-w-xl">{BUSINESS.description}</p>
          </Reveal>

          <Reveal delay={0.62}>
            <div className="flex flex-col sm:flex-row gap-4 mb-16 sm:w-fit">
              <MagneticButton>
                <Link
                  className="inline-flex justify-center items-center bg-secondary-container text-on-secondary-container px-8 py-4 rounded hover:bg-secondary-fixed transition-colors duration-200 ease-out font-label-caps text-label-caps uppercase tracking-widest w-full"
                  to="/book-consultation"
                >
                  Book Your Consultation
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  className="inline-flex justify-center items-center border border-on-primary/40 text-on-primary px-8 py-4 rounded hover:bg-on-primary/10 transition-colors duration-200 ease-out font-label-caps text-label-caps uppercase tracking-widest bg-transparent w-full backdrop-blur-sm"
                  to="/treatments"
                >
                  Explore Treatments
                </Link>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.75}>
            <div className="flex flex-wrap gap-x-14 gap-y-6 pt-10 border-t border-on-primary/20">
              {BUSINESS.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display-lg text-3xl leading-none mb-2 text-secondary-container">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="font-label-caps text-label-caps text-on-primary/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-gutter">
        <SupabaseSetupNotice className="mt-8" />
      </div>

      {/* ---------- STATEMENT - a quiet, confident full-bleed line, not a
          decorated block. Generous whitespace does the work. ---------- */}
      <section className="bg-background py-28 md:py-40 px-gutter">
        <Reveal className="max-w-3xl mx-auto text-center" as="div">
          <p
            className="font-display-lg text-primary"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            Aesthetic medicine should feel effortless — and be genuinely safe.
          </p>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.3em] mt-10">
            The Pearl Philosophy
          </p>
        </Reveal>
      </section>

      {/* ---------- CERTIFICATIONS - a slow, continuous ticker rather than a
          static row. The credentials still speak for themselves; the
          motion just keeps this band from reading as a dead stretch
          between two much louder sections. ---------- */}
      <section className="bg-surface-container-low py-16 border-t border-b border-surface-container-high/50 overflow-hidden">
        <Reveal className="text-center mb-10 px-gutter" as="div">
          <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.2em]">
            Excellence in Clinical Practice
          </h3>
        </Reveal>
        <Marquee duration={26}>
          {BUSINESS.certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-primary">verified</span>
              <span className="font-body-md text-body-md text-primary font-medium whitespace-nowrap">{cert}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ---------- TREATMENTS - editorial layout, not a uniform grid ---------- */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop px-gutter relative isolate" id="treatments">
        <div className="max-w-container-max mx-auto">
          <SectionHeader
            eyebrow="Aesthetic & Medical Services"
            title="From Injectables to General Medicine — All in One Clinic"
            linkTo="/treatment-menu"
            linkLabel="View Full Menu"
          />

          {featured && (
            <Reveal delay={0.05}>
              <Link
                to="/treatment-menu"
                className="group relative flex flex-col md:flex-row items-stretch bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden mb-8 hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-500"
              >
                <div className="md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden relative">
                  {featured.image && (
                    <img
                      src={featured.image}
                      alt={featured.name}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 md:bg-gradient-to-r md:from-transparent md:to-surface-container-lowest/0" />
                </div>
                <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest mb-4">Signature Treatment</span>
                  <h3 className="font-headline-md text-headline-md text-primary mb-4">{featured.name}</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">{featured.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md text-primary font-medium">
                      {featured.priceLabel || `From AED ${featured.priceFrom}`}
                    </span>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {rest.map((t, i) => (
              <Reveal key={t.id} delay={0.08 * (i % 3)}>
                <Link
                  to="/treatment-menu"
                  className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {t.image && (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-xl">{t.icon}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{t.name}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">{t.description}</p>
                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                      {t.priceLabel || `from AED ${t.priceFrom}`}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- DIFFERENTIATORS ---------- */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop px-gutter bg-surface-container-low">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter md:gap-16">
          <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
            <SectionHeader
              eyebrow="The Pearl Difference"
              title="Luxury Care, Grounded in Real Medicine"
              className="mb-0"
            />
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {BUSINESS.differentiators.map((d, i) => (
              <Reveal key={d.title} delay={0.08 * i}>
                <span className="font-display-lg text-primary/25 text-4xl block mb-3 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-body-lg text-body-lg text-primary font-medium mb-2">{d.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{d.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS - single rotating editorial quote ---------- */}
      <section className="relative py-section-padding-mobile md:py-section-padding-desktop px-gutter overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] opacity-[0.05] blur-3xl pointer-events-none" aria-hidden="true">
          <OrganicBlob colorFrom="#0e3a30" colorTo="#fed65b" />
        </div>
        <div className="relative max-w-container-max mx-auto">
          <SectionHeader eyebrow="Patient Stories" title="Loved by Our Patients" align="center" />
          <Reveal delay={0.1} as="div">
            <TestimonialCarousel testimonials={BUSINESS.testimonials} />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
