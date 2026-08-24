import { Link } from "react-router-dom";
import { useState } from "react";

const faqs = [
  { q: "Does the extraction process hurt?", a: "Not at all. The HydraFacial uses a gentle vacuum-like suction that is completely painless and often described as a light massage on the face." },
  { q: "How soon will I see results?", a: "Many patients see visible skin refinement and an even, radiant skin tone after just one treatment. The smooth results and hydration may last 5 to 7 days or even longer." },
  { q: "How often should I get a HydraFacial?", a: "For optimal, long-lasting results, we recommend one treatment per month. This frequency helps improve the appearance of fine lines, wrinkles, and hyperpigmentation." },
];

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion-item bg-surface-container-lowest border border-outline-variant/30 rounded-lg overflow-hidden">
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-headline-sm text-headline-sm text-primary text-lg">{question}</span>
        <span
          className="material-symbols-outlined text-surface-tint transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
        </span>
      </button>
      {open && (
        <div className="accordion-content px-6 bg-surface-container-lowest">
          <p className="pb-4 font-body-md text-body-md text-on-surface-variant">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function HydrafacialDetail() {
  return (
    <>


<section className="relative w-full h-[614px] md:h-[819px] flex items-end pb-section-padding-mobile md:pb-section-padding-desktop">
<div className="absolute inset-0 z-0">
<img alt="HydraFacial Treatment Room" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqKAVsV7mY-23xBE7Ns8srfsi6LNZh1b7w2p68Ymi0uNaIwk5utLrNnQuPVsc1EK2_NyN-nz-o6k3YjLHmgoQYaS4iCAzCTiP6VkT2KNcQQsLCy6iskFopb4259g9eVYN-dAjaw29Du4uN6ZpTUfDlJsrffcSlc3tyUZlKrNy_YkZbws0zf90cfQL6Y3-vuz1GZxBaTLLFR-kqq43tkuKPSIZtNm3RqmJs_Y18QkuDBdeTli6uT2xh"  />
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
</div>
<div className="relative z-10 w-full px-gutter max-w-container-max mx-auto text-on-primary animate-fade-in-up">
<span className="font-label-caps text-label-caps tracking-widest uppercase mb-4 block text-secondary-fixed">Signature Treatment</span>
<h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-4">HydraFacial</h1>
<p className="font-body-lg text-body-lg mb-8 max-w-2xl opacity-90">Experience the ultimate glow. A medical-grade resurfacing treatment that clears out your pores and hydrates your skin.</p>
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
<span className="font-headline-sm text-headline-sm text-secondary-fixed">from AED 650</span>
<Link to="/book-consultation" className="bg-secondary-container text-on-secondary-container px-8 py-4 font-label-caps text-label-caps rounded-DEFAULT hover:scale-105 transition-transform duration-300 shadow-lg shadow-secondary/20">Book This Treatment</Link>
</div>
</div>
</section>

<div className="max-w-container-max mx-auto px-gutter mt-section-padding-mobile md:mt-section-padding-desktop grid grid-cols-1 lg:grid-cols-12 gap-12">

<div className="lg:col-span-8 space-y-section-padding-mobile">

<section className="animate-fade-in-up" style={{animationDelay: "0.1s"}}>
<h2 className="font-headline-md text-headline-md text-primary mb-6">What It Is</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                        The HydraFacial is a multi-step, clinical-grade facial treatment designed to cleanse, exfoliate, extract, and hydrate the skin simultaneously. Utilizing patented Vortex-Fusion technology, it painlessly removes impurities from pores while saturating the skin surface with potent antioxidants and peptides. This treatment bridges the gap between a soothing spa therapy and advanced medical aesthetics, delivering immediate, visible results without any downtime.
                    </p>
</section>

<section className="animate-fade-in-up" style={{animationDelay: "0.2s"}}>
<h2 className="font-headline-md text-headline-md text-primary mb-6">Ideal Candidates</h2>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
<div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/30 hover:shadow-lg transition-shadow duration-300">
<span className="material-symbols-outlined text-surface-tint mb-4 text-3xl">water_drop</span>
<h3 className="font-headline-sm text-headline-sm text-primary mb-2 text-lg">Dull Skin</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Restores radiance and vitality to tired, lackluster complexions.</p>
</div>
<div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/30 hover:shadow-lg transition-shadow duration-300">
<span className="material-symbols-outlined text-surface-tint mb-4 text-3xl">blur_on</span>
<h3 className="font-headline-sm text-headline-sm text-primary mb-2 text-lg">Congestion</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Deeply clears blocked pores and reduces the appearance of blackheads.</p>
</div>
<div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/30 hover:shadow-lg transition-shadow duration-300">
<span className="material-symbols-outlined text-surface-tint mb-4 text-3xl">timeline</span>
<h3 className="font-headline-sm text-headline-sm text-primary mb-2 text-lg">Fine Lines</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Plumps the skin with hydration, smoothing out superficial wrinkles.</p>
</div>
</div>
</section>

<section className="animate-fade-in-up" style={{animationDelay: "0.3s"}}>
<h2 className="font-headline-md text-headline-md text-primary mb-8">What To Expect</h2>
<div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-surface-tint before:via-surface-tint/50 before:to-transparent">
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
<div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-surface-tint text-on-primary font-headline-sm text-headline-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md shadow-primary/10 z-10">1</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm shadow-primary/5">
<h3 className="font-headline-sm text-headline-sm text-primary mb-2">Consultation</h3>
<p className="font-body-md text-body-md text-on-surface-variant">A brief assessment of your skin concerns by our clinical experts to customize the serum boosters.</p>
</div>
</div>
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
<div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-surface-container-high text-primary font-headline-sm text-headline-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md shadow-primary/5 z-10">2</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm shadow-primary/5">
<h3 className="font-headline-sm text-headline-sm text-primary mb-2">The Treatment</h3>
<p className="font-body-md text-body-md text-on-surface-variant">A relaxing 30-45 minute process involving cleansing, gentle peeling, extractions, and intense hydration.</p>
</div>
</div>
<div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
<div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-surface-container-high text-primary font-headline-sm text-headline-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md shadow-primary/5 z-10">3</div>
<div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-surface-container-lowest rounded-lg border border-outline-variant/20 shadow-sm shadow-primary/5">
<h3 className="font-headline-sm text-headline-sm text-primary mb-2">Aftercare</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Application of SPF and a brief guide on maintaining your post-treatment glow. Zero downtime required.</p>
</div>
</div>
</div>
</section>

<section className="animate-fade-in-up" style={{animationDelay: "0.4s"}}>
<h2 className="font-headline-md text-headline-md text-primary mb-6">Clinical Results</h2>
<div className="grid grid-cols-2 gap-4">
<div className="relative rounded-lg overflow-hidden">
<img alt="Before Treatment" className="w-full h-auto object-cover aspect-square" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYpODDaSYq-b2pxwjg8wsMo3Dz3XgZtkFu3-Vs2qGZYqz_Uk5OmkCnkS1TMKWM7Tgs9J3D_9rvsbWSOa8-6Mv-iZIbOmUBckvDgp-QM7Wxv3VezQNxZXrLZN4_vs5vwh6ZIKiwW5kPiIzlvzSNDjWJZBqBc5XsNyqGtuz8PatHmiW-VdKDHlfxOTjeOuILDrPsPTApa-jV60TtVaYxJulTlUImCmdJqdaMrfAzT77LTNj72aK81OtR"  />
<div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-sm px-3 py-1 rounded font-label-caps text-label-caps text-primary">Before</div>
</div>
<div className="relative rounded-lg overflow-hidden">
<img alt="After Treatment" className="w-full h-auto object-cover aspect-square" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqw7zbXxckTVHzEB8c6RGwSpHWAOnCqqo8EEEgCSXX_qvFlPM2ZPZmkdAWXmZDIfFBwkjDz7ajPRgcyD2Mr5meqvKLgby6ywjv1KX8JnSzwkWJUFiTR9xb4Qo0-qwv_C1ZTbpWi8fepV7DlCQwuu4tZsBPB2iqynklly-ye-BUdLmpHUr9iUf73AYeAbwupt0xPG6cisitjLIrNmtx2dgMMqKl0RCAhfYG8YMNjqXucviXgS2qfp1k"  />
<div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-sm px-3 py-1 rounded font-label-caps text-label-caps text-primary">After</div>
</div>
</div>
</section>

<section className="animate-fade-in-up" style={{animationDelay: "0.5s"}}>
<h2 className="font-headline-md text-headline-md text-primary mb-6">Frequently Asked Questions</h2>
<div className="space-y-4">
{faqs.map((faq) => (
<FaqItem key={faq.q} question={faq.q} answer={faq.a} />
))}
</div>
</section>
</div>

<div className="hidden lg:block lg:col-span-4">
<div className="sticky top-32 bg-surface-container-low p-8 rounded-xl shadow-lg shadow-primary/5 border border-outline-variant/20">
<h3 className="font-headline-md text-headline-md text-primary mb-2">HydraFacial</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">Medical-grade resurfacing and hydration.</p>
<div className="space-y-4 mb-8">
<div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
<span className="font-label-caps text-label-caps text-on-surface-variant">Duration</span>
<span className="font-headline-sm text-headline-sm text-primary text-lg">45 Min</span>
</div>
<div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
<span className="font-label-caps text-label-caps text-on-surface-variant">Downtime</span>
<span className="font-headline-sm text-headline-sm text-primary text-lg">None</span>
</div>
<div className="flex justify-between items-center pb-2">
<span className="font-label-caps text-label-caps text-on-surface-variant">Starting From</span>
<span className="font-headline-sm text-headline-sm text-primary text-xl">AED 650</span>
</div>
</div>
<Link to="/book-consultation" className="w-full bg-secondary-container text-on-secondary-container py-4 font-label-caps text-label-caps rounded-DEFAULT hover:scale-105 transition-transform duration-300 shadow-md shadow-secondary/10">Book Appointment</Link>
<p className="text-center mt-4 font-body-md text-body-md text-xs text-on-surface-variant">Consultation included prior to treatment.</p>
</div>
</div>
</div>


    </>
  );
}
