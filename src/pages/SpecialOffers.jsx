import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";
import OFFERS from "../data/offers";

export default function SpecialOffers() {
  return (
    <>
      <PageHero
        eyebrow="Current Promotions"
        title="Special offers"
        lede="Limited-time bundles that pair treatments which genuinely work well together — not discounts for their own sake."
      />

      <section className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter items-start">
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.id} delay={0.08 * i} as="div">
              <article
                className={`group flex flex-col h-full rounded-xl overflow-hidden bg-surface-container-lowest transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 ${
                  offer.featured
                    ? "border-2 border-secondary-container shadow-lg shadow-secondary-container/20"
                    : "border border-outline-variant/30 hover:border-primary/25"
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                    alt={offer.imageAlt}
                    src={offer.image}
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-4 left-4 px-3 py-1.5 rounded-full font-label-caps text-label-caps uppercase tracking-widest ${
                      offer.featured
                        ? "bg-secondary-container text-on-secondary-container"
                        : "bg-surface/90 glass-nav text-primary"
                    }`}
                  >
                    {offer.tag}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="font-headline-sm text-headline-sm text-primary mb-4">{offer.name}</h2>

                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="font-display-lg text-3xl text-primary leading-none">AED {offer.now}</span>
                    <span className="font-body-md text-body-md text-outline line-through">AED {offer.was}</span>
                  </div>

                  <ul className="space-y-3 mb-9 flex-grow">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[18px] text-secondary mt-0.5 flex-shrink-0">
                          check
                        </span>
                        <span className="font-body-md text-body-md text-on-surface-variant">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/book-consultation"
                    className={`w-full mt-auto inline-flex justify-center items-center px-6 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest transition-all active:scale-[0.98] ${
                      offer.featured
                        ? "bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed"
                        : "bg-primary text-on-primary hover:bg-primary-container"
                    }`}
                  >
                    Claim Offer
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="font-body-md text-sm text-on-surface-variant mt-12 max-w-2xl">
          Offers cannot be combined with other promotions and are subject to a suitability assessment at your
          consultation. Prices are inclusive of VAT.
        </p>
      </section>

      <CTABand
        eyebrow="Not Sure Which?"
        title="Let us build the plan"
        lede="Bring your goals to a complimentary consultation and we'll tell you honestly which of these — if any — is right for you."
      />
    </>
  );
}
