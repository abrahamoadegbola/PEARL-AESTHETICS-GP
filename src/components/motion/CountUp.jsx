import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Animates a stat number counting up from 0 the first time it scrolls into
// view - "5.0", "9+" and "14h" all parse correctly, since only the numeric
// portion counts up while any prefix/suffix (the "+", the "h") rides along
// unanimated. Falls back to the plain static value under
// prefers-reduced-motion, and for anything that isn't actually numeric.
export default function CountUp({ value, className = "" }) {
  const wrapperRef = useRef(null);
  const displayRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(wrapperRef, { once: true, amount: 0.6 });

  const match = String(value).match(/^([^\d]*)([\d.]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numberText = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const decimals = numberText.includes(".") ? numberText.split(".")[1].length : 0;
  const target = parseFloat(numberText);
  const isNumeric = match !== null && !Number.isNaN(target);

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 55, damping: 18, mass: 1 });

  useEffect(() => {
    if (inView && isNumeric) motionValue.set(target);
  }, [inView, isNumeric, target, motionValue]);

  useEffect(() => {
    if (!isNumeric) return undefined;
    return spring.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      }
    });
  }, [spring, isNumeric, prefix, suffix, decimals]);

  if (reduceMotion || !isNumeric) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={wrapperRef} className={className}>
      <span ref={displayRef}>{`${prefix}${(0).toFixed(decimals)}${suffix}`}</span>
    </span>
  );
}
