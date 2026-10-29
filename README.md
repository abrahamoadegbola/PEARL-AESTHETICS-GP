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
3. **Authentication → Users → Add user**: create an email+password
   account for the clinic owner, then sign in once at `/admin`. The first
   person to sign in becomes the **super admin**. This is the only account
   ever created in Supabase by hand: the super admin invites everyone else
   from **Admin → Staff** (see "Staff and the super admin" below).
4. **Authentication → Sign In / Providers → Email**: turn off **Allow new
   users to sign up**. Staff join by invitation only.
5. **Authentication → URL Configuration**: set **Site URL** to the live
   domain and add `https://<your-domain>/admin/accept-invite` (and
   `http://localhost:5173/admin/accept-invite` for local testing) to
   **Redirect URLs**. Invitation links land there.

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

Then deploy all eight functions:

```bash
supabase functions deploy create-checkout-session
supabase functions deploy checkout-session-status
supabase functions deploy send-booking-email
supabase functions deploy send-contact-email
supabase functions deploy stripe-webhook
supabase functions deploy instagram-feed
supabase functions deploy google-reviews
supabase functions deploy manage-staff
```

**Secrets in one go:** copy `supabase/functions/.env.example` to
`supabase/functions/.env` (git-ignored), fill it in, then
`supabase secrets set --env-file supabase/functions/.env`. Every secret in
the sections below is listed there.

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
confirmation path if a shopper closes their browser mid-checkout, and the
only path for delayed payment methods and refunds):
1. Stripe dashboard → **Developers → Webhooks → Add endpoint**
2. URL: `https://your-project-ref.supabase.co/functions/v1/stripe-webhook`
3. Listen for `checkout.session.completed`, `checkout.session.async_payment_succeeded`,
   `checkout.session.async_payment_failed`, `checkout.session.expired`, `charge.refunded`
4. Copy the signing secret: `supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...`

**What checkout does:**
- **All payment methods**: no methods are hard-coded, so Checkout offers
  whatever is switched on under **Dashboard → Settings → Payment methods**
  (cards, Apple Pay, Google Pay, Link, plus any BNPL/regional methods
  Stripe supports for AED). Turning one on in the dashboard is enough.
  Set `STRIPE_PAYMENT_METHOD_TYPES=card,link` only if you want to pin a list.
- **Server-side pricing**: the browser sends only the order id. The
  function re-prices every item from the `products` table, checks stock,
  and charges items + 5% VAT + delivery (free over AED 500), the same
  totals the cart shows. Earlier versions charged items only.
- **Confirmation**: the order flips to `paid` exactly once (the success page
  and the webhook can't double-count stock), then the shopper gets an
  order-confirmation email and the clinic gets an email + WhatsApp alert.
  Stripe also sends its own receipt.
- **Statuses** (`failed`, `expired`, `refunded`) are set automatically from
  webhook events and show in **Admin → Orders**.
- Optional: `STRIPE_ALLOW_PROMOTION_CODES=true` (promo-code box),
  `STRIPE_INVOICES=true` (PDF invoice per payment, Stripe Invoicing fees apply).

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

## 6. Booking notifications (email + WhatsApp)

When a patient confirms a booking, `send-booking-email` runs server-side and:
1. emails the **patient** a branded confirmation (with WhatsApp + directions buttons),
2. emails the **clinic** (`CLINIC_NOTIFY_EMAIL`),
3. sends a **WhatsApp alert** to the clinic's number (`CLINIC_WHATSAPP_NUMBER`).

The browser only sends the booking id; the function loads the booking
itself, so it can't be abused to send email to arbitrary addresses, and
`bookings.notified_at` stops repeats. Each channel works on its own:
a missing WhatsApp setup never blocks the email.

**WhatsApp alerts** use Meta's WhatsApp Cloud API, the only official way
for a server to *send* WhatsApp messages:
1. [developers.facebook.com](https://developers.facebook.com) → create an app → add **WhatsApp**.
2. Add and verify the sending phone number. It must be a number that is
   **not** already on the WhatsApp app (a second SIM or landline works);
   alerts are delivered *to* the clinic's normal WhatsApp, +971 55 963 9972.
3. Create a permanent token (Business Settings → System Users → generate
   a token with `whatsapp_business_messaging`).
4. ```bash
   supabase secrets set WHATSAPP_TOKEN=EAAG...
   supabase secrets set WHATSAPP_PHONE_NUMBER_ID=1234567890
   supabase secrets set CLINIC_WHATSAPP_NUMBER=971559639972
   ```
5. **Recommended:** WhatsApp only delivers free-form text if the recipient
   messaged the business number in the last 24h. For alerts that always
   arrive, create a *Utility* message template in WhatsApp Manager and set
   its name:
   - `WHATSAPP_BOOKING_TEMPLATE`, with body variables in this order:
     `{{1}}` name, `{{2}}` category, `{{3}}` date, `{{4}}` time, `{{5}}` phone, `{{6}}` reference, `{{7}}` doctor.
     Example body: *New booking: {{1}} - {{2}} on {{3}} at {{4}}. Phone {{5}}. Ref {{6}}. Doctor: {{7}}.*
   - `WHATSAPP_ORDER_TEMPLATE` (paid shop orders): `{{1}}` order id, `{{2}}` customer, `{{3}}` total, `{{4}}` phone, `{{5}}` address.

The patient-facing "Confirm on WhatsApp" button on the booking screen
still works as before, with no setup needed.

## 7. Instagram feed (gallery, results, facilities)

The Results Gallery, the Home page results strip and the Facilities
section all come from **@pearl_medicals**. With a token set, the
`instagram-feed` function syncs the latest 30 posts and reels, so
**anything new posted on Instagram appears on the site automatically**
(within about 15 minutes of the next visit).

Each new reel's video and cover are copied once into the public
`instagram` Storage bucket (`instagram_posts` table), and the site plays
them in its own full-screen player: swipe between videos, tap to pause,
"Book a consultation" button, no Instagram branding. Posts deleted on
Instagram disappear from the site, and their files are removed, on the next sync.
Run `supabase/schema.sql` again to create the table and bucket.

**Optional: hourly sync without visitors.** In the SQL editor, enable the
`pg_cron` and `pg_net` extensions, then:

```sql
select cron.schedule('instagram-sync', '0 * * * *', $$
  select net.http_post(
    url := 'https://<project-ref>.supabase.co/functions/v1/instagram-feed?sync=1',
    headers := '{"Authorization": "Bearer <anon-key>"}'::jsonb
  );
$$);
```

Without a token, the site uses the 11 posts saved in `public/instagram/`
(`src/data/instagram.js`), downloaded on 2026-10-28, including the 7
reels' video files, so videos play in the site's own player either way.
To hide a post everywhere (saved and live), add its shortcode to
`HIDDEN_POSTS` in `src/data/instagram.js`.

**Get a token** (the Instagram account must be a Business or Creator account):
1. [developers.facebook.com](https://developers.facebook.com) → create an app →
   add **Instagram** → *API setup with Instagram login*.
2. Connect the `pearl_medicals` account, then **Generate token**. This
   gives a long-lived token (60 days).
3. `supabase secrets set INSTAGRAM_ACCESS_TOKEN=IGAA...`

The function refreshes the token itself weekly and stores the fresh one
in the private `app_settings` table, so it doesn't lapse as long as the
site gets visitors. Setting a new secret always takes over.

**How posts get sorted.** The function reads each caption. To control
where a post lands, include these in the caption:

| In the caption | Shows in |
|---|---|
| `before & after`, `#results`, `#beforeandafter` | Patient Results (Home + gallery) |
| `#facilities`, `#ourclinic`, `#clinictour` | Facilities section on Home |
| `#event`, `#healthtips`, `#team` | Gallery filters |

All reels show under the **Reels** filter. Facilities fall back to the saved
photos until at least three live posts carry a facilities tag.

## 8. Google reviews

The Home page shows **real Google reviews**. Four are saved in
`src/data/business.js` (copied verbatim from the listing). With an
API key, the `google-reviews` function shows the live rating, review count
and latest reviews instead (cached 6 hours):
1. Google Cloud console → enable **Places API (New)** → create an API key
   restricted to that API.
2. `supabase secrets set GOOGLE_PLACES_API_KEY=AIza...`

Google returns at most 5 reviews per place, so the section also links to
**Read all reviews** and **Leave a review** on Google. The clinic's place ID
(`ChIJickRNwBtXz4RtS60CfrdqnY`) is already set.

Every location mention on the site (the hero pill, the Facilities "Visit us"
card, the FAQ, the footer and the contact page) opens the clinic's Google Maps
listing (`BUSINESS.address.mapsUrl`).

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

# WhatsApp alerts (optional)
supabase secrets set WHATSAPP_TOKEN=EAAG...
supabase secrets set WHATSAPP_PHONE_NUMBER_ID=1234567890
supabase secrets set WHATSAPP_BOOKING_TEMPLATE=new_booking_alert   # recommended
supabase secrets set WHATSAPP_ORDER_TEMPLATE=paid_order_alert      # recommended

# Instagram + Google (optional)
supabase secrets set INSTAGRAM_ACCESS_TOKEN=IGAA...
supabase secrets set GOOGLE_PLACES_API_KEY=AIza...
```

Or all at once from a file: `supabase secrets set --env-file supabase/functions/.env`
(template: `supabase/functions/.env.example`).

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
- **Staff** (logged in *and* listed in `public.staff`) can read/update/delete
  everything in all four tables. Only the super admin can add or remove staff,
  via the `manage-staff` function.
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
  Medicine (Harvard Medical School postgraduate training). His biography
  draws on his LinkedIn headline and the German physician registries, and
  his badge reads "German Board-Certified" rather than "DHA Licensed"
- **Dr. Priscilla Puspam** — GP / Medical Director, MBBS, DHA-licensed
- **Dr. Wafa Shah** — GP Aesthetics
- **Dr. Shaima Adil** — Beauty & Laser Therapy

Photos are hotlinked from the clinic's own asset folder. Only the facts
actually published on the source site are included — where it didn't give
specific education history for a doctor, that section is left out rather
than invented. If you have fuller CVs, add them to each doctor's
`education` array and the profile pages render a timeline automatically.

## Results Gallery & before/after images

`/results` and the Home results strip now show **real patient results and
reels from the clinic's own Instagram** (see §7), not stock photos. The
before/after photos on the HydraFacial detail page are still template
placeholders and need real, consented patient photos before launch.

## Admin panel — `/admin`

"Staff Login" link in the site footer, or go straight to `/admin`. There's
no default password: the super admin's login is created in Supabase (§1),
everyone else is invited.

### Staff and the super admin

- **Super admin** (the clinic owner): everything below, plus the **Staff**
  page. Their login is the only one created in the Supabase dashboard; the
  first sign-in to `/admin` claims the role (`claim_staff_role()` in
  `schema.sql`).
- **Staff**: invited from **Admin → Staff** by name and email. The
  `manage-staff` function creates their login and emails a branded
  "Accept invitation" link through the clinic's Gmail mailer. The link
  opens `/admin/accept-invite`, where they choose their password. If email
  isn't configured, the Staff page shows the link to copy and send another
  way (e.g. WhatsApp).
- **Forgotten passwords**: the super admin clicks **Reset password** next
  to the person on the Staff page; they get a fresh link by email.
- **Removing someone** deletes their login immediately.
- Being signed in isn't enough: every admin policy checks
  `public.is_staff()`, so an account that isn't on the staff list sees
  "No admin access" and can't read any patient data, even through the API.
- Uses `CLIENT_URL` for the link address, so make sure it's the live domain.

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

1. **HydraFacial before/after photos** — still placeholders; need real, consented patient photos.
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
- `src/pages/admin/` — admin login, accept-invite, layout, dashboard,
  bookings, orders, inventory, treatments, staff (super admin only)
- `supabase/schema.sql` — run once in the SQL Editor (§1)
- `supabase/functions/` — the eight Edge Functions (§3), plus `_shared/`
  for the CORS headers, Stripe client, Supabase admin client, mailer,
  WhatsApp sender, order notifications, and the branded `emailTemplate.ts`
