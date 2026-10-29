// Real business info for Pearl Aesthetics & GP Medical Clinic, Dubai.
// Pulled directly from the clinic's own live site (amazing-ganache-b98cf4.netlify.app)
// so contact details only ever need to be updated in one place.

const BUSINESS = {
  name: "Pearl Aesthetics & GP Medical Clinic",
  shortName: "Pearl",
  tagline: "Where Medical Excellence Meets the Art of Timeless Beauty",
  description:
    "A DHA-licensed aesthetics & general-medical clinic in the heart of Dubai. German board-certified expertise, subtle natural results, and care tailored to you.",
  metaDescription:
    "DHA-licensed aesthetics & GP medical clinic in Jumeirah Village Circle, Dubai. German board-certified expertise, natural results, injectables, HydraFacial, IV wellness and more.",

  address: {
    line1: "Shop 3, Mayas Geneva Building",
    line2: "Jumeirah Village Circle (JVC)",
    city: "Dubai",
    country: "United Arab Emirates",
    full: "Shop 3, Mayas Geneva Building, JVC, Dubai",
    mapsQuery: "Pearl Aesthetics and GP Medical Clinic Mayas Geneva Building JVC Dubai",
    // The clinic's own Google Maps listing - every "location" mention on the
    // site links here so visitors land on the real pin (with directions,
    // photos and reviews), not a loose text search.
    mapsUrl:
      "https://www.google.com/maps/place/3633%2BMXC+Pearl+Aesthetics+and+GP+Medical+Clinic+L.L.C+-+Al+Barsha+South+Fourth+-+Jumeirah+Village+Circle+-+Dubai/data=!4m2!3m1!1s0x3e5f6d003711c989:0x76aaddfa09b42eb5",
  },

  google: {
    // Place ID for the clinic's Google Business listing - used by the
    // google-reviews Edge Function to pull live reviews from the Places API.
    placeId: "ChIJickRNwBtXz4RtS60CfrdqnY",
    reviewsUrl: "https://search.google.com/local/reviews?placeid=ChIJickRNwBtXz4RtS60CfrdqnY",
    writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJickRNwBtXz4RtS60CfrdqnY",
    rating: 5.0,
  },

  instagram: {
    handle: "pearl_medicals",
    url: "https://www.instagram.com/pearl_medicals/",
  },

  phones: [
    { label: "Mobile / WhatsApp", number: "+971 55 963 9972", href: "tel:+971559639972" },
    { label: "Landline", number: "+971 4 565 3964", href: "tel:+97145653964" },
  ],

  // Digits only, no + or spaces - required format for wa.me links.
  whatsappNumber: "971559639972",

  email: "info@pearlaestheticgp.com", // TODO: confirm the clinic's real inbox

  hours: {
    display: "Open Daily · 8AM–10PM",
    days: "Every day",
    openTime: "8:00 AM",
    closeTime: "10:00 PM",
  },

  externalBooking: {
    label: "Book via InstaHMS",
    url: "https://pearl-trg.uae.instahms.com/instahms/loginForm.do",
  },

  stats: [
    { value: "5.0", label: "Verified Google Reviews", icon: "star" },
    { value: "9+", label: "Languages Spoken", icon: "language" },
    { value: "14h", label: "Open Every Day", icon: "schedule" },
  ],

  certifications: ["DHA-Licensed Clinic", "5.0 on Google", "9+ Languages Spoken", "Open Daily · 8AM–10PM"],

  differentiators: [
    {
      title: "German board-certified leadership",
      description: "Founded and led by a Family-Medicine consultant with Harvard postgraduate training.",
    },
    {
      title: "Complimentary consultations",
      description: "Unhurried, personalised assessments before any treatment begins.",
    },
    {
      title: "Multilingual team",
      description: "Care in English, Arabic, Hindi, Urdu and more.",
    },
    {
      title: "Central JVC location",
      description: "Easily reached from JLT, Motor City, Al Barsha, TECOM and Al Quoz.",
    },
  ],

  // Real Google reviews, copied verbatim from the clinic's Google Business
  // listing. This is the fallback set - when the google-reviews Edge
  // Function is configured (GOOGLE_PLACES_API_KEY), the site shows the
  // live reviews from Google instead.
  testimonials: [
    {
      quote:
        "Thank you Dr. Priscilla for your kind and compassionate care. I have known her since 2024 — always ready to go the extra mile to ensure a good diagnosis and treatment… I would tell anyone visiting or living in the UAE to visit and experience this excellent medical care. It's a special gift!!!",
      name: "Sonia",
      source: "Google Review",
      rating: 5,
    },
    {
      quote:
        "Thank you to Dr. Priscilla for outstanding care. Your professionalism, empathy, and clear guidance made a real difference in my experience. Highly appreciative of your dedication.",
      name: "Joseph Mwinuka",
      source: "Google Review",
      rating: 5,
    },
    {
      quote:
        "The service was very professional. Dr. Wafa's consultation and guidance was very good, and Dr. Shaima managed my session very professionally. I will definitely recommend this place.",
      name: "Shahwar Zaidi",
      source: "Google Review",
      rating: 5,
    },
    {
      quote:
        "The best clinic ever. Most importantly, the GP here, Dr. Priscilla, and the dermatologist are very, very genuine and don't over-prescribe medication. The best. I am coming back soon.",
      name: "Pooja Wadhwa",
      source: "Google Review",
      rating: 5,
    },
  ],

  medicalDisclaimer: "Aesthetic and medical treatments carry individual risks.",
  copyrightYear: 2026,
};

export default BUSINESS;
