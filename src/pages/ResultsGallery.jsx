import { Link } from "react-router-dom";

export default function ResultsGallery() {
  return (
    <>


<section className="max-w-container-max mx-auto px-gutter mb-24 fade-in-up">
<div className="max-w-3xl">
<p className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4">Curated Portfolio</p>
<h1 className="font-display-lg text-display-lg text-primary mb-6">Patient Results</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                    Witness the transformative power of our precision aesthetic treatments. Real patients, authentic outcomes, and a commitment to subtle, natural enhancements.
                </p>
</div>

<div className="flex flex-wrap gap-4 mt-12 fade-in-up stagger-1">
<button className="px-6 py-2 rounded-full border border-primary text-primary font-body-md text-body-md bg-transparent hover:bg-surface-container transition-colors">All Treatments</button>
<button className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md bg-surface-container-lowest hover:border-primary transition-colors">Jawline Contouring</button>
<button className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md bg-surface-container-lowest hover:border-primary transition-colors">Lip Enhancement</button>
<button className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant font-body-md text-body-md bg-surface-container-lowest hover:border-primary transition-colors">Skin Rejuvenation</button>
</div>
</section>

<section className="max-w-container-max mx-auto px-gutter">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<article className="md:col-span-8 group relative rounded-xl overflow-hidden bg-surface-container-low fade-in-up stagger-2">
<div className="relative w-full aspect-[16/9]">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A split-screen before and after photograph of a patient undergoing jawline contouring. The left side shows a softer jawline, while the right side reveals a distinct, chiseled profile. The lighting is soft, warm, and clinical-luxury, emphasizing the natural texture of the skin. The overall aesthetic is high-end medical spa, with deep teal and subtle champagne undertones in the shadows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs5TJJ74GK2w_TJx3NoSUoXTtCIY0IPzYADK2cuxjKSUDeTG5BbQ-iW8lrOWJ9MfFdOcTdLnaj3FDlalqWSNkrXY0dyf1ZhVvA0irdxIT-Q3hegasDtmIbeZwGpP1wKGfkcG_G7dJG_d4v1inA4rhq-R9FbOUu1qapCmMDpJ1UjWqvAabPYk5aoIGpCU51kDE0h8nGoWevrTjr3z-j8IWv--X-aL92Sv5y38XGd0cwWJBnw-aVEByc" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
</div>
<div className="absolute bottom-0 left-0 w-full p-8 text-on-primary">
<p className="font-label-caps text-label-caps text-secondary-fixed mb-2 uppercase tracking-wider">Jawline Contouring</p>
<h2 className="font-headline-md text-headline-md mb-1">Structural Definition</h2>
<p className="font-body-md text-body-md opacity-80">4 Weeks Post-Treatment • Non-Surgical Profile Harmony</p>
</div>
</article>

<article className="md:col-span-4 group relative rounded-xl overflow-hidden bg-surface-container-low fade-in-up stagger-3">
<div className="relative w-full h-full min-h-[400px]">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0" alt="A close-up before and after composite of a patient's lips following enhancement. The image displays subtle, natural-looking volume increase and improved symmetry. The lighting is warm and directional, highlighting the refined shape. The style reflects a premium aesthetic clinic environment, maintaining a clean, professional, and slightly moody atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPxh8pJHgoiaR8LL72wPT_U3Udzh1l4es7RgDU3Oh-cK2Pai69Bf-_FtEm16wG6tszSdOt6TpK7Z-3tndiskIbVDo0DiXALjkVCF53SG7flB3CawcSNHfxce0ok1qYc5mtTuE0BgHgcdgwJaiK090KIS1VvqdvKqvXefvVohuUXyCF0F6EZXm5riSB8yTaRgW-ZASy75BHhy9RyHgp4HNf0D8J_a_1qRw96L4GPopQv0WCTjA6BMK" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
</div>
<div className="absolute bottom-0 left-0 w-full p-6 text-on-primary">
<p className="font-label-caps text-label-caps text-secondary-fixed mb-2 uppercase tracking-wider">Lip Enhancement</p>
<h2 className="font-headline-sm text-headline-sm mb-1">Subtle Volume</h2>
<p className="font-body-md text-body-md opacity-80 text-sm">2 Weeks Post</p>
</div>
</article>

<article className="md:col-span-4 group relative rounded-xl overflow-hidden bg-surface-container-low fade-in-up stagger-4">
<div className="relative w-full aspect-square">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Before and after aesthetic treatment results focusing on mid-face rejuvenation. The patient's cheeks show restored volume and lifted contours. Soft, flattering lighting typical of a high-end medical practice. Warm tones and crisp details communicate precision and care." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk5SBbJhJ8Oc22O8jBmLjTZyyzHCs-tcivmw4O2X_S8AVZM8WNbeHiqSIuoCDQS26vqYJr1uE0yrwPLHFtiXlItes8h58fmTUTzw2d9_AW-jedlR_susx7a6_JF-Q7Gu047-GXZM8BMmuoZptpUMPsRxO4BAJKC1bgjZsEau4KUIqeCNCzh7np6VT7m5NpqT5r_M2jKHTMTwJFE7FhmxDAV7WuYrQ9zzU1xK7reoapqhKdm4-_n24k" />
<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
</div>
<div className="absolute bottom-0 left-0 w-full p-6 text-on-primary">
<p className="font-label-caps text-label-caps text-secondary-fixed mb-2 uppercase tracking-wider">Mid-Face Rejuvenation</p>
<h2 className="font-headline-sm text-headline-sm mb-1">Cheek Elevation</h2>
</div>
</article>
<article className="md:col-span-4 group relative rounded-xl overflow-hidden bg-surface-container-low fade-in-up stagger-4">
<div className="relative w-full aspect-square">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Profile before and after shot illustrating liquid rhinoplasty. The bridge of the nose appears smoother and more aligned in the after image. Shot in a clinical yet luxurious setting with soft, warm lighting. The aesthetic is sophisticated, focusing on subtle, non-surgical correction." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMdvdutVqSpCOltW1VRHVi5lH-K7iTWZyPMloGPrF_YT7eCnCoSa4EknUTSH3_5l2F4EH7r0L5BM-pqJ-lhVBenjNIVljubka9JW4llUNqT51g7bH2F4e4nJQR39ieCpAkZp3kc81k4R0Xuu9BpMIiZZzy6EJtYpGcNuLDkffvhJzo-UNIh5zTV22zAvvbnUfTqJatSRNYqWhKTXRPGrM6mBEcv7ro1QklF4Cy3P_Ik34vFeUmzwc-" />
<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
</div>
<div className="absolute bottom-0 left-0 w-full p-6 text-on-primary">
<p className="font-label-caps text-label-caps text-secondary-fixed mb-2 uppercase tracking-wider">Liquid Rhinoplasty</p>
<h2 className="font-headline-sm text-headline-sm mb-1">Profile Refinement</h2>
</div>
</article>
<article className="md:col-span-4 group relative rounded-xl overflow-hidden bg-surface-container-low fade-in-up stagger-4">
<div className="relative w-full aspect-square">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Close-up comparison of skin texture before and after micro-needling treatment. The after photo reveals smoother, glowing skin with reduced pore visibility. The lighting emphasizes a natural, healthy radiance. Styled with a premium, spa-like medical aesthetic in mind." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLKXMwRzhaHiF8DT0zoQXL2eCIlWuuay_N49njVkSpR16WJR9Hk4iYtbGNiougsvadVyt9urXTHFtcDy9msP32UoRb7EGFUC-UzVB0jIYBVPndQ2d14bm9rgNgX_zFbrCZ7ejecsLb9HZQIFgcdlQnReKPteIdBaZzLUYiPzm-iusCMpwqzOejnmnX1qnjpHeX9-7qyh7Dc_dMzUnzEdHeuOqKlY_L1frsv2jhdH2fFpBdO5lpM1s-" />
<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
</div>
<div className="absolute bottom-0 left-0 w-full p-6 text-on-primary">
<p className="font-label-caps text-label-caps text-secondary-fixed mb-2 uppercase tracking-wider">Skin Texture</p>
<h2 className="font-headline-sm text-headline-sm mb-1">Radiance Restore</h2>
</div>
</article>
</div>
<div className="mt-16 text-center">
<button className="px-8 py-4 rounded-full border border-primary text-primary font-body-md text-body-md bg-transparent hover:bg-surface-container transition-colors inline-flex items-center gap-2">
                    Load More Results
                    <span className="material-symbols-outlined text-sm">expand_more</span>
</button>
</div>
</section>

<section className="max-w-container-max mx-auto px-gutter mt-32 mb-16 fade-in-up">
<div className="bg-primary text-on-primary rounded-2xl p-12 md:p-20 text-center relative overflow-hidden">
<div className="relative z-10 max-w-2xl mx-auto">
<h2 className="font-display-lg text-display-lg mb-6">Begin Your Journey</h2>
<p className="font-body-lg text-body-lg text-primary-fixed-dim mb-8">Schedule a consultation with our expert practitioners to discuss your aesthetic goals and discover what's possible.</p>
<Link to="/book-consultation" className="bg-secondary-container text-on-secondary-container font-label-caps text-label-caps uppercase px-8 py-4 rounded-full hover:scale-[1.02] transition-transform duration-200">Book a Consultation
                    </Link>
</div>

<div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
<div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-container rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/4"></div>
</div>
</section>


    </>
  );
}
