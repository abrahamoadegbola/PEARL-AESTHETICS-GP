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
// Everything else - the eyebrow rule, the title scale, the lede width, the
// vertical rhythm - is identical across both, which is what actually makes the
// pages feel like one site.
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
  children,
}) {
  const reduceMotion = useReducedMotion();
  const dark = tone === "dark";
  const centred = align === "center";

  // A dark hero runs under the header rather than below it, which is what
  // lets the header sit transparent over the image.
  useDeclareDarkHero(dark);

  return (
    <section
      className={`relative isolate overflow-hidden ${
        dark
          ? "-mt-[88px] md:-mt-[104px] min-h-[75vh] md:min-h-[85vh] flex items-end text-on-primary bg-primary"
          : "bg-background text-primary pt-16 pb-14 md:pt-28 md:pb-20"
      }`}
    >
      {dark && image && (
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
      {!dark && (
        <div
          className="absolute -top-24 -right-24 w-[28rem] h-[28rem] opacity-[0.06] blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        >
          <OrganicBlob colorFrom="#0e3a30" colorTo="#fed65b" />
        </div>
      )}

      <div
        className={`relative z-10 w-full max-w-container-max mx-auto px-gutter ${
          dark ? "pt-[136px] pb-16 md:pt-[176px] md:pb-24" : ""
        } ${centred ? "text-center" : ""}`}
      >
        {breadcrumb && <div className="mb-8">{breadcrumb}</div>}

        {eyebrow && (
          <Reveal delay={0.05}>
            <span
              className={`font-label-caps text-label-caps uppercase tracking-[0.3em] mb-6 flex items-center gap-3 ${
                centred ? "justify-center" : ""
              } ${dark ? "text-secondary-container" : "text-primary"}`}
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
                dark ? "text-on-primary/80" : "text-on-surface-variant"
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
    </section>
  );
}
