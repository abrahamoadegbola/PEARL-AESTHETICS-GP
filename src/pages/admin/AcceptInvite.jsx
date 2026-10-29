import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { supabase } from "../../lib/supabaseClient";
import BUSINESS from "../../data/business";

const inputClass =
  "w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors";

// Where invitation and password-reset links land. supabase-js signs the
// person in from the link itself; here they choose their password.
export default function AcceptInvite() {
  const { isAuthenticated, loading, user } = useAdminAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.user_metadata?.name || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Expired or already-used links come back with the reason in the hash.
  const linkError = new URLSearchParams(window.location.hash.slice(1)).get("error_description");
  const isNew = !user?.user_metadata?.password_set;

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 8) return setError("Use at least 8 characters.");
    if (password !== confirm) return setError("The two passwords don't match.");
    setSaving(true);
    setError("");
    const { error: updateError } = await supabase.auth.updateUser({
      password,
      data: { password_set: true, ...(name.trim() ? { name: name.trim() } : {}) },
    });
    setSaving(false);
    if (updateError) return setError(updateError.message);
    navigate("/admin", { replace: true });
  };

  let content;
  if (loading) {
    content = <p className="font-body-md text-body-md text-on-surface-variant text-center">Checking your link…</p>;
  } else if (!isAuthenticated) {
    content = (
      <div className="text-center space-y-3">
        <span className="material-symbols-outlined text-[40px] text-outline">link_off</span>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {linkError ? `${linkError}.` : "This link has expired or has already been used."} Ask the clinic's super admin to
          send you a new one from Admin → Staff.
        </p>
      </div>
    );
  } else {
    content = (
      <form onSubmit={submit} className="space-y-6">
        <p className="font-body-md text-body-md text-on-surface-variant text-center">
          {isNew ? "Welcome! Choose a password for" : "Choose a new password for"} <b className="text-on-surface">{user.email}</b>.
        </p>
        {isNew && (
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface" htmlFor="name">
              Your name
            </label>
            <input id="name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </div>
        )}
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface" htmlFor="password">
            Password
          </label>
          <input id="password" type="password" autoComplete="new-password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface" htmlFor="confirm">
            Confirm password
          </label>
          <input id="confirm" type="password" autoComplete="new-password" className={inputClass} value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          {error && <p className="text-error text-sm">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary text-on-primary py-3 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save password & continue"}
        </button>
      </form>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-gutter">
      <div className="w-full max-w-sm bg-surface border border-outline-variant/30 rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="font-display-lg text-headline-md text-primary mb-2">{BUSINESS.shortName}</h1>
          <p className="font-label-caps text-label-caps text-outline uppercase tracking-widest">Admin Panel</p>
        </div>
        {content}
      </div>
    </div>
  );
}
