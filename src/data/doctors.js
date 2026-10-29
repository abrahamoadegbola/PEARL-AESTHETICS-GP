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
    credentials: "Consultant, Family Medicine & Aesthetics · German Board-Certified",
    title: "CEO & Founder",
    // Listed under both filters on /doctors.
    specialty: ["gp", "aesthetics"],
    // Deliberately not "DHA Licensed" - his accreditation is German
    // (Facharzt für Allgemeinmedizin), so the badge says that instead.
    badge: "German Board-Certified",
    badgeIcon: "workspace_premium",
    cardBio:
      "Consultant in Family Medicine and Aesthetics, German board-certified, with postgraduate training from Harvard Medical School. Principal owner of two private practices in Germany.",
    experience: "Founder & Principal Owner",
    languages: "English, German, Arabic, Yoruba, Russian",
    cardImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-balogun.jpg",
    heroImage: "https://amazing-ganache-b98cf4.netlify.app/assets/doc-balogun.jpg",
    // Sourced from his LinkedIn headline (Hamid Oladipupo Balogun, MD), the
    // clinic's own site, and Germany's public physician registries
    // (arzt-auskunft.de / KV Baden-Württemberg). Nothing here goes beyond
    // what those sources state.
    bio: [
      "Dr. Hamid Oladipupo Balogun, MD, is the CEO and Founder of Pearl Aesthetics & GP Medical Clinic. He is a consultant in Family Medicine and Aesthetics, German board-certified in Family Medicine (Facharzt für Allgemeinmedizin), and a physician executive, with postgraduate executive training in Life Sciences from Harvard Medical School.",
      "In Germany he is the principal owner of two private family practices in Baden-Württemberg: the Internationale Hausarztpraxis Waldhof in Mannheim and a second practice in Eberbach. Both are admitted to Germany's statutory health insurance system, and the Mannheim practice cares for patients in more than eight languages.",
      "He is a member of the Nigerian Medical Association, Germany. At Pearl he brings the same approach to Dubai: physician-led care, unhurried consultations, and a team that can speak with patients in their own language.",
    ],
    expertise: ["Family Medicine", "Aesthetic Medicine", "General Practice", "Preventive Care", "Clinical Leadership", "Healthcare Management"],
    education: [
      { title: "Executive Education, Life Sciences", place: "Harvard Medical School", years: "Postgraduate" },
      { title: "Facharzt für Allgemeinmedizin (Family Medicine Specialist)", place: "Board certification, Germany", years: "Board-Certified" },
    ],
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
