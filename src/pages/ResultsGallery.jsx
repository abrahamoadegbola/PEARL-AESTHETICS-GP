import { useState } from "react";
import PageHero from "../components/PageHero";
import FilterPills from "../components/FilterPills";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";
import RESULTS from "../data/results";

const FILTERS = ["All Treatments", "Jawline Contouring", "Lip Enhancement", "Skin Rejuvenation"];

export default function ResultsGallery() {
  const [filter, setFilter] = useState("All Treatments");
  const visible = filter === "All Treatments" ? RESULTS : RESULTS.filter((r) => r.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Curated Portfolio"
        title="Patient results"
        lede="The transformative power of precision aesthetic treatment — a commitment to subtle, natural enhancement rather than a made-over face."
      >
        <FilterPills
          options={FILTERS}
          value={filter}
          onChange={setFilter}
          ariaLabel="Filter results by treatment"
        />
      </PageHero>

      <section className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {visible.map((result, i) => (
            <Reveal key={result.id} delay={0.06 * (i % 3)} className={result.span} as="div">
              <article className="group relative h-full rounded-xl overflow-hidden bg-surface-container-low">
                <div className={`relative w-full ${result.aspect}`}>
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    alt={`${result.category} result — ${result.title}`}
                    src={result.image}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7 text-on-primary">
                  <p className="font-label-caps text-label-caps text-secondary-container uppercase tracking-[0.25em] mb-2">
                    {result.category}
                  </p>
                  <h2 className="font-headline-sm text-headline-sm mb-1">{result.title}</h2>
                  <p className="font-body-md text-sm opacity-80">{result.caption}</p>
                </div>
              </article>
            </Reveal>
          ))}

          {visible.length === 0 && (
            <p className="col-span-full text-center text-on-surface-variant font-body-md py-16">
              No results in this category yet.
            </p>
          )}
        </div>

        {/* Results vary between patients - saying so plainly matters more on a
            medical page than a clean-looking grid does. */}
        <p className="font-body-md text-sm text-on-surface-variant mt-12 max-w-2xl">
          Individual results vary. Images are representative of typical outcomes and are shown with patient
          consent; they are not a guarantee of the result any one person will achieve.
        </p>
      </section>

      <CTABand
        eyebrow="Your Turn"
        title="Begin your journey"
        lede="Schedule a consultation with our practitioners to discuss your goals and find out what's realistically possible."
      />
    </>
  );
}
