import { Link, useParams } from "react-router-dom";
import DOCTORS from "../data/doctors";
import Breadcrumb from "../components/Breadcrumb";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";
import { useDeclareDarkHero } from "../context/DarkHeroContext";

function Section({ title, children }) {
  return (
    <Reveal as="section">
      <h2 className="font-headline-sm text-headline-sm text-primary mb-7 pb-4 border-b border-outline-variant/40">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}

export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = DOCTORS.find((d) => d.id === id) || DOCTORS[0];
  useDeclareDarkHero();

  return (
    <>
      {/* The portrait carries the page, so it leads full-bleed rather than
          sitting in a card below a breadcrumb. */}
      <section className="relative isolate -mt-[88px] md:-mt-[104px] bg-primary text-on-primary overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={doctor.heroImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-top opacity-30 blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/60" />
        </div>

        <div className="max-w-container-max mx-auto px-gutter pt-[112px] pb-16 md:pt-[140px] md:pb-24">
          <Breadcrumb
            tone="dark"
            trail={[
              { label: "Home", to: "/" },
              { label: "Our Doctors", to: "/doctors" },
              { label: doctor.name },
            ]}
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-gutter md:gap-16 items-end">
            <Reveal className="md:col-span-4" as="div">
              <div className="relative aspect-[3/4] w-full max-w-xs md:max-w-none overflow-hidden rounded-xl shadow-2xl shadow-black/30">
                <img className="w-full h-full object-cover" alt={doctor.name} src={doctor.heroImage} />
              </div>
            </Reveal>

            <div className="md:col-span-8">
              <Reveal delay={0.08}>
                <span className="font-label-caps text-label-caps text-secondary-container uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
                  <span className="w-10 h-px bg-secondary-container/60" />
                  {doctor.title}
                </span>
              </Reveal>
              <Reveal delay={0.14}>
                <h1
                  className="font-display-lg mb-5"
                  style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
                >
                  {doctor.name}
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-body-lg text-body-lg text-on-primary/80 mb-9 max-w-xl">{doctor.credentials}</p>
              </Reveal>
              <Reveal delay={0.26}>
                <dl className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-on-primary/20">
                  {[
                    { icon: "workspace_premium", label: "Accreditation", value: doctor.badge },
                    { icon: "verified", label: "Role", value: doctor.experience },
                    { icon: "language", label: "Languages", value: doctor.languages },
                  ].map((fact) => (
                    <div key={fact.label} className="max-w-xs">
                      <dt className="font-label-caps text-label-caps text-on-primary/55 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">{fact.icon}</span>
                        {fact.label}
                      </dt>
                      <dd className="font-body-md text-body-md">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-20">
          <article className="lg:col-span-8 flex flex-col gap-16">
            <Section title="Professional Biography">
              <div className="font-body-lg text-body-lg text-on-surface-variant space-y-6">
                {doctor.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Section>

            <Section title="Areas of Expertise">
              <div className="flex flex-wrap gap-3">
                {doctor.expertise.map((item) => (
                  <span
                    key={item}
                    className="bg-surface-container text-primary px-5 py-2.5 rounded-full font-label-caps text-label-caps uppercase tracking-widest"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Education & Certifications">
              {doctor.education && doctor.education.length > 0 ? (
                <div className="relative border-l border-outline-variant/40 ml-1.5 space-y-10">
                  {doctor.education.map((item, i) => (
                    <div key={i} className="relative pl-8">
                      <span
                        className={`absolute w-3 h-3 rounded-full -left-[6.5px] top-2 border-2 border-background ${
                          i === 0 ? "bg-secondary-container" : "bg-outline-variant"
                        }`}
                      />
                      <h3 className="font-body-lg text-body-lg text-primary font-medium">{item.title}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">{item.place}</p>
                      <p className="font-label-caps text-label-caps text-outline uppercase tracking-widest mt-2">
                        {item.years}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {doctor.credentials} — full credential history available on request.
                </p>
              )}
            </Section>

            <Section title="Patient Experiences">
              {doctor.testimonials && doctor.testimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  {doctor.testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30 transition-colors duration-300 hover:border-primary/25"
                    >
                      <div className="flex text-secondary mb-5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <span key={s} className="material-symbols-outlined fill text-lg">
                            star
                          </span>
                        ))}
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6">"{t.quote}"</p>
                      <p className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                        — {t.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Patient reviews for {doctor.name} will appear here once published to our verified Google
                  Business listing.
                </p>
              )}
            </Section>
          </article>

          <aside className="lg:col-span-4">
            <Reveal delay={0.1} className="lg:sticky lg:top-32" as="div">
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/30">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.25em] mb-4 block">
                  Consultation
                </span>
                <h2 className="font-headline-sm text-headline-sm text-primary mb-3">
                  Book with {doctor.name}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                  Your first consultation is complimentary and unhurried — an honest assessment before anything
                  is booked in.
                </p>
                <Link
                  to={`/book-consultation?doctor=${encodeURIComponent(doctor.id)}`}
                  className="w-full inline-flex justify-center items-center bg-secondary-container text-on-secondary-container py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors"
                >
                  Book Consultation
                </Link>
                <Link
                  to="/doctors"
                  className="w-full mt-3 inline-flex justify-center items-center gap-2 py-3 font-label-caps text-label-caps text-primary uppercase tracking-widest hover:text-surface-tint transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  All Doctors
                </Link>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      <CTABand />
    </>
  );
}
