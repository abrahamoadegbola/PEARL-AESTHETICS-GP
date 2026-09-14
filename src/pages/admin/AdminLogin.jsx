import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import BUSINESS from "../../data/business";
import SupabaseSetupNotice from "../../components/SupabaseSetupNotice";
import { isSupabaseConfigured } from "../../lib/supabaseClient";

export default function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const { error: loginError } = await login(email, password);
    setSubmitting(false);
    if (loginError) {
      setError(loginError);
      return;
    }
    const dest = location.state?.from || "/admin";
    navigate(dest, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-gutter">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-surface border border-outline-variant/30 rounded-xl p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="font-display-lg text-headline-md text-primary mb-2">{BUSINESS.shortName}</h1>
          <p className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
            Admin Panel
          </p>
        </div>

        <SupabaseSetupNotice />

        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoFocus
            autoComplete="username"
            className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-caps text-label-caps text-on-surface" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-error text-sm">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting || !isSupabaseConfigured}
          className="w-full bg-primary text-on-primary py-3 rounded font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Signing In…" : "Sign In"}
        </button>
        <p className="text-xs text-on-surface-variant text-center opacity-70">
          No account yet? Create one in your Supabase project: Dashboard → Authentication → Users → Add
          user.
        </p>
      </form>
    </div>
  );
}
