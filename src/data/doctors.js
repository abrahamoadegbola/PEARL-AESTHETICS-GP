// Real doctor roster for Pearl Aesthetics & GP Medical Clinic.
//
// Names, titles, credentials, and photos are sourced directly from the
// clinic's own live site (amazing-ganache-b98cf4.netlify.app/doctors) -
// first-party content about the clinic's own real, practicing team.
// Photos are hotlinked from that same site's own asset folder.
//
// IMPORTANT: only facts actually published on the source site are
// included here. Where the source didn't give specific education
// history (institution names, years) for a doctor, that section is left
// out rather than invented - fabricating credentials for a real,
// licensed physician would misrepresent them, which is exactly the kind
// of harm this data file needs to avoid. If you have more detail (full
// education history, registration numbers, etc.), add it here directly.

const DOCTORS = [
  {
    id: "hamid-balogun",
    name: "Dr. Hamid O. Balogun",
    credentials: "German Board-Certified, Family Medicine",
    title: "CEO & Founder",
    specialty: "gp",
    badge: "DHA Licensed",
    badgeIcon: "verified",
    cardBio:
      "German board-certified Family Medicine consultant with postgraduate training from Harvard Medical School. Principal owner of two private clinics in Germany.",
    experience: "Founder & Principal Owner",
    languages: "English, German, Arabic",
    cardImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-balogun.jpg",
    heroImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-balogun.jpg",
    bio: [
      "Dr. Hamid O. Balogun is the CEO and Founder of Pearl Aesthetics & GP Medical Clinic. He is a German board-certified Family Medicine consultant with postgraduate training from Harvard Medical School, and is the principal owner of two private clinics in Germany.",
    ],
    expertise: ["Family Medicine", "General Practice", "Clinical Leadership"],
  },
  {
    id: "priscilla-puspam",
    name: "Dr. Priscilla Puspam",
    credentials: "MBBS, DHA-Licensed",
    title: "GP / Medical Director",
    specialty: "gp",
    badge: "DHA Licensed",
    badgeIcon: "verified",
    cardBio:
      "MBBS, DHA-licensed. ACLS and Basic OBGYN scan certified, with warm, patient-centred general care.",
    experience: "Medical Director",
    languages: "English, Arabic, Hindi, Tamil, and more",
    cardImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-puspam.jpg",
    heroImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-puspam.jpg",
    bio: [
      "Dr. Priscilla Puspam is Pearl's GP and Medical Director. She holds an MBBS and is DHA-licensed, with ACLS and Basic OBGYN scan certification, bringing warm, patient-centred general care to every consultation.",
    ],
    expertise: ["General Practice", "ACLS Certified", "Basic OBGYN Scanning", "Patient-Centred Care"],
  },
  {
    id: "wafa-shah",
    name: "Dr. Wafa Shah",
    credentials: "GP Aesthetics",
    title: "GP Aesthetics",
    specialty: "aesthetics",
    badge: "DHA Licensed",
    badgeIcon: "verified",
    cardBio:
      "Over 5 years dedicated to aesthetic and regenerative procedures, focused on natural, balanced results.",
    experience: "5+ Years Experience",
    languages: "English, Urdu, Hindi, and more",
    cardImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-shah.jpg",
    heroImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-shah.jpg",
    bio: [
      "Dr. Wafa Shah has spent over 5 years dedicated to aesthetic and regenerative procedures, with a focus on natural, balanced results tailored to each patient.",
    ],
    expertise: ["Aesthetic Medicine", "Regenerative Procedures", "Natural Results"],
  },
  {
    id: "shaima-adil",
    name: "Dr. Shaima Adil",
    credentials: "Beauty & Laser Therapy",
    title: "Beauty & Laser Therapy",
    specialty: "aesthetics",
    badge: "DHA Licensed",
    badgeIcon: "verified",
    cardBio:
      "6+ years specialising in advanced beauty and laser therapy for smooth, radiant, healthy skin.",
    experience: "6+ Years Experience",
    languages: "Arabic, English, Nubian",
    cardImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-adil.jpg",
    heroImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-adil.jpg",
    bio: [
      "Dr. Shaima Adil has 6+ years of specialised experience in advanced beauty and laser therapy, helping patients achieve smooth, radiant, healthy skin.",
    ],
    expertise: ["Laser Therapy", "Beauty Treatments", "Skin Health"],
  },
];

export default DOCTORS;
