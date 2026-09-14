# Pearl Aesthetics & GP Medical Clinic — Website + Admin Panel

A multi-page React app (Vite, pure JavaScript — no TypeScript) for **Pearl
Aesthetics & GP Medical Clinic** (Dubai). **Everything runs on Supabase** —
Postgres for data, Supabase Auth for the admin panel, and Supabase Edge
Functions for anything that needs a secret key (Stripe, email). There is
no separate backend server to deploy or host.

## Quick start

```bash
npm install
cp .env.example .env   # fill in your Supabase project's URL + anon key (see below)
npm run dev
```

Nothing loads until Supabase is set up — the app shows a clear "Supabase
isn't connected yet" banner instead of a blank screen in the meantime.

## Architecture — one project, three moving pieces

| Piece | Where it lives | What it needs |
|---|---|---|
| **Frontend** (this React app) | Deploy anywhere static (Netlify, Vercel, etc.) | `.env` — Supabase URL/anon key, Stripe publishable key |
| **Database** | Supabase Postgres | `supabase/schema.sql`, run once in the SQL Editor |
| **Server-side logic** (Stripe, email) | Supabase Edge Functions | `supabase/functions/*`, deployed via CLI, secrets set separately |

Nothing here needs Render/Railway/a VPS/etc. — Supabase hosts the database
*and* the server-side functions.

## 1. Database setup

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine).
2. **SQL Editor → New query** → paste the entire contents of
   `supabase/schema.sql` → run it. This creates the `products`,
   `bookings`, and `orders` tables, Row Level Security policies, a
   `decrement_stock()` function, and seeds the 6 shop products.
3. **Authentication → Users → Add user** — create an email+password
   account for yourself. That's your admin login at `/admin`. There's no
   separate "admin role" — anyone with an account here has full access to
   bookings/orders/inventory, so only add accounts you trust.

## 2. Frontend `.env`

**Settings → API** in your Supabase project → copy:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Add Stripe's publishable key too if you want card checkout (see §4).

This is safe to expose in the browser bundle — access is controlled by
Row Level Security, not by keeping the anon key secret.

## 3. Deploy the Edge Functions

You need the [Supabase CLI](https://supabase.com/docs/guides/cli) for this part:

```bash
npm install -g supabase
supabase login
supabase link --project-ref your-project-ref
```

Then deploy all five functions:

```bash
supabase functions deploy create-checkout-session
supabase functions deploy checkout-session-status
supabase functions deploy send-booking-email
supabase functions deploy send-contact-email
supabase functions deploy stripe-webhook
```

`supabase/config.toml` already marks `stripe-webhook` as not requiring a
Supabase JWT (Stripe calls it directly, not through a logged-in session,
so it can't carry one) — signature verification inside the function is
what secures it instead.

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected into every Edge
Function automatically by Supabase — you don't set those yourself. Every
other secret they need, you set explicitly (next two sections).

## 4. Stripe secrets (optional — card checkout won't work without it)

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set CLIENT_URL=https://your-real-frontend-domain.com
```

- Get test keys from the [Stripe dashboard](https://dashboard.stripe.com/test/apikeys).
- `CLIENT_URL` is where Stripe redirects shoppers after checkout — set it
  to `http://localhost:5173` for local dev, your real domain once deployed.
- Also add `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...` to the frontend `.env`.

**For the webhook** (recommended for production — it's the reliable
confirmation path if a shopper closes their browser mid-checkout):
1. Stripe dashboard → **Developers → Webhooks → Add endpoint**
2. URL: `https://your-project-ref.supabase.co/functions/v1/stripe-webhook`
3. Listen for `checkout.session.completed` and `checkout.session.async_payment_succeeded`
4. Copy the signing secret: `supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...`

Until Stripe keys are set, "Pay with Card" shows a clear message and
"Place Order via WhatsApp" still works as a no-card-required fallback.

## 5. Email secrets (Gmail SMTP)

1. Turn on 2-Step Verification on the Gmail account you want to send from.
2. Create an App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   — a 16-character password specifically for this app (not your normal
   Gmail password; Google only shows it to you once, so copy it right away).
3. ```bash
   supabase secrets set SMTP_USER=youraddress@gmail.com
   supabase secrets set SMTP_PASS=your-16-character-app-password
   supabase secrets set CLINIC_NOTIFY_EMAIL=info@pearlaestheticgp.com
   ```
   `SMTP_FROM` is optional — defaults to `SMTP_USER` if you don't set it.

Until these are set, booking/contact still work end-to-end — the UI tells
the patient the email didn't go out and leans on WhatsApp instead of
failing silently.

**One thing worth knowing, not a warning to switch away from this**:
outbound SMTP from serverless/edge runtimes is less universally reliable
than from a plain always-on server — some hosts block it outright to
fight spam. Supabase Edge Functions do allow it, and Gmail's SMTP over
port 465 (implicit TLS) is a well-documented path here. If you ever see
emails silently not arriving, that class of issue (rather than a wrong
password) is the first thing worth ruling out — check the function logs
(`supabase functions logs send-booking-email`) for the actual SMTP error.

### Email design

Booking confirmations, clinic notifications, and contact enquiries are
all branded — dark green header band with the clinic name, gold accent
line, a clean field table for booking/enquiry details, and clinic contact
info in the footer. All three emails share one template
(`supabase/functions/_shared/emailTemplate.ts`) — colors match
`src/data/business.js`/`tailwind.config.js` exactly, so if the site's
palette changes, update it there too. Email HTML is deliberately
old-school (table-based layout, inline styles, web-safe fonts) since
that's what actually renders consistently across Gmail/Outlook/Apple
Mail — modern CSS support is inconsistent across email clients in a way
it isn't for browsers.

If you want to change the copy or layout, `emailTemplate.ts` has two
pieces: `renderEmailShell()` (the header/footer wrapper every email uses)
and `renderFieldTable()` (the label/value table for booking or enquiry
details) — edit the shell once and every email updates.

> I didn't find a public contact email on the clinic's live site, so
> `CLINIC_NOTIFY_EMAIL` above is a placeholder — confirm the real inbox.
> (The email shown *on* the site itself comes from `src/data/business.js`,
> a separate thing to update too.)

## Why secrets go through `supabase secrets set`, not your hosting provider

If you're deploying the frontend to Netlify (or Vercel, etc.), it's worth
being explicit about why these secrets don't go there. Netlify only hosts
the **built frontend** — static HTML/CSS/JS that runs in a visitor's
browser. Any environment variable Netlify's build actually uses ends up
**inside that public JS bundle**, readable by anyone via browser dev
tools. That's fine for things meant to be public (Stripe's publishable
key, Supabase's anon key) and would be a real problem for a Gmail
password or Stripe's secret key.

The code that actually needs those secrets — the Edge Functions — runs on
Supabase, not Netlify. So that's where the secrets live: `supabase
secrets set` injects them only into that server-side execution
environment, never into anything shipped to a browser. If this project
used Netlify Functions as its backend instead, secrets would go there
instead — it's not "Supabase vs. Netlify" as competing places to put
things, it's "wherever your backend code actually executes."

## All secrets, at a glance

```bash
# Stripe
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...      # optional, for the webhook
supabase secrets set CLIENT_URL=https://your-domain.com

# Email (Gmail SMTP)
supabase secrets set SMTP_USER=youraddress@gmail.com
supabase secrets set SMTP_PASS=your-16-character-app-password
supabase secrets set SMTP_FROM=youraddress@gmail.com      # optional, defaults to SMTP_USER
supabase secrets set CLINIC_NOTIFY_EMAIL=info@pearlaestheticgp.com
```

Check what's set (values are hidden, names aren't):
```bash
supabase secrets list
```

Frontend `.env` (the only file, not a `secrets set` command):
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## How the data model works

- **Public visitors** (not logged in) can: read active products and
  treatments, submit a booking, and submit an order at checkout. RLS
  blocks everything else for anonymous users.
- **Admins** (logged in via Supabase Auth) can read/update/delete
  everything in all four tables.
- **Realtime**: the admin panel, shop, and treatment pages all subscribe
  to Postgres changes — a new booking shows up in `/admin/bookings`, and
  a treatment you edit in `/admin/treatments` updates on Home/Treatments/
  Treatment Menu, without a page refresh anywhere.
- **Stock decrements** go through a `decrement_stock()` Postgres function
  (granted to anonymous users specifically for this one operation)
  instead of a direct table update, so a customer's browser can reduce
  stock when they order without being able to edit prices or anything else.
- **Payment confirmation is server-side, not client-side.** RLS only lets
  admins UPDATE orders, so a customer's own browser literally cannot mark
  their own order "paid" — `checkout-session-status` and `stripe-webhook`
  use the service role key (auto-injected, bypasses RLS) to do that write.
  The frontend only ever reads.
- **Bookings and orders never read their own row back.** Their SELECT
  policy is admin-only (so a patient can't browse other patients'
  bookings/orders), which means the usual Supabase `.insert().select()`
  pattern doesn't work for them — that combo requires read access
  immediately after inserting. `addBooking`/`addOrder` generate the id
  client-side and skip the read-back entirely instead. The one place an
  anonymous shopper legitimately needs their own order back (the Stripe
  success page) goes through `checkout-session-status`, which fetches it
  with the service role key rather than opening up direct table access.

## Doctors

`src/data/doctors.js` holds the clinic's **four real doctors**, sourced
directly from the clinic's own live site — first-party content about
Pearl's own real, practicing team:

- **Dr. Hamid O. Balogun** — CEO & Founder, German board-certified Family
  Medicine (Harvard Medical School postgraduate training)
- **Dr. Priscilla Puspam** — GP / Medical Director, MBBS, DHA-licensed
- **Dr. Wafa Shah** — GP Aesthetics
- **Dr. Shaima Adil** — Beauty & Laser Therapy

Photos are hotlinked from the clinic's own asset folder. Only the facts
actually published on the source site are included — where it didn't give
specific education history for a doctor, that section is left out rather
than invented. If you have fuller CVs, add them to each doctor's
`education` array and the profile pages render a timeline automatically.

## Results Gallery & before/after images — read before launch

`/results` and the "Before Treatment" / "After Treatment" photos on the
HydraFacial detail page are still placeholder images from the original
design template. These are explicitly captioned as specific patients'
results — labeling any stock photo as a real patient's outcome fabricates
a clinical result, which is a compliance issue, not just a cosmetic one.
**This needs real, consented patient photos (or should stay down) before
launch.**

## Admin panel — `/admin`

"Staff Login" link in the site footer, or go straight to `/admin`. Sign in
with an account you created in Supabase (§1) — there's no default password.

- **Dashboard**: pending bookings, unpaid orders, confirmed revenue, low
  stock, recent activity.
- **Bookings**: every request, filterable by status, one-tap WhatsApp, delete.
- **Orders & Payments**: every order, line items, payment status
  (pending/paid/refunded), fulfilment status, WhatsApp, delete.
- **Inventory**: full edit modal (name, category, concern, size, badge,
  price, stock, description, image, active) for every product, plus
  add/delete. Status/active toggles and quick edit/delete stay inline in
  the table; click the pencil icon to open the full editor.
- **Treatments**: same pattern — full edit modal (name, category,
  description, pricing, duration, icon, image, featured/active) for every
  treatment, plus add/delete. Controls what shows on Home, `/treatments`,
  and `/treatment-menu` everywhere at once, since all three pages read
  from this one table.

**Images**: both editors take an image **URL** (paste a link, e.g. from
Unsplash) — there's no file upload/storage wired up yet. If you want
actual file uploads instead of pasting URLs, that needs Supabase Storage
added (a bucket + upload UI) — happy to add that as a follow-up.

## Before this goes live — checklist

1. **Results Gallery / before-after photos** — need real, consented patient photos.
2. **`CLINIC_NOTIFY_EMAIL`** — confirm the real inbox.
3. **Stripe** — switch test → live keys when ready.
4. A few pages (Insights & Advice, Special Offers) still have illustrative
   sample copy rather than the clinic's real content.

## Stack

- React 19 + React Router (JS only, no TypeScript)
- Vite
- Tailwind CSS v3
- Framer Motion (scroll reveals, staggered text, the before/after slider)
- Supabase (Postgres + Auth + Realtime + Edge Functions)
- `@stripe/stripe-js` (frontend) + `stripe` npm package inside Edge Functions
- Gmail SMTP via denomailer (email)
- Google Fonts: Fraunces (headings) + Hanken Grotesk (body) + Material
  Symbols (icons)

## Design system notes

- **Header/navbar** — always a solid dark-green bar (`bg-primary`), not
  transparent — uses the clinic's own real logo
  (`amazing-ganache-b98cf4.netlify.app/assets/logo.png`), with a plain
  text fallback (`onError`) if that ever 404s.
- **Primary brand color** updated to `#0e3a30` — pulled directly from the
  clinic's own live site's `<meta name="theme-color">` tag, their
  explicitly-specified brand color (was `#00231c`, a close but not exact
  match). `primary-container` (the button hover shade) was adjusted too,
  since it had been identical to the old primary and would've made hover
  states invisible against the new one.
- **Hero** is a full-bleed split-screen — a saturated dark-green panel
  (headline, CTAs, stats) on one side, an autoplaying background video on
  the other, edge-to-edge, no card, no rounded container.
- **Hero video** (`src/components/HeroVideo.jsx`) is a licensed stock
  clip (Pexels, free for commercial use - a clinical skin treatment,
  matching the site) — not footage of the real clinic, since they don't
  have one published. Built properly, not just an autoplaying `<video>`
  dropped in:
  - `muted` + `playsInline` + `autoPlay` together, since mobile browsers
    silently block autoplay without all three
  - `prefers-reduced-motion` skips loading the video entirely and shows
    the poster frame as a plain static image instead - autoplaying video
    is exactly what that setting exists to prevent
  - Three-level fallback, all tested directly: video fails → falls back
    to the poster image (the clinic's real `hero-main.jpg`) → if *that*
    also fails, falls back to a plain branded gradient + icon. Never a
    broken video player or a broken image icon.
  - Swap `videoSrc` in `Home.jsx` for the clinic's own real footage
    whenever they have some - the component doesn't care which video it is.
- **Design direction: restrained, not decorated.** An earlier pass leaned
  into ornamental flourishes (a spinning gradient blob, an infinite-scroll
  marquee, a cursor-follow glow). Those are gone — replaced with a
  Neko Health-style sensibility (nekohealth.com): confident whitespace,
  plain full-bleed photography, and data presented directly rather than
  decorated. The quiet italic statement section and the static (not
  ticker) certifications row are both deliberate examples of that.
  `OrganicBlob.jsx`, `Marquee.jsx`, and `CursorGlow.jsx` are still in
  `src/components/motion/` if you want them back for a different page.

- `src/components/motion/Reveal.jsx` — scroll-triggered fade/rise wrapper,
  used throughout Home and available for any other page. Respects
  `prefers-reduced-motion` by rendering content in its final state
  immediately rather than animating.
- `src/components/motion/StaggeredText.jsx` — per-word entrance reveal,
  used on the hero headline.
- `src/components/motion/OrganicBlob.jsx` — slowly morphing abstract SVG
  shape (gradient, animated path interpolation). Not currently used on
  Home (removed in the restraint pass above) — still available if a
  future page wants it.
- `src/components/motion/MagneticButton.jsx` — wraps a button/link so it
  subtly tracks the cursor within a small radius on hover, then springs
  back. Used on every primary CTA on Home. Disabled under
  `prefers-reduced-motion` and has no effect on touch devices.
- `src/components/motion/Marquee.jsx` — infinite horizontal scroll ticker.
  Not currently used (the certifications row is a plain static wrapped
  row instead, deliberately - see the restraint note above) — still
  available if you want a ticker elsewhere.
- `src/components/motion/CursorGlow.jsx` — a soft gold glow that trails
  the cursor. Built and working, but not mounted anywhere currently
  (removed from `Layout.jsx` in the restraint pass) — add it back to
  `Layout.jsx` if you want it.
- `src/components/HeroVideo.jsx` — the hero's background video, with
  poster fallback and reduced-motion support (see above).
- `src/components/BeforeAfterSlider.jsx` — draggable, keyboard-accessible
  before/after comparison (used on the HydraFacial page). Drag-to-compare
  interaction is real; the underlying images are still the placeholder
  ones flagged in "Results Gallery & before/after images" above — the
  component itself doesn't change that.
- The Home page hero has no stock photo — it's a full-bleed composition
  of two morphing gradient blobs, a fine dot-grid texture, oversized
  staggered-reveal display type, and floating glass stat panels. The
  featured-treatment layout uses real treatment images from Supabase, and
  testimonials rotate one at a time instead of three identical cards. The
  Header goes fully transparent over the homepage hero and solidifies on
  scroll (stays solid immediately on every other page). The Footer is a
  dark closing section rather than a light link list.
- Home, Header, Footer, and the before/after component are what's been
  pushed hardest in this pass. Other pages (Treatment Menu, About,
  Results, the shop, etc.) still use the original design system's simpler
  `fade-up` scroll-reveal (CSS-based, via `useFadeUp`) rather than the
  newer Framer Motion system — carrying the same level of art direction
  through those pages is a real, scoped follow-up, not something already
  done here.

## Structure

- `src/components/` — Header (cart badge), Footer, mobile StickyBar
  (WhatsApp), Layout wrapper, `SupabaseSetupNotice`
- `src/components/admin/` — `AdminModal` (edit-form modal) and
  `StyledSelect` (consistently-styled dropdown), shared across the admin pages
- `src/hooks/` — `useFadeUp`, `useDbCollection` (async fetch + Supabase
  realtime, with loading/error state)
- `src/context/` — `CartContext` (local — it's a cart, not a record until
  checkout), `AdminAuthContext` (Supabase Auth)
- `src/lib/` — `supabaseClient.js` (frontend client, anon key), `db.js`
  (all Supabase queries), `whatsapp.js`, `stripe.js`, `api.js` (calls Edge
  Functions via `supabase.functions.invoke`)
- `src/data/` — `business.js` (real contact info), `doctors.js` (real
  roster — see above). Treatments live in Supabase now (`treatments`
  table), not here.
- `src/pages/` — one component per public page, plus
  `CheckoutSuccess.jsx` / `CheckoutCancel.jsx` for the Stripe redirect
- `src/pages/admin/` — admin login, layout, dashboard, bookings, orders,
  inventory
- `supabase/schema.sql` — run once in the SQL Editor (§1)
- `supabase/functions/` — the five Edge Functions (§3), plus `_shared/`
  for the CORS headers, Stripe client, Supabase admin client, mailer
  helper, and the branded `emailTemplate.ts` they all import from
