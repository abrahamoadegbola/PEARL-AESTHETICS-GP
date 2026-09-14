import { motion, useReducedMotion } from "framer-motion";

// Wraps children in a scroll-triggered fade/rise reveal. Respects
// prefers-reduced-motion by skipping the animation entirely (renders
// children already in their final, visible state) rather than just
// making the motion smaller - some users need motion off, not just less.
//
// `as` takes either a tag name ("section", "ul", …) or a component. A tag
// name is resolved to the matching `motion.*` component, because handing a
// plain "div" straight to the animated branch would splatter `initial`,
// `whileInView` and friends onto the DOM node as unknown attributes.
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  duration = 0.8,
  className = "",
  once = true,
  amount = 0.2,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const isTag = typeof as === "string";

  if (reduceMotion) {
    const Static = isTag ? as : as === motion.div ? "div" : as;
    return (
      <Static className={className} {...props}>
        {children}
      </Static>
    );
  }

  const Component = isTag ? motion[as] || motion.div : as;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
