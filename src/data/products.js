// Central product catalog. This is the single source of truth for the shop,
// product detail, cart, checkout, and the admin inventory screen.
// Prices are in AED to match the clinic's real pricing elsewhere on the site.
//
// Images are licensed stock photography (Unsplash, free for commercial use,
// no attribution required) - each product has its own distinct photo.
//
// rating/reviews are intentionally 0 - there's no real review data behind
// these products yet. The UI hides star ratings when reviews is 0 rather
// than showing a fabricated number. Fill these in from real reviews once
// the shop has actual sales.

const PRODUCTS = [
  {
    id: "molecular-hydration-serum",
    name: "Molecular Hydration Serum",
    category: "Skincare",
    concern: "Hydration",
    description: "Intensive HA formula for deep cellular hydration.",
    longDescription:
      "Engineered with multi-weight hyaluronic acid and active bio-peptides, this intensive treatment penetrates deeply to restore cellular moisture networks. Formulated to deliver instant plumping and long-term barrier repair for a visibly refined, resilient complexion.",
    price: 450,
    size: "30ml",
    rating: 0,
    reviews: 0,
    badge: "Bestseller",
    stock: 24,
    active: true,
    image: "https://images.unsplash.com/photo-1770732766528-d0e9fd0df233?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    id: "cellular-renewal-cream",
    name: "Cellular Renewal Cream",
    category: "Skincare",
    concern: "Anti-Aging",
    description: "Nighttime barrier repair and peptide complex.",
    longDescription:
      "A dense, nourishing night cream formulated with a peptide complex and ceramides to support the skin's natural renewal cycle overnight, leaving skin visibly firmer and more resilient by morning.",
    price: 680,
    size: "50ml",
    rating: 0,
    reviews: 0,
    badge: null,
    stock: 16,
    active: true,
    image: "https://images.unsplash.com/photo-1609097164502-59a1f0f9a66f?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    id: "uv-defense-spf50",
    name: "Advanced UV Defense SPF 50",
    category: "Skincare",
    concern: "Brightening",
    description: "Invisible, weightless protection for post-procedure skin.",
    longDescription:
      "A weightless, invisible-finish mineral sunscreen developed specifically for sensitive, post-procedure skin. Broad-spectrum SPF 50 protection with no white cast, safe to use immediately after in-clinic treatments.",
    price: 210,
    size: "40ml",
    rating: 0,
    reviews: 0,
    badge: null,
    stock: 40,
    active: true,
    image: "https://images.unsplash.com/photo-1616750819456-5cdee9b85d22?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    id: "restorative-peptide-complex",
    name: "Restorative Peptide Complex",
    category: "Skincare",
    concern: "Anti-Aging",
    description: "Clinical-grade peptide serum for overnight recovery.",
    longDescription:
      "A concentrated peptide complex designed to work alongside in-clinic treatments, supporting collagen synthesis and accelerating visible recovery between sessions.",
    price: 185,
    size: "30ml",
    rating: 0,
    reviews: 0,
    badge: null,
    stock: 18,
    active: true,
    image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    id: "ceramide-barrier-shield",
    name: "Ceramide Barrier Shield",
    category: "Skincare",
    concern: "Hydration",
    description: "Rich barrier-repair moisturizer for sensitised skin.",
    longDescription:
      "A rich, ceramide-dense moisturizer formulated to rebuild and protect the skin's moisture barrier, ideal for skin that has undergone laser or peel treatments.",
    price: 120,
    size: "50ml",
    rating: 0,
    reviews: 0,
    badge: null,
    stock: 22,
    active: true,
    image: "https://images.unsplash.com/photo-1616750819574-7e38aa8046fa?auto=format&fit=crop&w=800&h=800&q=85",
  },
  {
    id: "clarifying-pore-refiner",
    name: "Clarifying Pore Refiner",
    category: "Skincare",
    concern: "Acne & Pores",
    description: "Salicylic-acid gel for congested, acne-prone skin.",
    longDescription:
      "A lightweight clarifying gel with salicylic acid and niacinamide to visibly refine pores and reduce congestion, formulated to be non-irritating alongside clinical acne treatments.",
    price: 165,
    size: "30ml",
    rating: 0,
    reviews: 0,
    badge: "New",
    stock: 30,
    active: true,
    image: "https://images.unsplash.com/photo-1630398777649-cdfc7c5e8a24?auto=format&fit=crop&w=800&h=800&q=85",
  },
];

export default PRODUCTS;
