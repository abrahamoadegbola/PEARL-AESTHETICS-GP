import { corsHeaders } from "../_shared/cors.ts";

// Live Google rating + reviews for the clinic's Google Business listing,
// via the Places API (New). Google returns at most 5 reviews per place
// ("most relevant" order) - the site links to the full list on Google.
//
// Setup: Google Cloud console -> enable "Places API (New)" -> create an
// API key (restrict it to that API), then:
//   supabase secrets set GOOGLE_PLACES_API_KEY=AIza...
// GOOGLE_PLACE_ID is optional - defaults to Pearl's listing.

const API_KEY = Deno.env.get("GOOGLE_PLACES_API_KEY");
const PLACE_ID = Deno.env.get("GOOGLE_PLACE_ID") || "ChIJickRNwBtXz4RtS60CfrdqnY";
const CACHE_MS = 6 * 60 * 60 * 1000;

let cache: { at: number; data: unknown } | null = null;

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json", ...extra },
  });
}

type PlaceReview = {
  rating: number;
  text?: { text: string };
  originalText?: { text: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (cache && Date.now() - cache.at < CACHE_MS) {
    return json(cache.data, 200, { "Cache-Control": "public, max-age=3600" });
  }

  if (!API_KEY) return json({ error: "Google reviews are not configured yet (GOOGLE_PLACES_API_KEY)." }, 503);

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
    });
    const body = await res.json();
    if (!res.ok) throw new Error(body?.error?.message || `Places API responded ${res.status}`);

    const reviews = ((body.reviews || []) as PlaceReview[])
      .map((r) => ({
        quote: (r.originalText?.text || r.text?.text || "").trim(),
        name: r.authorAttribution?.displayName || "Google user",
        photo: r.authorAttribution?.photoUri,
        authorUrl: r.authorAttribution?.uri,
        rating: r.rating,
        time: r.relativePublishTimeDescription,
        publishTime: r.publishTime,
        source: "Google Review",
      }))
      // Star-only reviews have nothing to quote.
      .filter((r) => r.quote);

    const data = {
      rating: body.rating,
      userRatingCount: body.userRatingCount,
      mapsUrl: body.googleMapsUri,
      reviews,
    };
    cache = { at: Date.now(), data };
    return json(data, 200, { "Cache-Control": "public, max-age=3600" });
  } catch (err) {
    console.error("[google-reviews]", (err as Error).message);
    if (cache) return json(cache.data);
    return json({ error: (err as Error).message }, 502);
  }
});
