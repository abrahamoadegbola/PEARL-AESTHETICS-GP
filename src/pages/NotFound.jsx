import { Link } from "react-router-dom";
import Reveal from "../components/motion/Reveal";

export default function NotFound() {
  return (
    <Reveal as="div" className="max-w-container-max mx-auto px-gutter py-section-padding-desktop text-center">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.3em] mb-6 block">
        Error 404
      </span>
      <h1
        className="font-display-lg text-primary mb-6"
        style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
      >
        This page doesn't exist
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md mx-auto">
        The page you were looking for has moved, or was never here in the first place.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex justify-center items-center bg-primary text-on-primary px-8 py-4 rounded hover:bg-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest active:scale-[0.98]"
        >
          Back to Home
        </Link>
        <Link
          to="/treatments"
          className="inline-flex justify-center items-center border border-primary text-primary px-8 py-4 rounded hover:bg-surface-container transition-colors font-label-caps text-label-caps uppercase tracking-widest active:scale-[0.98]"
        >
          Browse Treatments
        </Link>
      </div>
    </Reveal>
  );
}
