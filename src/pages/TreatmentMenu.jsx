import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useDbCollection from "../hooks/useDbCollection";
import { getActiveTreatments } from "../lib/db";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";
import PageHero from "../components/PageHero";
import Breadcrumb from "../components/Breadcrumb";
import FilterPills from "../components/FilterPills";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";

export default function TreatmentMenu() {
  const [treatments, { loading, error }] = useDbCollection(getActiveTreatments);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(treatments.map((t) => t.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [treatments]);

  const filtered =
    activeCategory === "All" ? treatments : treatments.filter((t) => t.category === activeCategory);

  return (
    <>
      <PageHero
        eyebrow="The Full Menu"
        title="Our treatment menu"
        lede="Every medical aesthetic treatment we offer, with indicative starting prices. Consultations are complimentary, and every plan is built around your skin rather than a package."
        breadcrumb={<Breadcrumb trail={[{ label: "Home", to: "/" }, { label: "Services" }]} />}
      />

      <div className="max-w-container-max mx-auto px-gutter">
        <SupabaseSetupNotice />
      </div>

      {/* Filter rail sits under the fixed header and stays reachable while
          you scroll a long menu. */}
      <div className="sticky top-[64px] md:top-[72px] z-30 bg-background/85 glass-nav border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-gutter py-4 flex flex-col md:flex-row md:items-center gap-4">
          <FilterPills
            options={categories}
            value={activeCategory}
            onChange={setActiveCategory}
            ariaLabel="Filter treatments by category"
            className="flex-grow"
          />
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest flex items-center gap-2 flex-shrink-0">
            <span className="material-symbols-outlined text-[16px]">info</span>
            Indicative starting prices
          </span>
        </div>
      </div>

      <section className="max-w-container-max mx-auto px-gutter pt-16 pb-section-padding-mobile md:pb-section-padding-desktop">
        {loading && (
          <p className="font-body-md text-body-md text-on-surface-variant py-16 text-center">
            Loading treatments…
          </p>
        )}
        {error && (
          <p className="font-body-md text-body-md text-error py-16 text-center">
            Couldn't load treatments: {error.message}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filtered.map((t, i) => (
              <Reveal key={t.id} delay={0.06 * (i % 3)}>
                <Link
                  to="/book-consultation"
                  className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all duration-500 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                      alt={t.name}
                      src={t.image}
                      loading="lazy"
                    />
                    {t.category && (
                      <span className="absolute top-4 left-4 bg-surface/90 glass-nav px-3 py-1.5 rounded-full font-label-caps text-label-caps text-primary uppercase tracking-widest">
                        {t.category}
                      </span>
                    )}
                  </div>
                  <div className="p-7 flex flex-col flex-grow">
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-surface-tint transition-colors">
                      {t.name}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-7 flex-grow">
                      {t.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-outline-variant/30">
                      <span className="font-body-md text-body-md text-primary font-medium">
                        {t.priceLabel || `From AED ${t.priceFrom}`}
                      </span>
                      <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}

            {filtered.length === 0 && (
              <p className="col-span-full text-center text-on-surface-variant font-body-md py-16">
                No treatments in this category right now.
              </p>
            )}
          </div>
        )}
      </section>

      <CTABand />
    </>
  );
}
