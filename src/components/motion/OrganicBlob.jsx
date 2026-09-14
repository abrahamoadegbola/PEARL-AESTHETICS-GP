import { motion, useReducedMotion } from "framer-motion";

// A slowly morphing organic blob - built from SVG path shapes, not a
// stock photo. Suggests skin/cellular/botanical abstraction (per the
// "skincare-specific visual language" brief) without being a literal
// illustration. Two path shapes are cross-faded/morphed via Framer
// Motion's path interpolation.
const SHAPES = [
  "M45.3,-58.5C58.5,-49.6,68.7,-34.8,72.6,-18.3C76.5,-1.9,74.1,16.2,65.8,30.8C57.5,45.4,43.3,56.5,27.3,63.1C11.3,69.7,-6.5,71.8,-23.2,67.5C-39.9,63.1,-55.5,52.3,-64.6,37.4C-73.7,22.6,-76.3,3.7,-72.1,-13.1C-67.9,-29.9,-56.8,-44.6,-42.8,-53.6C-28.8,-62.6,-14.4,-65.9,1.6,-68.2C17.6,-70.5,35.2,-71.8,45.3,-58.5Z",
  "M42.8,-54.2C54.9,-47.3,63.5,-33.5,67.9,-18.1C72.3,-2.7,72.5,14.3,65.9,28.2C59.3,42.1,45.9,52.9,31.1,59.8C16.3,66.7,0.1,69.7,-15.8,67.1C-31.7,64.5,-47.3,56.3,-57.8,43.5C-68.3,30.7,-73.7,13.3,-72.4,-3.3C-71.1,-19.9,-63.1,-35.7,-51.1,-43.4C-39.1,-51.1,-23.1,-50.7,-7.4,-52.5C8.3,-54.3,30.7,-61.1,42.8,-54.2Z",
  "M38.6,-49.6C51.2,-43.5,63.2,-33.5,68.9,-20.5C74.6,-7.5,74,8.5,67.8,21.9C61.6,35.3,49.8,46.1,36.4,53.6C23,61.1,8,65.3,-7.1,65.2C-22.2,65.1,-37.4,60.7,-48.9,51.3C-60.4,41.9,-68.2,27.5,-71.1,11.9C-74,-3.7,-72,-20.5,-64.3,-33.8C-56.6,-47.1,-43.2,-56.9,-29.2,-62.4C-15.2,-67.9,-0.6,-69.1,11.3,-65.3C23.2,-61.5,26,-55.7,38.6,-49.6Z",
];

export default function OrganicBlob({ className = "", colorFrom = "#00231c", colorTo = "#fed65b", gradientId = "blobGradient" }) {
  const reduceMotion = useReducedMotion();

  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorFrom} />
          <stop offset="100%" stopColor={colorTo} />
        </linearGradient>
      </defs>
      <motion.path
        fill={`url(#${gradientId})`}
        d={SHAPES[0]}
        animate={reduceMotion ? undefined : { d: SHAPES }}
        transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </svg>
  );
}
