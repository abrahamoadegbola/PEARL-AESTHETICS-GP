import { Link } from "react-router-dom";

export default function DoctorProfile() {
  return (
    <>


<nav aria-label="Breadcrumb" className="mb-12">
<ol className="flex items-center gap-2 font-label-caps text-label-caps text-on-surface-variant">
<li><a className="hover:text-primary transition-colors" href="#">Home</a></li>
<li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
<li><a className="hover:text-primary transition-colors" href="#">Our Doctors</a></li>
<li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
<li aria-current="page" className="text-primary font-semibold">Dr. Elena Rostova</li>
</ol>
</nav>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16">

<aside className="lg:col-span-4 flex flex-col gap-8">

<div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-primary/10">
<img className="w-full h-full object-cover" alt="A professional, high-end editorial portrait of a female aesthetic doctor in her late 30s. She is wearing a pristine, tailored white lab coat over elegant clinical attire. The setting is a bright, minimalist medical spa with soft, diffused natural lighting. The overall color palette is clinical-luxury: whites, muted teals, and soft natural skin tones. She is looking at the camera with a confident, warm, and authoritative expression." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1mMpEoWTiIOOIRiOztUX90Aztwixm65uFc0mpp3KaBboenYlk3E26PYKi99gqJae1qEDsQie35UsQrAAEWwV68v4Z1JCL36R5-6NgpXW82VgnGcazl2Wh7ssXCgtxD4hn5dTr8R1iDL-_SER0nhPnhSm_DmwjN-MnXmfKVPQclAs6h27iGDu8igjZRl39eHR-1alIta17Mf2CxkUSyZyDibZ2JZnakBfwvgEiOC--uJKMDMWB8uFC" />

<div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
</div>

<div className="bg-surface-container-lowest p-8 rounded-xl border border-surface-variant flex flex-col gap-6">
<div className="text-center">
<h1 className="font-headline-md text-headline-md text-primary mb-2">Dr. Elena Rostova</h1>
<p className="font-body-md text-body-md text-on-surface-variant">MD, FAAD</p>
<p className="font-label-caps text-label-caps text-secondary mt-2 tracking-widest">Lead Aesthetic Dermatologist</p>
</div>
<div className="h-px bg-surface-variant w-full"></div>

<div className="flex flex-col gap-3">
<div className="flex items-center gap-3 text-primary">
<span className="material-symbols-outlined">workspace_premium</span>
<span className="font-body-md text-body-md">Board Certified Dermatologist</span>
</div>
<div className="flex items-center gap-3 text-primary">
<span className="material-symbols-outlined">verified</span>
<span className="font-body-md text-body-md">12+ Years Experience</span>
</div>
<div className="flex items-center gap-3 text-primary">
<span className="material-symbols-outlined">language</span>
<span className="font-body-md text-body-md">English, Arabic, French</span>
</div>
</div>

<Link to="/book-consultation" className="w-full bg-primary text-on-primary font-label-caps text-label-caps px-6 py-4 rounded-full hover:bg-primary-container transition-colors mt-2">Book with Dr. Rostova
                    </Link>
</div>
</aside>

<article className="lg:col-span-8 flex flex-col gap-16">

<section>
<h2 className="font-headline-sm text-headline-sm text-primary mb-6 border-b border-surface-variant pb-4">Professional Biography</h2>
<div className="font-body-lg text-body-lg text-on-surface-variant space-y-6">
<p>
                            Dr. Elena Rostova is a globally recognized aesthetic dermatologist dedicated to enhancing natural beauty through advanced, minimally invasive clinical procedures. With over a decade of specialized experience in cosmetic dermatology, she bridges the gap between meticulous medical science and the nuanced artistry of facial balancing.
                        </p>
<p>
                            Educated at top-tier international institutions, Dr. Rostova's approach is deeply rooted in patient education and personalized care. She believes in "regenerative aesthetics," focusing on treatments that stimulate the body's natural restorative processes rather than merely altering appearance. Her clinical-luxury philosophy ensures every patient receives bespoke treatment plans in a safe, serene, and sophisticated environment.
                        </p>
</div>
</section>

<section>
<h2 className="font-headline-sm text-headline-sm text-primary mb-6 border-b border-surface-variant pb-4">Areas of Expertise</h2>
<div className="flex flex-wrap gap-3">
<span className="bg-surface-container-high text-primary px-4 py-2 rounded-full font-label-caps text-label-caps">Facial Harmonization</span>
<span className="bg-surface-container-high text-primary px-4 py-2 rounded-full font-label-caps text-label-caps">Advanced Neuromodulators</span>
<span className="bg-surface-container-high text-primary px-4 py-2 rounded-full font-label-caps text-label-caps">Laser Resurfacing</span>
<span className="bg-surface-container-high text-primary px-4 py-2 rounded-full font-label-caps text-label-caps">Biostimulators</span>
<span className="bg-surface-container-high text-primary px-4 py-2 rounded-full font-label-caps text-label-caps">Skin Quality Optimization</span>
<span className="bg-surface-container-high text-primary px-4 py-2 rounded-full font-label-caps text-label-caps">Non-Surgical Lifting</span>
</div>
</section>

<section>
<h2 className="font-headline-sm text-headline-sm text-primary mb-6 border-b border-surface-variant pb-4">Education &amp; Certifications</h2>
<div className="relative border-l border-surface-variant ml-4 space-y-8 pb-4">

<div className="relative pl-8">
<div className="absolute w-3 h-3 bg-secondary-container rounded-full -left-[6.5px] top-1.5 border-2 border-surface"></div>
<h3 className="font-body-lg text-body-lg text-primary font-medium">Fellowship in Aesthetic Medicine</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">American Academy of Aesthetic Medicine, Miami</p>
<p className="font-label-caps text-label-caps text-outline mt-2">2018 - 2019</p>
</div>

<div className="relative pl-8">
<div className="absolute w-3 h-3 bg-surface-variant rounded-full -left-[6.5px] top-1.5 border-2 border-surface"></div>
<h3 className="font-body-lg text-body-lg text-primary font-medium">Residency in Dermatology</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">University Hospital Geneva, Switzerland</p>
<p className="font-label-caps text-label-caps text-outline mt-2">2014 - 2018</p>
</div>

<div className="relative pl-8">
<div className="absolute w-3 h-3 bg-surface-variant rounded-full -left-[6.5px] top-1.5 border-2 border-surface"></div>
<h3 className="font-body-lg text-body-lg text-primary font-medium">Doctor of Medicine (MD)</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Sorbonne University Faculty of Medicine, Paris</p>
<p className="font-label-caps text-label-caps text-outline mt-2">2008 - 2014</p>
</div>
</div>
</section>

<section>
<h2 className="font-headline-sm text-headline-sm text-primary mb-6 border-b border-surface-variant pb-4">Patient Experiences</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-surface-container-low p-8 rounded-xl border border-surface-variant hover:bg-surface-container transition-colors duration-300">
<div className="flex text-secondary mb-4">
<span className="material-symbols-outlined fill text-lg">star</span>
<span className="material-symbols-outlined fill text-lg">star</span>
<span className="material-symbols-outlined fill text-lg">star</span>
<span className="material-symbols-outlined fill text-lg">star</span>
<span className="material-symbols-outlined fill text-lg">star</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant italic mb-6">
                                "Dr. Rostova has an incredible eye for detail. She didn't just look at one area, but considered my entire facial balance. The results are subtle, completely natural, and exactly what I hoped for. Her clinical expertise immediately put me at ease."
                            </p>
<p className="font-label-caps text-label-caps text-primary">— Sarah M., 42</p>
</div>

<div className="bg-surface-container-low p-8 rounded-xl border border-surface-variant hover:bg-surface-container transition-colors duration-300">
<div className="flex text-secondary mb-4">
<span className="material-symbols-outlined fill text-lg">star</span>
<span className="material-symbols-outlined fill text-lg">star</span>
<span className="material-symbols-outlined fill text-lg">star</span>
<span className="material-symbols-outlined fill text-lg">star</span>
<span className="material-symbols-outlined fill text-lg">star</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant italic mb-6">
                                "The entire experience was luxurious without losing the serious medical undertone you want when getting injectables. Dr. Elena took time to explain the 'why' behind her recommendations. Truly the highest standard of care."
                            </p>
<p className="font-label-caps text-label-caps text-primary">— James L., 35</p>
</div>
</div>
</section>
</article>
</div>


    </>
  );
}
