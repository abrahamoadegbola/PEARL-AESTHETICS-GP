import { corsHeaders } from "../_shared/cors.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";

declare const EdgeRuntime: { waitUntil(promise: Promise<unknown>): void };

// Live @pearl_medicals feed for the website (gallery, results, facilities).
// Uses the Instagram API with Instagram Login - the account must be a
// Business or Creator account. See README "Instagram feed" for getting a
// long-lived token, then:
//   supabase secrets set INSTAGRAM_ACCESS_TOKEN=IGAA...
//
// Long-lived tokens expire after 60 days unless refreshed. This function
// refreshes the token itself about once a week and keeps the newest one in
// the private `app_settings` table (service-role only), so once the secret
// is set the feed keeps working indefinitely.
//
// Reels play on the site from the clinic's own storage, not Instagram's:
// each new post's video and cover image are copied once into the public
// `instagram` Storage bucket and listed in the `instagram_posts` table.
// Instagram's own media links expire after a few days and carry its
// branding, so the site never uses them directly.
//
// Staying up to date: every visit serves the stored posts instantly, and
// if the last sync is older than SYNC_EVERY_MS a fresh sync runs in the
// background. POST ?sync=1 forces one - the optional pg_cron job in the
// README calls that hourly so new reels appear even with no visitors.
//
// Tagging convention for the clinic's posts (in the caption):
//   #results / "before & after"  -> shown in Patient Results
//   #facilities / #ourclinic     -> shown in the Facilities section
//   #event, #healthtips, #team   -> gallery filters

const ENV_TOKEN = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");
const GRAPH = "https://graph.instagram.com";
const SYNC_EVERY_MS = 15 * 60 * 1000; // new posts show up within 15 minutes
const LOCK_MS = 5 * 60 * 1000; // one sync at a time
const MAX_POSTS = 30;
// Videos are copied a few per run so a sync always finishes inside the
// Edge Function time limit; the rest follow on the next sync.
const MAX_DOWNLOADS_PER_SYNC = 8;
const BUCKET = "instagram";
const LAST_SYNC_KEY = "instagram_last_sync";
const REFRESH_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
const TOKEN_KEY = "instagram_access_token";
const SEED_KEY = "instagram_access_token_seed";

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", ...extra },
  });
}

function saveToken(token: string) {
  return supabaseAdmin.from("app_settings").upsert([
    { key: TOKEN_KEY, value: token, updated_at: new Date().toISOString() },
    // Remembers which secret the stored token grew from, so setting a new
    // INSTAGRAM_ACCESS_TOKEN secret takes over from the stored one.
    { key: SEED_KEY, value: ENV_TOKEN ?? "", updated_at: new Date().toISOString() },
  ]);
}

async function getToken(): Promise<string | null> {
  const { data: rows } = await supabaseAdmin.from("app_settings").select("key, value, updated_at").in("key", [TOKEN_KEY, SEED_KEY]);
  const stored = rows?.find((r) => r.key === TOKEN_KEY);
  const seed = rows?.find((r) => r.key === SEED_KEY)?.value;
  const useStored = stored?.value && (!ENV_TOKEN || seed === ENV_TOKEN);
  const token = useStored ? (stored!.value as string) : ENV_TOKEN || null;
  if (!token) return null;

  const age = useStored ? Date.now() - new Date(stored!.updated_at).getTime() : Infinity;
  if (age > REFRESH_AFTER_MS) {
    try {
      const res = await fetch(`${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`);
      const body = await res.json();
      if (res.ok && body.access_token) {
        await saveToken(body.access_token);
        return body.access_token;
      }
      // Tokens under 24h old can't be refreshed yet - store as-is and try
      // again next week rather than on every request.
      console.error("[instagram-feed] token refresh failed:", body?.error?.message);
      await saveToken(token);
    } catch (err) {
      console.error("[instagram-feed] token refresh failed:", (err as Error).message);
    }
  }
  return token;
}

type Media = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: { data: { media_type: string; media_url?: string; thumbnail_url?: string }[] };
};

const TAG_RULES: [string, RegExp][] = [
  ["result", /before\s*(&|and|\/|-)?\s*after|#results?\b|#beforeandafter|#transformation/i],
  ["facility", /#facilit(y|ies)\b|#ourclinic\b|#clinictour\b|#insidepearl\b/i],
  ["event", /#event\b|congress|conference|\bexpo\b|derma\s*20\d\d|amwc/i],
  ["education", /#healthtips?\b|#gptips?\b|#skintips?\b|\bsigns\b|\btips?\b/i],
  ["team", /#team\b|#meettheteam\b|#ourdoctors\b/i],
];

const RESULT_CATEGORIES: [string, RegExp][] = [
  ["Hair Restoration", /hair|scalp|prp/i],
  ["Anti-Wrinkle", /wrinkle|botox|tox\b/i],
  ["Fillers", /filler|lip|jaw|cheek/i],
  ["Laser", /laser/i],
  ["Skin", /skin|facial|hydra|peel|acne|pigment/i],
];

function normalize(m: Media) {
  const caption = m.caption || "";
  const isVideo = m.media_type === "VIDEO";
  const isReel = isVideo || m.media_product_type === "REELS";
  const first = m.media_type === "CAROUSEL_ALBUM" ? m.children?.data?.[0] : null;
  const image = isVideo ? m.thumbnail_url : first ? first.thumbnail_url || first.media_url : m.media_url;

  const tags = TAG_RULES.filter(([, re]) => re.test(caption)).map(([tag]) => tag);
  if (isReel) tags.push("reel");

  // First caption line, minus hashtags/mentions, as a short title.
  const firstLine = caption.split("\n").find((l) => l.replace(/[#@]\S+/g, "").trim()) || "";
  let title = firstLine.replace(/[#@]\S+/g, "").replace(/\s+/g, " ").trim();
  if (title.length > 70) title = `${title.slice(0, 67).trimEnd()}…`;

  return {
    id: m.id,
    type: isReel ? "reel" : "image",
    date: m.timestamp?.slice(0, 10),
    permalink: m.permalink,
    image,
    videoUrl: isVideo ? m.media_url : undefined,
    title: title || (isReel ? "Watch the reel" : "View on Instagram"),
    caption: caption.replace(/\s*(#\S+\s*)+$/g, "").trim(),
    tags,
    category: tags.includes("result")
      ? RESULT_CATEGORIES.find(([, re]) => re.test(caption))?.[0] || "Before & After"
      : undefined,
  };
}

type Post = ReturnType<typeof normalize>;
type Row = { id: string; post: Post; taken_at: string };

// Copies one remote file into the bucket and returns its public URL.
async function mirror(url: string, path: string, contentType: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${path} failed: ${res.status}`);
  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, await res.blob(), { contentType, upsert: true, cacheControl: "31536000" });
  if (error) throw new Error(`upload ${path} failed: ${error.message}`);
  return supabaseAdmin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

async function lastSync() {
  const { data } = await supabaseAdmin.from("app_settings").select("updated_at").eq("key", LAST_SYNC_KEY).maybeSingle();
  return data ? new Date(data.updated_at).getTime() : 0;
}

function setLastSync(at: number) {
  return supabaseAdmin.from("app_settings").upsert({ key: LAST_SYNC_KEY, value: "", updated_at: new Date(at).toISOString() });
}

async function sync() {
  if (Date.now() - (await lastSync()) < LOCK_MS) return;
  await setLastSync(Date.now());

  const token = await getToken();
  if (!token) throw new Error("Instagram is not configured yet (INSTAGRAM_ACCESS_TOKEN).");

  const fields =
    "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}";
  const res = await fetch(`${GRAPH}/me/media?fields=${encodeURIComponent(fields)}&limit=${MAX_POSTS}&access_token=${token}`);
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error?.message || `Instagram API responded ${res.status}`);
  const media = body.data as Media[];

  const { data: existing } = await supabaseAdmin.from("instagram_posts").select("id, post");
  const stored = new Map((existing ?? []).map((r) => [r.id as string, r.post as Post]));

  let downloads = 0;
  const rows: Row[] = [];
  for (const m of media) {
    const fresh = normalize(m);
    if (!fresh.image) continue;
    const old = stored.get(m.id);
    // Already copied: only refresh the caption-derived fields, in case the
    // caption was edited on Instagram.
    if (old && (!fresh.videoUrl || old.videoUrl)) {
      rows.push({ id: m.id, taken_at: m.timestamp, post: { ...fresh, image: old.image, videoUrl: old.videoUrl } });
      continue;
    }
    if (downloads >= MAX_DOWNLOADS_PER_SYNC) continue;
    try {
      const image = await mirror(fresh.image, `${m.id}.jpg`, "image/jpeg");
      const videoUrl = fresh.videoUrl ? await mirror(fresh.videoUrl, `${m.id}.mp4`, "video/mp4") : undefined;
      downloads++;
      rows.push({ id: m.id, taken_at: m.timestamp, post: { ...fresh, image, videoUrl } });
    } catch (err) {
      console.error("[instagram-feed]", (err as Error).message);
    }
  }

  if (rows.length) {
    const { error } = await supabaseAdmin.from("instagram_posts").upsert(rows);
    if (error) throw new Error(error.message);
  }

  // Posts deleted on Instagram (or pushed out of the latest MAX_POSTS)
  // leave the site too, along with their files.
  const current = new Set(media.map((m) => m.id));
  const gone = [...stored.keys()].filter((id) => !current.has(id));
  if (gone.length) {
    await supabaseAdmin.storage.from(BUCKET).remove(gone.flatMap((id) => [`${id}.jpg`, `${id}.mp4`]));
    await supabaseAdmin.from("instagram_posts").delete().in("id", gone);
  }

  // Hit the download limit: let the next visit carry on straight away.
  if (downloads >= MAX_DOWNLOADS_PER_SYNC) await setLastSync(Date.now() - SYNC_EVERY_MS - 1);
}

async function storedPosts() {
  const { data, error } = await supabaseAdmin
    .from("instagram_posts")
    .select("post")
    .order("taken_at", { ascending: false })
    .limit(MAX_POSTS);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.post as Post);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (new URL(req.url).searchParams.get("sync") === "1") {
      await sync();
      return json({ ok: true, posts: (await storedPosts()).length });
    }

    let posts = await storedPosts();
    if (posts.length === 0) {
      // Very first visit: copy the feed now rather than show nothing.
      await sync();
      posts = await storedPosts();
    } else if (Date.now() - (await lastSync()) > SYNC_EVERY_MS) {
      // Answer straight away from storage; refresh behind the scenes.
      EdgeRuntime.waitUntil(sync().catch((err) => console.error("[instagram-feed] sync:", err.message)));
    }
    if (posts.length === 0) return json({ error: "No Instagram posts synced yet." }, 503);
    return json({ posts }, 200, { "Cache-Control": "public, max-age=300" });
  } catch (err) {
    console.error("[instagram-feed]", (err as Error).message);
    return json({ error: (err as Error).message }, 502);
  }
});
