import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-section-padding-desktop mt-auto bg-surface-container-highest pb-24 md:pb-section-padding-desktop">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-gutter max-w-container-max mx-auto">
        <div className="md:col-span-4 flex flex-col items-start mb-12 md:mb-0">
          <span className="font-display-lg text-headline-md text-primary mb-4">AESTHETICA</span>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80 max-w-xs mb-8">
            Precision Medicine. Boutique Experience. Redefining aesthetic treatments with clinical
            excellence.
          </p>
          <div className="flex gap-4">
            <a
              className="text-on-surface-variant opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors duration-300 ease-in-out"
              href="#"
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
            <a
              className="text-on-surface-variant opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors duration-300 ease-in-out"
              href="#"
            >
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col md:flex-row justify-end gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-label-caps text-primary font-semibold uppercase tracking-widest mb-2">
              Explore
            </span>
            <Link
              className="font-body-md text-body-md text-on-surface-variant opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors duration-300 ease-in-out"
              to="/treatments"
            >
              Treatments
            </Link>
            <Link
              className="font-body-md text-body-md text-on-surface-variant opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors duration-300 ease-in-out"
              to="/results"
            >
              Results Gallery
            </Link>
            <Link
              className="font-body-md text-body-md text-on-surface-variant opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors duration-300 ease-in-out"
              to="/shop"
            >
              Shop
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-label-caps text-primary font-semibold uppercase tracking-widest mb-2">
              Legal
            </span>
            <a
              className="font-body-md text-body-md text-on-surface-variant opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors duration-300 ease-in-out"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-body-md text-body-md text-on-surface-variant opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors duration-300 ease-in-out"
              href="#"
            >
              Terms of Service
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-label-caps text-label-caps text-primary font-semibold uppercase tracking-widest mb-2">
              Connect
            </span>
            <Link
              className="font-body-md text-body-md text-on-surface-variant opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors duration-300 ease-in-out"
              to="/contact"
            >
              Contact Us
            </Link>
            <a
              className="font-body-md text-body-md text-on-surface-variant opacity-80 hover:opacity-100 hover:text-secondary-container transition-colors duration-300 ease-in-out"
              href="#"
            >
              Our Location
            </a>
          </div>
        </div>

        <div className="col-span-1 md:col-span-12 mt-16 pt-8 border-t border-surface-variant text-center md:text-left">
          <p className="font-body-md text-body-md text-on-surface-variant opacity-80">
            © 2026 AESTHETICA Medical Clinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
