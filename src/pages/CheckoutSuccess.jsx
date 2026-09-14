import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCheckoutSession } from "../lib/api";
import { useCart } from "../context/CartContext";
import Reveal from "../components/motion/Reveal";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const orderIdFromUrl = params.get("order");
  const { clearCart } = useCart();

  const [status, setStatus] = useState("checking"); // checking | paid | unpaid | error
  const [order, setOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function confirm() {
      if (!sessionId) {
        setStatus("error");
        setErrorMessage("Missing Stripe session reference.");
        return;
      }
      try {
        // The edge function confirms the session with Stripe, marks the
        // order paid (service_role key - the shopper's own browser can't
        // do this directly, since RLS only allows admins to update
        // orders), and hands back the full order too - orders are also
        // admin-only to SELECT, so this is the only way an anonymous
        // shopper gets to see their own order details here.
        const session = await getCheckoutSession(sessionId);
        if (cancelled) return;

        setOrder(session.order);

        if (session.paymentStatus === "paid") {
          setStatus("paid");
          clearCart();
        } else {
          setStatus("unpaid");
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(err.message || "Couldn't confirm payment status.");
        }
      }
    }

    confirm();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  return (
    <div className="w-full max-w-2xl mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop pt-16 text-center space-y-6">
      {status === "checking" && (
        <Reveal as="div" className="space-y-6">
          <span className="material-symbols-outlined text-primary animate-spin" style={{ fontSize: "48px" }}>
            progress_activity
          </span>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Confirming your payment…</p>
        </Reveal>
      )}

      {status === "paid" && (
        <Reveal as="div" className="space-y-6">
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
            Payment Successful
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Thank you{order?.customer?.name ? `, ${order.customer.name}` : ""}! Your payment for order{" "}
            <span className="text-primary font-medium">{order?.id || orderIdFromUrl}</span>{" "}
            {order ? `(AED ${order.total})` : ""} has been confirmed. A member of our team will be in touch
            shortly to arrange your delivery.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/shop" className="font-label-caps text-label-caps text-on-surface-variant underline">
              Continue Shopping
            </Link>
            <Link to="/" className="font-label-caps text-label-caps text-on-surface-variant underline">
              Back to Home
            </Link>
          </div>
        </Reveal>
      )}

      {status === "unpaid" && (
        <Reveal as="div" className="space-y-6">
          <span className="material-symbols-outlined text-secondary" style={{ fontSize: "56px" }}>
            hourglass_empty
          </span>
          <h1 className="font-headline-md text-headline-md text-primary">Payment Not Completed</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            It looks like this payment hasn't gone through yet. If you completed payment, give it a
            moment and refresh — otherwise, you can try again from your cart.
          </p>
          <Link
            to="/cart"
            className="inline-flex bg-primary text-on-primary px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors active:scale-[0.98]"
          >
            Back to Cart
          </Link>
        </Reveal>
      )}

      {status === "error" && (
        <Reveal as="div" className="space-y-6">
          <span className="material-symbols-outlined text-error" style={{ fontSize: "56px" }}>
            error
          </span>
          <h1 className="font-headline-md text-headline-md text-primary">Couldn't Confirm Payment</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">{errorMessage}</p>
          <Link
            to="/cart"
            className="inline-flex bg-primary text-on-primary px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors active:scale-[0.98]"
          >
            Back to Cart
          </Link>
        </Reveal>
      )}
    </div>
  );
}
