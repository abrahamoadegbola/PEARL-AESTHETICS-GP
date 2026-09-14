import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// A soft glow that trails the cursor - a small premium detail, not a
// full custom-cursor replacement (the real OS cursor stays visible and
// functional throughout, so nothing about clicking/selecting changes).
// Desktop pointer devices only: skipped on touch devices and under
// prefers-reduced-motion.
export default function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 25, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer && !reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;
    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[100] mix-blend-multiply"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(254,214,91,0.35) 0%, rgba(254,214,91,0) 70%)",
      }}
    />
  );
}
