/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // Pearl's actual brand colours - deep forest green as the one
      // dominant accent (CTAs, links, active states, icons), bright gold
      // as the second accent, on cool off-white surfaces. The teal/navy
      // system from the last pass is gone; everything else that pass
      // built - Montserrat, the rounder corners, the glass nav, the hero
      // layering, the poster-slide reveal - stays exactly as it was,
      // since only what these token *names* resolve to changes here, not
      // which components use them.
      colors: {
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        // Forest green - the site's one dominant accent: every CTA, link,
        // active nav state and icon.
        primary: "#0e3a30",
        "on-primary": "#ffffff",
        "primary-container": "#092a22",
        "on-primary-container": "#7aa497",
        "primary-fixed": "#bfecdd",
        "primary-fixed-dim": "#a4d0c1",
        "on-primary-fixed": "#002019",
        "on-primary-fixed-variant": "#254e43",
        "inverse-primary": "#a4d0c1",

        // Gold - the second accent, used for the bright filled CTA
        // buttons sitewide (via secondary-container) and for smaller
        // label/icon highlights (via secondary).
        secondary: "#8a6d00",
        "secondary-container": "#fed65b",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#745c00",
        "secondary-fixed": "#ffe088",
        "secondary-fixed-dim": "#e9c349",
        "on-secondary-fixed": "#241a00",
        "on-secondary-fixed-variant": "#574500",

        // Rarely used in this codebase; a muted warm-brown family so it
        // never clashes if it does surface somewhere.
        tertiary: "#36150e",
        "tertiary-container": "#4f2921",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#c58f83",
        "tertiary-fixed": "#ffdad3",
        "tertiary-fixed-dim": "#f4b8ac",
        "on-tertiary-fixed": "#32120b",
        "on-tertiary-fixed-variant": "#663c33",

        // Cool off-white surfaces, stepping slightly deeper each level.
        background: "#f9f9f7",
        "on-background": "#1a1c1b",
        surface: "#f9f9f7",
        "surface-bright": "#f9f9f7",
        "on-surface": "#1a1c1b",
        "surface-variant": "#e2e3e0",
        "on-surface-variant": "#414845",
        "surface-dim": "#d9dad8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f4f1",
        "surface-container": "#eeeeec",
        "surface-container-high": "#e8e8e6",
        "surface-container-highest": "#e2e3e0",
        "surface-tint": "#3d665a",
        outline: "#717975",
        "outline-variant": "#c0c8c4",
        "inverse-surface": "#2f3130",
        "inverse-on-surface": "#f0f1ef",

        // A second deep accent (darker than primary) for hero photo scrims
        // and the footer - somewhere between primary and true black, so
        // those larger dark areas read as richer than a flat primary fill.
        navy: "#0a2b23",
        "navy-dark": "#051912",
        "on-navy": "#ffffff",
      },
      borderRadius: {
        DEFAULT: "0.875rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        full: "9999px",
      },
      spacing: {
        "container-max": "1200px",
        "section-padding-mobile": "64px",
        gutter: "24px",
        "section-padding-desktop": "120px",
        unit: "8px",
      },
      maxWidth: {
        "container-max": "1200px",
      },
      // Montserrat, for both display and body - the reference site's own
      // --font-display and --font-body both resolve to the same family,
      // so this system does too, rather than pairing two different fonts.
      fontFamily: {
        "display-lg-mobile": ["Montserrat", "sans-serif"],
        "body-lg": ["Montserrat", "sans-serif"],
        "body-md": ["Montserrat", "sans-serif"],
        "display-lg": ["Montserrat", "sans-serif"],
        "label-caps": ["Montserrat", "sans-serif"],
        "headline-sm": ["Montserrat", "sans-serif"],
        "headline-md": ["Montserrat", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "display-lg-mobile": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.7", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-caps": ["12px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "600" }],
        "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "500" }],
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "500" }],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
};
