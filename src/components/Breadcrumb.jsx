import { Link } from "react-router-dom";

// Shared breadcrumb. `trail` is [{ label, to }] with the current page last
// (and no `to`), so every page renders the same separator, casing and colours.
export default function Breadcrumb({ trail, tone = "light" }) {
  const dark = tone === "dark";

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={`flex flex-wrap items-center gap-1.5 font-label-caps text-label-caps uppercase tracking-widest ${
          dark ? "text-on-primary/60" : "text-on-surface-variant"
        }`}
      >
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              {crumb.to && !last ? (
                <Link
                  to={crumb.to}
                  className={`transition-colors ${dark ? "hover:text-on-primary" : "hover:text-primary"}`}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={dark ? "text-on-primary" : "text-primary"}>
                  {crumb.label}
                </span>
              )}
              {!last && <span className="material-symbols-outlined text-[14px] opacity-50">chevron_right</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
