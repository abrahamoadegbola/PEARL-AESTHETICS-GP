import { useEffect, useState } from "react";
import { getInstagramFeed } from "../lib/api";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import INSTAGRAM_POSTS, { HIDDEN_POSTS } from "../data/instagram";

// The feed is shared by every component that asks (Home renders results,
// facilities and reels at once - one request serves them all), and is
// fetched again whenever someone comes back to the tab after
// REFETCH_AFTER_MS, so a page left open still picks up new reels.
const REFETCH_AFTER_MS = 10 * 60 * 1000;

let state = { posts: INSTAGRAM_POSTS, live: false };
let fetchedAt = 0;
let inFlight = null;
const listeners = new Set();

function refresh() {
  if (!isSupabaseConfigured || inFlight || Date.now() - fetchedAt < REFETCH_AFTER_MS) return;
  inFlight = getInstagramFeed()
    .then((data) => {
      const posts = Array.isArray(data?.posts) ? data.posts.filter((p) => !HIDDEN_POSTS.includes(shortcode(p.permalink))) : [];
      if (posts.length > 0) {
        state = { posts, live: true };
        listeners.forEach((fn) => fn(state));
      }
    })
    .catch(() => {})
    .finally(() => {
      fetchedAt = Date.now();
      inFlight = null;
    });
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && refresh());
}

// Returns { posts, live }. Starts with the locally saved snapshot so the
// page never renders empty, then swaps in the live @pearl_medicals feed
// once the instagram-feed Edge Function answers. If the function isn't
// deployed or INSTAGRAM_ACCESS_TOKEN isn't set, the snapshot simply stays.
export default function useInstagramFeed() {
  const [current, setCurrent] = useState(state);

  useEffect(() => {
    listeners.add(setCurrent);
    setCurrent(state);
    refresh();
    return () => listeners.delete(setCurrent);
  }, []);

  return current;
}

export function resultPosts(posts) {
  return posts.filter((p) => p.tags?.includes("result"));
}

// "https://www.instagram.com/reel/DeqtepHuAa7/" -> "DeqtepHuAa7"
export function shortcode(permalink = "") {
  return permalink.match(/\/(?:reel|reels|p|tv)\/([^/?#]+)/)?.[1] || null;
}

// Facilities prefer live posts tagged #facilities, but fall back to the
// saved snapshot rather than showing nothing - the clinic doesn't post a
// room tour every week. Snapshot posts pick up the live copy's video when
// the same reel is in the live feed, so they still play on the site.
export function facilityPosts(posts) {
  const live = posts.filter((p) => p.tags?.includes("facility"));
  if (live.length >= 3) return live;
  const byCode = new Map(posts.map((p) => [shortcode(p.permalink), p]));
  return INSTAGRAM_POSTS.filter((p) => p.tags.includes("facility")).map((p) => {
    const match = byCode.get(shortcode(p.permalink));
    return match?.videoUrl ? { ...p, videoUrl: match.videoUrl } : p;
  });
}
