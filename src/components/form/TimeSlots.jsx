// Appointment times as tappable slots instead of a free-form time input -
// patients can only pick times the clinic is actually open (8AM-10PM, last
// slot 9:30PM), and today's slots that have already passed are greyed out.
// Value stays the native input's "HH:MM" 24-hour string.

const GROUPS = [
  { label: "Morning", icon: "wb_twilight", from: 8, to: 12 },
  { label: "Afternoon", icon: "light_mode", from: 12, to: 17 },
  { label: "Evening", icon: "dark_mode", from: 17, to: 22 },
];

// Minimum notice for a same-day booking.
const LEAD_MINUTES = 60;

// "14:30" -> "2:30 PM"
export function formatTime(value) {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

function slotsBetween(from, to) {
  const out = [];
  for (let h = from; h < to; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`, `${String(h).padStart(2, "0")}:30`);
  }
  return out;
}

export default function TimeSlots({ value, onChange, date }) {
  const now = new Date();
  const isToday = date && date === `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const cutoff = now.getHours() * 60 + now.getMinutes() + LEAD_MINUTES;

  if (!date) {
    return (
      <div className="h-full min-h-[12rem] rounded-2xl border border-dashed border-outline-variant/70 flex flex-col items-center justify-center text-center p-8 text-on-surface-variant">
        <span className="material-symbols-outlined text-primary/50 text-4xl mb-3">event</span>
        <p className="font-body-md text-body-md">Choose a date first to see available times.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {GROUPS.map((group) => {
        const slots = slotsBetween(group.from, group.to);
        return (
          <div key={group.label}>
            <p className="flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-3">
              <span className="material-symbols-outlined text-[18px] text-secondary">{group.icon}</span>
              {group.label}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot) => {
                const [h, m] = slot.split(":").map(Number);
                const past = isToday && h * 60 + m < cutoff;
                const selected = value === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={past}
                    onClick={() => onChange(slot)}
                    aria-pressed={selected}
                    className={`py-2.5 rounded-full border font-body-md text-sm transition-all duration-200 ${
                      selected
                        ? "bg-primary border-primary text-on-primary shadow-md shadow-primary/25"
                        : past
                          ? "border-outline-variant/30 text-outline-variant line-through cursor-not-allowed"
                          : "border-outline-variant/60 text-on-surface bg-surface-container-lowest hover:border-primary hover:text-primary active:scale-95"
                    }`}
                  >
                    {formatTime(slot)}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
