import { isSupabaseConfigured } from "../lib/supabaseClient";

// Drop this at the top of any page that reads/writes Supabase data.
// Renders nothing once Supabase is configured.
export default function SupabaseSetupNotice({ className = "" }) {
  if (isSupabaseConfigured) return null;
  return (
    <div className={`bg-error-container text-on-error-container rounded-lg p-4 text-sm mb-6 ${className}`}>
      <p className="font-medium mb-1">Supabase isn't connected yet</p>
      <p>
        Copy <code className="font-mono">.env.example</code> to <code className="font-mono">.env</code> and
        add <code className="font-mono">VITE_SUPABASE_URL</code> and{" "}
        <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> from your Supabase project, then run{" "}
        <code className="font-mono">supabase/schema.sql</code> in the SQL Editor. See the README for the
        full setup.
      </p>
    </div>
  );
}
