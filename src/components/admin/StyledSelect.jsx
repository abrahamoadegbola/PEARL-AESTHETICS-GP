// A consistently-styled <select> for the admin panel - native browser
// selects look inconsistent across platforms and don't match the site's
// design language. This keeps the real <select> (full keyboard/a11y
// support, native mobile picker) but restyles it: a custom chevron
// replaces the default arrow, and selectClassName lets callers swap in
// their own colors (e.g. status pills) while keeping that same chevron.
export default function StyledSelect({
  value,
  onChange,
  options,
  className = "",
  selectClassName = "w-full pl-3 pr-9 py-2 rounded-lg border border-outline-variant bg-surface text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors cursor-pointer",
  chevronClassName = "text-outline",
  ...props
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <select value={value} onChange={onChange} className={`appearance-none ${selectClassName}`} {...props}>
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
      <span
        className={`material-symbols-outlined pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[18px] ${chevronClassName}`}
      >
        expand_more
      </span>
    </div>
  );
}
