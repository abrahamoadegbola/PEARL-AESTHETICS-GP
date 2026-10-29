import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { manageStaff } from "../../lib/api";
import SupabaseSetupNotice from "../../components/SupabaseSetupNotice";

const inputClass =
  "w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors";

const statusStyles = {
  active: "bg-primary-fixed text-on-primary-fixed",
  invited: "bg-secondary-container text-on-secondary-container",
};

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
}

// Super admin only: invite staff by email, resend links, remove access.
export default function AdminStaff() {
  const { isSuperAdmin } = useAdminAuth();
  const [members, setMembers] = useState(null);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState("");
  // Shown when a link couldn't be emailed, so it can be sent another way.
  const [notice, setNotice] = useState(null);

  const load = useCallback(() => {
    manageStaff("list")
      .then((data) => setMembers(data.members))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (isSuperAdmin) load();
  }, [isSuperAdmin, load]);

  if (!isSuperAdmin) return <Navigate to="/admin" replace />;

  const afterSend = (who, data) => {
    setNotice(
      data.emailed
        ? { text: `Email sent to ${who}. The link expires after 24 hours.` }
        : { text: `The email couldn't be sent, so copy this link and send it to ${who} yourself (it expires after 24 hours):`, link: data.link }
    );
  };

  const invite = async (e) => {
    e.preventDefault();
    setBusy("invite");
    setError("");
    setNotice(null);
    try {
      const data = await manageStaff("invite", { email, name });
      afterSend(email, data);
      setName("");
      setEmail("");
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  };

  const resend = async (m) => {
    setBusy(m.userId);
    setError("");
    setNotice(null);
    try {
      afterSend(m.email, await manageStaff("resend", { userId: m.userId }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  };

  const remove = async (m) => {
    if (!window.confirm(`Remove ${m.name || m.email}? They will no longer be able to sign in.`)) return;
    setBusy(m.userId);
    setError("");
    setNotice(null);
    try {
      await manageStaff("remove", { userId: m.userId });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="space-y-6">
      <SupabaseSetupNotice />
      <div>
        <h1 className="font-display-lg text-headline-md text-primary mb-1">Staff</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Invite your team by email. Each person gets a link to set their own password, and can then manage bookings,
          orders, products and treatments. Only you can see this page.
        </p>
      </div>

      <form onSubmit={invite} className="bg-surface border border-outline-variant/30 rounded-xl p-6 grid gap-6 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface" htmlFor="staff-name">
            Name
          </label>
          <input id="staff-name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sara Ahmed" />
        </div>
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface" htmlFor="staff-email">
            Email
          </label>
          <input
            id="staff-email"
            type="email"
            required
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
        </div>
        <button
          type="submit"
          disabled={busy === "invite"}
          className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          {busy === "invite" ? "Sending…" : "Send invite"}
        </button>
      </form>

      {error && <p className="text-error text-sm">{error}</p>}
      {notice && (
        <div className="bg-primary-fixed/40 border border-primary/20 rounded-xl p-4 text-sm text-on-surface space-y-2">
          <p>{notice.text}</p>
          {notice.link && (
            <div className="flex gap-2">
              <input readOnly value={notice.link} className="flex-1 min-w-0 text-xs bg-surface border border-outline-variant/40 rounded px-2 py-1.5" onFocus={(e) => e.target.select()} />
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(notice.link)}
                className="px-3 rounded bg-primary text-on-primary text-xs font-label-caps uppercase tracking-wide"
              >
                Copy
              </button>
            </div>
          )}
        </div>
      )}

      {members === null ? (
        <p className="text-on-surface-variant font-body-md py-16 text-center">{error ? "" : "Loading…"}</p>
      ) : (
        <div className="bg-surface border border-outline-variant/30 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-outline-variant/30 font-label-caps text-label-caps text-outline uppercase">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Added</th>
                <th className="px-4 py-3">Last sign-in</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.userId} className="border-b border-outline-variant/20 last:border-0 align-top">
                  <td className="px-4 py-3">
                    <p className="text-primary font-medium">
                      {m.name || "—"} {m.isYou && <span className="text-xs text-outline">(you)</span>}
                    </p>
                    <p className="text-xs text-on-surface-variant">{m.email}</p>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{m.role === "super_admin" ? "Super admin" : "Staff"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-label-caps uppercase tracking-wide ${statusStyles[m.status]}`}>
                      {m.status === "active" ? "Active" : "Invited"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{formatDate(m.invitedAt)}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{formatDate(m.lastSignInAt)}</td>
                  <td className="px-4 py-3">
                    {!m.isYou && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => resend(m)}
                          disabled={busy === m.userId}
                          title={m.status === "invited" ? "Resend invitation" : "Send a password reset link"}
                          className="text-primary hover:underline disabled:opacity-50"
                        >
                          {m.status === "invited" ? "Resend invite" : "Reset password"}
                        </button>
                        <button onClick={() => remove(m)} disabled={busy === m.userId} className="text-error hover:underline disabled:opacity-50">
                          Remove
                        </button>
                      </div>
                    )}
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
