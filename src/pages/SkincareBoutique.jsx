import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useDbCollection from "../hooks/useDbCollection";
import { getActiveProducts } from "../lib/db";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";
import PageHero from "../components/PageHero";
import { ProductTrio } from "../components/HeroVisuals";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";
import { useCart } from "../context/CartContext";

// Each concern has its own soft tint, used on its filter pill and behind
// matching product photos - enough colour to make the shelf feel alive
// without every card shouting.
const CONCERNS = [
  { name: "Anti-Aging", icon: "auto_awesome", tint: "bg-[#f6e3dc]", ring: "border-[#e7c3b6]" },
  { name: "Hydration", icon: "water_drop", tint: "bg-[#dcefe8]", ring: "border-[#b4d9cb]" },
  { name: "Brightening", icon: "light_mode", tint: "bg-[#f8ecd0]", ring: "border-[#ecd49a]" },
  { name: "Acne & Pores", icon: "spa", tint: "bg-[#e3ebdf]", ring: "border-[#c3d3bb]" },
];
const tintFor = (concern) => CONCERNS.find((c) => c.name === concern)?.tint || "bg-surface-container-low";

const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
];

export default function SkincareBoutique() {
  const [products, { loading, error }] = useDbCollection(getActiveProducts);
  const { addItem } = useCart();
  const [activeConcerns, setActiveConcerns] = useState([]);
  const [sort, setSort] = useState("recommended");
  const [added, setAdded] = useState(null);

  const toggleConcern = (concern) => {
    setActiveConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const filtered = useMemo(() => {
    let list = products;
    if (activeConcerns.length) {
      list = list.filter((p) => activeConcerns.includes(p.concern));
    }
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    return list;
  }, [products, activeConcerns, sort]);

  const handleAdd = (product) => {
    addItem(product, 1);
    setAdded(product.id);
    window.setTimeout(() => setAdded(null), 1200);
  };

  return (
    <>
      <PageHero
        tone="surface"
        surface="blush"
        eyebrow="The Boutique"
        title={
          <>
            Curated <span className="font-serif-display italic font-medium">skincare</span>
          </>
        }
        lede="Medical-grade formulations chosen by our doctors: the same products we use in clinic and recommend after treatment."
        visual={<ProductTrio products={products} />}
      >
        <p className="font-label-caps text-label-caps uppercase tracking-widest text-primary/70 mb-4">Shop by concern</p>
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by skin concern">
          {CONCERNS.map((c) => {
            const active = activeConcerns.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleConcern(c.name)}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-label-caps text-label-caps uppercase tracking-widest transition-all active:scale-95 ${
                  active
                    ? "bg-primary border-primary text-on-primary shadow-lg shadow-primary/20"
                    : `${c.tint} ${c.ring} text-primary hover:border-primary`
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{active ? "check" : c.icon}</span>
                {c.name}
              </button>
            );
          })}
          {activeConcerns.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveConcerns([])}
              className="px-3 font-label-caps text-label-caps uppercase tracking-widest text-primary underline underline-offset-4"
            >
              Clear
            </button>
          )}
        </div>
      </PageHero>

      <div className="max-w-container-max mx-auto px-gutter">
        <SupabaseSetupNotice />
      </div>

      <section className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="pt-14 md:pt-20">
          {/* ---------- GRID ---------- */}
          <div>
            <div className="flex flex-wrap gap-4 justify-between items-center mb-10 pb-5 border-b border-outline-variant/40">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                {filtered.length} product{filtered.length === 1 ? "" : "s"}
              </span>
              <label className="flex items-center gap-3">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                  Sort by
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 font-body-md text-body-md text-primary cursor-pointer py-1 pl-0 pr-7"
                >
                  {SORTS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {loading && (
              <p className="text-center text-on-surface-variant font-body-md py-16">Loading products…</p>
            )}
            {error && (
              <p className="text-center text-error font-body-md py-16">
                Couldn't load products: {error.message}
              </p>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
                {filtered.map((product, i) => (
                  <Reveal key={product.id} delay={0.06 * (i % 3)} as="div">
                    <div className="group flex flex-col h-full bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/10">
                      <Link
                        to={`/shop/${product.id}`}
                        className={`relative aspect-square ${tintFor(product.concern)} flex items-center justify-center overflow-hidden`}
                      >
                        <img
                          className="object-cover h-[78%] w-[78%] rounded-xl shadow-lg shadow-black/10 transition-transform duration-700 ease-out group-hover:scale-105"
                          alt={product.name}
                          src={product.image}
                          loading="lazy"
                        />
                        {product.badge && (
                          <span className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full font-label-caps text-label-caps uppercase tracking-widest">
                            {product.badge}
                          </span>
                        )}
                        {product.stock <= 0 && (
                          <span className="absolute inset-0 bg-surface/80 flex items-center justify-center font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.25em]">
                            Out of stock
                          </span>
                        )}
                      </Link>

                      <div className="p-6 flex flex-col flex-grow">
                        {product.concern && (
                          <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-secondary mb-2">
                            {product.concern}
                          </span>
                        )}
                        {product.reviews > 0 && (
                          <div className="flex items-center gap-1 mb-3 text-secondary">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <span
                                key={s}
                                className="material-symbols-outlined text-[15px]"
                                style={{
                                  fontVariationSettings:
                                    s < Math.round(product.rating) ? "'FILL' 1" : "'FILL' 0",
                                }}
                              >
                                star
                              </span>
                            ))}
                            <span className="font-label-caps text-label-caps text-outline ml-1.5">
                              ({product.reviews})
                            </span>
                          </div>
                        )}

                        <Link to={`/shop/${product.id}`}>
                          <h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-surface-tint transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="font-body-md text-sm text-on-surface-variant mb-6 flex-grow">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-outline-variant/30">
                          <span className="font-body-lg text-body-lg text-primary font-medium">
                            AED {product.price}
                          </span>
                          <button
                            onClick={() => handleAdd(product)}
                            disabled={product.stock <= 0}
                            aria-label={`Add ${product.name} to cart`}
                            className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                          >
                            <motion.span
                              key={added === product.id ? "check" : "add"}
                              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="material-symbols-outlined text-[20px] inline-block"
                            >
                              {added === product.id ? "check" : "add"}
                            </motion.span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <p className="text-center text-on-surface-variant font-body-md py-20">
                No products match the selected filters.
              </p>
            )}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Not Sure What Suits You?"
        title="Get a skin plan, not a shopping list"
        lede="A complimentary consultation tells you which of these your skin actually needs — and which it doesn't."
      />
    </>
  );
}
