import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import PageHero from "../components/PageHero";
import Breadcrumb from "../components/Breadcrumb";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";

const CANDIDATES = [
  { icon: "water_drop", title: "Dull Skin", body: "Restores radiance and vitality to tired, lacklustre complexions." },
  { icon: "blur_on", title: "Congestion", body: "Deeply clears blocked pores and reduces the appearance of blackheads." },
  { icon: "timeline", title: "Fine Lines", body: "Plumps the skin with hydration, smoothing out superficial wrinkles." },
];

const STEPS = [
  {
    title: "Consultation",
    body: "A brief assessment of your skin concerns by our clinical team, used to choose the serum boosters for your treatment.",
  },
  {
    title: "The Treatment",
    body: "A relaxing 30–45 minute process: cleansing, gentle peeling, painless extraction, then intense hydration.",
  },
  {
    title: "Aftercare",
    body: "SPF applied and a short guide to maintaining your post-treatment glow. No downtime required.",
  },
];

const FAQS = [
  {
    q: "Does the extraction process hurt?",
    a: "Not at all. The HydraFacial uses a gentle vacuum-like suction that is completely painless, and is often described as a light massage on the face.",
  },
  {
    q: "How soon will I see results?",
    a: "Many patients see visible skin refinement and an even, radiant tone after a single treatment. The smoothness and hydration typically last five to seven days, often longer.",
  },
  {
    q: "How often should I get a HydraFacial?",
    a: "For lasting results we recommend one treatment per month. That frequency is what improves the appearance of fine lines, wrinkles and hyperpigmentation over time.",
  },
];

const SPECS = [
  { label: "Duration", value: "45 min" },
  { label: "Downtime", value: "None" },
  { label: "Starting from", value: "AED 650" },
];

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
        <span className="font-body-lg text-body-lg text-primary font-medium group-hover:text-surface-tint transition-colors">
          {question}
        </span>
        <span
          className="material-symbols-outlined text-primary transition-transform duration-300 flex-shrink-0"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
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

function Block({ title, children, delay = 0 }) {
  return (
    <Reveal as="section" delay={delay}>
      <h2
        className="font-display-lg text-primary mb-7"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2, letterSpacing: "-0.015em" }}
      >
        {title}
      </h2>
      {children}
    </Reveal>
  );
}

export default function HydrafacialDetail() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Signature Treatment"
        title="HydraFacial"
        lede="A medical-grade resurfacing treatment that clears out your pores and floods the skin with hydration — the glow arrives the same day."
        image="https://images.unsplash.com/photo-1713085085470-fba013d67e65?auto=format&fit=crop&w=1600&q=85"
        imageAlt="A HydraFacial treatment room"
        breadcrumb={
          <Breadcrumb
            tone="dark"
            trail={[
              { label: "Home", to: "/" },
              { label: "Treatments", to: "/treatments" },
              { label: "HydraFacial" },
            ]}
          />
        }
        actions={
          <>
            <MagneticButton>
              <Link
                to="/book-consultation"
                className="inline-flex justify-center items-center bg-secondary-container text-on-secondary-container px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors w-full"
              >
                Book This Treatment
              </Link>
            </MagneticButton>
            <span className="inline-flex items-center font-headline-sm text-headline-sm text-secondary-container sm:ml-4">
              from AED 650
            </span>
          </>
        }
      />

      <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-20">
          <div className="lg:col-span-8 flex flex-col gap-20 md:gap-24">
            <Block title="What it is">
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                The HydraFacial is a multi-step, clinical-grade facial designed to cleanse, exfoliate, extract
                and hydrate the skin in a single session. Its patented Vortex-Fusion technology painlessly lifts
                impurities out of the pores while saturating the surface with antioxidants and peptides. It sits
                squarely between a soothing spa therapy and advanced medical aesthetics — visible results,
                without downtime.
              </p>
            </Block>

            <Block title="Ideal candidates" delay={0.05}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                {CANDIDATES.map((c) => (
                  <div
                    key={c.title}
                    className="bg-surface-container-lowest p-7 rounded-xl border border-outline-variant/30 transition-all duration-500 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <span className="material-symbols-outlined text-primary text-3xl mb-5 block">{c.icon}</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{c.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{c.body}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block title="What to expect" delay={0.05}>
              {/* A plain numbered rail rather than a zig-zag timeline - three
                  steps in order don't need the choreography. */}
              <ol className="relative border-l border-outline-variant/40 ml-5">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="relative pl-10 pb-10 last:pb-0">
                    <span
                      className={`absolute -left-5 top-0 w-10 h-10 rounded-full flex items-center justify-center font-label-caps text-label-caps border-4 border-background ${
                        i === 0 ? "bg-primary text-on-primary" : "bg-surface-container text-primary"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-2 pt-1.5">{step.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">{step.body}</p>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Clinical results" delay={0.05}>
              <BeforeAfterSlider
                beforeSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBYpODDaSYq-b2pxwjg8wsMo3Dz3XgZtkFu3-Vs2qGZYqz_Uk5OmkCnkS1TMKWM7Tgs9J3D_9rvsbWSOa8-6Mv-iZIbOmUBckvDgp-QM7Wxv3VezQNxZXrLZN4_vs5vwh6ZIKiwW5kPiIzlvzSNDjWJZBqBc5XsNyqGtuz8PatHmiW-VdKDHlfxOTjeOuILDrPsPTApa-jV60TtVaYxJulTlUImCmdJqdaMrfAzT77LTNj72aK81OtR"
                afterSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCqw7zbXxckTVHzEB8c6RGwSpHWAOnCqqo8EEEgCSXX_qvFlPM2ZPZmkdAWXmZDIfFBwkjDz7ajPRgcyD2Mr5meqvKLgby6ywjv1KX8JnSzwkWJUFiTR9xb4Qo0-qwv_C1ZTbpWi8fepV7DlCQwuu4tZsBPB2iqynklly-ye-BUdLmpHUr9iUf73AYeAbwupt0xPG6cisitjLIrNmtx2dgMMqKl0RCAhfYG8YMNjqXucviXgS2qfp1k"
              />
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mt-4 text-center">
                Drag to compare
              </p>
              <p className="font-body-md text-sm text-on-surface-variant mt-6">
                Individual results vary. Shown with patient consent and representative of a typical outcome,
                not a guarantee.
              </p>
            </Block>

            <Block title="Frequently asked questions" delay={0.05}>
              <div className="border-t border-outline-variant/40">
                {FAQS.map((faq) => (
                  <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </Block>
          </div>

          {/* ---------- BOOKING CARD ---------- */}
          <aside className="lg:col-span-4">
            <Reveal delay={0.1} className="lg:sticky lg:top-32" as="div">
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30">
                <h2 className="font-headline-sm text-headline-sm text-primary mb-2">HydraFacial</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                  Medical-grade resurfacing and hydration.
                </p>

                <dl className="mb-8">
                  {SPECS.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex justify-between items-baseline py-4 ${
                        i < SPECS.length - 1 ? "border-b border-outline-variant/30" : ""
                      }`}
                    >
                      <dt className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                        {spec.label}
                      </dt>
                      <dd className="font-body-lg text-body-lg text-primary font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <Link
                  to="/book-consultation"
                  className="w-full inline-flex justify-center items-center bg-secondary-container text-on-secondary-container py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors"
                >
                  Book Appointment
                </Link>
                <p className="text-center mt-4 font-body-md text-sm text-on-surface-variant">
                  Consultation included prior to treatment.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      <CTABand />
    </>
  );
}
