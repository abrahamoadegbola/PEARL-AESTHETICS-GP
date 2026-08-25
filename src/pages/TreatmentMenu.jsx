export default function TreatmentMenu() {
  return (
    <div className="max-w-container-max mx-auto px-gutter pb-section-padding-desktop pt-8">


<header className="mb-12 animate-fade-in-up" style={{animationDelay: "0.1s"}}>

<nav aria-label="Breadcrumb" className="flex text-on-surface-variant font-label-caps text-label-caps mb-8 uppercase tracking-wider">
<ol className="inline-flex items-center space-x-2 md:space-x-3">
<li className="inline-flex items-center">
<a className="hover:text-primary transition-colors" href="#">Home</a>
</li>
<li>
<div className="flex items-center">
<span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
<span className="text-primary font-semibold">Services</span>
</div>
</li>
</ol>
</nav>
<div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
<div>
<h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Our Treatment Menu</h1>
<p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl">
                        Discover our curated selection of medical aesthetic treatments, designed to enhance your natural beauty with clinical precision.
                    </p>
</div>
<div className="text-on-surface-variant font-label-caps text-label-caps bg-surface-container-low px-4 py-2 rounded-DEFAULT border border-outline-variant/30 flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">info</span>
                    Prices are indicative starting points
                </div>
</div>
</header>

<div className="mb-12 sticky top-20 z-40 bg-surface/90 glass-nav py-4 -mx-gutter px-gutter animate-fade-in-up" style={{animationDelay: "0.2s"}}>
<div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-primary text-on-primary font-body-md text-body-md transition-all">All</button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary font-body-md text-body-md transition-all">Face</button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary font-body-md text-body-md transition-all">Skin</button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary font-body-md text-body-md transition-all">Body</button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary font-body-md text-body-md transition-all">Hair</button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary font-body-md text-body-md transition-all">Wellness</button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary font-body-md text-body-md transition-all">IV Therapy</button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary font-body-md text-body-md transition-all">Longevity</button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container border border-outline-variant/50 text-on-surface-variant hover:border-primary hover:text-primary font-body-md text-body-md transition-all">GP</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

<a className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden border border-surface-container-low hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" href="#" style={{animationDelay: "0.3s"}}>
<div className="relative h-64 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A serene, high-end medical spa treatment room setup. Soft, diffused natural light illuminates a pristine white treatment bed with crisp linens. Subtle hints of deep forest teal and champagne gold accents are visible in the modern, minimalist medical equipment and surrounding decor. The atmosphere is calm, clinical, yet luxurious." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDht03QrW91QYcJ31btQoEgUAbF3_vpEb9F4T035GxZ6WLjdIEKjMFgkJhBCPgyBlOmNhEfyt3lQI92MNNxsSRS5FArEShn9VrhSbyoQASWBpncMBYReB-Z0QQVQQGlbqk6OlRYxhyHLaRF4XIGgfLCVUInZ-6cACFZ9J0clVPALI0H8oOYYbK-yt26DGolcK9emw5vYc5eLncvZkqZtbgwbyS9EjGembHLVkHcnbH84cKyWxClIBxI" />
<div className="absolute top-4 left-4 bg-surface/90 glass-nav px-3 py-1 rounded-DEFAULT font-label-caps text-label-caps text-primary">Face</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-surface-tint transition-colors">Dermal Fillers</h3>
<p className="text-on-surface-variant font-body-md text-body-md mb-6 flex-grow">Restore volume, smooth lines, and enhance facial contours with premium hyaluronic acid formulations.</p>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">From <span className="text-primary font-semibold text-body-md ml-1">AED 1,500</span></span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
</a>

<a className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden border border-surface-container-low hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" href="#" style={{animationDelay: "0.4s"}}>
<div className="relative h-64 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Close up of a glowing, flawless complexion of a woman resting during a facial treatment. The lighting is ethereal and soft, highlighting the smooth texture of the skin. A clinical-grade light therapy device is gently positioned nearby, emitting a subtle, warm hue. The setting reflects a high-end, relaxing medical aesthetic environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX5n0kpZHEqBx1zeD5frhjnzxYNw3rrSpM7RpNL1QmL0zhAHtHpOz4nC5I8if6etu99uQ75ZhDaMGe9SjxgvuL38_AthVtlJYWdq4ymLDgheRB90EK3ijU7vVdeASMq7AdljZHqOWrAKDd6JDGOpTu7hhHRDBwj3dmX5pgtZgVRgsPCU_yIK2uFqcJ5bErLTYH2vTk0tgqlpWJL-EQKs9r0jkSe9C1y2KcKXPfCAozswDJBptNeY9O" />
<div className="absolute top-4 left-4 bg-surface/90 glass-nav px-3 py-1 rounded-DEFAULT font-label-caps text-label-caps text-primary">Skin</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-surface-tint transition-colors">Profhilo® Bioremodeling</h3>
<p className="text-on-surface-variant font-body-md text-body-md mb-6 flex-grow">An injectable anti-aging treatment that deeply hydrates and stimulates collagen production for glowing skin.</p>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">From <span className="text-primary font-semibold text-body-md ml-1">AED 1,200</span></span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
</a>

<a className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden border border-surface-container-low hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" href="#" style={{animationDelay: "0.5s"}}>
<div className="relative h-64 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A sleek, state-of-the-art body sculpting machine in a minimalist clinic room. The device features curved, modern lines and metallic finishes, contrasting with the warm, light-toned walls. A solitary orchid plant adds a touch of life to the clinical precision of the space. The overall aesthetic is clean, professional, and sophisticated." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhj45uG0jf5j6UEG7ZhA5mif9s9GSj-wAJuIKZsw9WFouPRgmTY7am5bCPWmkjfY9CX8KDIopU6eCuCxTt3M_5guyXvJoS-I3iwjJfZGsi4yBK0M4IvvdxB4l2cbuJqOEQVngqGSb7aZfa08VMAoH0m0eLVWGu3r6uJLr3Tp2R8cb1RKKsYAivlpoXwO9oCX72e3VLYxmJ4ub4ZlBZCkH6FCOVDzXlQCwY4D0IbJ9ClIRaPK7X_CL4" />
<div className="absolute top-4 left-4 bg-surface/90 glass-nav px-3 py-1 rounded-DEFAULT font-label-caps text-label-caps text-primary">Body</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-surface-tint transition-colors">Morpheus8 Body</h3>
<p className="text-on-surface-variant font-body-md text-body-md mb-6 flex-grow">Advanced microneedling with radiofrequency to tighten skin, melt fat, and improve cellulite appearance.</p>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">From <span className="text-primary font-semibold text-body-md ml-1">AED 3,500</span></span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
</a>

<a className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden border border-surface-container-low hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" href="#" style={{animationDelay: "0.6s"}}>
<div className="relative h-64 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A macro shot of clear, clinical-grade IV therapy fluid dripping slowly inside an elegant, sterile infusion lounge. The background is softly blurred, showing comfortable leather reclining chairs in a muted champagne color. Soft ambient lighting creates a restorative, wellness-focused atmosphere synonymous with luxury healthcare." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2r1Ga0cD-2UB_WKFV9RD5c5WwONIIelhwrPICMYgO2LRfJN_BaHSDuGedvpczvo-943v58pCRxq85BcLBDYlgsW7rh9i-nz105OnN7m4twAlVUT83ND3cVTqufmxf81F9tBhd-Ds7LJYp43e7Nb9BIM91msSn1bnRAb6kC2xX2E9Vkq3gXofsy4MG7PKKmAhSwXCmGKGX9TkCKqK2EsRZJJwCJO2aNaGETCd0qrgdV1VnKK3QTyrc" />
<div className="absolute top-4 left-4 bg-surface/90 glass-nav px-3 py-1 rounded-DEFAULT font-label-caps text-label-caps text-primary">IV Therapy</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-surface-tint transition-colors">Signature NAD+ Infusion</h3>
<p className="text-on-surface-variant font-body-md text-body-md mb-6 flex-grow">A powerful coenzyme treatment designed to boost cellular energy, enhance cognitive function, and support anti-aging.</p>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">From <span className="text-primary font-semibold text-body-md ml-1">AED 1,800</span></span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
</a>

<a className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden border border-surface-container-low hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" href="#" style={{animationDelay: "0.7s"}}>
<div className="relative h-64 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Abstract, clinical shot of a professional aesthetician's tray containing premium skincare ampoules and sterile instruments arranged with precise symmetry. The lighting is bright and clean, casting soft shadows on a pristine marble surface. The color palette emphasizes whites, subtle grays, and the deep forest teal of the clinic's branding." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU_mUcdQouu3bQ6vFuC5H2lpL3CEqFdFTNmcxtW3V-kALTsV8yq-N7kDF4rD65SqRqB9M8iBKEGFXtCJEwZURk4vED3Rxt1w8E7x6W6xUeGhAfrJS3lMqRZ_LvWV38dE9ZmLl6QXuVW95EbQ6jrSydUFy_FV56H9oRJsmuvpNILcLqxyKqQoe-TTgP8xhMDT-VpGsEcoTysqVOoBBd6227ub2yIPwoYVHv8SJmWW_X9Zf166Q_AgzF" />
<div className="absolute top-4 left-4 bg-surface/90 glass-nav px-3 py-1 rounded-DEFAULT font-label-caps text-label-caps text-primary">Face</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-surface-tint transition-colors">Anti-Wrinkle Injections</h3>
<p className="text-on-surface-variant font-body-md text-body-md mb-6 flex-grow">Targeted neuromodulator treatments to relax facial muscles, softening dynamic lines for a refreshed appearance.</p>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">From <span className="text-primary font-semibold text-body-md ml-1">AED 800</span></span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
</a>

<a className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden border border-surface-container-low hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" href="#" style={{animationDelay: "0.8s"}}>
<div className="relative h-64 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A focused, artistic shot of a practitioner's gloved hands holding a cutting-edge laser handpiece. The scene is illuminated by the subtle, cool glow of the laser device against a clinical, muted background. The image conveys advanced technological capability, precision, and high safety standards in a luxury medical setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGIimSnUKTPhA0urYRCJo8THf3WHC0RYuwbcLc5191hiapPD94hL16Q-i9rABy_qOgdcy-3nevXhwDE4TW0xEDTZTrn0a_f81BmOI0LJxBow-dSSP_afNnQBZaZ5my_tsVu-8Y6mPaCh42rNCRtk1iA9suCdlLLtfnBhVF4wkDkmIehnkNMwPEbwuvVcW8hoRabTQWp6lOLDZzWZycu3FxnDtou05-t0ZQnS4qvoN01cNCv1SaOwA_" />
<div className="absolute top-4 left-4 bg-surface/90 glass-nav px-3 py-1 rounded-DEFAULT font-label-caps text-label-caps text-primary">Skin</div>
</div>
<div className="p-6 flex flex-col flex-grow">
<h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-surface-tint transition-colors">PicoWay® Laser Rejuvenation</h3>
<p className="text-on-surface-variant font-body-md text-body-md mb-6 flex-grow">Ultra-fast laser technology for treating pigmentation, acne scars, and uneven skin tone with minimal downtime.</p>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-container">
<span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">From <span className="text-primary font-semibold text-body-md ml-1">AED 2,000</span></span>
<span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
</div>
</div>
</a>
</div>


    </div>
  );
}
