import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useHasDarkHero } from "../context/DarkHeroContext";
import BUSINESS from "../data/business";

const navLinks = [
  { to: "/treatments", label: "Treatments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/results", label: "Results" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
];

// The clinic's own logo, from their live site's own asset folder -
// first-party brand asset, not a third party's.
const LOGO_URL = "https://amazing-ganache-b98cf4.netlify.app/assets/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const hasDarkHero = useHasDarkHero();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent only where there's a dark hero behind it AND we're at the
  // top of the page. Anywhere else the bar stays solid, so light-background
  // pages never end up with white type on a white ground. The mobile menu
  // being open also forces it solid - the panel below it needs a backdrop.
  const transparent = hasDarkHero && !scrolled && !open;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        transparent ? "bg-gradient-to-b from-black/45 to-transparent" : "bg-primary"
      }`}
      style={transparent ? undefined : { boxShadow: "0 4px 32px rgba(0, 35, 28, 0.18)" }}
    >
      <div className="flex justify-between items-center px-gutter py-3 w-full max-w-container-max mx-auto">
        <Link to="/" onClick={() => setOpen(false)} className="flex-shrink-0 flex items-center">
          {logoError ? (
            <span className="font-display-lg text-2xl text-on-primary tracking-tight">
              {BUSINESS.shortName.toUpperCase()}
            </span>
          ) : (
            <img
              src={LOGO_URL}
              alt={BUSINESS.name}
              className="h-10 md:h-12 w-auto"
              onError={() => setLogoError(true)}
            />
          )}
        </Link>

        <div className="hidden md:flex space-x-9 items-center">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-label-caps text-label-caps uppercase tracking-widest transition-colors relative py-1 ${
                  isActive
                    ? "text-secondary-container"
                    : "text-on-primary/85 hover:text-secondary-container"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-secondary-container transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
          <Link
            className="relative text-on-primary/85 hover:text-secondary-container transition-colors"
            to="/cart"
            aria-label={`View cart${itemCount > 0 ? ` (${itemCount} item${itemCount === 1 ? "" : "s"})` : ""}`}
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary-container text-on-secondary-container text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>
          <Link
            className="hidden md:inline-flex bg-secondary-container text-on-secondary-container px-6 py-3 rounded hover:bg-secondary-fixed transition-colors duration-200 ease-out font-label-caps text-label-caps uppercase tracking-widest"
            to="/book-consultation"
          >
            Book Now
          </Link>
          <button
            className="md:hidden text-on-primary p-2 active:scale-90 transition-transform"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="material-symbols-outlined text-2xl">{open ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-primary border-t border-on-primary/15 overflow-hidden"
          >
            <div className="px-gutter py-6 flex flex-col gap-5">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-label-caps text-label-caps uppercase tracking-widest ${
                      isActive ? "text-secondary-container" : "text-on-primary/85"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/book-consultation"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center bg-secondary-container text-on-secondary-container px-6 py-3 rounded font-label-caps text-label-caps uppercase tracking-widest active:scale-[0.98] transition-transform"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
