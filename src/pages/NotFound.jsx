import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-container-max mx-auto px-gutter py-section-padding-desktop text-center">
      <h1 className="font-display-lg text-display-lg text-primary mb-4">404</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
        We couldn't find the page you were looking for.
      </p>
      <Link
        to="/"
        className="inline-flex bg-primary text-on-primary px-8 py-4 rounded hover:bg-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest"
      >
        Back to Home
      </Link>
    </div>
  );
}
