import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getProduct, getActiveProducts } from "../lib/db";
import { useCart } from "../context/CartContext";
import { buildWhatsAppLink, productInquiryMessage } from "../lib/whatsapp";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";
import Breadcrumb from "../components/Breadcrumb";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";
import { isSupabaseConfigured } from "../lib/supabaseClient";

function Accordion({ id, title, open, onToggle, children }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="border-b border-outline-variant/40">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className="w-full py-5 flex justify-between items-center gap-6 text-left group active:scale-[0.99] transition-transform"
      >
        <span className="font-body-lg text-body-lg text-primary font-medium group-hover:text-surface-tint transition-colors">
          {title}
        </span>
        <span
          className="material-symbols-outlined text-primary transition-transform duration-300 flex-shrink-0"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          add
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={`${id}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-6 font-body-md text-body-md text-on-surface-variant">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState("description");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getProduct(id)
      .then((p) => {
        if (cancelled) return;
        if (p) {
          setProduct(p);
        } else {
          // Fall back to the first active product if this id doesn't exist,
          // rather than a dead end.
          return getActiveProducts().then((list) => !cancelled && setProduct(list[0] || null));
        }
      })
      .catch((err) => !cancelled && setLoadError(err))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-container-max mx-auto px-gutter py-24">
        <SupabaseSetupNotice />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-container-max mx-auto px-gutter py-32 text-center">
        <p className="font-body-lg text-body-lg text-on-surface-variant">Loading…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="max-w-container-max mx-auto px-gutter py-32 text-center">
        <p className="font-body-lg text-body-lg text-error">
          Couldn't load this product: {loadError.message}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-container-max mx-auto px-gutter py-32 text-center">
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">Product not found.</p>
        <Link to="/shop" className="font-label-caps text-label-caps text-primary uppercase tracking-widest underline underline-offset-4">
          Back to the boutique
        </Link>
      </div>
    );
  }

  const decreaseQty = () => setQty((q) => Math.max(1, q - 1));
  const increaseQty = () => setQty((q) => Math.min(product.stock || 99, q + 1));

  const handleAddToCart = () => {
    addItem(product, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate("/cart");
  };

  const toggleSection = (key) => setOpenSection((prev) => (prev === key ? null : key));

  return (
    <>
      <div className="max-w-container-max mx-auto px-gutter pt-10 pb-section-padding-mobile md:pb-section-padding-desktop">
        <Breadcrumb
          trail={[
            { label: "Home", to: "/" },
            { label: "Boutique", to: "/shop" },
            { label: product.name },
          ]}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16 lg:gap-x-24">
          {/* ---------- IMAGE ---------- */}
          <Reveal className="md:col-span-6 lg:col-span-7" as="div">
            <div className="relative bg-surface-container-low rounded-xl overflow-hidden group">
              <div className="aspect-[4/5]">
                <img
                  className="w-full h-full object-contain p-12 transition-transform duration-700 ease-out group-hover:scale-105"
                  alt={product.name}
                  src={product.image}
                />
              </div>
              {product.badge && (
                <span className="absolute top-5 left-5 bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full font-label-caps text-label-caps uppercase tracking-widest">
                  {product.badge}
                </span>
              )}
            </div>
          </Reveal>

          {/* ---------- DETAIL ---------- */}
          <Reveal delay={0.1} className="md:col-span-6 lg:col-span-5 flex flex-col" as="div">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.25em] mb-5 block">
              {product.category || "Clinical grade formula"}
            </span>

            <h1
              className="font-display-lg text-primary mb-4"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              {product.name}
            </h1>

            {product.reviews > 0 ? (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-secondary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[18px]"
                      style={{
                        fontVariationSettings: i < Math.round(product.rating) ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  {product.reviews} review{product.reviews === 1 ? "" : "s"}
                </span>
              </div>
            ) : (
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">No reviews yet</p>
            )}

            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display-lg text-3xl text-primary leading-none">AED {product.price}</span>
              {product.size && (
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                  {product.size}
                </span>
              )}
            </div>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10">{product.longDescription}</p>

            {/* ---------- BUY ---------- */}
            <div className="space-y-4 mb-12">
              <div className="flex gap-4">
                <div className="flex items-center border border-outline-variant rounded w-32 justify-between flex-shrink-0">
                  <button
                    type="button"
                    onClick={decreaseQty}
                    aria-label="Decrease quantity"
                    className="p-3 text-on-surface-variant hover:text-primary transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[20px]">remove</span>
                  </button>
                  <motion.span
                    key={qty}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-body-md text-body-md text-primary inline-block"
                    aria-live="polite"
                  >
                    {qty}
                  </motion.span>
                  <button
                    type="button"
                    onClick={increaseQty}
                    aria-label="Increase quantity"
                    className="p-3 text-on-surface-variant hover:text-primary transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded border border-primary text-primary font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-colors active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {added ? "Added" : product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                  <span className="material-symbols-outlined text-[18px]">
                    {added ? "check" : "shopping_bag"}
                  </span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="w-full py-4 rounded bg-secondary-container text-on-secondary-container font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                Buy now — AED {product.price * qty}
              </button>

              <a
                href={buildWhatsAppLink(productInquiryMessage(product))}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 font-label-caps text-label-caps text-primary uppercase tracking-widest hover:text-surface-tint transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Ask about this product on WhatsApp
              </a>
            </div>

            {/* Only rendered from the product's own record. An ingredient or
                benefit list must never be filled in with placeholder copy -
                on a real skincare product that would be a false claim, and a
                safety problem for anyone with an allergy. */}
            <div className="border-t border-outline-variant/40">
              <Accordion
                id="description"
                title="About this product"
                open={openSection === "description"}
                onToggle={() => toggleSection("description")}
              >
                <p>{product.longDescription}</p>
                {product.size && <p className="mt-3">Size: {product.size}</p>}
              </Accordion>

              {product.benefits?.length > 0 && (
                <Accordion
                  id="benefits"
                  title="Clinical benefits"
                  open={openSection === "benefits"}
                  onToggle={() => toggleSection("benefits")}
                >
                  <ul className="list-disc pl-5 space-y-2">
                    {product.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </Accordion>
              )}

              {product.usage && (
                <Accordion
                  id="usage"
                  title="How to use"
                  open={openSection === "usage"}
                  onToggle={() => toggleSection("usage")}
                >
                  <p>{product.usage}</p>
                </Accordion>
              )}

              {product.ingredients ? (
                <Accordion
                  id="ingredients"
                  title="Full ingredients"
                  open={openSection === "ingredients"}
                  onToggle={() => toggleSection("ingredients")}
                >
                  <p className="lowercase">{product.ingredients}</p>
                </Accordion>
              ) : (
                <Accordion
                  id="ingredients"
                  title="Full ingredients"
                  open={openSection === "ingredients"}
                  onToggle={() => toggleSection("ingredients")}
                >
                  <p>
                    The full INCI list for this product isn't published here yet. If you have an allergy or
                    sensitivity, message us on WhatsApp and we'll send the complete ingredient list before you
                    order.
                  </p>
                </Accordion>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      <CTABand
        eyebrow="Skincare Advice"
        title="Build the right routine"
        lede="Bring your current routine to a complimentary consultation and we'll tell you what to keep, what to drop, and what to add."
      />
    </>
  );
}
