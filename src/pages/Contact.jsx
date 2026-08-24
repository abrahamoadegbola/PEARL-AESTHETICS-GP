import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <>


<section className="w-full px-gutter pt-section-padding-mobile pb-section-padding-mobile md:pt-section-padding-desktop md:pb-24 max-w-container-max mx-auto">
<div className="text-center max-w-3xl mx-auto space-y-6">
<h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary">Get in Touch</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">We invite you to our Dubai clinic for a consultation. Our aesthetic specialists are ready to guide you towards your refined vision.</p>
</div>
</section>

<section className="w-full px-gutter pb-section-padding-mobile md:pb-section-padding-desktop max-w-container-max mx-auto">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

<div className="space-y-12">

<div className="w-full h-64 md:h-80 bg-surface-container rounded-lg overflow-hidden relative group">
<img className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out" alt="A stylized, high-end, minimalistic map of the Jumeirah area in Dubai, United Arab Emirates. The map uses a muted color palette of light beiges, warm greys, and subtle teal accents to match a clinical-luxury aesthetic. Roads are clean and refined, avoiding clutter. A discreet gold pin marks a location near the coast. Bright, natural daylight illumination style." data-location="Jumeirah, Dubai" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLh8OSVkHfvx8PpCrscztDOhQkbjGEJtghBQ8rCFjWoFQ63ulsi2P-gwehZLGzx-qOM0qPzkFzDFUjl-LiMs3afbT-VSoH9JyE4h2cz2DH_439nIj4SygH6yUmTjeVDnW4CvNmlUuj-Z_7hVKDaQSVgFi8w558XAe6PECQ9QgB4DqnrB81fSzFjyyuLT2nex56WQ74uhvXgbfImE35iR61cy5QUWRiE6WFtJzotadCZLi5891af3l7" />
</div>
<div className="space-y-8">
<div>
<h3 className="font-headline-sm text-headline-sm text-primary mb-4">AESTHETICA Dubai</h3>
<p className="font-body-md text-body-md text-on-surface-variant flex items-start gap-3">
<span className="material-symbols-outlined mt-1 text-outline">location_on</span>
                                Villa 14, Al Wasl Road,<br />Jumeirah 1, Dubai, UAE<br />PO Box 12345
                            </p>
</div>
<div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-3 mb-2">
<span className="material-symbols-outlined text-outline">call</span>
                                +971 4 555 0123
                            </p>
<a className="inline-flex items-center gap-2 font-label-caps text-label-caps text-on-primary bg-primary px-5 py-2.5 rounded hover:bg-on-primary-fixed-variant transition-colors mt-2" href="#">
<span className="material-symbols-outlined text-[16px]">chat</span>
                                Message on WhatsApp
                            </a>
</div>
<div className="bg-surface rounded-lg p-6 border border-surface-variant">
<h4 className="font-label-caps text-label-caps text-outline mb-4">Opening Hours</h4>
<ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
<li className="flex justify-between"><span>Monday - Thursday</span> <span>9:00 AM - 8:00 PM</span></li>
<li className="flex justify-between border-t border-surface-variant pt-3"><span>Friday - Saturday</span> <span>10:00 AM - 6:00 PM</span></li>
<li className="flex justify-between border-t border-surface-variant pt-3 text-outline"><span>Sunday</span> <span>Closed</span></li>
</ul>
</div>
</div>
</div>

<div className="bg-surface p-8 md:p-12 rounded-xl border border-surface-variant shadow-[0_32px_64px_rgba(0,35,28,0.04)]">
<h3 className="font-headline-md text-headline-md text-primary mb-2">Enquire Now</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-8">Please fill out the form below and our patient care team will contact you shortly.</p>
<form className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="font-label-caps text-label-caps text-on-surface" htmlFor="firstName">First Name</label>
<input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder-outline transition-colors" id="firstName" placeholder="Jane" type="text" />
</div>
<div className="space-y-2">
<label className="font-label-caps text-label-caps text-on-surface" htmlFor="lastName">Last Name</label>
<input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder-outline transition-colors" id="lastName" placeholder="Doe" type="text" />
</div>
</div>
<div className="space-y-2">
<label className="font-label-caps text-label-caps text-on-surface" htmlFor="email">Email Address</label>
<input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder-outline transition-colors" id="email" placeholder="jane@example.com" type="email" />
</div>
<div className="space-y-2">
<label className="font-label-caps text-label-caps text-on-surface" htmlFor="phone">Phone Number</label>
<input className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder-outline transition-colors" id="phone" placeholder="+971 50 000 0000" type="tel" />
</div>
<div className="space-y-2">
<label className="font-label-caps text-label-caps text-on-surface" htmlFor="interest">Treatment Interest</label>
<select defaultValue="" className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors" id="interest">
<option disabled value="">Select an area of interest</option>
<option value="injectables">Injectables &amp; Fillers</option>
<option value="laser">Laser Treatments</option>
<option value="skin">Skin Rejuvenation</option>
<option value="surgery">Plastic Surgery Consultation</option>
<option value="other">Other / Not Sure</option>
</select>
</div>
<div className="space-y-2">
<label className="font-label-caps text-label-caps text-on-surface" htmlFor="message">Message (Optional)</label>
<textarea className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder-outline transition-colors resize-none" id="message" placeholder="How can we assist you?" rows="4"></textarea>
</div>
<button className="w-full bg-secondary-container text-on-secondary-container font-label-caps text-label-caps py-4 rounded hover:bg-secondary-fixed transition-colors mt-4" type="submit">
                            Submit Enquiry
                        </button>
</form>
</div>
</div>
</section>

<section className="w-full bg-primary text-on-primary py-20 px-gutter">
<div className="max-w-container-max mx-auto text-center space-y-8 flex flex-col items-center">
<h2 className="font-headline-md text-headline-md md:font-display-lg md:text-display-lg max-w-2xl">Begin Your Aesthetic Journey</h2>
<p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-xl">Schedule a private consultation with our specialists to discuss your tailored treatment plan.</p>
<Link to="/book-consultation" className="bg-secondary-container text-on-secondary-container font-label-caps text-label-caps px-8 py-4 rounded hover:bg-secondary-fixed transition-colors hover:scale-105 duration-300">Book an Appointment
                </Link>
</div>
</section>


    </>
  );
}
