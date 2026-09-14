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
    mapsQuery: "Mayas Geneva Building JVC Dubai",
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

  // Real reviews already published on the clinic's own live site.
  testimonials: [
    { quote: "The most professional clinic I have visited in Dubai.", name: "Aisha M.", source: "Verified Google Review" },
    { quote: "From consultation to treatment, everything felt premium yet personal.", name: "Layla K.", source: "Verified Google Review" },
    { quote: "Multilingual, discreet and genuinely caring.", name: "Sara H.", source: "Verified Google Review" },
  ],

  medicalDisclaimer: "Aesthetic and medical treatments carry individual risks.",
  copyrightYear: 2026,
};

export default BUSINESS;
