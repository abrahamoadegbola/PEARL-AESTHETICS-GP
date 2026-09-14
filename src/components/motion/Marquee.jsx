import { motion, useReducedMotion } from "framer-motion";

// Continuous horizontal scroll ticker - the content is duplicated once so
// the loop is seamless (when copy #1 has scrolled fully off, copy #2 is
// in exactly the position copy #1 started in). Pauses entirely under
// prefers-reduced-motion rather than just slowing down.
export default function Marquee({ children, duration = 28, className = "" }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={`flex flex-wrap justify-center gap-12 ${className}`}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max gap-16 md:gap-24"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <div className="flex items-center gap-16 md:gap-24 flex-shrink-0">{children}</div>
        <div className="flex items-center gap-16 md:gap-24 flex-shrink-0" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
