/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // Every value below was read out of a real reference site's own
      // compiled stylesheet (its :root custom properties, converted from
      // HSL to hex) rather than guessed from a screenshot description -
      // teal as the one dominant accent, navy as a second deep accent,
      // warm cream surfaces, champagne gold for small highlights, and a
      // charcoal (not black, not brand-coloured) ink. The token *names*
      // below are unchanged from Pearl's original Material-3-flavoured
      // system so no component needs editing - only what each name
      // resolves to changes, which is what makes this a sitewide fix
      // rather than a Home-page-only one.
      colors: {
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        // Teal - the site's one dominant accent (their --primary AND
        // --accent are the same teal), used for every CTA, link, active
        // state and icon.
        primary: "#39b3b9",
        "on-primary": "#ffffff",
        "primary-container": "#2b8a8f",
        "on-primary-container": "#ffffff",
        "primary-fixed": "#d7f1f2",
        "primary-fixed-dim": "#8fd6da",
        "on-primary-fixed": "#01333a",
        "on-primary-fixed-variant": "#0d5c62",
        "inverse-primary": "#8fd6da",

        // Champagne gold - a second, smaller accent for labels, icons and
        // premium-feeling highlights, kept separate from the teal CTAs.
        secondary: "#b6970c",
        "secondary-container": "#39b3b9",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#ffffff",
        "secondary-fixed": "#2b8a8f",
        "secondary-fixed-dim": "#f0dfa0",
        "on-secondary-fixed": "#4a3d05",
        "on-secondary-fixed-variant": "#8a7209",

        // Rarely used in this codebase; kept as a muted warm-brown family
        // rather than the old reddish tertiary, so it never clashes if it
        // does surface somewhere.
        tertiary: "#6b5a3d",
        "tertiary-container": "#f0e6d2",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#6b5a3d",
        "tertiary-fixed": "#f0e6d2",
        "tertiary-fixed-dim": "#d9c7a3",
        "on-tertiary-fixed": "#3a2f1a",
        "on-tertiary-fixed-variant": "#5c4c30",

        // Warm cream/white surfaces, stepping slightly deeper each level -
        // reads as soft and boutique instead of the old cooler grey-greens.
        background: "#ffffff",
        "on-background": "#404040",
        surface: "#ffffff",
        "surface-bright": "#ffffff",
        "on-surface": "#404040",
        "surface-variant": "#f2ebe3",
        "on-surface-variant": "#5c5650",
        "surface-dim": "#e6e0da",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f7f3ee",
        "surface-container": "#f2ebe3",
        "surface-container-high": "#ede1d1",
        "surface-container-highest": "#e6d7c2",
        "surface-tint": "#39b3b9",
        outline: "#8a8178",
        "outline-variant": "#e6e0da",
        "inverse-surface": "#3a3630",
        "inverse-on-surface": "#f7f3ee",

        // A second deep accent (separate from the teal) for hero photo
        // scrims and any spot that wants real weight/contrast rather than
        // the brighter teal.
        navy: "#01445e",
        "navy-dark": "#012f42",
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
