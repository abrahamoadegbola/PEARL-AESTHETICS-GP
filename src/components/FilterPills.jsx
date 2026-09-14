import { motion, useReducedMotion } from "framer-motion";

// One pill row used by every filterable listing (treatments, doctors,
// results, journal). Scrolls horizontally on narrow screens rather than
// wrapping into a ragged block. The active background is a single shared
// element (`layoutId`) that slides and resizes itself between pills as the
// selection changes, rather than each pill just swapping its own colour -
// that motion is what makes the filter read as one continuous control
// instead of a row of independent buttons.
export default function FilterPills({ options, value, onChange, ariaLabel = "Filter", className = "" }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`flex gap-2.5 overflow-x-auto hide-scrollbar pb-1 ${className}`}
    >
      {options.map((option) => {
        const key = typeof option === "string" ? option : option.key;
        const label = typeof option === "string" ? option : option.label;
        const active = key === value;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(key)}
            className={`relative whitespace-nowrap px-6 py-2.5 rounded-full font-label-caps text-label-caps uppercase tracking-widest border transition-colors duration-200 active:scale-[0.96] ${
              active
                ? "text-on-primary border-primary"
                : "bg-transparent border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
            }`}
          >
            {active &&
              (reduceMotion ? (
                <span className="absolute inset-0 bg-primary rounded-full" />
              ) : (
                <motion.span
                  layoutId={`${ariaLabel}-pill`}
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ))}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
