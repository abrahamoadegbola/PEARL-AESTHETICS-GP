import { Link } from "react-router-dom";
import useDbCollection from "../hooks/useDbCollection";
import { getActiveTreatments } from "../lib/db";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";

export default function Treatments() {
  const [treatments, { loading, error }] = useDbCollection(getActiveTreatments);

  const grouped = treatments.reduce((acc, t) => {
    const category = t.category || "Other";
    acc[category] = acc[category] || [];
    acc[category].push(t);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Refined enhancements for timeless elegance"
        lede="A curated menu of clinical treatments designed to subtly perfect and rejuvenate — medical precision with an eye for natural balance."
      />

      <div className="max-w-container-max mx-auto px-gutter">
        <SupabaseSetupNotice />
      </div>

      <section className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
        {loading && (
          <p className="font-body-md text-body-md text-on-surface-variant py-16">Loading treatments…</p>
        )}
        {error && (
          <p className="font-body-md text-body-md text-error py-16">
            Couldn't load treatments: {error.message}
          </p>
        )}

        {!loading && !error && (
          <div className="flex flex-col gap-24 md:gap-32">
            {Object.entries(grouped).map(([category, items]) => (
              <section key={category} className="grid grid-cols-1 md:grid-cols-12 gap-gutter md:gap-16">
                {/* The category name parks itself alongside its treatments
                    while you scroll, so you never lose the thread. */}
                <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
                  <Reveal>
                    <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.25em] mb-4 block">
                      {String(items.length).padStart(2, "0")} treatments
                    </span>
                    <h2
                      className="font-display-lg text-primary"
                      style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
                    >
                      {category}
                    </h2>
                  </Reveal>
                </div>

                {/* Plain rules rather than cards - the list reads as a menu,
                    which is what it is. */}
                <div className="md:col-span-8 border-t border-outline-variant/40">
                  {items.map((t, i) => (
                    <Reveal key={t.id} delay={0.05 * (i % 4)}>
                      <Link
                        to="/treatment-menu"
                        className="group block border-b border-outline-variant/40 py-8 md:py-10 transition-colors hover:bg-surface-container-lowest/70"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-3">
                          <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-surface-tint transition-colors">
                            {t.name}
                          </h3>
                          <span className="font-body-md text-body-md text-primary font-medium flex-shrink-0 sm:ml-8">
                            {t.priceLabel || `From AED ${t.priceFrom}`}
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mb-5">
                          {t.description}
                        </p>
                        <div className="flex items-center gap-6">
                          {t.durationMinutes && (
                            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px]">schedule</span>
                              {t.durationMinutes} min
                            </span>
                          )}
                          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest inline-flex items-center gap-2 ml-auto">
                            Learn more
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                              arrow_forward
                            </span>
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </section>
            ))}

            {Object.keys(grouped).length === 0 && (
              <p className="text-center text-on-surface-variant font-body-md py-16">
                No treatments available right now.
              </p>
            )}
          </div>
        )}
      </section>

      <CTABand />
    </>
  );
}
