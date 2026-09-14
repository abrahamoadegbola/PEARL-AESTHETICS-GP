-- Pearl Aesthetics & GP Medical Clinic — Supabase schema
--
-- Run this once in your Supabase project's SQL Editor
-- (Project → SQL Editor → New query → paste this whole file → Run).
--
-- Covers what the admin panel manages: inventory (products), bookings,
-- orders, and treatments. Doctors/business info stay as static data in
-- the codebase (src/data/) since they're marketing content that doesn't
-- change often; treatments live here so admins can add/edit/remove them
-- without a code change.

-- ============================================================
-- PRODUCTS (shop inventory)
-- ============================================================
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text,
  concern text,
  description text,
  long_description text,
  price numeric(10, 2) not null default 0,
  size text,
  rating numeric(2, 1) not null default 0,
  reviews integer not null default 0,
  badge text,
  stock integer not null default 0,
  active boolean not null default true,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- TREATMENTS (service menu - shown on Home, /treatments, /treatment-menu)
-- ============================================================
create table if not exists public.treatments (
  id text primary key,
  name text not null,
  category text, -- Face, Skin, Body, Hair, Wellness, IV Therapy, Longevity, GP
  description text,
  price_from numeric(10, 2),
  price_label text, -- optional override, e.g. "Consultation complimentary"
  icon text, -- Material Symbols icon name, used on Home's treatment cards
  image text, -- photo used on /treatment-menu cards
  duration_minutes integer,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- BOOKINGS (consultation requests)
-- ============================================================
create table if not exists public.bookings (
  id text primary key default ('bk-' || substr(md5(random()::text), 1, 12)),
  category text not null,
  date text,
  time text,
  name text not null,
  email text not null,
  phone text,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- ORDERS (shop checkout)
-- ============================================================
create table if not exists public.orders (
  id text primary key default ('ord-' || substr(md5(random()::text), 1, 12)),
  items jsonb not null default '[]'::jsonb, -- [{ id, name, price, qty }]
  customer jsonb not null default '{}'::jsonb, -- { name, email, phone, address }
  subtotal numeric(10, 2) not null default 0,
  shipping numeric(10, 2) not null default 0,
  tax numeric(10, 2) not null default 0,
  total numeric(10, 2) not null default 0,
  payment_method text not null default 'whatsapp' check (payment_method in ('whatsapp', 'stripe')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'refunded')),
  fulfillment_status text not null default 'pending'
    check (fulfillment_status in ('pending', 'processing', 'shipped', 'completed', 'cancelled')),
  stripe_session_id text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- updated_at trigger for products
-- ============================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists treatments_set_updated_at on public.treatments;
create trigger treatments_set_updated_at
  before update on public.treatments
  for each row execute function public.set_updated_at();

-- ============================================================
-- Atomic stock decrement (avoids read-then-write race conditions when
-- two orders for the same product land at the same time)
-- ============================================================
create or replace function public.decrement_stock(p_id text, p_qty integer)
returns void as $$
begin
  update public.products
  set stock = greatest(0, stock - p_qty)
  where id = p_id;
end;
$$ language plpgsql security definer;

grant execute on function public.decrement_stock(text, integer) to anon, authenticated;

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.products enable row level security;
alter table public.treatments enable row level security;
alter table public.bookings enable row level security;
alter table public.orders enable row level security;

-- Products: anyone can read active products (the public shop); only
-- authenticated (admin) users can see everything or write.
drop policy if exists "public can read active products" on public.products;
create policy "public can read active products"
  on public.products for select
  using (active = true or auth.role() = 'authenticated');

drop policy if exists "admin can insert products" on public.products;
create policy "admin can insert products"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "admin can update products" on public.products;
create policy "admin can update products"
  on public.products for update
  to authenticated
  using (true);

drop policy if exists "admin can delete products" on public.products;
create policy "admin can delete products"
  on public.products for delete
  to authenticated
  using (true);

-- Treatments: same pattern as products - public sees only active
-- treatments (what's shown on Home/Treatments/Treatment Menu), admins
-- see and manage everything, including hidden/removed ones.
drop policy if exists "public can read active treatments" on public.treatments;
create policy "public can read active treatments"
  on public.treatments for select
  using (active = true or auth.role() = 'authenticated');

drop policy if exists "admin can insert treatments" on public.treatments;
create policy "admin can insert treatments"
  on public.treatments for insert
  to authenticated
  with check (true);

drop policy if exists "admin can update treatments" on public.treatments;
create policy "admin can update treatments"
  on public.treatments for update
  to authenticated
  using (true);

drop policy if exists "admin can delete treatments" on public.treatments;
create policy "admin can delete treatments"
  on public.treatments for delete
  to authenticated
  using (true);

-- Bookings: anyone can create a booking (the public booking form), but
-- only admins can read, update, or delete them - a patient shouldn't be
-- able to browse other patients' bookings.
drop policy if exists "anyone can create a booking" on public.bookings;
create policy "anyone can create a booking"
  on public.bookings for insert
  with check (true);

drop policy if exists "admin can read bookings" on public.bookings;
create policy "admin can read bookings"
  on public.bookings for select
  to authenticated
  using (true);

drop policy if exists "admin can update bookings" on public.bookings;
create policy "admin can update bookings"
  on public.bookings for update
  to authenticated
  using (true);

drop policy if exists "admin can delete bookings" on public.bookings;
create policy "admin can delete bookings"
  on public.bookings for delete
  to authenticated
  using (true);

-- Orders: same pattern as bookings - anyone can place an order at
-- checkout, only admins can browse/manage the full order list.
drop policy if exists "anyone can create an order" on public.orders;
create policy "anyone can create an order"
  on public.orders for insert
  with check (true);

drop policy if exists "admin can read orders" on public.orders;
create policy "admin can read orders"
  on public.orders for select
  to authenticated
  using (true);

drop policy if exists "admin can update orders" on public.orders;
create policy "admin can update orders"
  on public.orders for update
  to authenticated
  using (true);

drop policy if exists "admin can delete orders" on public.orders;
create policy "admin can delete orders"
  on public.orders for delete
  to authenticated
  using (true);

-- The Supabase Edge Functions (supabase/functions/) use the service_role
-- key for the Stripe webhook/checkout-session confirmation flow, which
-- bypasses RLS entirely - that's expected and is why the service_role
-- key must never reach the browser (it's auto-injected into Edge
-- Functions by Supabase, not something you set yourself).

-- ============================================================
-- Seed data - remove or edit before going live
-- ============================================================
insert into public.products (id, name, category, concern, description, long_description, price, size, rating, reviews, badge, stock, active, image)
values
  ('molecular-hydration-serum', 'Molecular Hydration Serum', 'Skincare', 'Hydration', 'Intensive HA formula for deep cellular hydration.', 'Engineered with multi-weight hyaluronic acid and active bio-peptides, this intensive treatment penetrates deeply to restore cellular moisture networks.', 450, '30ml', 0, 0, 'Bestseller', 24, true, 'https://images.unsplash.com/photo-1770732766528-d0e9fd0df233?auto=format&fit=crop&w=800&h=800&q=85'),
  ('cellular-renewal-cream', 'Cellular Renewal Cream', 'Skincare', 'Anti-Aging', 'Nighttime barrier repair and peptide complex.', 'A dense, nourishing night cream formulated with a peptide complex and ceramides to support the skin''s natural renewal cycle overnight.', 680, '50ml', 0, 0, null, 16, true, 'https://images.unsplash.com/photo-1609097164502-59a1f0f9a66f?auto=format&fit=crop&w=800&h=800&q=85'),
  ('uv-defense-spf50', 'Advanced UV Defense SPF 50', 'Skincare', 'Brightening', 'Invisible, weightless protection for post-procedure skin.', 'A weightless, invisible-finish mineral sunscreen developed specifically for sensitive, post-procedure skin.', 210, '40ml', 0, 0, null, 40, true, 'https://images.unsplash.com/photo-1616750819456-5cdee9b85d22?auto=format&fit=crop&w=800&h=800&q=85'),
  ('restorative-peptide-complex', 'Restorative Peptide Complex', 'Skincare', 'Anti-Aging', 'Clinical-grade peptide serum for overnight recovery.', 'A concentrated peptide complex designed to work alongside in-clinic treatments, supporting collagen synthesis.', 185, '30ml', 0, 0, null, 18, true, 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=800&h=800&q=85'),
  ('ceramide-barrier-shield', 'Ceramide Barrier Shield', 'Skincare', 'Hydration', 'Rich barrier-repair moisturizer for sensitised skin.', 'A rich, ceramide-dense moisturizer formulated to rebuild and protect the skin''s moisture barrier.', 120, '50ml', 0, 0, null, 22, true, 'https://images.unsplash.com/photo-1616750819574-7e38aa8046fa?auto=format&fit=crop&w=800&h=800&q=85'),
  ('clarifying-pore-refiner', 'Clarifying Pore Refiner', 'Skincare', 'Acne & Pores', 'Salicylic-acid gel for congested, acne-prone skin.', 'A lightweight clarifying gel with salicylic acid and niacinamide to visibly refine pores and reduce congestion.', 165, '30ml', 0, 0, 'New', 30, true, 'https://images.unsplash.com/photo-1630398777649-cdfc7c5e8a24?auto=format&fit=crop&w=800&h=800&q=85')
on conflict (id) do nothing;

insert into public.treatments (id, name, category, description, price_from, price_label, icon, image, duration_minutes, featured, active)
values
  ('injectables', 'Injectables', 'Face', 'Anti-wrinkle treatments, dermal & lip fillers, and facial contouring.', 599, null, 'colorize', 'https://images.unsplash.com/photo-1630835425197-50feeba99ecd?auto=format&fit=crop&w=1000&h=1000&q=85', 30, true, true),
  ('hydrafacial', 'HydraFacial', 'Skin', 'Silver, Gold & Pearl tiers — deep cleanse, hydrate and glow.', 150, null, 'water_drop', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1000&h=1000&q=85', 45, false, true),
  ('skin-rejuvenation', 'Skin Rejuvenation', 'Skin', 'Chemical peels, microneedling, skin boosters, PRP & exosome therapy.', 350, null, 'spa', 'https://images.unsplash.com/photo-1583417657209-d3dd44dc9c09?auto=format&fit=crop&w=1000&h=1000&q=85', 45, false, true),
  ('laser-tightening', 'Laser & Tightening', 'Body', 'Laser hair removal and skin-tightening for smooth, firm skin.', 55, null, 'flare', 'https://images.unsplash.com/photo-1544717304-a2db4a7b16ee?auto=format&fit=crop&w=1000&h=1000&q=85', 30, false, true),
  ('iv-wellness', 'IV Wellness Drips', 'IV Therapy', 'Immunity, energy and glow infusions to restore vitality from within.', 700, null, 'vaccines', 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1000&h=1000&q=85', 60, false, true),
  ('general-medicine', 'General Medicine', 'GP', 'GP consultations, internal medicine, vitamin panels and health checks.', 0, 'Consultation complimentary', 'stethoscope', 'https://images.unsplash.com/photo-1761718210089-ba3bb5ccb54f?auto=format&fit=crop&w=1000&h=1000&q=85', 30, false, true)
on conflict (id) do nothing;
