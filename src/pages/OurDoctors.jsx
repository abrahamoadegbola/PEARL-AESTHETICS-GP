import { useState } from "react";
import { Link } from "react-router-dom";
import DOCTORS from "../data/doctors";
import PageHero from "../components/PageHero";
import FilterPills from "../components/FilterPills";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "aesthetics", label: "Aesthetics" },
  { key: "gp", label: "General Medicine" },
];

export default function OurDoctors() {
  const [filter, setFilter] = useState("all");
  const visibleDoctors = filter === "all" ? DOCTORS : DOCTORS.filter((d) => d.specialty === filter);

  return (
    <>
      <PageHero
        eyebrow="The Team"
        title="Our medical experts"
        lede="DHA-licensed physicians, internationally trained and board-certified — the people who will actually be treating you."
      >
        <FilterPills
          options={FILTERS}
          value={filter}
          onChange={setFilter}
          ariaLabel="Filter doctors by specialty"
        />
      </PageHero>

      <section className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {visibleDoctors.map((doc, i) => (
            <Reveal key={doc.id} delay={0.06 * (i % 3)} as="div">
              <Link
                to={`/doctors/${doc.id}`}
                className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all duration-500 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                    alt={doc.name}
                    src={doc.cardImage}
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-primary/70 to-transparent">
                    <span className="inline-flex items-center gap-1.5 bg-surface/90 glass-nav text-primary px-3 py-1.5 rounded-full font-label-caps text-label-caps uppercase tracking-widest">
                      <span className="material-symbols-outlined text-[14px]">{doc.badgeIcon}</span>
                      {doc.badge}
                    </span>
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <h2 className="font-headline-sm text-headline-sm text-primary mb-1.5 group-hover:text-surface-tint transition-colors">
                    {doc.name}
                  </h2>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mb-5">
                    {doc.title}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-7 flex-grow">
                    {doc.cardBio}
                  </p>
                  <span className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary uppercase tracking-widest mt-auto pt-5 border-t border-outline-variant/30">
                    View Profile
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {visibleDoctors.length === 0 && (
          <p className="text-center text-on-surface-variant font-body-md py-16">
            No doctors match this specialty right now.
          </p>
        )}
      </section>

      <CTABand title="Book with the doctor of your choice" />
    </>
  );
}
