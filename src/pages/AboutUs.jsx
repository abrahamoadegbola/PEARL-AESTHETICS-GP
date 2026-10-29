import { Link } from "react-router-dom";
import DOCTORS from "../data/doctors";
import BUSINESS from "../data/business";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";
import MagneticButton from "../components/motion/MagneticButton";
import Marquee from "../components/motion/Marquee";

const PILLARS = [
  {
    icon: "science",
    title: "Evidence-Based Science",
    body: "Evidence-based medicine at every step: clinically proven technologies and protocols, grounded in rigorous research, so efficacy and safety always come before novelty.",
    wide: true,
  },
  {
    icon: "verified",
    title: "Unwavering Integrity",
    body: "Honest assessments and realistic expectations. We prioritise your long-term wellbeing over short-term trends.",
  },
  {
    icon: "diamond",
    title: "Premium Luxury",
    body: "A tranquil environment designed to soothe the senses, elevating a standard medical visit into something restorative.",
  },
  {
    icon: "favorite",
    title: "Personalised Care",
    body: "Every patient journey is bespoke. From first consultation to post-treatment follow-up, your comfort and privacy are looked after at each step.",
    wide: true,
  },
];

const FACILITY = [
  {
    src: "https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?auto=format&fit=crop&w=1400&q=85",
    alt: "Treatment room",
    className: "md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto",
  },
  {
    src: "https://images.unsplash.com/photo-1611920630905-426e08849c32?auto=format&fit=crop&w=1000&q=85",
    alt: "Lounge area",
    className: "md:col-span-5 aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1616750819574-7e38aa8046fa?auto=format&fit=crop&w=1000&q=85",
    alt: "Product display",
    className: "md:col-span-5 aspect-[4/3]",
  },
];

export default function AboutUs() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Our Vision"
        title="Redefining clinical excellence"
        lede="Where the highest standards of medical science meet the refined comfort of a premium luxury experience."
        image="https://images.unsplash.com/photo-1595871151608-bc7abd1caca3?auto=format&fit=crop&w=1600&q=85"
        imageAlt={`${BUSINESS.name} interior`}
        actions={
          <>
            <MagneticButton>
              <Link
                to="/treatments"
                className="inline-flex justify-center items-center bg-secondary-container text-on-secondary-container px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors w-full"
              >
                Explore Our Services
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                to="/doctors"
                className="inline-flex justify-center items-center border border-on-primary/40 px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-on-primary/10 transition-colors w-full backdrop-blur-sm"
              >
                Meet the Doctors
              </Link>
            </MagneticButton>
          </>
        }
      />

      {/* ---------- STORY ---------- */}
      <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-20 items-center">
          <Reveal className="lg:col-span-5 order-2 lg:order-1" as="div">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.25em] mb-4 block">
              Our Story
            </span>
            <h2
              className="font-display-lg text-primary mb-7"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
            >
              A new paradigm in aesthetic medicine
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              {BUSINESS.shortName} was founded on a simple idea: medicine should help you live better for
              longer, not just treat what's wrong today. We bring together aesthetics, longevity medicine and
              evidence-based biohacking, from advanced diagnostics and IV therapy to regenerative skin
              treatments, in a calm space that feels nothing like a traditional clinic.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-9">
              {BUSINESS.shortName} is led by a German board-certified Family-Medicine consultant with Harvard
              postgraduate training, who set out to build a clinic where cutting-edge, evidence-based treatment
              is delivered with the care and attention to detail of high-end hospitality. Clinical precision and
              genuine comfort are not mutually exclusive — together they are the foundation of every patient
              journey here.
            </p>
            <Link
              className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary uppercase tracking-widest hover:text-surface-tint transition-colors group"
              to="/doctors"
            >
              Our Expertise
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2" as="div">
            <div className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-xl">
              <img
                alt="Clinical precision at Pearl"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1761718209835-c8586b7dcac0?auto=format&fit=crop&w=1200&q=85"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- PILLARS ---------- */}
      <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <SectionHeader
            eyebrow="Core Principles"
            title={`The pillars of ${BUSINESS.shortName}`}
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {PILLARS.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={0.07 * i}
                className={pillar.wide ? "md:col-span-2" : "md:col-span-1"}
                as="div"
              >
                <div className="group h-full bg-surface-container-lowest p-9 rounded-xl border border-outline-variant/30 transition-all duration-500 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-7 transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                    <span className="material-symbols-outlined">{pillar.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-3">{pillar.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FACILITY ---------- */}
      <section className="px-gutter py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto">
          <SectionHeader
            eyebrow="The Facility"
            title="A space designed for healing"
            linkTo="/results"
            linkLabel="View Full Gallery"
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter md:auto-rows-[280px]">
            {FACILITY.map((shot, i) => (
              <Reveal key={shot.alt} delay={0.08 * i} className={shot.className} as="div">
                <div className="h-full w-full overflow-hidden rounded-xl group">
                  <img
                    alt={shot.alt}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    src={shot.src}
                    loading="lazy"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CREDENTIALS - a continuous ticker, matching the one on
          the homepage, so the two pages share the same closing rhythm. ---------- */}
      <section className="py-16 bg-primary text-on-primary overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter text-center mb-10">
          <p className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-secondary-container">
            Certified excellence &amp; safety
          </p>
        </div>
        <Marquee duration={24}>
          {BUSINESS.certifications.map((cert) => (
            <div key={cert} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-secondary-container">verified</span>
              <span className="font-body-md text-body-md whitespace-nowrap">{cert}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ---------- TEAM ---------- */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter">
          <SectionHeader
            eyebrow="The Experts"
            title="Meet our specialists"
            lede="Board-certified practitioners, internationally trained, and recognised in the field of aesthetic medicine."
            linkTo="/doctors"
            linkLabel="All Doctors"
          />
        </div>

        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex overflow-x-auto gap-gutter pb-4 snap-x hide-scrollbar">
            {DOCTORS.map((doc, i) => (
              <Reveal key={doc.id} delay={0.06 * i} className="flex-none w-[260px] sm:w-[300px] snap-start" as="div">
                <Link to={`/doctors/${doc.id}`} className="group block">
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-xl mb-5 bg-surface-container">
                    <img
                      alt={doc.name}
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      src={doc.cardImage}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-1 group-hover:text-surface-tint transition-colors">
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

      <CTABand />
    </>
  );
}
