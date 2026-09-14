import { Link } from "react-router-dom";
import BUSINESS from "../data/business";
import Reveal from "./motion/Reveal";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-on-primary pt-section-padding-desktop pb-24 md:pb-section-padding-desktop mt-auto">
      <div className="max-w-container-max mx-auto px-gutter">
        <Reveal className="mb-20 max-w-2xl" as="div">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] opacity-60 mb-4 block">
            {BUSINESS.address.line2} · {BUSINESS.address.city}
          </span>
          <span className="font-display-lg text-display-lg-mobile md:text-display-lg block mb-6">
            {BUSINESS.name}
          </span>
          <p className="font-body-lg text-body-lg opacity-70 max-w-lg">{BUSINESS.description}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-20">
          <div className="md:col-span-3">
            <span className="font-label-caps text-label-caps opacity-50 uppercase tracking-widest mb-5 block">
              Explore
            </span>
            <div className="flex flex-col gap-3">
              <Link className="font-body-md text-body-md opacity-80 hover:opacity-100 hover:text-secondary-container transition-all duration-300" to="/treatments">
                Treatments
              </Link>
              <Link className="font-body-md text-body-md opacity-80 hover:opacity-100 hover:text-secondary-container transition-all duration-300" to="/doctors">
                Our Doctors
              </Link>
              <Link className="font-body-md text-body-md opacity-80 hover:opacity-100 hover:text-secondary-container transition-all duration-300" to="/shop">
                Boutique
              </Link>
              <Link className="font-body-md text-body-md opacity-80 hover:opacity-100 hover:text-secondary-container transition-all duration-300" to="/results">
                Results
              </Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <span className="font-label-caps text-label-caps opacity-50 uppercase tracking-widest mb-5 block">
              Legal
            </span>
            <div className="flex flex-col gap-3">
              <a className="font-body-md text-body-md opacity-80 hover:opacity-100 hover:text-secondary-container transition-all duration-300" href="#">
                Privacy Policy
              </a>
              <a className="font-body-md text-body-md opacity-80 hover:opacity-100 hover:text-secondary-container transition-all duration-300" href="#">
                Terms of Service
              </a>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <span className="font-label-caps text-label-caps opacity-50 uppercase tracking-widest mb-5 block">
              Get in Touch
            </span>
            <div className="flex flex-col gap-3">
              <a className="font-body-md text-body-md opacity-80 hover:opacity-100 hover:text-secondary-container transition-all duration-300" href={BUSINESS.phones[0].href}>
                {BUSINESS.phones[0].number}
              </a>
              <a className="font-body-md text-body-md opacity-80 hover:opacity-100 hover:text-secondary-container transition-all duration-300" href={BUSINESS.phones[1].href}>
                {BUSINESS.phones[1].number}
              </a>
              <span className="font-body-md text-body-md opacity-80">{BUSINESS.address.full}</span>
              <Link className="font-body-md text-body-md opacity-80 hover:opacity-100 hover:text-secondary-container transition-all duration-300 inline-flex items-center gap-1 group" to="/contact">
                Contact Us
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-on-primary/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="font-body-md text-sm opacity-60 max-w-2xl">
            © {BUSINESS.copyrightYear} {BUSINESS.name}. All rights reserved. Medical disclaimer:{" "}
            {BUSINESS.medicalDisclaimer}
          </p>
          <Link
            to="/admin"
            className="font-label-caps text-label-caps opacity-40 hover:opacity-100 transition-opacity flex-shrink-0"
          >
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
