import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Background video for a hero section, with a real photo standing in until
// the video is actually ready to play:
// - `preload="auto"` + autoPlay/muted/playsInline is the combination that
//   actually starts playback immediately, including on mobile Safari/Chrome;
//   without all three most mobile browsers block it silently.
// - The poster photo covers the video the whole time it's loading, then
//   rises up and off in one motion once the video's first frame has
//   actually decoded (`onLoadedData`, not `onCanPlay` - the difference is
//   real on a slow connection) - a deliberate reveal rather than a plain
//   crossfade or a jarring pop-in.
// - An imperative .play() call backstops the `autoPlay` attribute, which
//   some browsers silently ignore if the element wasn't already in the
//   document when they evaluated it (React mounts it a tick later).
// - Under prefers-reduced-motion the video never even renders - visitors
//   who've asked for less motion get the still photo, permanently, rather
//   than an autoplaying background loop that then also doesn't slide away.
// - If the video fails to load, the photo simply never leaves - never a
//   broken player, never a blank panel.
export default function HeroVideo({ videoSrc, posterSrc, alt, className = "", objectPosition = "center" }) {
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  const showVideo = !reduceMotion && !failed;
  const revealed = showVideo && ready;

  return (
    <div className={`relative overflow-hidden bg-primary ${className}`}>
      {/* Wash beneath everything - visible only if the poster photo itself
          also fails to load. */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-navy-dark" />

      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden={!revealed}
          ref={(el) => {
            if (el) el.play?.().catch(() => {});
          }}
          onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {posterSrc ? (
        <motion.img
          src={posterSrc}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition }}
          initial={false}
          animate={{ y: revealed ? "-100%" : "0%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        />
      ) : (
        !showVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary/15 text-[9rem]">spa</span>
          </div>
        )
      )}
    </div>
  );
}
