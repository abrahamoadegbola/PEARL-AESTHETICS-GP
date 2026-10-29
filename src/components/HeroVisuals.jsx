import { motion, useReducedMotion } from "framer-motion";
import DOCTORS from "../data/doctors";
import INSTAGRAM_POSTS from "../data/instagram";

// One visual per interior page top (PageHero `visual`), so Treatments,
// Doctors and Results each open with their own character. Deliberately one
// idea each - an arch, a row of portraits, a pair of prints - and all of it
// real clinic imagery rather than stock.

const post = (id) => INSTAGRAM_POSTS.find((p) => p.id === id);

// A single tall arch with a fine gold outline set just off it.
export function TreatmentArch() {
  const treatment = post("DeqtepHuAa7");
  return (
    <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs lg:max-w-sm">
      <div className="absolute inset-0 translate-x-4 -translate-y-4 rounded-t-full border border-secondary-container/50" aria-hidden="true" />
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-primary-container shadow-2xl shadow-black/30">
        <img src={treatment.image} alt="A facial treatment at Pearl" className="h-full w-full object-cover" style={{ objectPosition: "center top" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
      </div>
      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-secondary-container px-5 py-2 font-label-caps text-label-caps uppercase tracking-widest text-on-secondary-container shadow-lg">
        Evidence-Based Medicine
      </span>
    </div>
  );
}

// The team as four arched portraits, alternately lifted so the row reads
// as a group rather than a grid.
export function DoctorPortraits() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex items-end justify-center gap-3 sm:gap-4 py-6">
      {DOCTORS.map((doc, i) => (
        <motion.div
          key={doc.id}
          className={`w-1/4 max-w-[7.5rem] ${i % 2 === 0 ? "mb-8" : ""}`}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="aspect-[3/5] overflow-hidden rounded-full border-4 border-white/80 bg-surface-container shadow-xl shadow-primary/10">
            <img src={doc.cardImage} alt={doc.name} className="h-full w-full object-cover" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Two real before/afters, fanned like printed photos on a desk.
export function ResultsPrints() {
  const prints = [post("De6e8cwO7sI"), post("DdtT5jWIyUR")];
  return (
    <div className="relative mx-auto h-[19rem] sm:h-[23rem] w-full max-w-sm">
      {prints.map((p, i) => (
        <div
          key={p.id}
          className={`absolute w-[68%] rounded-xl bg-white p-2.5 pb-9 shadow-2xl shadow-primary/20 ${
            i === 0 ? "left-0 top-6 -rotate-6" : "right-0 top-0 rotate-[5deg]"
          }`}
        >
          <img src={p.image} alt={`${p.title} before and after`} className="aspect-square w-full rounded-md object-cover" />
          <span className="absolute bottom-2.5 left-3 font-label-caps text-[10px] uppercase tracking-[0.2em] text-primary/70">
            {p.category}
          </span>
        </div>
      ))}
    </div>
  );
}

// Three products as arches of different heights - the tallest in the
// middle - so the shop opens on the products themselves.
export function ProductTrio({ products }) {
  const picks = products.filter((p) => p.image).slice(0, 3);
  if (picks.length === 0) return null;
  const order = picks.length === 3 ? [picks[1], picks[0], picks[2]] : picks;
  return (
    <div className="flex items-end justify-center gap-3 sm:gap-5">
      {order.map((p, i) => {
        const centre = order.length === 3 && i === 1;
        return (
          <div
            key={p.id}
            className={`overflow-hidden rounded-t-full bg-white/40 shadow-2xl shadow-primary/15 ${
              centre ? "w-[38%] aspect-[3/5]" : "w-[29%] aspect-[3/4.5]"
            }`}
          >
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
          </div>
        );
      })}
    </div>
  );
}
