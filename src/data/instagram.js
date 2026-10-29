// Snapshot of the clinic's own Instagram (@pearl_medicals), saved locally
// under public/instagram/ so the site never depends on Instagram's
// short-lived CDN links. This is the fallback - when the instagram-feed
// Edge Function is configured (INSTAGRAM_ACCESS_TOKEN), the gallery,
// results and facilities sections pull the live feed instead and pick up
// new posts and reels automatically.
//
// `tags` drive where a post shows up:
//   result   - before/after, shown in the Results Gallery
//   facility - the clinic itself, shown in the Facilities section
//   reel     - short video, shown with a play badge
//   team / event / education / review - general feed filters
//
// Each post's `image` is that post's cover frame and each reel's
// `videoUrl` its saved video, played in the site's own player. Photo posts
// open on Instagram.

const IG = "https://www.instagram.com";

const INSTAGRAM_POSTS = [
  {
    id: "De6e8cwO7sI",
    type: "image",
    date: "2026-10-25",
    permalink: `${IG}/p/De6e8cwO7sI/`,
    image: "/instagram/De6e8cwO7sI.jpg",
    title: "Hair Restoration",
    caption: "A personalised approach to scalp and hair health — before & after.",
    tags: ["result"],
    category: "Hair Restoration",
  },
  {
    id: "DewGyVIOsdO",
    type: "reel",
    date: "2026-10-21",
    permalink: `${IG}/reel/DewGyVIOsdO/`,
    image: "/instagram/DewGyVIOsdO.jpg",
    videoUrl: "/instagram/DewGyVIOsdO.mp4",
    title: "AMWC 2026 Dubai",
    caption: "Our team at the Aesthetic & Anti-Aging Medicine World Congress, Dubai.",
    tags: ["reel", "event"],
  },
  {
    id: "Dev0qmMuPJG",
    type: "reel",
    date: "2026-10-21",
    permalink: `${IG}/reel/Dev0qmMuPJG/`,
    image: "/instagram/Dev0qmMuPJG.jpg",
    videoUrl: "/instagram/Dev0qmMuPJG.mp4",
    title: "Welcome to Pearl",
    caption: "Our clinic front at Mayas Geneva Building, JVC.",
    tags: ["reel", "facility"],
    facility: {
      title: "Clinic Entrance",
      description: "Street-level at Mayas Geneva Building in JVC, close to JLT, Al Barsha and Motor City.",
    },
  },
  {
    id: "DeqtepHuAa7",
    type: "reel",
    date: "2026-10-19",
    permalink: `${IG}/reel/DeqtepHuAa7/`,
    image: "/instagram/DeqtepHuAa7.jpg",
    videoUrl: "/instagram/DeqtepHuAa7.mp4",
    title: "Facial Treatment",
    caption: "Inside one of our facial treatments.",
    tags: ["reel", "facility"],
    facility: {
      title: "Treatment Suites",
      description: "Private, clinical-grade rooms for facials, HydraFacial, laser and injectables.",
    },
  },
  {
    id: "DeZRDbGOD4Q",
    type: "reel",
    date: "2026-10-12",
    permalink: `${IG}/reel/DeZRDbGOD4Q/`,
    image: "/instagram/DeZRDbGOD4Q.jpg",
    videoUrl: "/instagram/DeZRDbGOD4Q.mp4",
    title: "When to See a GP",
    caption: "Practical guidance for everyday health concerns in JVC, Dubai.",
    tags: ["reel", "education"],
  },
  {
    id: "DePocCIO-VH",
    type: "reel",
    date: "2026-10-08",
    permalink: `${IG}/reel/DePocCIO-VH/`,
    image: "/instagram/DePocCIO-VH.jpg",
    videoUrl: "/instagram/DePocCIO-VH.mp4",
    title: "Behind the Scenes",
    caption: "When you love what you do.",
    tags: ["reel", "team", "facility"],
    facility: {
      title: "Patient Lounge",
      description: "A calm, warm reception area. Karak chai is on the house.",
      objectPosition: "center 88%",
    },
  },
  {
    id: "Dd4ypt3Asso",
    type: "reel",
    date: "2026-09-29",
    permalink: `${IG}/reel/Dd4ypt3Asso/`,
    image: "/instagram/Dd4ypt3Asso.jpg",
    videoUrl: "/instagram/Dd4ypt3Asso.mp4",
    title: "Dubai Heat: 3 Signs to Watch",
    caption: "Dr. Priscilla on recognising heat-related illness.",
    tags: ["reel", "education", "facility"],
    facility: {
      title: "GP Consultation Room",
      description: "Where Dr. Priscilla sees patients for general practice, check-ups and blood tests.",
      objectPosition: "center 42%",
    },
  },
  {
    id: "Dd3LhksuT5_",
    type: "reel",
    date: "2026-09-29",
    permalink: `${IG}/reel/Dd3LhksuT5_/`,
    image: "/instagram/Dd3LhksuT5_.jpg",
    videoUrl: "/instagram/Dd3LhksuT5_.mp4",
    title: "Aesthetics with Dr. Wafa",
    caption: "Anti-wrinkle treatment, explained.",
    tags: ["reel", "team", "education"],
  },
  {
    id: "DdtT5jWIyUR",
    type: "image",
    date: "2026-09-25",
    permalink: `${IG}/p/DdtT5jWIyUR/`,
    image: "/instagram/DdtT5jWIyUR.jpg",
    title: "Anti-Wrinkle Treatment",
    caption: "Forehead lines softened. Aesthetics by Dr. Wafa.",
    tags: ["result"],
    category: "Anti-Wrinkle",
  },
  {
    id: "DdYhawjOgM9",
    type: "image",
    date: "2026-09-17",
    permalink: `${IG}/p/DdYhawjOgM9/`,
    image: "/instagram/DdYhawjOgM9.jpg",
    title: "Flu Season Is Here",
    caption: "School has resumed and flu cases are rising. Dr. Priscilla, DHA-licensed GP.",
    tags: ["education"],
  },
  {
    id: "DdQiKdMuPi3",
    type: "image",
    date: "2026-09-13",
    permalink: `${IG}/p/DdQiKdMuPi3/`,
    image: "/instagram/DdQiKdMuPi3.jpg",
    title: "Dubai Derma 2026",
    caption: "The Pearl Medicals team at Dubai Derma 2026.",
    tags: ["event", "team"],
  },
];

// Posts never shown on the site, even when they come in from the live
// feed (by shortcode, the part after /p/ or /reel/ in the post's link).
export const HIDDEN_POSTS = ["DeOkzX3uKFe"]; // patient shout-out

export default INSTAGRAM_POSTS;
