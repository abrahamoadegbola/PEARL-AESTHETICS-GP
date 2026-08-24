export default function ProductDetail() {
  return (
    <>


<nav className="mb-8 hidden md:block animate-fade-up" style={{animationDelay: "0.1s"}}>
<ol className="flex items-center space-x-2 font-label-caps text-label-caps text-on-surface-variant">
<li><a className="hover:text-primary transition-colors" href="#">HOME</a></li>
<li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
<li><a className="hover:text-primary transition-colors" href="#">SHOP</a></li>
<li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
<li><a className="hover:text-primary transition-colors" href="#">SKINCARE</a></li>
<li><span className="material-symbols-outlined text-[14px]">chevron_right</span></li>
<li className="text-primary">MOLECULAR HYDRATION SERUM</li>
</ol>
</nav>
<div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16 lg:gap-x-24">

<div className="md:col-span-6 lg:col-span-7 flex flex-col md:flex-row-reverse gap-4 animate-fade-up" style={{animationDelay: "0.2s"}}>

<div className="w-full bg-surface-container-low relative group cursor-crosshair">
<div className="aspect-[4/5] overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" alt="A meticulously lit, high-end studio shot of a luxurious frosted glass skincare serum bottle with a metallic champagne gold dropper. The bottle rests on a sleek, pristine white marble block against a soft, diffused light-mode aesthetic background. The lighting highlights the clinical purity and premium nature of the product, with subtle reflections and a clean, minimalist environment." id="mainImage" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmZwngJUdv48X73LeYR7phOL0BHK7mhIzgHrVsXoLU6U4rBE3FH2Lxk0QHSEcT5tK_cwywni-bLEtGI7C0EIQT0pQpPz9oXKENKaTo-q_WsUPFi5rEjGrKvM1riqjilvq02D89jVP2staUqJBUdMQzT1a1-I4ISERXCsTybeMGc1lxsY2dJhWk1TZpBIC_6a0z-Ui5xqSX2YgXT7X3W-obQSPjnOummYDg98doFaJ6MULW_4Yk9Bqm" />
</div>

<div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur px-3 py-1 text-label-caps text-on-surface-variant hidden md:flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-[14px]">zoom_in</span>
<span>HOVER TO ZOOM</span>
</div>
</div>

<div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-visible hide-scrollbar md:w-24 shrink-0">
<button className="w-20 h-24 md:w-full md:h-32 shrink-0 border border-primary relative overflow-hidden focus:outline-none thumbnail-btn">
<img className="w-full h-full object-cover" alt="Close up detail of the frosted glass texture and metallic dropper of a luxury skincare serum bottle. Soft, high-key lighting emphasizing the pristine, clinical-luxury aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzxHSitN3zWbVW0kd7FtN8-KFgzRNqmw46189Slxoer7yK-Uxr__4L1u2M3O3puOKJwFNHHAY51m-JLIq2TDi-bqzAVhPznsxUlq4JQleRfbzMpWFBF3QlQ7ngCl21nSPOmzl_Jmpy2aehAY3afQT5DCVnc6CLN0PgS5hrz2SIwou78qfV3KbgMvsumFP7pDhZ0hKZFvAuZzKiwunWu4s_ZA0sf228JISWPqG1ZacyBWjvGM34bXoe" />
<div className="absolute inset-0 bg-primary/0 transition-colors"></div>
</button>
<button className="w-20 h-24 md:w-full md:h-32 shrink-0 border border-transparent hover:border-primary/30 relative overflow-hidden focus:outline-none thumbnail-btn transition-colors">
<img className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" alt="The luxury skincare serum bottle presented alongside its premium, minimalist cardboard outer packaging. The setting is clean, bright, and airy, reflecting a high-end medical spa environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgc93bHeBN2C6XwqxTf1XWtZOjZZPtIgiux9Nq_g3awkPC8PRQTQvrokH6fptS04UUD-YKu-TGWzNaBQTo9PNIW2-GbYfat861Gh1s2xeR1nPWgEMkp1bFhZMnPCDb2D3Q9F4ylMrxL6duHRSMF1jPJ9x2vkuJnBNhs4JY_05lPpkpW6k6xRcmU6cAF3yrLeATXamsrwKdMuIA2R38RvlERs-k5CYGVoe1-b_klf5dq0t75AnrRza5" />
</button>
<button className="w-20 h-24 md:w-full md:h-32 shrink-0 border border-transparent hover:border-primary/30 relative overflow-hidden focus:outline-none thumbnail-btn transition-colors">
<img className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" alt="A smear or dollop of clear, viscous skincare serum on a sterile white surface, demonstrating the product's texture. Macro photography, bright lighting, emphasizing hydration and purity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI9NNM4y1m4-can-39H93e1z6f3_QSxGH9SiXfBSsX9Rri0ZzeXEeRNOILp4kw-BluLOL45_ZtBlV95Jp2Y6Qa0tHydUhUxQm-YPykGsmA_oheqYXio3TZzOHC2oc6zlN8I-0Ho-vkeGN0jiwAiYQSQie6s1_-ZZbsxiPlb_dTrCd9nn2X5OUo8BHHTYNRYIlX4Q1rKFWp_CAxo1tz500PHiH5dLNhBcQoOtPO0Y_L4UftYWQBtqOW" />
</button>
<button className="w-20 h-24 md:w-full md:h-32 shrink-0 border border-transparent hover:border-primary/30 relative overflow-hidden focus:outline-none thumbnail-btn transition-colors">
<img className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" alt="A lifestyle shot of a woman with glowing, flawless skin applying the luxury serum in a sunlit, modern bathroom with marble accents. The mood is serene, clean, and aspirational." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBrMX-dMU9NdYVjv_1u2_FJYWYAIWT6oRqbn89eIVYpfYG0RGHLUjXc7s1sXoXn8NeYJfRWBprRbSwnq6MqLbdpIPVOQ0STXGMFlbjrtxXVqnxHpNffn3ha-de0tFiFgaMcCqYvF6lyi4KTQpQb8OuDN-85Mwh8GVueVkkZ4NtGKJay_BO4bVVV5ua8CfaENc9E8YF5Uop2yKALpxQOwQPjAXtbuOr7bzNXnjHlVkuwPyq23TI8JO9" />
</button>
</div>
</div>

<div className="md:col-span-6 lg:col-span-5 flex flex-col animate-fade-up" style={{animationDelay: "0.3s"}}>

<div className="mb-6">
<span className="inline-block px-3 py-1 bg-surface-container text-on-surface-variant font-label-caps text-label-caps tracking-widest mb-4">CLINICAL GRADE FORMULA</span>
<h1 className="font-headline-md md:font-display-lg text-headline-md md:text-display-lg text-primary mb-2">Molecular Hydration Serum</h1>

<div className="flex items-center space-x-2 mb-4">
<div className="flex text-secondary-fixed-dim">
<span className="material-symbols-outlined fill text-[18px]">star</span>
<span className="material-symbols-outlined fill text-[18px]">star</span>
<span className="material-symbols-outlined fill text-[18px]">star</span>
<span className="material-symbols-outlined fill text-[18px]">star</span>
<span className="material-symbols-outlined text-[18px]">star_half</span>
</div>
<span className="text-body-md text-on-surface-variant font-body-md underline decoration-1 underline-offset-4 cursor-pointer hover:text-primary transition-colors">128 Reviews</span>
</div>
<div className="font-headline-sm text-headline-sm text-primary">AED 450</div>
</div>

<div className="prose prose-p:text-body-md prose-p:font-body-md prose-p:text-on-surface-variant prose-p:leading-relaxed mb-8">
<p>
                        Engineered with multi-weight hyaluronic acid and active bio-peptides, this intensive treatment penetrates deeply to restore cellular moisture networks. Formulated in our clinical labs to deliver instant plumping and long-term barrier repair for a visibly refined, resilient complexion.
                    </p>
</div>

<div className="grid grid-cols-2 gap-4 mb-8">
<div className="bg-surface-container-low p-4 border border-outline-variant/30">
<span className="block font-label-caps text-label-caps text-on-surface-variant mb-1">ACTIVE 01</span>
<span className="block font-body-md font-medium text-primary">2% Multi-Molecular HA</span>
</div>
<div className="bg-surface-container-low p-4 border border-outline-variant/30">
<span className="block font-label-caps text-label-caps text-on-surface-variant mb-1">ACTIVE 02</span>
<span className="block font-body-md font-medium text-primary">Ceramide Complex</span>
</div>
</div>

<div className="space-y-4 mb-12">

<div className="flex space-x-4">

<div className="flex items-center border border-outline-variant bg-surface w-32 justify-between">
<button aria-label="Decrease quantity" className="p-3 text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
<span className="material-symbols-outlined text-[20px]">remove</span>
</button>
<span className="font-body-md text-primary">1</span>
<button aria-label="Increase quantity" className="p-3 text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
<span className="material-symbols-outlined text-[20px]">add</span>
</button>
</div>

<button className="flex-1 flex items-center justify-center px-6 border border-primary text-primary font-body-md hover:bg-primary hover:text-on-primary transition-all duration-300 group">
<span>Add to Cart</span>
<span className="material-symbols-outlined ml-2 text-[20px] group-hover:translate-x-1 transition-transform">shopping_bag</span>
</button>
</div>

<button className="w-full py-4 bg-secondary text-on-secondary font-body-md font-medium tracking-wide hover:bg-secondary/90 transition-colors active:scale-[0.99] duration-200 shadow-[0_8px_30px_rgba(115,92,0,0.15)]">
                        Buy Now - AED 450
                    </button>
</div>

<div className="border-t border-outline-variant/30">

<div className="border-b border-outline-variant/30 accordion-item">
<button className="w-full py-5 flex justify-between items-center focus:outline-none group">
<span className="font-headline-sm text-[18px] text-primary group-hover:opacity-80 transition-opacity">Clinical Benefits</span>
<span className="material-symbols-outlined text-on-surface-variant transition-transform duration-300 icon">add</span>
</button>
<div className="overflow-hidden max-h-0 transition-all duration-300 content">
<div className="pb-5 pt-2 text-body-md text-on-surface-variant leading-relaxed">
<ul className="list-disc pl-5 space-y-2">
<li>Instantly increases skin hydration levels by up to 140%.</li>
<li>Visibly plumps fine lines and smooths skin texture.</li>
<li>Strengthens the stratum corneum to prevent trans-epidermal water loss.</li>
<li>Non-comedogenic, fragrance-free, and suitable for post-procedure skin.</li>
</ul>
</div>
</div>
</div>

<div className="border-b border-outline-variant/30 accordion-item">
<button className="w-full py-5 flex justify-between items-center focus:outline-none group">
<span className="font-headline-sm text-[18px] text-primary group-hover:opacity-80 transition-opacity">How to Use</span>
<span className="material-symbols-outlined text-on-surface-variant transition-transform duration-300 icon">add</span>
</button>
<div className="overflow-hidden max-h-0 transition-all duration-300 content">
<div className="pb-5 pt-2 text-body-md text-on-surface-variant leading-relaxed">
                                Apply 3-4 drops to cleansed, slightly damp skin morning and evening. Press gently into the face, neck, and décolletage until fully absorbed. Follow with your recommended AESTHETICA moisturizer to seal in hydration. Avoid direct contact with eyes.
                            </div>
</div>
</div>

<div className="border-b border-outline-variant/30 accordion-item">
<button className="w-full py-5 flex justify-between items-center focus:outline-none group">
<span className="font-headline-sm text-[18px] text-primary group-hover:opacity-80 transition-opacity">Full Ingredients</span>
<span className="material-symbols-outlined text-on-surface-variant transition-transform duration-300 icon">add</span>
</button>
<div className="overflow-hidden max-h-0 transition-all duration-300 content">
<div className="pb-5 pt-2 text-label-caps font-normal text-on-surface-variant leading-relaxed lowercase tracking-normal">
                                Aqua/Water/Eau, Glycerin, Sodium Hyaluronate (Multi-Weight), Panthenol (Vitamin B5), Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Sodium Lauroyl Lactylate, Carbomer, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin, Sodium Hydroxide.
                            </div>
</div>
</div>
</div>
</div>
</div>


    </>
  );
}
