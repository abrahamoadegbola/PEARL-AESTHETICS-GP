// Text field with an icon and a label that floats up out of the way once
// the field is focused or filled. Shared by booking, checkout and anywhere
// else a form needs to look like part of the site rather than a browser
// default. Pass `multiline` for a textarea.
export default function Field({ id, label, icon, multiline = false, className = "", optional = false, ...inputProps }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className={`relative group ${className}`}>
      {icon && (
        <span
          className={`material-symbols-outlined absolute left-4 text-[20px] text-outline group-focus-within:text-primary transition-colors pointer-events-none ${
            multiline ? "top-4" : "top-1/2 -translate-y-1/2"
          }`}
        >
          {icon}
        </span>
      )}
      <Tag
        id={id}
        name={id}
        placeholder=" "
        className={`peer w-full rounded-xl border border-outline-variant/70 bg-surface-container-lowest ${
          icon ? "pl-12" : "pl-4"
        } pr-4 pt-6 pb-2 font-body-md text-body-md text-on-surface shadow-sm transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none ${
          multiline ? "min-h-[7rem] resize-none" : "h-14"
        }`}
        {...inputProps}
      />
      <label
        htmlFor={id}
        className={`absolute ${icon ? "left-12" : "left-4"} top-2 font-label-caps text-[11px] uppercase tracking-widest text-outline transition-all pointer-events-none
          peer-placeholder-shown:text-[15px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-body-md ${
            multiline ? "peer-placeholder-shown:top-4" : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
          }
          peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-label-caps peer-focus:text-primary`}
      >
        {label}
        {optional && <span className="opacity-60"> (optional)</span>}
      </label>
    </div>
  );
}
