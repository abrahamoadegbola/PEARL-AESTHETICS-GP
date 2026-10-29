import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

// Real authentication via Supabase Auth (email + password), plus the
// staff list (public.staff). Signing in isn't enough on its own - the
// account must be on the staff list, and the database enforces the same
// rule (RLS uses public.is_staff()).
//
// Roles:
//   super_admin - the clinic owner. Creates their own login once in
//                 Supabase -> Authentication -> Users, then signs in here;
//                 the first sign-in claims the role. Invites everyone else
//                 from Admin -> Staff.
//   staff       - invited by the super admin; full access to bookings,
//                 orders, inventory and treatments, but not to Staff.

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  // undefined = not looked up yet, null = signed in but not staff.
  const [role, setRole] = useState(undefined);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSessionLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Looked up outside onAuthStateChange: calling Supabase from inside that
  // callback can deadlock supabase-js.
  const userId = session?.user?.id;
  useEffect(() => {
    if (!userId) {
      setRole(undefined);
      return;
    }
    let cancelled = false;
    setRole(undefined);
    supabase.rpc("claim_staff_role").then(({ data, error }) => {
      if (cancelled) return;
      if (error) console.error("[admin] staff role lookup failed:", error.message);
      setRole(error ? null : data ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const login = async (email, password) => {
    if (!isSupabaseConfigured) {
      return { error: "Supabase isn't configured yet - add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env." };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const logout = () => supabase.auth.signOut();

  const value = {
    isAuthenticated: Boolean(session),
    loading: sessionLoading || (Boolean(session) && role === undefined),
    user: session?.user || null,
    role: role ?? null,
    isStaff: Boolean(role),
    isSuperAdmin: role === "super_admin",
    login,
    logout,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  return ctx;
}
