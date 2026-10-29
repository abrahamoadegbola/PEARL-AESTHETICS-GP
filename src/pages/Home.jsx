import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import BUSINESS from "../data/business";
import DOCTORS from "../data/doctors";
import SERVICE_CATEGORIES from "../data/categories";
import ARTICLES from "../data/insights";
import useDbCollection from "../hooks/useDbCollection";
import useInstagramFeed, { facilityPosts, resultPosts } from "../hooks/useInstagramFeed";
import useGoogleReviews from "../hooks/useGoogleReviews";
import InstagramCard, { ReelLightbox, isPlayable } from "../components/InstagramCard";
import { getActiveTreatments } from "../lib/db";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";
import Marquee from "../components/motion/Marquee";
import CountUp from "../components/motion/CountUp";
import HeroVideo from "../components/HeroVideo";
import SectionHeader from "../components/SectionHeader";
import CTABand from "../components/CTABand";
import { useDeclareDarkHero } from "../context/DarkHeroContext";

// The hero headline broken into stacked lines of varying weight/size,
// rather than one run-on sentence - a layered, editorial reveal instead
// of a single block of type.
const HERO_LINES = [
  { text: "Where", weight: 400 },
  { text: "Medical Excellence", weight: 600 },
  { text: "Meets Timeless Beauty", weight: 300 },
];

// A first-time visitor's actual path through the clinic, not an internal
// process diagram - each step is something the site itself already lets
// them do (book online, message on WhatsApp, show up).
const JOURNEY_STEPS = [
  {
    icon: "chat",
    title: "Get in Touch",
    body: "Book online or message us on WhatsApp — most enquiries get a same-day reply.",
  },
  {
    icon: "psychology",
    title: "Complimentary Consultation",
    body: "An unhurried assessment with a practitioner, before anything is booked in.",
  },
  {
    icon: "spa",
    title: "Your Treatment",
    body: "Delivered by German board-certified physicians, in a premium setting.",
  },
  {
    icon: "favorite",
    title: "Aftercare & Follow-Up",
    body: "We check in after treatment — your result matters as much as the day itself.",
  },
];

// Generic concern categories, not per-patient claims - the same kind of
// topic words used across the treatment menu and shop filters, just
// gathered into one scrolling line.
const CONCERNS = [
  "Fine Lines",
  "Volume Loss",
  "Pigmentation",
  "Acne & Pores",
  "Hydration",
  "Jawline Contouring",
  "Skin Laxity",
  "Redness",
];

// One icon per BUSINESS.differentiators entry, in the same order - kept
// alongside the copy instead of inside business.js since it's a purely
// visual concern, not a business fact.
const DIFFERENTIATOR_ICONS = ["workspace_premium", "event_available", "language", "location_on"];

const FAQS = [
  {
    q: "Is my first consultation really free?",
    a: "Yes. Every new patient starts with a complimentary, unhurried consultation — nothing is booked in until you've spoken with a practitioner.",
  },
  {
    q: "What languages does the team speak?",
    a: "Care is available in English, Arabic, Hindi, Urdu and more — each doctor's profile lists the languages they personally speak.",
  },
  {
    q: "Where is the clinic, and how do I get there?",
    a: (
      <>
        {BUSINESS.address.full}. It's easily reached from JLT, Motor City, Al Barsha, TECOM and Al Quoz.{" "}
        <a
          href={BUSINESS.address.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline underline-offset-4 hover:text-primary-container"
        >
          Open in Google Maps
        </a>
      </>
    ),
  },
  {
    q: "What are your opening hours?",
    a: `We're open every day, ${BUSINESS.hours.openTime} to ${BUSINESS.hours.closeTime}.`,
  },
  {
    q: "How do I book, and can I message you directly?",
    a: "Book online in under a minute, or message us on WhatsApp — most enquiries get a same-day reply.",
  },
];

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
      <span className="material-symbols-outlined text-primary text-5xl mb-6 inline-block" style={{ fontVariationSettings: "'FILL' 1" }}>
        format_quote
      </span>
      <motion.div key={index} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex justify-center text-secondary mb-6">
          {Array.from({ length: t.rating || 5 }).map((_, i) => (
            <span key={i} className="material-symbols-outlined fill text-xl">star</span>
          ))}
        </div>
        <p className="font-display-lg text-headline-sm md:text-headline-md text-on-surface leading-snug mb-8">"{t.quote}"</p>
        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-10 rounded-full bg-primary/15 text-primary-container flex items-center justify-center font-label-caps text-label-caps font-bold flex-shrink-0">
            {t.name.charAt(0)}
          </span>
          <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-left">
            {t.name} · {t.source}
            {t.time ? ` · ${t.time}` : ""}
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

// A Facilities photo. Most come from reels, so tapping one plays the reel
// right here instead of sending the visitor off to Instagram.
function FacilityTile({ post, playlist, info, large }) {
  const [open, setOpen] = useState(false);
  const playable = isPlayable(post);
  const className = "group relative block w-full h-full min-h-[18rem] rounded-2xl overflow-hidden bg-surface-container text-left";
  const content = (
    <>
      <img
        src={post.image}
        alt={info.title}
        style={info.objectPosition ? { objectPosition: info.objectPosition } : undefined}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      {playable && (
        <span className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform group-hover:scale-110">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
        <h3 className={`font-headline-sm mb-1.5 ${large ? "text-headline-md" : "text-headline-sm"}`}>{info.title}</h3>
        <p className="font-body-md text-sm text-white/80 max-w-md">{info.description}</p>
      </div>
    </>
  );

  if (!playable) {
    return (
      <a href={post.permalink} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-label={`Play video: ${info.title}`}>
        {content}
      </button>
      <ReelLightbox post={post} playlist={playlist} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <div className="border-b border-outline-variant/40">
      <button
        type="button"
        aria-expanded={open}
        className="w-full py-6 flex justify-between items-center gap-6 text-left group active:scale-[0.99] transition-transform"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-body-lg text-body-lg text-on-surface font-medium group-hover:text-primary-container transition-colors">
          {question}
        </span>
        <span
          className="material-symbols-outlined text-primary transition-transform duration-300 flex-shrink-0"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          add
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-6 font-body-md text-body-md text-on-surface-variant max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [treatments] = useDbCollection(getActiveTreatments);
  const reduceMotion = useReducedMotion();
  useDeclareDarkHero();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(heroScroll, [0, 1], ["0%", reduceMotion ? "0%" : "22%"]);
  const heroContentY = useTransform(heroScroll, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const featured = treatments.find((t) => t.featured) || treatments[0];
  const rest = treatments.filter((t) => t.id !== featured?.id);
  const { posts: instagramPosts } = useInstagramFeed();
  const reviews = useGoogleReviews();
  const featuredTestimonial = reviews.reviews[0];
  // Before/afters first, then the latest reels to fill the row.
  const previewResults = [
    ...resultPosts(instagramPosts),
    ...instagramPosts.filter((p) => p.type === "reel" && !p.tags?.includes("result")),
  ].slice(0, 4);
  const facilities = facilityPosts(instagramPosts).slice(0, 4);
  const founder = DOCTORS.find((d) => d.id === "hamid-balogun") || DOCTORS[0];
  const restOfTeam = DOCTORS.filter((d) => d.id !== founder?.id);
  const previewArticles = ARTICLES.slice(0, 3);

  return (
    <>
      {/* ---------- HERO - a full-width photo/video behind the headline
          with text laid directly over it under a neutral scrim, rather
          than beside it in a card. The tagline stacks as three lines of
          different weight instead of one run-on sentence. ---------- */}
      <section
        ref={heroRef}
        className="relative isolate -mt-[88px] md:-mt-[104px] flex min-h-[100svh] flex-col items-center justify-center text-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 -z-20"
          style={{ y: videoY }}
          initial={reduceMotion ? false : { scale: 1.15 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroVideo
            className="h-full w-full"
            alt="A clinical skin treatment in progress at Pearl Aesthetics"
            videoSrc="https://videos.pexels.com/video-files/30365364/13014604_1440_2560_24fps.mp4"
            posterSrc="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85"
          />
        </motion.div>
        {/* Layered scrim: a vertical pass for top/bottom legibility, plus a
            soft radial glow at centre-bottom so the type sits on the
            deepest part of the image rather than a flat wash. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/75 via-navy/25 to-navy/80" />
        <div
          className="absolute inset-0 -z-10 opacity-70"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(10,43,35,0.55), transparent 70%)" }}
        />
        {/* A faint gold glow low in the frame - the one spot of colour in an
            otherwise monochrome green scrim, so the brand accent is felt
            before it's ever read in text. */}
        <div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] -z-10 opacity-30 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(254,214,91,0.6), transparent 70%)" }}
          aria-hidden="true"
        />

        <motion.div
          className="relative z-10 max-w-3xl px-gutter pt-32 pb-24 md:pt-40 md:pb-28 text-white"
          style={reduceMotion ? undefined : { y: heroContentY, opacity: heroContentOpacity }}
        >
          <Reveal delay={0.05}>
            <a
              href={BUSINESS.address.mapsUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${BUSINESS.name} on Google Maps`}
              className="inline-flex items-center gap-2.5 mb-8 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-label-caps text-label-caps uppercase tracking-[0.25em] hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim">location_on</span>
              {BUSINESS.address.line2} · {BUSINESS.address.city}
              <span className="material-symbols-outlined text-[14px] opacity-70">arrow_outward</span>
            </a>
          </Reveal>

          <h1 className="mb-8">
            {HERO_LINES.map((line, i) => (
              <Reveal key={line.text} delay={0.15 + i * 0.12} as="div">
                <span
                  className={`block ${i === 1 ? "font-serif-display text-secondary-fixed" : "font-display-lg"}`}
                  style={
                    i === 1
                      ? { fontWeight: 500, fontSize: "clamp(3.25rem, 7.5vw, 6rem)", lineHeight: 1, letterSpacing: "0.005em" }
                      : { fontWeight: line.weight, fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }
                  }
                >
                  {line.text}
                </span>
              </Reveal>
            ))}
          </h1>

          <Reveal delay={0.55}>
            <p className="font-body-lg text-body-lg text-white/85 mb-10 max-w-xl mx-auto">{BUSINESS.description}</p>
          </Reveal>

          <Reveal delay={0.65}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <MagneticButton>
                <Link
                  className="inline-flex justify-center items-center bg-primary text-on-primary px-8 py-4 rounded hover:bg-primary-container transition-all duration-200 ease-out font-label-caps text-label-caps uppercase tracking-widest w-full shadow-[0_8px_32px_-4px_rgba(254,214,91,0.5)] hover:shadow-[0_8px_40px_-2px_rgba(254,214,91,0.65)]"
                  to="/book-consultation"
                >
                  Book Your Consultation
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  className="inline-flex justify-center items-center border border-white/40 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded hover:bg-white/15 transition-colors duration-200 ease-out font-label-caps text-label-caps uppercase tracking-widest w-full"
                  to="/treatments"
                >
                  Explore Treatments
                </Link>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.78}>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 pt-8 border-t border-white/20">
              {BUSINESS.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display-lg text-3xl leading-none mb-1.5">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="font-label-caps text-label-caps text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>

        {!reduceMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
            style={{ opacity: heroContentOpacity }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <span className="font-label-caps text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
          </motion.div>
        )}
      </section>

      <div className="max-w-container-max mx-auto px-gutter pt-8">
        <SupabaseSetupNotice />
      </div>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <SectionHeader eyebrow="How It Works" title="From First Hello to Aftercare" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {JOURNEY_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={0.08 * i}>
                <span className="font-display-lg text-primary/25 text-6xl block mb-4 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary-container mb-5">
                  <span className="material-symbols-outlined">{step.icon}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{step.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CONCERN TICKER ---------- */}
      <section className="py-14 border-y border-outline-variant/30 overflow-hidden">
        <Marquee duration={32}>
          {CONCERNS.map((concern) => (
            <span key={concern} className="flex items-center gap-6 whitespace-nowrap">
              <span className="font-display-lg text-on-surface/50 text-2xl md:text-3xl">{concern}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* ---------- PULL QUOTE ---------- */}
      {featuredTestimonial && (
        <section className="relative py-section-padding-mobile md:py-section-padding-desktop px-gutter bg-surface-container-lowest overflow-hidden">
          <Reveal className="max-w-4xl mx-auto text-center relative z-10" as="div">
            <span
              className="material-symbols-outlined text-primary text-5xl mb-8 inline-block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>
            <p
              className="font-display-lg text-on-surface"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", lineHeight: 1.28, letterSpacing: "-0.01em", fontWeight: 400 }}
            >
              "{featuredTestimonial.quote}"
            </p>
            <div className="flex items-center justify-center gap-3 mt-10">
              <span className="w-11 h-11 rounded-full bg-primary/15 text-primary-container flex items-center justify-center font-label-caps text-label-caps font-bold flex-shrink-0">
                {featuredTestimonial.name.charAt(0)}
              </span>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                {featuredTestimonial.name} · {featuredTestimonial.source}
              </p>
            </div>
          </Reveal>
        </section>
      )}

      {/* ---------- CATEGORY GRID ---------- */}
      <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto">
          <SectionHeader eyebrow="Explore" title="Every Way We Can Help" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.id} delay={0.06 * (i % 3)}>
                <Link
                  to={cat.href}
                  className="group flex flex-col h-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary-container mb-6 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{cat.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">{cat.blurb}</p>
                  <span className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary-container uppercase tracking-widest">
                    Explore
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CERTIFICATIONS TICKER ---------- */}
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
              <span className="font-body-md text-body-md text-on-surface font-medium whitespace-nowrap">{cert}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ---------- TREATMENTS ---------- */}
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
                className="group relative flex flex-col md:flex-row items-stretch bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden mb-8 hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-500"
              >
                <div className="md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden relative">
                  {featured.image && (
                    <img
                      src={featured.image}
                      alt={featured.name}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 md:bg-gradient-to-r md:from-transparent md:to-surface-container-lowest/0" />
                </div>
                <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                  <span className="font-label-caps text-label-caps text-primary-container uppercase tracking-widest mb-4">Signature Treatment</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-4">{featured.name}</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">{featured.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md text-on-surface font-medium">
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
                  className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {t.image && (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined text-xl">{t.icon}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{t.name}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">{t.description}</p>
                    <span className="font-label-caps text-label-caps text-primary-container uppercase tracking-widest">
                      {t.priceLabel || `from AED ${t.priceFrom}`}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- RESULTS PREVIEW - straight from the clinic's Instagram,
          so new before/afters and reels show up without a code change. ---------- */}
      {previewResults.length > 0 && (
        <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low">
          <div className="max-w-container-max mx-auto">
            <SectionHeader eyebrow="Real Outcomes" title="Patient Results & Videos" linkTo="/results" linkLabel="View Full Gallery" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-gutter">
              {previewResults.map((post, i) => (
                <Reveal key={post.id} delay={0.08 * i} as="div">
                  <InstagramCard post={post} playlist={previewResults} />
                </Reveal>
              ))}
            </div>
            <p className="font-body-md text-sm text-on-surface-variant mt-8 max-w-2xl">
              Individual results vary. Images are of real Pearl patients, shared with their consent.
            </p>
          </div>
        </section>
      )}

      {/* ---------- DOCTOR SPOTLIGHT ---------- */}
      {founder && (
        <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop">
          <div className="max-w-container-max mx-auto">
            <SectionHeader eyebrow="Founder & Medical Director" title="Led by Real Medicine" align="center" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16 items-center max-w-5xl mx-auto">
              <Reveal className="lg:col-span-5" as="div">
                <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden">
                  <img
                    src={founder.heroImage}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-7" as="div">
                <span className="font-label-caps text-label-caps text-primary-container uppercase tracking-[0.25em] mb-5 block">
                  {founder.title}
                </span>
                <h3
                  className="font-display-lg text-on-surface mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)", lineHeight: 1.2, letterSpacing: "-0.015em" }}
                >
                  {founder.name}
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">{founder.bio[0]}</p>
                <div className="flex flex-wrap gap-x-10 gap-y-5 mb-9 pt-2">
                  {[
                    { icon: "workspace_premium", label: founder.badge },
                    { icon: "language", label: founder.languages },
                  ].map((fact) => (
                    <span key={fact.label} className="flex items-center gap-2.5 text-primary-container">
                      <span className="material-symbols-outlined text-[20px]">{fact.icon}</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">{fact.label}</span>
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/doctors/${founder.id}`}
                    className="inline-flex justify-center items-center bg-primary text-on-primary px-7 py-3.5 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors active:scale-[0.98]"
                  >
                    Full Profile
                  </Link>
                  <Link
                    to="/doctors"
                    className="inline-flex justify-center items-center gap-2 border border-outline-variant text-on-surface px-7 py-3.5 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-surface-container-low transition-colors active:scale-[0.98]"
                  >
                    Meet the Whole Team
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {restOfTeam.length > 0 && (
        <section className="pb-section-padding-mobile md:pb-section-padding-desktop overflow-hidden">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="flex overflow-x-auto gap-gutter pb-4 snap-x hide-scrollbar">
              {restOfTeam.map((doc, i) => (
                <Reveal key={doc.id} delay={0.06 * i} className="flex-none w-[220px] sm:w-[240px] snap-start" as="div">
                  <Link to={`/doctors/${doc.id}`} className="group block">
                    <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl mb-4 bg-surface-container">
                      <img
                        alt={doc.name}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        src={doc.cardImage}
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 group-hover:text-primary-container transition-colors">
                      {doc.name}
                    </h3>
                    <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                      {doc.title}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- FACILITIES - real rooms, from the clinic's own reels.
          The entrance runs large; the rooms sit beside it. ---------- */}
      {facilities.length > 0 && (
        <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest" id="facilities">
          <div className="max-w-container-max mx-auto">
            <SectionHeader
              eyebrow="Our Facilities"
              title="Inside the Clinic"
              lede="A premium, DHA-licensed clinic in the heart of JVC, with private treatment suites, GP consultation rooms and a calm patient lounge."
              linkTo="/results"
              linkLabel="See the gallery"
            />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              {facilities.map((post, i) => {
                const info = post.facility || { title: post.title, description: post.caption };
                return (
                  <Reveal
                    key={post.id}
                    delay={0.07 * i}
                    as="div"
                    className={i === 0 ? "md:col-span-6 md:row-span-2" : "md:col-span-6 lg:col-span-3"}
                  >
                    <FacilityTile post={post} playlist={facilities} info={info} large={i === 0} />
                  </Reveal>
                );
              })}
              <Reveal delay={0.3} as="div" className="md:col-span-6 lg:col-span-3">
                <a
                  href={BUSINESS.address.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex lg:flex-col lg:items-start h-full min-h-[10rem] lg:min-h-[18rem] items-center justify-between gap-6 rounded-2xl bg-primary text-on-primary p-7 md:p-8 hover:bg-primary-container transition-colors"
                >
                  <div>
                    <p className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary-container mb-2">Visit Us</p>
                    <p className="font-headline-sm text-headline-sm mb-1">{BUSINESS.address.line1}</p>
                    <p className="font-body-md text-body-md opacity-80">
                      {BUSINESS.address.line2}, {BUSINESS.address.city} · {BUSINESS.hours.display}
                    </p>
                  </div>
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <span className="material-symbols-outlined">directions</span>
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ---------- WHY CHOOSE US ---------- */}
      <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <SectionHeader eyebrow="The Pearl Difference" title="Why Patients Choose Us" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {BUSINESS.differentiators.map((d, i) => (
              <Reveal key={d.title} delay={0.07 * i}>
                <div className="h-full bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary-container mb-6">
                    <span className="material-symbols-outlined">{DIFFERENTIATOR_ICONS[i % DIFFERENTIATOR_ICONS.length]}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{d.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{d.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- REVIEWS ---------- */}
      <section className="relative py-section-padding-mobile md:py-section-padding-desktop px-gutter overflow-hidden">
        <div className="relative max-w-container-max mx-auto">
          <SectionHeader eyebrow="Google Reviews" title="Loved by Our Patients" align="center" />
          <Reveal delay={0.05} as="div" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-12 -mt-6">
            <span className="inline-flex items-center gap-2 font-body-md text-body-md text-on-surface">
              <span className="font-display-lg text-2xl text-primary">{Number(reviews.rating).toFixed(1)}</span>
              <span className="flex text-secondary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill text-[18px]">star</span>
                ))}
              </span>
              <span className="text-on-surface-variant">
                on Google{reviews.userRatingCount ? ` · ${reviews.userRatingCount} reviews` : ""}
              </span>
            </span>
            <a
              href={BUSINESS.google.reviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="font-label-caps text-label-caps uppercase tracking-widest text-primary underline underline-offset-4 hover:text-primary-container"
            >
              Read all reviews
            </a>
            <a
              href={BUSINESS.google.writeReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant underline underline-offset-4 hover:text-primary"
            >
              Leave a review
            </a>
          </Reveal>
          <Reveal delay={0.1} as="div">
            <TestimonialCarousel testimonials={reviews.reviews} />
          </Reveal>
        </div>
      </section>

      {/* ---------- INSIGHTS PREVIEW ---------- */}
      {previewArticles.length > 0 && (
        <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low">
          <div className="max-w-container-max mx-auto">
            <SectionHeader eyebrow="Journal" title="Insights & Advice" linkTo="/insights" linkLabel="Read the Journal" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {previewArticles.map((article, i) => (
                <Reveal key={article.id} delay={0.07 * i} as="div">
                  <article className="group flex flex-col h-full bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 transition-all duration-500 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                    <Link to="/insights" className="block aspect-[4/3] overflow-hidden relative">
                      <img
                        className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                        alt={article.imageAlt}
                        src={article.image}
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1.5 bg-surface/90 glass-nav rounded-full font-label-caps text-label-caps text-primary-container uppercase tracking-widest">
                        {article.category}
                      </span>
                    </Link>
                    <div className="p-7 flex flex-col flex-grow">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 line-clamp-2">
                        <Link to="/insights" className="group-hover:text-primary-container transition-colors">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2 flex-grow">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-5 border-t border-outline-variant/30 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                        <span>{article.readingTime}</span>
                        <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- FAQ ---------- */}
      <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-3xl mx-auto">
          <SectionHeader eyebrow="Good to Know" title="Frequently Asked Questions" align="center" />
          <Reveal className="border-t border-outline-variant/40" as="div">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
