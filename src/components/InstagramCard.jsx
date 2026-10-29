import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { shortcode } from "../hooks/useInstagramFeed";

// Every reel plays on the site. A video file (`videoUrl`: from the live
// feed, which copies each reel into the clinic's own storage, or an .mp4
// saved in public/instagram/) plays in our own full-screen player.
// Snapshot reels without a file yet fall back to Instagram's embed.
export function isPlayable(post) {
  return post.type === "reel" && Boolean(post.videoUrl || shortcode(post.permalink));
}

// One post/reel tile. Reels open the ReelPlayer (swiping through
// `playlist`, which defaults to just this reel); photo posts open the post.
export default function InstagramCard({ post, playlist, className = "", aspect, showCaption = true }) {
  const [open, setOpen] = useState(false);
  const isReel = post.type === "reel";
  const playable = isPlayable(post);
  // Before/after posts are designed graphics with their own labels baked
  // in - an overlaid caption would sit on top of them, so it goes below.
  const captionBelow = post.tags?.includes("result");
  // Square + caption below lands at about the same height as a 4:5 tile,
  // so mixed rows of results and reels still line up.
  const ratio = aspect || (captionBelow ? "aspect-square" : "aspect-[4/5]");

  const caption = showCaption && (
    <div className={captionBelow ? "pt-4 text-left" : "absolute inset-x-0 bottom-0 p-5 text-white text-left"}>
      {post.category && (
        <p
          className={`font-label-caps text-label-caps uppercase tracking-[0.2em] mb-1.5 ${
            captionBelow ? "text-primary-container" : "text-secondary-container"
          }`}
        >
          {post.category}
        </p>
      )}
      <h3 className={`font-headline-sm text-lg leading-snug line-clamp-2 ${captionBelow ? "text-on-surface" : ""}`}>{post.title}</h3>
    </div>
  );

  const tile = (
    <>
      <div className={`relative w-full ${ratio} overflow-hidden rounded-2xl bg-surface-container`}>
        <img
          src={post.image}
          alt={post.title || "Post from Pearl Medicals"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          loading="lazy"
        />
        {!captionBelow && <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />}
        <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/45 backdrop-blur flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {isReel ? "play_arrow" : "photo_camera"}
          </span>
        </span>
        {!captionBelow && caption}
      </div>
      {captionBelow && caption}
    </>
  );

  const tileClass = `group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl ${className}`;

  return (
    <>
      {playable ? (
        <button type="button" onClick={() => setOpen(true)} className={tileClass} aria-label={`Play video: ${post.title}`}>
          {tile}
        </button>
      ) : (
        <a href={post.permalink} target="_blank" rel="noreferrer" className={tileClass} aria-label={post.title}>
          {tile}
        </a>
      )}
      {playable && <ReelLightbox post={post} playlist={playlist} open={open} onClose={() => setOpen(false)} />}
    </>
  );
}

function timeAgo(date) {
  if (!date) return "";
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

// Full-screen, app-style reel player: tap to pause, swipe or use the
// arrows to move between reels, auto-advances at the end of each one.
export function ReelLightbox({ post, playlist, open, onClose }) {
  const reels = (playlist || [post]).filter(isPlayable);
  const startIndex = Math.max(0, reels.findIndex((p) => p.id === post.id));
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const go = useCallback(
    (step) => {
      setDirection(step);
      setIndex((i) => Math.min(reels.length - 1, Math.max(0, i + step)));
    },
    [reels.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown" || e.key === "ArrowRight") go(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, go]);

  // Swipe up/left for the next reel, down/right for the previous.
  const touch = useRef(null);
  const onTouchStart = (e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY });
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    const d = Math.abs(dy) > Math.abs(dx) ? dy : dx;
    if (Math.abs(d) > 60) go(d < 0 ? 1 : -1);
  };

  const current = reels[index] || post;
  const hasPrev = index > 0;
  const hasNext = index < reels.length - 1;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <div className="relative flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
            <NavButton icon="keyboard_arrow_up" label="Previous video" onClick={() => go(-1)} hidden={!hasPrev} />

            <motion.div
              className="relative overflow-hidden bg-black w-screen h-[100dvh] md:w-auto md:h-[min(92vh,52rem)] md:aspect-[9/16] md:rounded-3xl md:shadow-2xl"
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  custom={direction}
                  initial={{ y: `${direction * 100}%` }}
                  animate={{ y: 0 }}
                  exit={{ y: `${direction * -100}%` }}
                  transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Reel post={current} onEnded={hasNext ? () => go(1) : null} onClose={onClose} />
                </motion.div>
              </AnimatePresence>

              {reels.length > 1 && (
                <div className="absolute top-2 inset-x-3 flex gap-1 z-20 pointer-events-none">
                  {reels.length <= 12 &&
                    reels.map((r, i) => (
                      <span key={r.id} className={`h-0.5 flex-1 rounded-full ${i <= index ? "bg-white" : "bg-white/30"}`} />
                    ))}
                </div>
              )}
            </motion.div>

            <NavButton icon="keyboard_arrow_down" label="Next video" onClick={() => go(1)} hidden={!hasNext} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function NavButton({ icon, label, onClick, hidden }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`hidden md:flex w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition ${
        hidden ? "invisible" : ""
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}

// One reel: the video with its own controls and overlays.
function Reel({ post, onEnded, onClose }) {
  const video = useRef(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // Opening the player is a tap, so sound is normally allowed; if the
    // browser still refuses, start muted and let the visitor unmute.
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => setPaused(true));
    });
  }, [post.id]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPaused(false)).catch(() => {});
    else {
      v.pause();
      setPaused(true);
    }
  };

  const toggleMute = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="absolute inset-0">
      {post.videoUrl ? (
        <>
          <video
            ref={video}
            src={post.videoUrl}
            poster={post.image}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="auto"
            loop={!onEnded}
            onClick={toggle}
            onWaiting={() => setLoading(true)}
            onPlaying={() => setLoading(false)}
            onCanPlay={() => setLoading(false)}
            onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))}
            onEnded={onEnded || undefined}
          />
          {(loading || paused) && (
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {loading && !paused ? (
                <span className="material-symbols-outlined animate-spin text-white/80 text-5xl">progress_activity</span>
              ) : (
                <span className="w-20 h-20 rounded-full bg-black/35 backdrop-blur flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </span>
              )}
            </span>
          )}
        </>
      ) : (
        <>
          <img src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40" />
          <iframe
            src={`https://www.instagram.com/reel/${shortcode(post.permalink)}/embed/`}
            title={post.title || "Video"}
            className="absolute inset-x-0 top-16 bottom-0 w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            scrolling="no"
          />
        </>
      )}

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 pt-5 px-4 pb-10 bg-gradient-to-b from-black/60 to-transparent flex items-center gap-3 z-10">
        <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden ring-2 ring-white/40 shrink-0">
          <img src="/logo.png" alt="" className="w-[85%] object-contain" />
        </span>
        <div className="min-w-0 flex-1 text-white">
          <p className="font-semibold text-sm leading-tight">Pearl Medicals</p>
          <p className="text-xs text-white/70">{timeAgo(post.date)}</p>
        </div>
        {post.videoUrl && (
          <IconButton icon={muted ? "volume_off" : "volume_up"} label={muted ? "Unmute" : "Mute"} onClick={toggleMute} />
        )}
        <IconButton icon="close" label="Close" onClick={onClose} />
      </div>

      {/* Caption + call to action */}
      <div className="absolute inset-x-0 bottom-0 px-5 pt-24 pb-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white z-10 pointer-events-none">
        {post.title && <h3 className="font-headline-sm text-lg leading-snug mb-1.5">{post.title}</h3>}
        {post.caption && post.caption !== post.title && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className={`pointer-events-auto block text-left text-sm text-white/85 leading-relaxed ${
              expanded ? "max-h-40 overflow-y-auto" : "line-clamp-2"
            }`}
          >
            {post.caption}
          </button>
        )}
        <Link
          to="/book-consultation"
          onClick={onClose}
          className="pointer-events-auto mt-4 inline-flex items-center gap-2 rounded-full bg-white text-primary px-5 py-2.5 font-label-caps text-label-caps uppercase tracking-widest shadow-lg active:scale-95 transition"
        >
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          Book a consultation
        </Link>
      </div>

      {post.videoUrl && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 z-20">
          <div className="h-full bg-secondary-fixed" style={{ width: `${progress * 100}%` }} />
        </div>
      )}
    </div>
  );
}

function IconButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur flex items-center justify-center text-white shrink-0"
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
