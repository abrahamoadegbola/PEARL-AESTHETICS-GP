import { useState } from "react";
import { motion } from "framer-motion";
import { buildWhatsAppLink, generalInquiryMessage } from "../lib/whatsapp";
import { sendContactEmail } from "../lib/api";
import BUSINESS from "../data/business";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import Reveal from "../components/motion/Reveal";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

const INTERESTS = [
  { value: "injectables", label: "Injectables & Fillers" },
  { value: "laser", label: "Laser Treatments" },
  { value: "skin", label: "Skin Rejuvenation" },
  { value: "general", label: "General Medicine / GP" },
  { value: "other", label: "Other / Not Sure" },
];

const fieldClass =
  "w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2.5 font-body-md text-body-md text-on-surface placeholder-outline transition-colors";
const labelClass =
  "font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest";

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    try {
      await sendContactEmail(form);
    } catch (err) {
      // The enquiry still reaches the clinic via the WhatsApp button below,
      // so a failed email isn't a dead end for the visitor.
      setSendError(err.message || "Couldn't send the enquiry email, but you can still reach us on WhatsApp.");
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  };

  const enquiryMessage = [
    `Hi ${BUSINESS.shortName}, I'd like to enquire about a treatment:`,
    `• Name: ${form.firstName} ${form.lastName}`.trim(),
    form.email ? `• Email: ${form.email}` : null,
    form.phone ? `• Phone: ${form.phone}` : null,
    form.interest ? `• Interest: ${form.interest}` : null,
    form.message ? `• Message: ${form.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        lede="Our patient care team answers every enquiry personally. For the fastest reply, WhatsApp is usually quicker than email."
      />

      <section className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-20">
          {/* ---------- DETAILS ---------- */}
          <Reveal className="lg:col-span-5 flex flex-col gap-10" as="div">
            {/* A live map, rather than a picture of one - visitors coming to
                JVC need directions they can actually open. */}
            <div className="w-full h-64 md:h-72 rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container">
              <iframe
                title={`Map showing ${BUSINESS.name}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.address.mapsQuery)}&z=15&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div>
              <h2 className="font-headline-sm text-headline-sm text-primary mb-5">{BUSINESS.name}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-start gap-3 mb-6">
                <span className="material-symbols-outlined text-[20px] text-outline mt-0.5">location_on</span>
                <a href={BUSINESS.address.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  {BUSINESS.address.line1},<br />
                  {BUSINESS.address.line2}
                  <br />
                  {BUSINESS.address.city}, {BUSINESS.address.country}
                  <span className="block mt-2 font-label-caps text-label-caps uppercase tracking-widest text-primary underline underline-offset-4">
                    Get directions
                  </span>
                </a>
              </p>

              <div className="flex flex-col gap-3">
                {BUSINESS.phones.map((phone) => (
                  <a
                    key={phone.number}
                    href={phone.href}
                    className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-3"
                  >
                    <span className="material-symbols-outlined text-[20px] text-outline">call</span>
                    {phone.number}
                    <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
                      {phone.label}
                    </span>
                  </a>
                ))}
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-[20px] text-outline">mail</span>
                  {BUSINESS.email}
                </a>
              </div>

              <a
                className="inline-flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-on-primary bg-primary px-6 py-3.5 rounded hover:bg-primary-container transition-colors mt-7"
                href={buildWhatsAppLink(generalInquiryMessage())}
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Message on WhatsApp
              </a>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-7 border border-outline-variant/30">
              <h3 className={`${labelClass} mb-5`}>Opening Hours</h3>
              <div className="flex justify-between items-baseline font-body-md text-body-md text-on-surface-variant">
                <span>{BUSINESS.hours.days}</span>
                <span className="text-primary font-medium">
                  {BUSINESS.hours.openTime} — {BUSINESS.hours.closeTime}
                </span>
              </div>
            </div>
          </Reveal>

          {/* ---------- FORM ---------- */}
          <Reveal delay={0.1} className="lg:col-span-7" as="div">
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-xl border border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md text-primary mb-3">Enquire now</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-10">
                Fill this in and our patient care team will come back to you — usually the same day.
              </p>

              {submitted ? (
                <Reveal as="div" className="text-center py-8 space-y-6">
                  <motion.span
                    className="material-symbols-outlined text-primary inline-block"
                    style={{ fontSize: "48px" }}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  >
                    check_circle
                  </motion.span>
                  <h3 className="font-headline-sm text-headline-sm text-primary">
                    Thank you, {form.firstName || "there"}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                    {sendError
                      ? sendError
                      : "We've received your enquiry and will be in touch shortly. For a faster response, message us directly on WhatsApp."}
                  </p>
                  <a
                    className="inline-flex items-center justify-center gap-2 w-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps uppercase tracking-widest py-4 rounded hover:bg-secondary-fixed transition-colors active:scale-[0.98]"
                    href={buildWhatsAppLink(enquiryMessage)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    Continue on WhatsApp
                  </a>
                  <button
                    type="button"
                    className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest underline underline-offset-4"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(initialForm);
                    }}
                  >
                    Submit another enquiry
                  </button>
                </Reveal>
              ) : (
                <form className="space-y-7" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div className="space-y-2">
                      <label className={labelClass} htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        className={fieldClass}
                        id="firstName"
                        placeholder="Jane"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass} htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        className={fieldClass}
                        id="lastName"
                        placeholder="Doe"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div className="space-y-2">
                      <label className={labelClass} htmlFor="email">
                        Email Address
                      </label>
                      <input
                        className={fieldClass}
                        id="email"
                        placeholder="jane@example.com"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass} htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        className={fieldClass}
                        id="phone"
                        placeholder="+971 50 000 0000"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="interest">
                      Treatment Interest
                    </label>
                    <select
                      className={fieldClass}
                      id="interest"
                      value={form.interest}
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Select an area of interest
                      </option>
                      {INTERESTS.map((interest) => (
                        <option key={interest.value} value={interest.value}>
                          {interest.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className={labelClass} htmlFor="message">
                      Message (Optional)
                    </label>
                    <textarea
                      className={`${fieldClass} resize-none`}
                      id="message"
                      placeholder="How can we assist you?"
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    className="w-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps uppercase tracking-widest py-4 rounded hover:bg-secondary-fixed transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    type="submit"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        eyebrow="Visit Us"
        title="Begin your aesthetic journey"
        lede="Schedule a private consultation with our specialists to discuss your tailored treatment plan."
      />
    </>
  );
}
