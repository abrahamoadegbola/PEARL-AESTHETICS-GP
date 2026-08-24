# AESTHETICA — Clinic Website

A multi-page React app (Vite, pure JavaScript — no TypeScript) implementing the
"Clinical Luxury" design system across 15 pages: Home, Treatments, Treatment
Menu, HydraFacial detail, Book Consultation, Our Doctors, Doctor Profile,
Results Gallery, Skincare Boutique (shop), Product Detail, Special Offers,
Cart/Checkout, About, Insights & Advice, and Contact.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
```

## Stack

- React 19 + React Router (JS only, no TypeScript)
- Vite
- Tailwind CSS v3, configured with the exact design tokens (colors, type
  scale, spacing) from the source design system
- Google Fonts: Bodoni Moda (headings) + Hanken Grotesk (body) + Material
  Symbols (icons)

## Structure

- `src/components/` — Header, Footer, mobile StickyBar, Layout wrapper
- `src/hooks/useFadeUp.js` — recreates the original scroll fade-in animation
- `src/pages/` — one component per page
- `src/App.jsx` — route definitions
