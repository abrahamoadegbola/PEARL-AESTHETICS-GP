import { useState } from "react";
import PageHero from "../components/PageHero";
import { ResultsPrints } from "../components/HeroVisuals";
import FilterPills from "../components/FilterPills";
import CTABand from "../components/CTABand";
import SectionHeader from "../components/SectionHeader";
import InstagramCard from "../components/InstagramCard";
import Reveal from "../components/motion/Reveal";
import useInstagramFeed, { resultPosts } from "../hooks/useInstagramFeed";
import BUSINESS from "../data/business";

// Everything on this page comes from the clinic's own Instagram - real
// patients, real reels - rather than stock "results". Filters map to the
// tags useInstagramFeed / the instagram-feed function put on each post.
const FILTERS = [
  { label: "Everything", tag: null },
  { label: "Videos", tag: "reel" },
  { label: "Our Clinic", tag: "facility" },
  { label: "Team & Events", tag: ["team", "event"] },
  { label: "Health Tips", tag: "education" },
];

function matches(post, tag) {
  if (!tag) return true;
  const tags = Array.isArray(tag) ? tag : [tag];
  return tags.some((t) => post.tags?.includes(t));
}

export default function ResultsGallery() {
  const { posts } = useInstagramFeed();
  const [filter, setFilter] = useState(FILTERS[0].label);
  const results = resultPosts(posts);
  const active = FILTERS.find((f) => f.label === filter);
  const feed = posts.filter((p) => !p.tags?.includes("result") && matches(p, active.tag));

  return (
    <>
      <PageHero
        tone="surface"
        surface="sage"
        eyebrow="Real Patients · Real Clinic"
        title={
          <>
            Results &amp; <span className="font-serif-display italic font-medium">gallery</span>
          </>
        }
        visual={<ResultsPrints />}
        lede="Before-and-afters, videos and moments from inside the clinic. New ones appear here as soon as we share them."
      />

      {results.length > 0 && (
        <section className="max-w-container-max mx-auto px-gutter pt-16 md:pt-24 pb-section-padding-mobile md:pb-section-padding-desktop">
          <SectionHeader eyebrow="Before & After" title="Patient Results" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {results.map((post, i) => (
              <Reveal key={post.id} delay={0.06 * (i % 3)} as="div">
                <InstagramCard post={post} playlist={results} />
              </Reveal>
            ))}
          </div>
          {/* Results vary between patients - saying so plainly matters more on a
              medical page than a clean-looking grid does. */}
          <p className="font-body-md text-sm text-on-surface-variant mt-10 max-w-2xl">
            Individual results vary. Images are of real Pearl patients, shared with their consent; they are not a
            guarantee of the result any one person will achieve.
          </p>
        </section>
      )}

      <section className="bg-surface-container-low py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
            <SectionHeader eyebrow="Videos & Moments" title="Life at Pearl" className="!mb-0" />
            <FilterPills
              options={FILTERS.map((f) => f.label)}
              value={filter}
              onChange={setFilter}
              ariaLabel="Filter posts"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-gutter">
            {feed.map((post, i) => (
              <Reveal key={post.id} delay={0.05 * (i % 4)} as="div">
                <InstagramCard post={post} playlist={feed} />
              </Reveal>
            ))}
            {feed.length === 0 && (
              <p className="col-span-full text-center text-on-surface-variant font-body-md py-16">
                Nothing in this category yet. Check back soon.
              </p>
            )}
          </div>

          <div className="text-center mt-12">
            <a
              href={BUSINESS.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors"
            >
              Follow @{BUSINESS.instagram.handle}
              <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
            </a>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Your Turn"
        title="Begin your journey"
        lede="Schedule a consultation with our practitioners to discuss your goals and find out what's realistically possible."
      />
    </>
  );
}
