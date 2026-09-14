import { Link } from "react-router-dom";
import useDbCollection from "../../hooks/useDbCollection";
import { getBookings, getOrders, getProducts } from "../../lib/db";
import SupabaseSetupNotice from "../../components/SupabaseSetupNotice";

function StatCard({ label, value, icon, to }) {
  const content = (
    <div className="bg-surface border border-outline-variant/30 rounded-xl p-6 flex items-center gap-4 hover:border-primary/40 transition-colors">
      <div className="w-12 h-12 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="font-label-caps text-label-caps text-outline uppercase tracking-widest">{label}</p>
        <p className="font-headline-md text-headline-md text-primary">{value}</p>
      </div>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

export default function AdminDashboard() {
  const [bookings] = useDbCollection(getBookings);
  const [orders] = useDbCollection(getOrders);
  const [products] = useDbCollection(getProducts);
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const pendingPayments = orders.filter((o) => o.paymentStatus === "pending").length;
  const revenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);
  const lowStock = products.filter((p) => (p.stock ?? 0) <= 5).length;

  return (
    <div className="space-y-10">
      <SupabaseSetupNotice />
      <div>
        <h1 className="font-display-lg text-headline-md text-primary mb-1">Dashboard</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Overview of bookings, orders, and inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Bookings" value={pendingBookings} icon="event_available" to="/admin/bookings" />
        <StatCard label="Unpaid Orders" value={pendingPayments} icon="pending_actions" to="/admin/orders" />
        <StatCard label="Confirmed Revenue" value={`AED ${revenue}`} icon="payments" to="/admin/orders" />
        <StatCard label="Low Stock Items" value={lowStock} icon="warning" to="/admin/inventory" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-outline-variant/30 rounded-xl p-6">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Recent Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-on-surface-variant font-body-md text-sm">No bookings yet.</p>
          ) : (
            <ul className="divide-y divide-outline-variant/20">
              {bookings.slice(0, 5).map((b) => (
                <li key={b.id} className="py-3 flex justify-between text-sm">
                  <div>
                    <p className="text-primary font-medium">{b.name}</p>
                    <p className="text-on-surface-variant">{b.category} — {b.date}</p>
                  </div>
                  <span className="font-label-caps text-label-caps uppercase text-outline">{b.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-surface border border-outline-variant/30 rounded-xl p-6">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="text-on-surface-variant font-body-md text-sm">No orders yet.</p>
          ) : (
            <ul className="divide-y divide-outline-variant/20">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="py-3 flex justify-between text-sm">
                  <div>
                    <p className="text-primary font-medium">{o.customer?.name || "Guest"}</p>
                    <p className="text-on-surface-variant">AED {o.total} — {o.items?.length} item(s)</p>
                  </div>
                  <span className="font-label-caps text-label-caps uppercase text-outline">{o.paymentStatus}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
