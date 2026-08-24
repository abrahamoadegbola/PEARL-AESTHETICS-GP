import { Link } from "react-router-dom";

export default function StickyBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 w-full z-40 bg-surface/90 backdrop-blur-md border-t border-surface-container-high/50 px-4 py-3 flex justify-between items-center"
      style={{ boxShadow: "0 -4px 32px rgba(0, 35, 28, 0.08)" }}
    >
      <a
        className="flex items-center gap-2 text-primary font-label-caps text-label-caps uppercase tracking-wider"
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
      >
        <span className="material-symbols-outlined">forum</span>
        WhatsApp
      </a>
      <Link
        className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors"
        to="/book-consultation"
      >
        Book Treatment
      </Link>
    </div>
  );
}
