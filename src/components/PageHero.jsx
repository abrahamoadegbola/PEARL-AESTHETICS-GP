import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./motion/Reveal";
import StaggeredText from "./motion/StaggeredText";
import OrganicBlob from "./motion/OrganicBlob";
import { useDeclareDarkHero } from "../context/DarkHeroContext";

// The single hero used at the top of every interior page, so the whole site
// opens the same way instead of each page inventing its own header.
//
// Two tones:
// - "dark"  - full-bleed photograph under a scrim, light type. For pages that
//             have a real image worth showing (About, a treatment, results).
// - "light" - no media, deep top padding on the page background. For the
//             functional pages (menu, booking, cart) where a photo would just
//             be decoration standing between the visitor and the task.
//
// - "surface" - a coloured page top with one visual beside the copy (see
//             SURFACES). Used where a page deserves its own personality
//             (Treatments, Doctors, Results) without a full-bleed photo.
//
// Everything else - the eyebrow rule, the title scale, the lede width, the
// vertical rhythm - is identical across both, which is what actually makes the
// pages feel like one site.
// Colour worlds for tone="surface". `dark` ones run under the header like a
// photo hero does; light ones sit below the solid header.
const SURFACES = {
  forest: {
    dark: true,
    className: "bg-primary text-on-primary",
    glow: "radial-gradient(ellipse 60% 70% at 85% 30%, rgba(254,214,91,0.20), transparent 70%)",
  },
  champagne: {
    dark: false,
    className: "bg-[#f1e7d2] text-primary",
    glow: "radial-gradient(ellipse 55% 80% at 90% 20%, rgba(255,255,255,0.75), transparent 70%)",
  },
  blush: {
    dark: false,
    className: "bg-[#f2e2da] text-primary",
    glow: "radial-gradient(ellipse 55% 80% at 88% 25%, rgba(254,214,91,0.30), transparent 70%), radial-gradient(ellipse 40% 60% at 10% 100%, rgba(255,255,255,0.6), transparent 70%)",
  },
  sage: {
    dark: false,
    className: "bg-[#d9e9e1] text-primary",
    glow: "radial-gradient(ellipse 55% 80% at 85% 25%, rgba(254,214,91,0.28), transparent 70%)",
  },
};

export default function PageHero({
  eyebrow,
  title,
  lede,
  tone = "light",
  image,
  imageAlt = "",
  objectPosition = "center",
  actions,
  breadcrumb,
  align = "left",
  surface = "forest",
  visual,
  children,
}) {
  const reduceMotion = useReducedMotion();
  const coloured = tone === "surface" ? SURFACES[surface] : null;
  const photo = tone === "dark";
  const dark = photo || Boolean(coloured?.dark);
  const centred = align === "center";

  // A dark hero runs under the header rather than below it, which is what
  // lets the header sit transparent over the image.
  useDeclareDarkHero(dark);

  return (
    <section
      className={`relative isolate overflow-hidden ${
        coloured
          ? `${coloured.className} ${
              "-mt-[88px] md:-mt-[104px] pt-[136px] md:pt-[168px]"
            } pb-14 md:pb-20`
          : photo
          ? "-mt-[88px] md:-mt-[104px] min-h-[75vh] md:min-h-[85vh] flex items-end text-on-primary bg-primary"
          : "bg-background text-primary pt-16 pb-14 md:pt-28 md:pb-20"
      }`}
    >
      {coloured && (
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{ background: coloured.glow }} aria-hidden="true" />
      )}

      {photo && image && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" style={{ objectPosition }} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/25" />
        </motion.div>
      )}

      {/* Light-tone pages have no photo to carry the eye, so a faint,
          slowly-morphing blob sits behind the copy instead - just enough
          texture that the page doesn't open on a flat block of white. */}
      {!dark && !coloured && (
        <div
          className="absolute -top-24 -right-24 w-[28rem] h-[28rem] opacity-[0.06] blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        >
          <OrganicBlob colorFrom="#0e3a30" colorTo="#fed65b" />
        </div>
      )}

      <div
        className={`relative z-10 w-full max-w-container-max mx-auto px-gutter ${
          photo ? "pt-[136px] pb-16 md:pt-[176px] md:pb-24" : ""
        } ${centred ? "text-center" : ""} ${visual ? "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center" : ""}`}
      >
        <div className={visual ? "lg:col-span-7" : ""}>
        {breadcrumb && <div className="mb-8">{breadcrumb}</div>}

        {eyebrow && (
          <Reveal delay={0.05}>
            <span
              className={`font-label-caps text-label-caps uppercase tracking-[0.3em] mb-6 flex items-center gap-3 ${
                centred ? "justify-center" : ""
              } ${dark ? "text-secondary-container" : coloured ? "text-primary/80" : "text-primary"}`}
            >
              <span className={`w-10 h-px ${dark ? "bg-secondary-container/60" : "bg-primary/30"}`} />
              {eyebrow}
            </span>
          </Reveal>
        )}

        <h1
          className={`font-display-lg max-w-4xl ${centred ? "mx-auto" : ""}`}
          style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
        >
          {typeof title === "string" ? (
            <StaggeredText text={title} startDelay={0.1} wordDelay={0.04} />
          ) : (
            title
          )}
        </h1>

        {lede && (
          <Reveal delay={0.45}>
            <p
              className={`font-body-lg text-body-lg mt-7 max-w-2xl ${centred ? "mx-auto" : ""} ${
                dark ? "text-on-primary/80" : coloured ? "text-primary/75" : "text-on-surface-variant"
              }`}
            >
              {lede}
            </p>
          </Reveal>
        )}

        {actions && (
          <Reveal delay={0.58}>
            <div className={`mt-10 flex flex-col sm:flex-row gap-4 ${centred ? "justify-center" : ""}`}>
              {actions}
            </div>
          </Reveal>
        )}

        {children && (
          <Reveal delay={0.68}>
            <div className="mt-12">{children}</div>
          </Reveal>
        )}
        </div>

        {visual && (
          <Reveal delay={0.3} as="div" className="lg:col-span-5">
            {visual}
          </Reveal>
        )}
      </div>
    </section>
  );
}
