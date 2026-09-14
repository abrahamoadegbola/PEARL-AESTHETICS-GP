import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { addBooking } from "../lib/db";
import Reveal from "../components/motion/Reveal";
import { buildWhatsAppLink, bookingWhatsAppMessage } from "../lib/whatsapp";
import { sendBookingEmail } from "../lib/api";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";

const CATEGORIES = [
  {
    id: "skin",
    icon: "spa",
    title: "Skin Rejuvenation",
    description:
      "Advanced facials, chemical peels, and microneedling designed to restore texture, tone, and a youthful radiance to your skin.",
  },
  {
    id: "injectables",
    icon: "water_drop",
    title: "Injectables",
    description:
      "Neuromodulators and dermal fillers meticulously applied to enhance contours, smooth wrinkles, and restore volume naturally.",
  },
  {
    id: "laser",
    icon: "flare",
    title: "Laser Therapy",
    description:
      "State-of-the-art laser and light treatments targeting pigmentation, redness, scarring, and unwanted hair with precision.",
  },
  {
    id: "assessment",
    icon: "stethoscope",
    title: "General Assessment",
    description:
      "Unsure where to begin? Schedule a comprehensive consultation to discuss your goals and receive a bespoke treatment plan.",
  },
];

const initialDetails = { date: "", time: "", name: "", email: "", phone: "", notes: "" };

// Shared transition for the step panels below - a step exits before the
// next one enters (AnimatePresence's default "sync" would run them at the
// same time and the two would overlap awkwardly), so each step change reads
// as one panel handing off to the next rather than a jump-cut.
const STEP_TRANSITION = { duration: 0.4, ease: [0.16, 1, 0.3, 1] };

export default function BookConsultation() {
  const [step, setStep] = useState(1);
  const reduceMotion = useReducedMotion();
  const stepMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 }, transition: STEP_TRANSITION };
  const [category, setCategory] = useState(null);
  const [details, setDetails] = useState(initialDetails);
  const [booking, setBooking] = useState(null);
  const [emailStatus, setEmailStatus] = useState("idle"); // idle | sending | sent | failed

  const handleChange = (e) => setDetails((d) => ({ ...d, [e.target.name]: e.target.value }));

  const handleSelectCategory = (cat) => {
    setCategory(cat);
    setStep(2);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const [bookingError, setBookingError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    setSubmitting(true);
    setBookingError("");
    try {
      const record = await addBooking({
        category: category.title,
        date: details.date,
        time: details.time,
        name: details.name,
        email: details.email,
        phone: details.phone,
        notes: details.notes,
      });
      setBooking(record);
      setStep(4);

      setEmailStatus("sending");
      sendBookingEmail(record)
        .then(() => setEmailStatus("sent"))
        .catch(() => setEmailStatus("failed"));
    } catch (err) {
      setBookingError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabel = ["Category", "Details", "Confirm", "Done"][step - 1];

  return (
    <div className="w-full max-w-container-max mx-auto px-gutter pb-section-padding-desktop pt-16 md:pt-24 flex flex-col items-center">
      <SupabaseSetupNotice className="w-full max-w-3xl" />

      <Reveal className="w-full max-w-3xl mb-16 text-center" as="div">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.3em] mb-5 block">
          Step {Math.min(step, 3)} of 3 — {stepLabel}
        </span>
        <h1
          className="font-display-lg text-primary mb-9"
          style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
        >
          Book a consultation
        </h1>
        <div
          className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mb-9"
          role="progressbar"
          aria-valuenow={Math.min(step, 3)}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Booking progress"
        >
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${Math.min(step, 3) * (100 / 3)}%` }}
          />
        </div>
        {step === 1 && (
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Choose the area you'd like to discuss. Your first consultation is complimentary, and nothing is
            booked in until you've spoken to a practitioner.
          </p>
        )}
      </Reveal>

      <AnimatePresence mode="wait">
      {step === 1 && (
        <motion.div key="step-1" {...stepMotion} className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={0.07 * i} as="div" className="h-full">
              <button
                onClick={() => handleSelectCategory(cat)}
                className="group h-full w-full bg-surface-container-lowest rounded-xl p-8 md:p-10 text-left border border-outline-variant/30 flex flex-col items-start gap-6 transition-all duration-500 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                  <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                    {cat.icon}
                  </span>
                </span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-primary mb-3">{cat.title}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">{cat.description}</p>
                </div>
                <span className="mt-auto pt-4 inline-flex items-center gap-2 text-primary font-label-caps text-label-caps uppercase tracking-widest">
                  Select
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </motion.div>
      )}

      {step === 2 && category && (
        <motion.form
          key="step-2"
          {...stepMotion}
          onSubmit={handleContinue}
          className="w-full max-w-2xl bg-surface-container-lowest rounded-xl p-8 md:p-10 border border-outline-variant/30 space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary">{category.icon}</span>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
              {category.title}
            </span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="ml-auto text-on-surface-variant hover:text-primary text-label-caps font-label-caps underline"
            >
              Change
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface" htmlFor="date">
                Preferred Date
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary/70 text-[20px] pointer-events-none">
                  calendar_month
                </span>
                <input
                  className="styled-date-input w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-11 pr-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={details.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface" htmlFor="time">
                Preferred Time
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary/70 text-[20px] pointer-events-none">
                  schedule
                </span>
                <input
                  className="styled-time-input w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-11 pr-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  id="time"
                  name="time"
                  type="time"
                  required
                  value={details.time}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface" htmlFor="name">
              Full Name
            </label>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors"
              id="name"
              name="name"
              type="text"
              required
              value={details.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface" htmlFor="email">
                Email
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors"
                id="email"
                name="email"
                type="email"
                required
                value={details.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface" htmlFor="phone">
                Phone
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors"
                id="phone"
                name="phone"
                type="tel"
                required
                value={details.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface" htmlFor="notes">
              Notes (Optional)
            </label>
            <textarea
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors resize-none"
              id="notes"
              name="notes"
              rows="3"
              value={details.notes}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors active:scale-[0.98]"
          >
            Review Booking
          </button>
        </motion.form>
      )}

      {step === 3 && category && (
        <motion.div
          key="step-3"
          {...stepMotion}
          className="w-full max-w-2xl bg-surface-container-lowest rounded-xl p-8 md:p-10 border border-outline-variant/30 space-y-6"
        >
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Confirm Your Booking</h2>
          <dl className="space-y-3 font-body-md text-body-md">
            <div className="flex justify-between border-b border-outline-variant/30 pb-3">
              <dt className="text-on-surface-variant">Category</dt>
              <dd className="text-primary font-medium">{category.title}</dd>
            </div>
            <div className="flex justify-between border-b border-outline-variant/30 pb-3">
              <dt className="text-on-surface-variant">Date</dt>
              <dd className="text-primary font-medium">{details.date}</dd>
            </div>
            <div className="flex justify-between border-b border-outline-variant/30 pb-3">
              <dt className="text-on-surface-variant">Time</dt>
              <dd className="text-primary font-medium">{details.time}</dd>
            </div>
            <div className="flex justify-between border-b border-outline-variant/30 pb-3">
              <dt className="text-on-surface-variant">Name</dt>
              <dd className="text-primary font-medium">{details.name}</dd>
            </div>
            <div className="flex justify-between border-b border-outline-variant/30 pb-3">
              <dt className="text-on-surface-variant">Email</dt>
              <dd className="text-primary font-medium">{details.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-on-surface-variant">Phone</dt>
              <dd className="text-primary font-medium">{details.phone}</dd>
            </div>
          </dl>
          {bookingError && <p className="text-error text-sm">{bookingError}</p>}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => setStep(2)}
              className="flex-1 border border-primary text-primary py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-surface-container-low transition-colors active:scale-[0.98]"
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="flex-1 bg-secondary-container text-on-secondary-container py-4 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-secondary-fixed transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {submitting ? "Confirming…" : "Confirm Booking"}
            </button>
          </div>
        </motion.div>
      )}

      {step === 4 && booking && (
        <motion.div
          key="step-4"
          {...stepMotion}
          className="w-full max-w-2xl bg-surface-container-lowest rounded-xl p-8 md:p-10 border border-outline-variant/30 text-center space-y-6"
        >
          <span className="material-symbols-outlined text-primary" style={{ fontSize: "56px" }}>
            check_circle
          </span>
          <h2 className="font-headline-md text-headline-md text-primary">Booking Received</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Thank you, {booking.name}. Your request for {booking.category} on {booking.date} at{" "}
            {booking.time} has been received (Ref: {booking.id}). Our team will confirm shortly — for
            the fastest confirmation, message us on WhatsApp now.
          </p>
          {emailStatus === "sending" && (
            <p className="text-xs text-on-surface-variant">Sending confirmation email…</p>
          )}
          {emailStatus === "sent" && (
            <p className="text-xs text-on-surface-variant flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              Confirmation email sent to {booking.email}
            </p>
          )}
          {emailStatus === "failed" && (
            <p className="text-xs text-on-surface-variant italic">
              We couldn't send a confirmation email, but your booking was saved — WhatsApp below is the
              fastest way to confirm.
            </p>
          )}
          <a
            className="inline-flex items-center justify-center gap-2 w-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps py-4 rounded hover:bg-secondary-fixed transition-colors"
            href={buildWhatsAppLink(bookingWhatsAppMessage(booking))}
            target="_blank"
            rel="noreferrer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Confirm on WhatsApp
          </a>
          <Link to="/" className="inline-block font-label-caps text-label-caps text-on-surface-variant underline">
            Back to Home
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
