export default function BookConsultation() {
  return (
    <div className="w-full max-w-container-max mx-auto px-gutter pb-section-padding-desktop pt-8 flex flex-col items-center">


<div className="w-full max-w-3xl mb-16 text-center fade-in-up">
<span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">Step 1 of 3</span>
<h1 className="font-display-lg text-display-lg text-primary mb-8">Book Consultation</h1>

<div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mb-8">
<div className="h-full bg-primary progress-bar-fill w-1/3"></div>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Select a treatment category below to begin tailoring your aesthetic journey. Our practitioners will guide you through a personalized plan.
            </p>
</div>

<div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

<button className="treatment-card-hover bg-surface rounded-xl p-8 md:p-10 text-left border border-outline-variant/30 flex flex-col items-start gap-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 fade-in-up delay-100 group">
<div className="w-16 h-16 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-fixed transition-colors">
<span className="material-symbols-outlined" style={{fontSize: "32px", fontVariationSettings: "'wght' 300"}}>spa</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">Skin Rejuvenation</h2>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                        Advanced facials, chemical peels, and microneedling designed to restore texture, tone, and a youthful radiance to your skin.
                    </p>
</div>
<div className="mt-auto pt-4 flex items-center text-primary font-label-caps text-label-caps tracking-widest uppercase group-hover:text-secondary-container transition-colors">
                    Select Category <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
</div>
</button>

<button className="treatment-card-hover bg-surface rounded-xl p-8 md:p-10 text-left border border-outline-variant/30 flex flex-col items-start gap-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 fade-in-up delay-200 group">
<div className="w-16 h-16 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-fixed transition-colors">
<span className="material-symbols-outlined" style={{fontSize: "32px", fontVariationSettings: "'wght' 300"}}>water_drop</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">Injectables</h2>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                        Neuromodulators and dermal fillers meticulously applied to enhance contours, smooth wrinkles, and restore volume naturally.
                    </p>
</div>
<div className="mt-auto pt-4 flex items-center text-primary font-label-caps text-label-caps tracking-widest uppercase group-hover:text-secondary-container transition-colors">
                    Select Category <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
</div>
</button>

<button className="treatment-card-hover bg-surface rounded-xl p-8 md:p-10 text-left border border-outline-variant/30 flex flex-col items-start gap-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 fade-in-up delay-300 group">
<div className="w-16 h-16 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-fixed transition-colors">
<span className="material-symbols-outlined" style={{fontSize: "32px", fontVariationSettings: "'wght' 300"}}>flare</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">Laser Therapy</h2>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                        State-of-the-art laser and light treatments targeting pigmentation, redness, scarring, and unwanted hair with precision.
                    </p>
</div>
<div className="mt-auto pt-4 flex items-center text-primary font-label-caps text-label-caps tracking-widest uppercase group-hover:text-secondary-container transition-colors">
                    Select Category <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
</div>
</button>

<button className="treatment-card-hover bg-surface rounded-xl p-8 md:p-10 text-left border border-outline-variant/30 flex flex-col items-start gap-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 fade-in-up delay-400 group">
<div className="w-16 h-16 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-fixed transition-colors">
<span className="material-symbols-outlined" style={{fontSize: "32px", fontVariationSettings: "'wght' 300"}}>stethoscope</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-primary mb-3 group-hover:text-secondary-container transition-colors">General Assessment</h2>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                        Unsure where to begin? Schedule a comprehensive consultation to discuss your goals and receive a bespoke treatment plan.
                    </p>
</div>
<div className="mt-auto pt-4 flex items-center text-primary font-label-caps text-label-caps tracking-widest uppercase group-hover:text-secondary-container transition-colors">
                    Select Category <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
</div>
</button>
</div>


    </div>
  );
}
