import { Link } from "react-router-dom";
import Reveal from "./motion/Reveal";

// The eyebrow / headline / optional "see everything" link that opens every
// content section on the site. Pulled out so the spacing and type scale can't
// drift section to section.
export default function SectionHeader({
  eyebrow,
  title,
  lede,
  linkTo,
  linkLabel,
  align = "left",
  tone = "light",
  className = "",
}) {
  const centred = align === "center";
  const dark = tone === "dark";

  return (
    <Reveal
      as="div"
      className={`flex flex-col ${
        linkTo ? "md:flex-row md:items-end md:justify-between" : ""
      } gap-6 mb-14 md:mb-16 ${centred ? "text-center items-center" : ""} ${className}`}
    >
      <div className={`max-w-2xl ${centred ? "mx-auto" : ""}`}>
        {eyebrow && (
          <span
            className={`font-label-caps text-label-caps uppercase tracking-[0.25em] mb-4 block ${
              dark ? "text-secondary-container" : "text-primary"
            }`}
          >
            {eyebrow}
          </span>
        )}
        <h2
          className={`font-display-lg ${dark ? "text-on-primary" : "text-primary"}`}
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
        >
          {title}
        </h2>
        {lede && (
          <p
            className={`font-body-lg text-body-lg mt-5 ${
              dark ? "text-on-primary/75" : "text-on-surface-variant"
            }`}
          >
            {lede}
          </p>
        )}
      </div>

      {linkTo && (
        <Link
          to={linkTo}
          className={`inline-flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest group flex-shrink-0 ${
            dark ? "text-secondary-container hover:text-secondary-fixed" : "text-primary hover:text-surface-tint"
          } transition-colors`}
        >
          {linkLabel}
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      )}
    </Reveal>
  );
}
