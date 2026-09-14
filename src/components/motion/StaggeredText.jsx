import { motion, useReducedMotion } from "framer-motion";

// Splits text into words and reveals them with a gentle staggered
// rise - used for the hero headline and other display-type moments
// where a plain fade-in feels flat. Falls back to plain static text
// under prefers-reduced-motion.
export default function StaggeredText({ text, className = "", wordDelay = 0.045, startDelay = 0 }) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              delay: startDelay + i * wordDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
