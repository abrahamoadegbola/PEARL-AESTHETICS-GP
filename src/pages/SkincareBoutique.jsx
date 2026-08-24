export default function SkincareBoutique() {
  return (
    <>


<div className="max-w-container-max mx-auto px-gutter mb-16 text-center md:text-left">
<h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">Curated Skincare</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Medical-grade formulations for exceptional aesthetic outcomes. Developed and recommended by our clinical team.</p>
</div>
<div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row gap-gutter">

<aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
<div className="sticky top-32 space-y-8">
<div>
<h3 className="font-label-caps text-label-caps text-outline mb-4 uppercase tracking-widest">Categories</h3>
<ul className="space-y-3">
<li><a className="font-body-md text-body-md text-primary font-bold" href="#">Skincare</a></li>
<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Supplements</a></li>
<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Devices</a></li>
<li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Gift Sets</a></li>
</ul>
</div>
<div>
<h3 className="font-label-caps text-label-caps text-outline mb-4 uppercase tracking-widest">Skin Concern</h3>
<ul className="space-y-3">
<li><label className="flex items-center gap-2 cursor-pointer"><input className="form-checkbox text-primary border-outline focus:ring-primary rounded-sm h-4 w-4" type="checkbox" /><span className="font-body-md text-body-md text-on-surface-variant">Anti-Aging</span></label></li>
<li><label className="flex items-center gap-2 cursor-pointer"><input className="form-checkbox text-primary border-outline focus:ring-primary rounded-sm h-4 w-4" type="checkbox" /><span className="font-body-md text-body-md text-on-surface-variant">Hydration</span></label></li>
<li><label className="flex items-center gap-2 cursor-pointer"><input className="form-checkbox text-primary border-outline focus:ring-primary rounded-sm h-4 w-4" type="checkbox" /><span className="font-body-md text-body-md text-on-surface-variant">Brightening</span></label></li>
<li><label className="flex items-center gap-2 cursor-pointer"><input className="form-checkbox text-primary border-outline focus:ring-primary rounded-sm h-4 w-4" type="checkbox" /><span className="font-body-md text-body-md text-on-surface-variant">Acne &amp; Pores</span></label></li>
</ul>
</div>
</div>
</aside>

<div className="flex-grow">

<div className="flex justify-between items-center mb-8 pb-4 border-b border-surface-variant">
<span className="font-body-md text-body-md text-on-surface-variant">Showing 24 Products</span>
<div className="flex items-center gap-4">
<span className="font-label-caps text-label-caps text-outline uppercase">Sort By:</span>
<select className="bg-transparent border-none font-body-md text-body-md text-primary focus:ring-0 cursor-pointer p-0 pr-6">
<option>Recommended</option>
<option>Price: High to Low</option>
<option>Price: Low to High</option>
<option>Newest Arrivals</option>
</select>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">

<div className="group flex flex-col h-full bg-surface-container-lowest p-4 rounded-xl border border-surface-variant transition-transform hover:-translate-y-1 duration-300">
<div className="relative w-full aspect-square mb-4 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
<img className="object-contain h-full w-full p-8 transition-transform duration-500 group-hover:scale-105" alt="A minimalist, high-end medical-grade serum bottle on a clean white background with soft, diffused lighting and a slight shadow. The aesthetic is clinical-luxury, with deep forest teal and champagne gold accents, embodying a spa-inspired atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHAPQjZJv8wms7bj-EvstzQCEjQaO7IJ3CAgvau1l6Fxz6oU30W1izWBE8KL1aTsVJRgcbb8DJdMiSopP0Azh9kDwG2OME2tiMWrQRecC4ybOAxDvIsGiWI7m7x4ygv6gQeE7rdJomDf9crHKIAGxhpNK9zYiAMj33xBgi_OhgjK2CfNvlDg_G02mkojyPlvriAGS-E-KoSvKwIcHopANAa7pEjvAAMPnDjhiBpAV7l9PBozfYmCBY" />
<div className="absolute top-2 left-2 bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-label-caps text-label-caps">Bestseller</div>
</div>
<div className="flex flex-col flex-grow">
<div className="flex items-center gap-1 mb-2 text-secondary-fixed-dim">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star_half</span>
<span className="font-body-md text-xs text-outline ml-1">(128)</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary mb-1">Molecular Hydration Serum</h3>
<p className="font-body-md text-sm text-on-surface-variant mb-4 flex-grow">Intensive HA formula for deep cellular hydration.</p>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-variant">
<span className="font-body-lg text-body-lg text-primary">AED 450</span>
<button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors group/btn">
<span className="material-symbols-outlined group-hover/btn:scale-110 transition-transform">add</span>
</button>
</div>
</div>
</div>

<div className="group flex flex-col h-full bg-surface-container-lowest p-4 rounded-xl border border-surface-variant transition-transform hover:-translate-y-1 duration-300">
<div className="relative w-full aspect-square mb-4 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
<img className="object-contain h-full w-full p-8 transition-transform duration-500 group-hover:scale-105" alt="A sleek, sophisticated jar of anti-aging night cream on a minimal marble plinth. Soft, directional light creates a pristine, clinical-luxury feel. The overall color palette is light and airy with deep teal typography accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrK4M5jGzseqiRa5M8093KzcbEy7zhb1pHmbYS_3w3T7oPmSFrtyi0d9kfIdKcUk57vhIf_vhKDheMIpVh6BVhEz7IlvD1B1wFyKMEkEVX55ILX9besMu1x0V96O83KO2hzemwPZAfSOIe44hTlClsAHloC8gVsiDXZPk-xOmkPUhNarZsfg--g64Qzuklg6Y5OEGtaWB9k5wQk2KCUThuXXm8utZ7ATW_JtGQAXEeaeNYbZheLzJU" />
</div>
<div className="flex flex-col flex-grow">
<div className="flex items-center gap-1 mb-2 text-secondary-fixed-dim">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="font-body-md text-xs text-outline ml-1">(84)</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary mb-1">Cellular Renewal Cream</h3>
<p className="font-body-md text-sm text-on-surface-variant mb-4 flex-grow">Nighttime barrier repair and peptide complex.</p>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-variant">
<span className="font-body-lg text-body-lg text-primary">AED 680</span>
<button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors group/btn">
<span className="material-symbols-outlined group-hover/btn:scale-110 transition-transform">add</span>
</button>
</div>
</div>
</div>

<div className="group flex flex-col h-full bg-surface-container-lowest p-4 rounded-xl border border-surface-variant transition-transform hover:-translate-y-1 duration-300">
<div className="relative w-full aspect-square mb-4 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
<img className="object-contain h-full w-full p-8 transition-transform duration-500 group-hover:scale-105" alt="A minimal white tube of SPF 50 sunscreen standing upright against a pristine, soft-focus background. The lighting is bright and airy, reflecting a clinical yet luxurious spa aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD20O3n5fZn7-5LDqH-if0QhHjd1xtePG_WCqD7Ia46cU0OvYWd0NSuF4JhCJkPo1bYqXGtFclyaFNb1BvOo7gawjDX0OOu212aToIlVUYRqZ9MCOneCdi1nmSsXy9cMTl2FPVHrrY_75EDsZW9XuVzA0gcwH2TvX_7hEYUCF10cThZyagNp4n-tpulvaQrJFbPWnnZtVQYvGSevBPkpqm9jCJRpHQc_Q0Wg4dAIMU6dhKF2x3g-qvE" />
</div>
<div className="flex flex-col flex-grow">
<div className="flex items-center gap-1 mb-2 text-secondary-fixed-dim">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-[16px]">star</span>
<span className="font-body-md text-xs text-outline ml-1">(42)</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary mb-1">Advanced UV Defense SPF 50</h3>
<p className="font-body-md text-sm text-on-surface-variant mb-4 flex-grow">Invisible, weightless protection for post-procedure skin.</p>
<div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-variant">
<span className="font-body-lg text-body-lg text-primary">AED 210</span>
<button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors group/btn">
<span className="material-symbols-outlined group-hover/btn:scale-110 transition-transform">add</span>
</button>
</div>
</div>
</div>
</div>

<div className="flex justify-center mt-12 gap-2">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
<button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-on-primary font-body-md">1</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors font-body-md">2</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors font-body-md">3</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
</div>


    </>
  );
}
