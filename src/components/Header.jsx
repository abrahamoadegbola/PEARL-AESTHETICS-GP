import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { to: "/treatments", label: "Treatments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/results", label: "Results" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-none"
      style={{ boxShadow: "0 4px 32px rgba(0, 35, 28, 0.04)" }}
    >
      <div className="flex justify-between items-center px-gutter py-4 w-full max-w-container-max mx-auto">
        <Link
          className="font-display-lg text-display-lg text-primary tracking-tighter"
          to="/"
          onClick={() => setOpen(false)}
        >
          AESTHETICA
        </Link>

        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-body-md font-body-md transition-colors ${
                  isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            className="relative text-on-surface-variant hover:text-primary transition-colors"
            to="/cart"
            aria-label="View cart"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
          </Link>
          <Link
            className="hidden md:inline-flex bg-secondary-container text-on-secondary-container px-6 py-3 rounded hover:bg-secondary-fixed transition-colors hover:scale-[1.02] duration-200 ease-out font-label-caps text-label-caps uppercase tracking-widest"
            to="/book-consultation"
          >
            Book Now
          </Link>
          <button
            className="md:hidden text-primary p-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="material-symbols-outlined text-2xl">{open ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-surface-container-low/40" />

      {open && (
        <div className="md:hidden bg-surface border-t border-surface-container-high/50 px-gutter py-6 flex flex-col gap-5">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-body-md font-body-md ${isActive ? "text-primary font-bold" : "text-on-surface-variant"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/book-consultation"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center bg-secondary-container text-on-secondary-container px-6 py-3 rounded font-label-caps text-label-caps uppercase tracking-widest"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
