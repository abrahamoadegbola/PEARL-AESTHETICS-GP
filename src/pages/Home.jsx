import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
 

<section className="relative min-h-[870px] flex items-center px-gutter py-section-padding-mobile md:py-section-padding-desktop">
<div className="max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">

<div className="lg:col-span-5 lg:col-start-2 flex flex-col z-10 fade-up">
<h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-6">
                        Precision Medicine.<br />Boutique Experience.
                    </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
                        Elevate your natural aesthetic with advanced clinical treatments delivered in a serene, spa-inspired sanctuary. Safety, precision, and artistry combined.
                    </p>
<div className="flex flex-col sm:flex-row gap-4">
<Link className="inline-flex justify-center items-center bg-primary text-on-primary px-8 py-4 rounded hover:bg-primary-container transition-colors hover:scale-[1.02] duration-200 ease-out font-label-caps text-label-caps uppercase tracking-widest" to="/treatments">
                            Explore Treatments
                        </Link>
<Link className="inline-flex justify-center items-center border border-primary text-primary px-8 py-4 rounded hover:bg-surface-container-low transition-colors hover:scale-[1.02] duration-200 ease-out font-label-caps text-label-caps uppercase tracking-widest bg-transparent" to="/book-consultation">
                            Book Consultation
                        </Link>
</div>
</div>

<div className="lg:col-span-6 mt-12 lg:mt-0 relative fade-up" style={{transitionDelay: "200ms"}}>
<div className="aspect-[4/5] md:aspect-square rounded overflow-hidden relative" style={{boxShadow: "0 20px 40px rgba(0, 35, 28, 0.08)"}}>
<img className="object-cover w-full h-full" alt="A luxurious, modern medical clinic interior. The space is serene and minimalist, featuring soft curved walls painted in a calming cream color. Accents of deep forest teal are present in elegant, tactile furnishings. Natural light floods in from a large window, creating soft, diffused shadows. The atmosphere is clinical yet boutique, emphasizing high-end hospitality and meticulous hygiene." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCZ1HLImibcmx1-O0b3cYBDnl_P9CLPKv02QgbVS_SzTTB3y0P1v9oNrWRd9oVRa2JwGXSV9xfPEYsDYiA2RjK4VcO_dw4gi64jyKUeKtb7CBRLOZgqQ89PrQVb2XPO27RNcpaadKSsbTHNCcUIXYtlE7VuZwJSM7rrbDzWn8k0UjAAcMxv4pXxqOxaFxhfsOAZgMlAueUHDEpFye4oOm0X4NiRYBeYl5lJfccyFxg8JZVgRaQFk_N" />

<div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none"></div>
</div>

<div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-container/20 rounded-full blur-2xl -z-10"></div>
</div>
</div>
</section>

<section className="bg-surface-container-low py-16 px-gutter border-t border-b border-surface-container-high/50">
<div className="max-w-container-max mx-auto text-center fade-up">
<h3 className="font-label-caps text-label-caps text-on-surface-variant mb-8 uppercase tracking-[0.2em]">Excellence in Clinical Practice</h3>
<div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-3xl text-primary" data-icon="medical_services">medical_services</span>
<span className="font-body-md text-body-md text-primary font-medium">Board Certified</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-3xl text-primary" data-icon="science">science</span>
<span className="font-body-md text-body-md text-primary font-medium">FDA Approved</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-3xl text-primary" data-icon="hotel_class">hotel_class</span>
<span className="font-body-md text-body-md text-primary font-medium">Award Winning</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-3xl text-primary" data-icon="verified_user">verified_user</span>
<span className="font-body-md text-body-md text-primary font-medium">Licensed Practice</span>
</div>
</div>
</div>
</section>

<section className="py-section-padding-mobile md:py-section-padding-desktop px-gutter relative" id="treatments">
<div className="max-w-container-max mx-auto">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 fade-up">
<div className="max-w-xl">
<span className="font-label-caps text-label-caps text-primary uppercase tracking-widest mb-4 block">Our Expertise</span>
<h2 className="font-headline-sm text-headline-sm md:font-headline-md md:text-headline-md text-primary">Curated Treatments</h2>
</div>
<Link className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary hover:text-surface-tint transition-colors font-label-caps text-label-caps uppercase tracking-widest group" to="/treatment-menu">
                        View Full Menu
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="md:col-span-7 group cursor-pointer fade-up">
<div className="relative aspect-[4/3] rounded overflow-hidden mb-6 bg-surface-container">
<img className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" alt="A close-up, artistic shot of crystal clear water droplets resting on glowing, healthy skin, symbolizing deep dermal hydration. The lighting is soft, natural, and high-key, illuminating the skin's texture in a flattering way. The color palette features soft creams, gentle peach tones, and hints of refreshing aqua. The mood is pure, revitalizing, and medically pristine." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYMFa-ElAk_5OrgwIvwNGkZvWqTX0YsSNfc7awggAQSDButGERM_xgtLTn-G9O0w84lQLHxGhQX4cNnrBSdNFlz7w50hWS3ZyayEr2D3CzELJWwBwNpHGdx0UerOYq_4bsm4g5tU02HIMZ0-ECUyIhaUCmXcwxWIpMJncRWc3OMyJQN8sNXMd8lR5yYN3MFA5CTI3u3nvQAKY103vDkvkzJMXafQb5eC5Ha1o3m1g2-ot6NIXD3gA6" />
<div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary mb-2">Dermal Hydration</h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">Deep tissue revitalization using advanced hyaluronic formulations to restore volume and luminous quality to the skin.</p>
</div>

<div className="md:col-span-5 flex flex-col gap-gutter">

<div className="group cursor-pointer fade-up" style={{transitionDelay: "150ms"}}>
<div className="relative aspect-video rounded overflow-hidden mb-6 bg-surface-container">
<img className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" alt="An abstract, minimalist conceptual image representing structural contouring. It features elegant, smooth geometric shapes intersecting precisely, created in materials like matte ceramic and brushed brass. The lighting highlights sharp, defining edges and smooth surfaces, conveying precision and refined architecture. The background is a stark, clean cream color." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIuIiFme3s9pIgzI__CZLAZnOKfudg_zTVQwM2b5yMCawCrtJiERG67rutqP5jOgVkeyGg-ya5G8U4YT9aWL6KGj5Q4t1fC7pJPs5NXV1thG-ZD9giicG9ypfN35XlQFsZK6xkruQpStqLE4_9Vqui99sTw9AGYAdeoSJ8J1vnoeJmHV_WiOqpnSaN9gbhfsQBhQxF3dc2wkxfTNTPVFFh3AJe6on20w5Huuszmf6icM2dIKBqaDau" />
</div>
<h3 className="font-headline-sm text-headline-sm text-primary mb-2">Structural Contouring</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Strategic dermal enhancements designed to define jawlines, elevate cheekbones, and restore youthful architecture.</p>
</div>

<div className="group cursor-pointer fade-up" style={{transitionDelay: "300ms"}}>
<div className="relative aspect-video rounded overflow-hidden mb-6 bg-surface-container">
<img className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" alt="A macro photography shot of delicate, glowing organic structures resembling cellular renewal or botanical growth, shot through a microscope lens aesthetic. The tones are soft teals, warm creams, and pale golds. The lighting is ethereal and diffuse, emphasizing rejuvenation, microscopic precision, and natural healing processes within a clinical context." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1vUC8Rhbot_u4MD6BZXOFmMX5A6v4S0SVuxs-i-Ezv1_Zh7FwuxoAlppzVdLOqZWmEDVCDXUB44Li4hJ3c7SBsbcYeTz40yQ9-Xdx8auZMAaPZljxGimr9YFfsgElaVjGHZACLMFXUgMFk-q8P651BtQa-0tp4TBFRLcDTF4yZDzXy30YxCWNZQ-SWC85J1SHiKC1HOwj4wZCZAe-fmoYYNTT1k-SBKkvS9-gy_rc7NF0uEvJLiZ_" />
</div>
<h3 className="font-headline-sm text-headline-sm text-primary mb-2">Cellular Renewal</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Collagen-stimulating therapies utilizing energy-based devices and bio-stimulators to refine texture and tone.</p>
</div>
</div>
</div>
</div>

<div className="absolute top-1/2 right-0 w-96 h-96 bg-primary-fixed/30 rounded-full blur-[100px] -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
</section>


    </>
  );
}
