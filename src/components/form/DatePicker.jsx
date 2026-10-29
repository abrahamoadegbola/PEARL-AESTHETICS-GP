import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Inline booking calendar. Replaces the browser's native date input, which
// looks different on every device and can't be styled. Value is the same
// "YYYY-MM-DD" string the native input produced, so nothing downstream
// (Supabase, emails, WhatsApp) changes.

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function toISODate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function fromISODate(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// "2026-11-04" -> "Wednesday, 4 November 2026"
export function formatLongDate(value) {
  const d = fromISODate(value);
  return d ? d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
}

export default function DatePicker({ value, onChange, maxDaysAhead = 90 }) {
  const reduceMotion = useReducedMotion();
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + maxDaysAhead);
    return d;
  }, [today, maxDaysAhead]);

  const selected = fromISODate(value);
  const [view, setView] = useState(() => {
    const base = selected || today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [direction, setDirection] = useState(1);

  const canPrev = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const canNext = new Date(view.getFullYear(), view.getMonth() + 1, 1) <= maxDate;

  const shift = (delta) => {
    setDirection(delta);
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));
  };

  // Monday-first grid: blank cells before the 1st, then each day.
  const days = useMemo(() => {
    const lead = (view.getDay() + 6) % 7;
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    return [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: count }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
    ];
  }, [view]);

  const monthLabel = view.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/40 p-5 sm:p-6 shadow-[0_12px_40px_-16px_rgba(14,58,48,0.18)]">
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canPrev}
          aria-label="Previous month"
          className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 disabled:opacity-25 disabled:hover:bg-transparent transition-colors"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={monthLabel}
            initial={reduceMotion ? false : { opacity: 0, x: 12 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -12 * direction }}
            transition={{ duration: 0.2 }}
            className="font-serif-display text-2xl text-primary font-medium"
            aria-live="polite"
          >
            {monthLabel}
          </motion.p>
        </AnimatePresence>
        <button
          type="button"
          onClick={() => shift(1)}
          disabled={!canNext}
          aria-label="Next month"
          className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 disabled:opacity-25 disabled:hover:bg-transparent transition-colors"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-center font-label-caps text-[11px] uppercase tracking-widest text-outline py-1">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1" role="grid" aria-label={monthLabel}>
        {days.map((day, i) => {
          if (!day) return <span key={`blank-${i}`} />;
          const iso = toISODate(day);
          const disabled = day < today || day > maxDate;
          const isSelected = value === iso;
          const isToday = day.getTime() === today.getTime();
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              aria-pressed={isSelected}
              aria-label={day.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              className={`relative aspect-square rounded-full flex items-center justify-center font-body-md text-[15px] transition-all duration-200 ${
                isSelected
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/30 scale-105"
                  : disabled
                    ? "text-outline-variant cursor-not-allowed"
                    : "text-on-surface hover:bg-secondary-container/40 active:scale-95"
              }`}
            >
              {day.getDate()}
              {isToday && !isSelected && (
                <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-secondary" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
