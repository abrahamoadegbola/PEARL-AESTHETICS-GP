import { Link, useSearchParams } from "react-router-dom";
import Reveal from "../components/motion/Reveal";

export default function CheckoutCancel() {
  const [params] = useSearchParams();
  const orderId = params.get("order");

  return (
    <Reveal
      as="div"
      className="w-full max-w-2xl mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop pt-16 text-center space-y-6"
    >
      <span className="material-symbols-outlined text-outline" style={{ fontSize: "56px" }}>
        cancel
      </span>
      <h1 className="font-headline-md text-headline-md text-primary">Payment Cancelled</h1>
      <p className="font-body-md text-body-md text-on-surface-variant">
        No charge was made{orderId ? ` for order ${orderId}` : ""}. Your cart is still saved, so you can
        try again whenever you're ready.
      </p>
      <div className="flex justify-center gap-6">
        <Link
          to="/cart"
          className="inline-flex bg-primary text-on-primary px-8 py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors active:scale-[0.98]"
        >
          Back to Cart
        </Link>
        <Link to="/shop" className="font-label-caps text-label-caps text-on-surface-variant underline self-center">
          Continue Shopping
        </Link>
      </div>
    </Reveal>
  );
}
