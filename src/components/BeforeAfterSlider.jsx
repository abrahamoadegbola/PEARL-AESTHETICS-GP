import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";

// A draggable before/after comparison - not a plain <input type="range">.
// Drag anywhere on the image, or use the handle, or use arrow keys once
// focused (keyboard accessible). Position is held in a Framer Motion
// value so the reveal clip-path updates with zero re-render lag.
export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeLabel = "Before", afterLabel = "After" }) {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [percent, setPercent] = useState(50);
  const x = useMotionValue(50);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPercent(pct);
    x.set(pct);
  }, [x]);

  const handlePointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const handlePointerMove = (e) => {
    if (e.buttons !== 1 && e.pointerType !== "touch") return;
    updateFromClientX(e.clientX);
  };
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPercent((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPercent((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-xl select-none cursor-ew-resize touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* After image - full width, base layer */}
      <img
        src={afterSrc}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Before image - clipped to the current percent */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
      >
        <img src={beforeSrc} alt={beforeLabel} className="w-full h-full object-cover" draggable={false} />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-surface/85 backdrop-blur px-3 py-1 rounded-full font-label-caps text-label-caps text-primary pointer-events-none">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-surface/85 backdrop-blur px-3 py-1 rounded-full font-label-caps text-label-caps text-primary pointer-events-none">
        {afterLabel}
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-surface pointer-events-none"
        style={{ left: `${percent}%`, transform: "translateX(-1px)" }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 w-11 h-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface shadow-lg flex items-center justify-center text-primary"
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        >
          <span className="material-symbols-outlined text-[20px]">drag_indicator</span>
        </motion.div>
      </div>
    </div>
  );
}
