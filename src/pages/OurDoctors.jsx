export default function OurDoctors() {
  return (
    <>


<section className="text-center max-w-3xl mx-auto mb-16 md:mb-24 reveal-on-scroll">
<h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">Our Medical Experts</h1>
<p className="font-body-lg md:font-headline-sm text-body-lg md:text-headline-sm text-on-surface-variant italic">DHA-licensed physicians, internationally trained and board-certified.</p>
<div className="h-px w-24 bg-primary mx-auto mt-8 opacity-20"></div>
</section>

<section className="flex flex-wrap justify-center gap-4 mb-16 reveal-on-scroll" id="filters">
<button className="px-6 py-2 rounded-full border border-primary text-primary font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-colors active" data-filter="all">All</button>
<button className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-label-caps text-label-caps hover:border-primary hover:text-primary transition-colors" data-filter="aesthetics">Aesthetics</button>
<button className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-label-caps text-label-caps hover:border-primary hover:text-primary transition-colors" data-filter="gp">General Practice</button>
<button className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-label-caps text-label-caps hover:border-primary hover:text-primary transition-colors" data-filter="gynecology">Gynecology</button>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

<article className="doctor-card aesthetics group reveal-on-scroll bg-surface-container-low rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
<div className="relative h-80 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A professional studio portrait of a female aesthetic doctor in her late 30s. She is wearing a crisp white medical coat over a dark teal blouse. The lighting is soft and flattering, creating a high-end clinical aesthetic against a light grey background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGYmSSgGILpG0WYXJGqTAIvq7HmJrE_GyWkF2RH39facg7dkzLaNi0P5yNXMmm9ikggFn-XiBRodpwAOo1teb3lZXA1njRR3_DO87fnELmbjRFZMoa0GPV1mMRmrtW5FMjaRtLWIxB9GH4pKyqenhC2UR-TOIufqGRIO7RqeFGRueeMVIOoPwGQa5DOjRfbB4r7CLQexYawc6-nSU5MmJN6nHYSryNhkhnnb3oITHz6gQyGQrAGRPf" />
<div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
<span className="inline-flex items-center gap-1 bg-surface-tint text-on-tertiary px-3 py-1 rounded-full font-label-caps text-[10px]">
<span className="material-symbols-outlined text-[12px]" data-icon="verified">verified</span> Board Certified
                        </span>
</div>
</div>
<div className="p-6">
<h3 className="font-headline-md text-headline-md text-primary mb-1">Dr. Elena Rostova</h3>
<p className="font-label-caps text-label-caps text-surface-tint mb-4">Lead Aesthetic Physician</p>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-6">Specializing in advanced facial harmonisation and non-surgical lifting techniques with over 15 years of international experience.</p>
<a className="inline-flex items-center font-label-caps text-label-caps text-primary hover:text-surface-tint transition-colors group/link" href="#">
                        View Profile 
                        <span className="material-symbols-outlined ml-2 transform group-hover/link:translate-x-1 transition-transform" data-icon="arrow_right_alt">arrow_right_alt</span>
</a>
</div>
</article>

<article className="doctor-card gp reveal-on-scroll bg-surface-container-low rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500" style={{transitionDelay: "100ms"}}>
<div className="relative h-80 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A professional portrait of a male general practitioner in his 40s. He wears a tailored navy suit with a subtle clinical pin. The setting is a bright, modern office with soft, natural light coming from the side, conveying trust and warmth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkKiO0Zu0Z3k55FKIFzLdsOYe5dP_2dN2nNcOfP-hd50BGHdO1RH-PLurg5117w9QmQr-vxjDIuRdIP7m5ky6PpMbUl6F9NL-NMdYKxi9Hd2hpJ-TD7Tto7EyXcjQb2VDvpgXiVwID-ZR_NDygGqBcJXY3G-WVSFymuW1jTk7r1_lvfKbS3WwVi4GD_BkgZV-Q9mgGi_snhWu2DK-l3CMBsxI7w72xtbmNLeiSHT22mvzSCVmrXg1e" />
<div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent flex gap-2">
<span className="inline-flex items-center gap-1 bg-surface-tint text-on-tertiary px-3 py-1 rounded-full font-label-caps text-[10px]">
<span className="material-symbols-outlined text-[12px]" data-icon="verified">verified</span> Board Certified
                        </span>
</div>
</div>
<div className="p-6">
<h3 className="font-headline-md text-headline-md text-primary mb-1">Dr. Julian Vance</h3>
<p className="font-label-caps text-label-caps text-surface-tint mb-4">Family Medicine &amp; Wellness</p>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-6">Focusing on preventative care, longevity medicine, and comprehensive health screening for optimal patient vitality.</p>
<a className="inline-flex items-center font-label-caps text-label-caps text-primary hover:text-surface-tint transition-colors group/link" href="#">
                        View Profile 
                        <span className="material-symbols-outlined ml-2 transform group-hover/link:translate-x-1 transition-transform" data-icon="arrow_right_alt">arrow_right_alt</span>
</a>
</div>
</article>

<article className="doctor-card gynecology reveal-on-scroll bg-surface-container-low rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500" style={{transitionDelay: "200ms"}}>
<div className="relative h-80 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A warm, professional portrait of a female gynecologist in her 50s. She is smiling gently, wearing a pristine white coat over a soft blush top. The background is slightly out of focus, featuring warm, neutral tones typical of a high-end medical clinic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtHstGbzITkIXyOnYv91NvxMHUFU9COxhqQbe_2QKvYamUIzxPZeFivI9an73JJLGZttvdj7Gbt6ob_mQ33jx5xNhhSGsvO3l3pI8oELko3xKEVmfylLhCx1z5t5AWU8tlpsZDAmXLenN4--c_1gExOiWZ6AjuqgBkSAWDqA_d1SzzdworFYlTP2LlRYK0VDm2t1Je-wVTrVVX1_JEH-Dzf1gPyZpJSisLZNOvk38JYSwH49gUAiCF" />
<div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent flex gap-2">
<span className="inline-flex items-center gap-1 bg-surface-tint text-on-tertiary px-3 py-1 rounded-full font-label-caps text-[10px]">
<span className="material-symbols-outlined text-[12px]" data-icon="school">school</span> FRCOG
                        </span>
</div>
</div>
<div className="p-6">
<h3 className="font-headline-md text-headline-md text-primary mb-1">Dr. Sarah Al-Fayed</h3>
<p className="font-label-caps text-label-caps text-surface-tint mb-4">Consultant Gynecologist</p>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-3 mb-6">Expert in women's health, intimate wellness therapies, and minimally invasive procedures tailored for patient comfort.</p>
<a className="inline-flex items-center font-label-caps text-label-caps text-primary hover:text-surface-tint transition-colors group/link" href="#">
                        View Profile 
                        <span className="material-symbols-outlined ml-2 transform group-hover/link:translate-x-1 transition-transform" data-icon="arrow_right_alt">arrow_right_alt</span>
</a>
</div>
</article>

</section>


    </>
  );
}
