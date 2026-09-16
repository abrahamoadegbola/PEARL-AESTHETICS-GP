// PLACEHOLDER PRICING - these bundles came from the original template with
// US-dollar figures, which didn't match the AED pricing used everywhere else
// on the site. The currency is now consistent, but the numbers themselves
// still need to be replaced with the clinic's real promotional pricing before
// this page goes live. Shared with the Home page's offers preview strip so
// both pull from one source instead of drifting apart.
const OFFERS = [
  {
    id: "radiance",
    tag: "Limited Time",
    name: "Radiance Renewal Bundle",
    was: 850,
    now: 650,
    includes: ["Signature HydraFacial", "LED light therapy session", "Complimentary skincare consultation"],
    image:
      "https://images.unsplash.com/photo-1643684391140-c5056cfd3436?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "A treatment room at the clinic, prepared for a facial",
  },
  {
    id: "sculpt",
    tag: "Signature Package",
    featured: true,
    name: "The Sculpt & Glow",
    was: 1200,
    now: 950,
    includes: ["Two areas of neuromodulator", "One syringe of premium dermal filler", "Post-care recovery kit"],
    image:
      "https://images.unsplash.com/photo-1731514771613-991a02407132?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Premium skincare products arranged on a marble surface",
  },
  {
    id: "introductory",
    tag: "New Patients",
    name: "Introductory Lift",
    was: 400,
    now: 299,
    includes: ["Comprehensive skin analysis", "Customised chemical peel", "Travel-size cleanser"],
    image:
      "https://images.unsplash.com/photo-1761718209708-9ab9ba1c7252?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Clear water rippling in bright, clean light",
  },
];

export default OFFERS;
