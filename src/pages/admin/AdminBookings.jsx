import { useState } from "react";
import useDbCollection from "../../hooks/useDbCollection";
import { getBookings, updateBooking, deleteBooking } from "../../lib/db";
import { buildWhatsAppLink, bookingWhatsAppMessage } from "../../lib/whatsapp";
import SupabaseSetupNotice from "../../components/SupabaseSetupNotice";
import StyledSelect from "../../components/admin/StyledSelect";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

const statusStyles = {
  pending: "bg-secondary-container text-on-secondary-container",
  confirmed: "bg-primary-fixed text-on-primary-fixed",
  completed: "bg-surface-container-high text-on-surface",
  cancelled: "bg-error-container text-on-error-container",
};

export default function AdminBookings() {
  const [bookings] = useDbCollection(getBookings);
  const [filter, setFilter] = useState("all");

  const visible = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      <SupabaseSetupNotice />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-headline-md text-primary mb-1">Bookings</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Consultation requests submitted through the site.
          </p>
        </div>
        <StyledSelect
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          options={[{ value: "all", label: "All statuses" }, ...STATUSES.map((s) => ({ value: s, label: s[0].toUpperCase() + s.slice(1) }))]}
        />
      </div>

      {visible.length === 0 ? (
        <p className="text-on-surface-variant font-body-md py-16 text-center">No bookings found.</p>
      ) : (
        <div className="bg-surface border border-outline-variant/30 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-outline-variant/30 font-label-caps text-label-caps text-outline uppercase">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Date / Time</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((b) => (
                <tr key={b.id} className="border-b border-outline-variant/20 last:border-0 align-top">
                  <td className="px-4 py-3">
                    <p className="text-primary font-medium">{b.name}</p>
                    <p className="text-xs text-on-surface-variant">{b.id}</p>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{b.category}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{b.doctor || "—"}</td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {b.date} {b.time}
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    <p>{b.email}</p>
                    <p>{b.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StyledSelect
                      value={b.status}
                      onChange={(e) => updateBooking(b.id, { status: e.target.value }).catch((err) => alert(err.message))}
                      options={STATUSES.map((s) => ({ value: s, label: s }))}
                      selectClassName={`pl-2 pr-7 py-1 rounded text-xs font-label-caps uppercase tracking-wide border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 ${statusStyles[b.status]}`}
                      chevronClassName="text-[16px] text-current opacity-70"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <a
                        href={buildWhatsAppLink(bookingWhatsAppMessage(b))}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:text-surface-tint"
                        title="Message on WhatsApp"
                      >
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                      </a>
                      <button
                        onClick={() => {
                          if (window.confirm("Delete this booking?")) deleteBooking(b.id).catch((err) => alert(err.message));
                        }}
                        className="text-outline hover:text-error"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
