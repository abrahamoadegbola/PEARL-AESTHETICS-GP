// The clinic's service areas, grouped the way a first-time visitor thinks
// about them rather than by internal treatment-menu taxonomy. Used by the
// Home page's category grid; kept separate from BookConsultation's own
// CATEGORIES list since that one is written for a "what are you here for"
// selection step, not a marketing overview, and intentionally reads
// differently.
const SERVICE_CATEGORIES = [
  {
    id: "injectables",
    icon: "water_drop",
    title: "Injectables & Fillers",
    blurb: "Neuromodulators and dermal fillers for natural contour and volume.",
    href: "/book-consultation?treatment=injectables",
  },
  {
    id: "laser",
    icon: "flare",
    title: "Laser & Light",
    blurb: "Pigmentation, redness, scarring and hair removal, treated with precision.",
    href: "/book-consultation?treatment=laser-tightening",
  },
  {
    id: "skin",
    icon: "spa",
    title: "Skin Rejuvenation",
    blurb: "Facials, peels and microneedling that restore texture and tone.",
    href: "/book-consultation?treatment=skin-rejuvenation",
  },
  {
    id: "gp",
    icon: "stethoscope",
    title: "General Medicine",
    blurb: "Family-medicine consultations from a DHA-licensed GP team.",
    href: "/book-consultation?treatment=general-medicine",
  },
  {
    id: "boutique",
    icon: "shopping_bag",
    title: "Skincare Boutique",
    blurb: "Medical-grade formulations, the same ones used in treatment.",
    href: "/shop",
  },
  {
    id: "offers",
    icon: "local_offer",
    title: "Current Offers",
    blurb: "Seasonal bundles pairing treatments that genuinely work together.",
    href: "/offers",
  },
];

export default SERVICE_CATEGORIES;
