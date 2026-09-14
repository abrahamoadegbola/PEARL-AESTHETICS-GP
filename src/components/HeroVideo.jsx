import { useState } from "react";
import { useReducedMotion } from "framer-motion";

// Background video for a hero section. Video-first by design - there is no
// poster photograph, so visitors get the footage itself rather than a still
// that then swaps out:
// - `preload="auto"` + autoPlay/muted/playsInline is the combination that
//   actually starts playback immediately, including on mobile Safari/Chrome;
//   without all three most mobile browsers block it silently.
// - A brand-coloured wash sits underneath the whole time, so the hero is never
//   a white flash and overlaid text stays legible from the very first frame.
// - Respects prefers-reduced-motion by loading the video but never playing it:
//   the browser paints the first frame and holds it, which gives those users a
//   still image without shipping a separate poster asset.
// - If the video itself fails, the wash plus a quiet mark is what remains -
//   never a broken player chrome.
export default function HeroVideo({ videoSrc, alt, className = "", objectPosition = "center" }) {
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-primary ${className}`}>
      {/* Wash beneath the video - visible for the split second before the
          first frame paints, and permanently if the video can't load. */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-[#061d17]" />

      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary/15 text-[9rem]">spa</span>
        </div>
      ) : (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition }}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          aria-label={alt}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
