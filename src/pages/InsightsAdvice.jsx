import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import FilterPills from "../components/FilterPills";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";

const ARTICLES = [
  {
    id: "longevity",
    featured: true,
    category: "Wellness",
    title: "The Intersection of Longevity Science and Aesthetic Medicine",
    excerpt:
      "How emerging treatments in cellular regeneration are reshaping the future of minimally invasive procedures and extending youthful vitality.",
    date: "Oct 12, 2024",
    readingTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "A minimalist treatment room with soft natural light",
  },
  {
    id: "biostimulators",
    category: "Skin",
    title: "Understanding Bio-Stimulators: Beyond Traditional Fillers",
    excerpt:
      "How new injectable technologies work with your body's own collagen production for longer-lasting, subtler results.",
    date: "Oct 08, 2024",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A macro photograph of clear, hydrated skin",
  },
  {
    id: "facial-balancing",
    category: "Face",
    title: "The Art of Facial Balancing",
    excerpt:
      "Why treating the face holistically yields more natural, harmonious results than focusing on single isolated areas.",
    date: "Sep 28, 2024",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1761718209835-c8586b7dcac0?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Clinical glass vials and a syringe on a marble surface",
  },
  {
    id: "laser-suite",
    category: "News",
    title: "Pearl Introduces a New Advanced Laser Suite",
    excerpt:
      "The latest fractional laser technology has arrived at the clinic, offering reduced downtime and superior outcomes.",
    date: "Sep 15, 2024",
    readingTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "The clinic reception area",
  },
];

const CATEGORIES = ["All", "Skin", "Face", "Wellness", "News"];

function ArticleMeta({ article, className = "" }) {
  return (
    <div
      className={`flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest ${className}`}
    >
      <span>{article.date}</span>
      <span aria-hidden="true">·</span>
      <span>{article.readingTime}</span>
    </div>
  );
}

export default function InsightsAdvice() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const inCategory = category === "All" || a.category === category;
      const inSearch = !q || `${a.title} ${a.excerpt} ${a.category}`.toLowerCase().includes(q);
      return inCategory && inSearch;
    });
  }, [category, query]);

  // Only lead with the featured piece when nothing is being filtered - once
  // you're searching, a pinned article at the top is just noise.
  const filtering = category !== "All" || query.trim() !== "";
  const featured = filtering ? null : matches.find((a) => a.featured);
  const rest = featured ? matches.filter((a) => a.id !== featured.id) : matches;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Insights & advice"
        lede="Expert perspectives on aesthetic medicine, advanced skincare, and holistic wellness — written by the people who practise it."
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-5">
          <div className="relative w-full lg:max-w-sm flex-shrink-0">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
              search
            </span>
            <label className="sr-only" htmlFor="journal-search">
              Search articles
            </label>
            <input
              id="journal-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full bg-surface-container-lowest py-3 pl-12 pr-4 rounded-full border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-body-md text-body-md text-on-surface placeholder:text-outline"
            />
          </div>
          <FilterPills
            options={CATEGORIES}
            value={category}
            onChange={setCategory}
            ariaLabel="Filter articles by topic"
          />
        </div>
      </PageHero>

      <section className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
        {featured && (
          <Reveal className="mb-20" as="div">
            <a href="#" className="group block relative rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  alt={featured.imageAlt}
                  src={featured.image}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/45 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4 text-on-primary">
                <span className="inline-block px-3 py-1.5 bg-on-primary/15 glass-nav rounded-full font-label-caps text-label-caps uppercase tracking-widest mb-5 border border-on-primary/25">
                  Featured · {featured.category}
                </span>
                <h2
                  className="font-display-lg mb-4"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
                >
                  {featured.title}
                </h2>
                <p className="font-body-lg text-body-lg text-on-primary/85 hidden md:block mb-6 max-w-2xl">
                  {featured.excerpt}
                </p>
                <ArticleMeta article={featured} className="text-on-primary/70" />
              </div>
            </a>
          </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {rest.map((article, i) => (
            <Reveal key={article.id} delay={0.06 * (i % 3)} as="div">
              <article className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all duration-500 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5">
                <a href="#" className="block aspect-[4/3] overflow-hidden relative" tabIndex={-1} aria-hidden="true">
                  <img
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                    alt={article.imageAlt}
                    src={article.image}
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-surface/90 glass-nav rounded-full font-label-caps text-label-caps text-primary uppercase tracking-widest">
                    {article.category}
                  </span>
                </a>
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-3 line-clamp-2">
                    <a href="#" className="group-hover:text-surface-tint transition-colors">
                      {article.title}
                    </a>
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-7 line-clamp-3 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-outline-variant/30">
                    <ArticleMeta article={article} className="text-on-surface-variant" />
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {matches.length === 0 && (
          <p className="text-center text-on-surface-variant font-body-md py-20">
            No articles match “{query.trim() || category}”.{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="text-primary underline underline-offset-4"
            >
              Clear filters
            </button>
          </p>
        )}
      </section>

      <CTABand
        eyebrow="Questions?"
        title="Ask us directly"
        lede="Reading up is a good start. A complimentary consultation is where it gets specific to your skin."
      />
    </>
  );
}
