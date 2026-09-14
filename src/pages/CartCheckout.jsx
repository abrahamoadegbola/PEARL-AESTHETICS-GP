import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { addOrder, decrementStock } from "../lib/db";
import { buildWhatsAppLink, orderWhatsAppMessage } from "../lib/whatsapp";
import { createCheckoutSession } from "../lib/api";
import { isStripeConfigured } from "../lib/stripe";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";
import Reveal from "../components/motion/Reveal";

const TAX_RATE = 0.05; // 5% VAT
const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 25;

const initialForm = { firstName: "", lastName: "", email: "", phone: "", address: "" };

export default function CartCheckout() {
  const { items, updateQty, removeItem, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [order, setOrder] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [payError, setPayError] = useState("");

  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;
  const isFormValid = form.firstName && form.email && form.phone && form.address;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.id]: e.target.value }));

  const buildOrderPayload = (paymentMethod) => ({
    items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
    customer: {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      phone: form.phone,
      address: form.address,
    },
    subtotal,
    shipping,
    tax,
    total,
    paymentMethod,
  });

  // Order goes to "pending" and is confirmed manually by the clinic team
  // once payment is arranged over WhatsApp (bank transfer, card link, etc).
  const [placingOrder, setPlacingOrder] = useState(false);

  const handleWhatsAppOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0 || !isFormValid) return;
    setPayError("");
    setPlacingOrder(true);
    try {
      const record = await addOrder(buildOrderPayload("whatsapp"));
      await Promise.all(items.map((i) => decrementStock(i.id, i.qty)));
      setOrder(record);
      clearCart();
    } catch (err) {
      setPayError(err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  // Order goes to "pending" and is only marked paid once Stripe confirms
  // the Checkout Session on the success page — stock isn't touched until
  // then, so an abandoned/cancelled checkout doesn't reserve inventory.
  const handleStripeCheckout = async (e) => {
    e.preventDefault();
    if (items.length === 0 || !isFormValid) return;
    setPayError("");

    if (!isStripeConfigured) {
      setPayError(
        "Card payment isn't set up yet — add VITE_STRIPE_PUBLISHABLE_KEY to .env, then restart the dev server (or rebuild) so Vite picks it up. You can still place this order via WhatsApp below."
      );
      return;
    }

    setIsRedirecting(true);
    try {
      const record = await addOrder(buildOrderPayload("stripe"));
      const { url } = await createCheckoutSession({
        orderId: record.id,
        items: record.items,
        customerEmail: form.email,
      });
      if (!url) throw new Error("Stripe did not return a checkout URL.");
      window.location.href = url;
    } catch (err) {
      setIsRedirecting(false);
      setPayError(
        err.message ||
          "Couldn't start Stripe Checkout. Make sure STRIPE_SECRET_KEY is set (supabase secrets set STRIPE_SECRET_KEY=sk_...) and the create-checkout-session function is deployed."
      );
    }
  };

  if (order) {
    return (
      <Reveal
        as="div"
        className="w-full max-w-2xl mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop pt-16 text-center space-y-6"
      >
        <motion.span
          className="material-symbols-outlined text-primary inline-block"
          style={{ fontSize: "56px" }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          check_circle
        </motion.span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
          Order Received
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Thank you, {order.customer.name}. Your order <span className="text-primary font-medium">{order.id}</span>{" "}
          (AED {order.total}) has been recorded and is awaiting payment confirmation. Message us on
          WhatsApp to arrange payment via card or bank transfer.
        </p>
        <a
          className="inline-flex items-center justify-center gap-2 w-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps py-4 rounded hover:bg-secondary-fixed transition-colors active:scale-[0.98]"
          href={buildWhatsAppLink(orderWhatsAppMessage(order))}
          target="_blank"
          rel="noreferrer"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          Arrange Payment on WhatsApp
        </a>
        <div className="flex justify-center gap-6">
          <Link to="/shop" className="font-label-caps text-label-caps text-on-surface-variant underline">
            Continue Shopping
          </Link>
          <Link to="/" className="font-label-caps text-label-caps text-on-surface-variant underline">
            Back to Home
          </Link>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="w-full max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop pt-16 md:pt-24">
      <SupabaseSetupNotice />
      <Reveal className="mb-14 md:mb-20" as="div">
        <h1
          className="font-display-lg text-primary mb-10 text-center"
          style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
        >
          Secure checkout
        </h1>

        <div className="flex items-center justify-center max-w-lg mx-auto">
          <div className="flex items-center text-primary">
            <span className="w-8 h-8 rounded-full border border-primary flex items-center justify-center font-body-md text-body-md font-medium bg-primary text-on-primary">
              1
            </span>
            <span className="ml-2 font-label-caps text-label-caps uppercase hidden sm:inline-block">Cart</span>
          </div>
          <div className="h-[1px] w-12 sm:w-24 bg-primary mx-4"></div>
          <div className="flex items-center text-primary">
            <span className="w-8 h-8 rounded-full border border-primary flex items-center justify-center font-body-md text-body-md font-medium">
              2
            </span>
            <span className="ml-2 font-label-caps text-label-caps uppercase hidden sm:inline-block">Details</span>
          </div>
          <div className="h-[1px] w-12 sm:w-24 bg-outline-variant mx-4"></div>
          <div className="flex items-center text-outline-variant">
            <span className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center font-body-md text-body-md font-medium">
              3
            </span>
            <span className="ml-2 font-label-caps text-label-caps uppercase hidden sm:inline-block">Payment</span>
          </div>
        </div>
      </Reveal>

      {items.length === 0 ? (
        <div className="text-center py-24 space-y-6">
          <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: "56px" }}>
            shopping_bag
          </span>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Your cart is empty.</p>
          <Link
            to="/shop"
            className="inline-flex bg-primary text-on-primary px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors"
          >
            Browse Skincare
          </Link>
        </div>
      ) : (
        <form onSubmit={(e) => e.preventDefault()} className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 xl:col-span-8 space-y-16">
            <section>
              <h2 className="font-headline-sm text-headline-sm text-primary border-b border-outline-variant pb-4 mb-6">
                Your Items
              </h2>
              <div className="space-y-8">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-6 group overflow-hidden"
                    >
                      <div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          alt={item.name}
                          src={item.image}
                        />
                      </div>
                      <div className="flex flex-col flex-grow py-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-body-lg text-body-lg text-primary font-medium">{item.name}</h3>
                            {item.size && <p className="font-body-md text-body-md text-on-surface-variant mt-1">{item.size}</p>}
                          </div>
                          <span className="font-body-lg text-body-lg text-primary">
                            AED {item.price * item.qty}
                          </span>
                        </div>
                        <div className="mt-auto flex justify-between items-end">
                          <div className="flex items-center border border-outline-variant rounded-full px-3 py-1">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="text-on-surface-variant hover:text-primary px-2 transition-colors active:scale-90"
                            >
                              <span className="material-symbols-outlined text-[18px]">remove</span>
                            </button>
                            <span className="font-body-md text-body-md text-primary px-3">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="text-on-surface-variant hover:text-primary px-2 transition-colors active:scale-90"
                            >
                              <span className="material-symbols-outlined text-[18px]">add</span>
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-outline hover:text-error transition-colors flex items-center font-label-caps text-label-caps active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[16px] mr-1">delete</span> Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            <section>
              <h2 className="font-headline-sm text-headline-sm text-primary border-b border-outline-variant pb-4 mb-6">
                Shipping Details
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline text-primary font-body-md text-body-md px-0 py-2 focus:ring-0 focus:border-primary transition-colors"
                      id="firstName"
                      placeholder="First Name"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline text-primary font-body-md text-body-md px-0 py-2 focus:ring-0 focus:border-primary transition-colors"
                      id="lastName"
                      placeholder="Last Name"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline text-primary font-body-md text-body-md px-0 py-2 focus:ring-0 focus:border-primary transition-colors"
                    id="email"
                    placeholder="Email Address"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline text-primary font-body-md text-body-md px-0 py-2 focus:ring-0 focus:border-primary transition-colors"
                    id="phone"
                    placeholder="Phone Number"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline text-primary font-body-md text-body-md px-0 py-2 focus:ring-0 focus:border-primary transition-colors"
                    id="address"
                    placeholder="Shipping Address"
                    type="text"
                    required
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 mt-12 lg:mt-0">
            <div className="bg-surface-container/40 rounded-xl p-8 sticky top-32 border border-surface-dim backdrop-blur-sm">
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 font-body-md text-body-md">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal ({items.reduce((n, i) => n + i.qty, 0)} items)</span>
                  <span>AED {subtotal}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `AED ${shipping}`}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>VAT (5%)</span>
                  <span>AED {tax}</span>
                </div>
              </div>
              <div className="border-t border-outline-variant pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-body-lg text-body-lg text-primary">Total</span>
                  <span className="font-headline-md text-headline-md text-primary tracking-tight">AED {total}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleStripeCheckout}
                disabled={!isFormValid || isRedirecting}
                className="w-full bg-secondary-container text-on-secondary-container hover:bg-[#ebc44d] font-body-md text-body-md font-medium py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_32px_-8px_rgba(254,214,91,0.3)] mb-3 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100"
              >
                {isRedirecting ? "Redirecting to Stripe…" : "Pay with Card"}
                {!isRedirecting && <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                disabled={!isFormValid || placingOrder}
                className="w-full border border-primary text-primary hover:bg-surface-container-low font-body-md text-body-md font-medium py-4 rounded-full transition-all mb-4 flex justify-center items-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                {placingOrder ? "Placing Order…" : "Place Order via WhatsApp"}
              </button>

              {payError && (
                <p className="text-error text-sm mb-4 bg-error-container/40 rounded-lg p-3">{payError}</p>
              )}
              {!isFormValid && (
                <p className="text-xs text-on-surface-variant mb-4 text-center">
                  Fill in your shipping details above to continue.
                </p>
              )}

              <div className="flex flex-col items-center border-t border-outline-variant/50 pt-6">
                <p className="font-label-caps text-label-caps text-outline mb-4">
                  Secure card payment via Stripe, or arrange bank transfer on WhatsApp
                </p>
                <div className="flex space-x-4 text-outline-variant">
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'wght' 200" }}>
                    lock
                  </span>
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'wght' 200" }}>
                    verified_user
                  </span>
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'wght' 200" }}>
                    credit_card
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
