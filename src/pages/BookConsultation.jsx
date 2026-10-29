import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { addBooking } from "../lib/db";
import Reveal from "../components/motion/Reveal";
import { buildWhatsAppLink, bookingWhatsAppMessage } from "../lib/whatsapp";
import { sendBookingNotifications } from "../lib/api";
import SupabaseSetupNotice from "../components/SupabaseSetupNotice";
import DOCTORS from "../data/doctors";
import DatePicker, { formatLongDate } from "../components/form/DatePicker";
import TimeSlots, { formatTime } from "../components/form/TimeSlots";
import Field from "../components/form/Field";

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
  const [searchParams] = useSearchParams();
  const requestedDoctorId = searchParams.get("doctor");
  // Set only when arriving from a specific doctor's "Book Consultation"
  // button (e.g. /book-consultation?doctor=hamid-balogun) - a plain visit
  // to this page has no doctor preselected, and stays a general booking.
  const requestedDoctor = requestedDoctorId ? DOCTORS.find((d) => d.id === requestedDoctorId) : null;

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

  const [detailsError, setDetailsError] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    // The calendar and slots aren't native inputs, so the browser's
    // `required` check can't cover them - check them here instead.
    if (!details.date || !details.time) {
      setDetailsError(!details.date ? "Please choose a date." : "Please choose a time.");
      return;
    }
    setDetailsError("");
    setStep(3);
  };

  const setDate = (date) => setDetails((d) => ({ ...d, date, time: "" }));
  const setTime = (time) => {
    setDetails((d) => ({ ...d, time }));
    setDetailsError("");
  };

  const [bookingError, setBookingError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    setSubmitting(true);
    setBookingError("");
    try {
      const record = await addBooking({
        category: category.title,
        doctor: requestedDoctor?.name,
        date: details.date,
        time: details.time,
        name: details.name,
        email: details.email,
        phone: details.phone,
        notes: details.notes,
      });
      setBooking(record);
      setStep(4);

      // Email to the patient + email/WhatsApp to the clinic, all server-side.
      // The booking is already saved either way, so this never blocks step 4.
      setEmailStatus("sending");
      sendBookingNotifications(record.id)
        .then((result) => setEmailStatus(result?.email?.sent ? "sent" : "failed"))
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
          className="font-display-lg text-primary mb-5"
          style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
        >
          Book a consultation
        </h1>
        {requestedDoctor && (
          <div className="inline-flex items-center gap-3 mb-7 pl-2 pr-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/40">
            <img
              src={requestedDoctor.cardImage}
              alt=""
              aria-hidden="true"
              className="w-7 h-7 rounded-full object-cover flex-shrink-0"
            />
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
              Booking with {requestedDoctor.name}
            </span>
            <Link
              to="/book-consultation"
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary underline underline-offset-2"
            >
              Change
            </Link>
          </div>
        )}
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
          className="w-full max-w-5xl space-y-10"
        >
          <div className="flex flex-wrap items-center gap-3 rounded-full bg-surface-container-low border border-outline-variant/40 pl-2 pr-5 py-2 w-fit mx-auto">
            <span className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">{category.icon}</span>
            </span>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">{category.title}</span>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-on-surface-variant hover:text-primary text-label-caps font-label-caps underline underline-offset-2"
            >
              Change
            </button>
          </div>

          {/* Date + time, side by side on desktop */}
          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary mb-1">When would you like to come in?</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              We're open every day, 8AM to 10PM. Pick a time that suits you and we'll confirm it.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-6">
                <DatePicker value={details.date} onChange={setDate} />
              </div>
              <div className="lg:col-span-6">
                {details.date && (
                  <p className="font-serif-display text-xl text-primary font-medium mb-5">{formatLongDate(details.date)}</p>
                )}
                <TimeSlots value={details.time} onChange={setTime} date={details.date} />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-surface-container-lowest border border-outline-variant/40 p-6 md:p-10 shadow-[0_12px_40px_-16px_rgba(14,58,48,0.12)]">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-1">Your details</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-7">
              So we can confirm your appointment. We never share your details.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field id="name" label="Full name" icon="person" required autoComplete="name" value={details.name} onChange={handleChange} className="md:col-span-2" />
              <Field id="email" label="Email" icon="mail" type="email" required autoComplete="email" value={details.email} onChange={handleChange} />
              <Field id="phone" label="Phone / WhatsApp" icon="call" type="tel" required autoComplete="tel" value={details.phone} onChange={handleChange} />
              <Field
                id="notes"
                label="Anything we should know?"
                icon="edit_note"
                multiline
                optional
                rows={3}
                value={details.notes}
                onChange={handleChange}
                className="md:col-span-2"
              />
            </div>
          </section>

          {detailsError && (
            <p className="text-center text-error font-body-md text-body-md" role="alert">
              {detailsError}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body-md text-sm text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
              Your first consultation is complimentary.
            </p>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-10 py-4 rounded-full font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              Review Booking
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
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
            {requestedDoctor && (
              <div className="flex justify-between border-b border-outline-variant/30 pb-3">
                <dt className="text-on-surface-variant">Doctor</dt>
                <dd className="text-primary font-medium">{requestedDoctor.name}</dd>
              </div>
            )}
            <div className="flex justify-between border-b border-outline-variant/30 pb-3">
              <dt className="text-on-surface-variant">Date</dt>
              <dd className="text-primary font-medium text-right">{formatLongDate(details.date)}</dd>
            </div>
            <div className="flex justify-between border-b border-outline-variant/30 pb-3">
              <dt className="text-on-surface-variant">Time</dt>
              <dd className="text-primary font-medium">{formatTime(details.time)}</dd>
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
            Thank you, {booking.name}. Your request for {booking.category}
            {booking.doctor ? ` with ${booking.doctor}` : ""} on {formatLongDate(booking.date)} at {formatTime(booking.time)} has been
            received (Ref: {booking.id}). Our team will confirm shortly — for the fastest confirmation,
            message us on WhatsApp now.
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
