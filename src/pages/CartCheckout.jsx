export default function CartCheckout() {
  return (
    <div className="w-full max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop pt-8">


<div className="mb-12 md:mb-16 fade-in-up">
<h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-8 md:text-center">
                Secure Checkout
            </h1>

<div className="flex items-center justify-center max-w-lg mx-auto">
<div className="flex items-center text-primary">
<span className="w-8 h-8 rounded-full border border-primary flex items-center justify-center font-body-md text-body-md font-medium bg-primary text-on-primary">1</span>
<span className="ml-2 font-label-caps text-label-caps uppercase hidden sm:inline-block">Cart</span>
</div>
<div className="h-[1px] w-12 sm:w-24 bg-primary mx-4"></div>
<div className="flex items-center text-primary">
<span className="w-8 h-8 rounded-full border border-primary flex items-center justify-center font-body-md text-body-md font-medium">2</span>
<span className="ml-2 font-label-caps text-label-caps uppercase hidden sm:inline-block">Details</span>
</div>
<div className="h-[1px] w-12 sm:w-24 bg-outline-variant mx-4"></div>
<div className="flex items-center text-outline-variant">
<span className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center font-body-md text-body-md font-medium">3</span>
<span className="ml-2 font-label-caps text-label-caps uppercase hidden sm:inline-block">Payment</span>
</div>
</div>
</div>
<div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">

<div className="lg:col-span-7 xl:col-span-8 space-y-16 fade-in-up delay-100">

<section>
<h2 className="font-headline-sm text-headline-sm text-primary border-b border-outline-variant pb-4 mb-6">Your Items</h2>
<div className="space-y-8">

<div className="flex gap-6 group">
<div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A sleek, minimalist glass dropper bottle of clear facial serum standing on a pristine white marble surface. Soft, diffused, high-key studio lighting casts subtle, elegant reflections. The aesthetic is clinical-luxury, emphasizing purity, efficacy, and high-end medical skincare. The mood is calm and refined, with a stark white background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBQLIgghm1cYaMrdZ4t9BSj4zXVI5cMaE3jZIOx_osUsTlMo9Dkwy8I74QirHXycmYJWHsMsTZ0OARXA41c5suwPgg9q2tOYY_dUMImIPkSRPIzbb0ZTTSgaanN24osiwxbmhV_gSWLhgdhB0_12Ld2yJMtY3L4mG0qWtx9Dlb3-irlXg_RKQdCqj9-63OzRvcIeX63aBY3D2DmovpKlOgEXOlr9qfgA8LaEWX_dOrt92GATyjEbWz" />
</div>
<div className="flex flex-col flex-grow py-1">
<div className="flex justify-between items-start mb-1">
<div>
<h3 className="font-body-lg text-body-lg text-primary font-medium">Restorative Peptide Complex</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">30ml / Anti-Aging</p>
</div>
<span className="font-body-lg text-body-lg text-primary">$185.00</span>
</div>
<div className="mt-auto flex justify-between items-end">

<div className="flex items-center border border-outline-variant rounded-full px-3 py-1">
<button className="text-on-surface-variant hover:text-primary px-2 transition-colors"><span className="material-symbols-outlined text-[18px]">remove</span></button>
<span className="font-body-md text-body-md text-primary px-3">1</span>
<button className="text-on-surface-variant hover:text-primary px-2 transition-colors"><span className="material-symbols-outlined text-[18px]">add</span></button>
</div>
<button className="text-outline hover:text-error transition-colors flex items-center font-label-caps text-label-caps">
<span className="material-symbols-outlined text-[16px] mr-1">delete</span> Remove
                                    </button>
</div>
</div>
</div>

<div className="flex gap-6 group">
<div className="w-24 h-32 md:w-32 md:h-40 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="A premium, frosted white glass jar of dense hydrating night cream resting on a clean, light grey textured stone slab. The lighting is bright and airy, typical of a high-end medical spa. The composition is slightly asymmetrical, evoking a sense of calm, modern clinical elegance. Deep forest teal accents are subtly implied in the ambient shadow." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxAZi3YSEYUMPx0ACIH3AE4kD7FOkzypMjuUSUqZ-ESKM8qPCG_Sz0gMgYh_ZciMP_UQP466HgdbxhcsoXRLYYEyQ_bD_AiBF9tLnMc6GoyrGfkMkMMnSIdxzzwDK0wp1sXWYV7IB8gqtSFPcWHP4_kGXt4CdZQf6485WyMYGXdXoS1SzU-ozxqdt4siCJsAQhxWE2xGB6mp5SMS1IclpSftr31pI361s_4prHuNDUUXJsBQcjpc0R" />
</div>
<div className="flex flex-col flex-grow py-1">
<div className="flex justify-between items-start mb-1">
<div>
<h3 className="font-body-lg text-body-lg text-primary font-medium">Ceramide Barrier Shield</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">50ml / Hydration</p>
</div>
<span className="font-body-lg text-body-lg text-primary">$120.00</span>
</div>
<div className="mt-auto flex justify-between items-end">

<div className="flex items-center border border-outline-variant rounded-full px-3 py-1">
<button className="text-on-surface-variant hover:text-primary px-2 transition-colors"><span className="material-symbols-outlined text-[18px]">remove</span></button>
<span className="font-body-md text-body-md text-primary px-3">1</span>
<button className="text-on-surface-variant hover:text-primary px-2 transition-colors"><span className="material-symbols-outlined text-[18px]">add</span></button>
</div>
<button className="text-outline hover:text-error transition-colors flex items-center font-label-caps text-label-caps">
<span className="material-symbols-outlined text-[16px] mr-1">delete</span> Remove
                                    </button>
</div>
</div>
</div>
</div>
</section>

<section>
<h2 className="font-headline-sm text-headline-sm text-primary border-b border-outline-variant pb-4 mb-6">Shipping Details</h2>
<form className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="relative">
<input className="w-full bg-transparent border-0 border-b border-outline text-primary font-body-md text-body-md px-0 py-2 focus:ring-0 focus:border-primary transition-colors peer placeholder-transparent" id="firstName" placeholder="First Name" type="text" />
<label className="absolute left-0 top-2 text-outline-variant font-body-md text-body-md transition-all peer-focus:-top-4 peer-focus:text-[12px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:text-primary" htmlFor="firstName">First Name</label>
</div>
<div className="relative">
<input className="w-full bg-transparent border-0 border-b border-outline text-primary font-body-md text-body-md px-0 py-2 focus:ring-0 focus:border-primary transition-colors peer placeholder-transparent" id="lastName" placeholder="Last Name" type="text" />
<label className="absolute left-0 top-2 text-outline-variant font-body-md text-body-md transition-all peer-focus:-top-4 peer-focus:text-[12px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:text-primary" htmlFor="lastName">Last Name</label>
</div>
</div>
<div className="relative">
<input className="w-full bg-transparent border-0 border-b border-outline text-primary font-body-md text-body-md px-0 py-2 focus:ring-0 focus:border-primary transition-colors peer placeholder-transparent" id="email" placeholder="Email Address" type="email" />
<label className="absolute left-0 top-2 text-outline-variant font-body-md text-body-md transition-all peer-focus:-top-4 peer-focus:text-[12px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:text-primary" htmlFor="email">Email Address</label>
</div>
<div className="relative">
<input className="w-full bg-transparent border-0 border-b border-outline text-primary font-body-md text-body-md px-0 py-2 focus:ring-0 focus:border-primary transition-colors peer placeholder-transparent" id="address" placeholder="Shipping Address" type="text" />
<label className="absolute left-0 top-2 text-outline-variant font-body-md text-body-md transition-all peer-focus:-top-4 peer-focus:text-[12px] peer-focus:text-primary peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[12px] peer-not-placeholder-shown:text-primary" htmlFor="address">Shipping Address</label>
</div>
</form>
</section>
</div>

<div className="lg:col-span-5 xl:col-span-4 mt-12 lg:mt-0 fade-in-up delay-200">
<div className="bg-surface-container/40 rounded-xl p-8 sticky top-32 border border-surface-dim backdrop-blur-sm">
<h2 className="font-headline-sm text-headline-sm text-primary mb-6">Order Summary</h2>
<div className="space-y-4 mb-6 font-body-md text-body-md">
<div className="flex justify-between text-on-surface-variant">
<span>Subtotal (2 items)</span>
<span>$305.00</span>
</div>
<div className="flex justify-between text-on-surface-variant">
<span>Shipping</span>
<span>Calculated next step</span>
</div>
<div className="flex justify-between text-on-surface-variant">
<span>Tax</span>
<span>$24.40</span>
</div>
</div>
<div className="border-t border-outline-variant pt-4 mb-8">
<div className="flex justify-between items-end">
<span className="font-body-lg text-body-lg text-primary">Estimated Total</span>
<span className="font-headline-md text-headline-md text-primary tracking-tight">$329.40</span>
</div>
</div>
<button className="w-full bg-secondary-container text-on-secondary-container hover:bg-[#ebc44d] font-body-md text-body-md font-medium py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-[0_8px_32px_-8px_rgba(254,214,91,0.3)] mb-6 flex justify-center items-center">
                        Continue to Payment
                        <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
</button>

<div className="flex flex-col items-center border-t border-outline-variant/50 pt-6">
<p className="font-label-caps text-label-caps text-outline mb-4">Secure Payment Guaranteed</p>
<div className="flex space-x-4 text-outline-variant">
<span className="material-symbols-outlined text-[32px]" style={{fontVariationSettings: "'wght' 200"}}>lock</span>
<span className="material-symbols-outlined text-[32px]" style={{fontVariationSettings: "'wght' 200"}}>verified_user</span>
<span className="material-symbols-outlined text-[32px]" style={{fontVariationSettings: "'wght' 200"}}>credit_card</span>
</div>
</div>
</div>
</div>
</div>


    </div>
  );
}
