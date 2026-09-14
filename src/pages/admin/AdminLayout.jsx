import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import BUSINESS from "../../data/business";

const links = [
  { to: "/admin", label: "Dashboard", icon: "dashboard", end: true },
  { to: "/admin/bookings", label: "Bookings", icon: "event_available" },
  { to: "/admin/orders", label: "Orders & Payments", icon: "receipt_long" },
  { to: "/admin/inventory", label: "Inventory", icon: "inventory_2" },
  { to: "/admin/treatments", label: "Treatments", icon: "spa" },
];

export default function AdminLayout() {
  const { isAuthenticated, loading, logout } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body-md text-body-md text-on-surface-variant">Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 flex-shrink-0 bg-surface border-r border-outline-variant/30 hidden md:flex flex-col">
        <div className="px-6 py-6 border-b border-outline-variant/30">
          <span className="font-display-lg text-headline-sm text-primary">{BUSINESS.shortName}</span>
          <p className="font-label-caps text-label-caps text-outline uppercase tracking-widest mt-1">Admin</p>
        </div>
        <nav className="flex-grow px-3 py-6 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg font-body-md text-body-md transition-colors ${
                  isActive
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-6 border-t border-outline-variant/30 space-y-1">
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-3 rounded-lg font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
            View Site
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg font-body-md text-body-md text-error hover:bg-error-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-surface border-b border-outline-variant/30 px-4 py-3 flex items-center justify-between">
        <span className="font-display-lg text-headline-sm text-primary">{BUSINESS.shortName} Admin</span>
        <button onClick={logout} className="text-error">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>

      <div className="flex-grow">
        <main className="px-6 py-8 md:py-10 pt-20 md:pt-10 max-w-6xl mx-auto">
          <Outlet />
        </main>
        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-outline-variant/30 flex justify-around py-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-1 text-[10px] font-label-caps ${
                  isActive ? "text-primary" : "text-on-surface-variant"
                }`
              }
            >
              <span className="material-symbols-outlined text-[22px]">{l.icon}</span>
              {l.label.split(" ")[0]}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
