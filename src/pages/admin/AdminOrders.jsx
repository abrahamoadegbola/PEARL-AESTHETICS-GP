import { useState } from "react";
import useDbCollection from "../../hooks/useDbCollection";
import { getOrders, updateOrder, deleteOrder } from "../../lib/db";
import { buildWhatsAppLink, orderWhatsAppMessage } from "../../lib/whatsapp";
import SupabaseSetupNotice from "../../components/SupabaseSetupNotice";
import StyledSelect from "../../components/admin/StyledSelect";

const PAYMENT_STATUSES = ["pending", "paid", "failed", "expired", "refunded"];
const FULFILLMENT_STATUSES = ["pending", "processing", "shipped", "completed", "cancelled"];

const paymentStyles = {
  pending: "bg-secondary-container text-on-secondary-container",
  paid: "bg-primary-fixed text-on-primary-fixed",
  failed: "bg-error-container text-on-error-container",
  expired: "bg-surface-container-high text-on-surface-variant",
  refunded: "bg-error-container text-on-error-container",
};

export default function AdminOrders() {
  const [orders] = useDbCollection(getOrders);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-6">
      <SupabaseSetupNotice />
      <div>
        <h1 className="font-display-lg text-headline-md text-primary mb-1">Orders & Payments</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Shop orders placed at checkout, with payment and fulfilment status.
        </p>
      </div>

      {orders.length === 0 ? (
        <p className="text-on-surface-variant font-body-md py-16 text-center">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-surface border border-outline-variant/30 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                className="w-full flex flex-wrap items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div>
                  <p className="text-primary font-medium">{o.customer?.name || "Guest"}</p>
                  <p className="text-xs text-on-surface-variant">
                    {o.id} • {new Date(o.createdAt).toLocaleString()} •{" "}
                    <span className="uppercase">{o.paymentMethod || "whatsapp"}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded px-2 py-1 text-xs font-label-caps uppercase tracking-wide ${paymentStyles[o.paymentStatus]}`}>
                    {o.paymentStatus}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">AED {o.total}</span>
                  <span className="material-symbols-outlined text-on-surface-variant">
                    {expanded === o.id ? "expand_less" : "expand_more"}
                  </span>
                </div>
              </button>

              {expanded === o.id && (
                <div className="px-5 pb-5 border-t border-outline-variant/20 pt-4 space-y-4">
                  <ul className="space-y-1 text-sm">
                    {o.items?.map((item) => (
                      <li key={item.id} className="flex justify-between text-on-surface-variant">
                        <span>{item.qty} x {item.name}</span>
                        <span>AED {item.price * item.qty}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-on-surface-variant space-y-1">
                    <p>Email: {o.customer?.email}</p>
                    <p>Phone: {o.customer?.phone}</p>
                    <p>Address: {o.customer?.address}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 text-sm">
                      Payment:
                      <StyledSelect
                        value={o.paymentStatus}
                        onChange={(e) => updateOrder(o.id, { paymentStatus: e.target.value }).catch((err) => alert(err.message))}
                        options={PAYMENT_STATUSES}
                        selectClassName="pl-2 pr-7 py-1 rounded text-sm border border-outline-variant bg-surface cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      Fulfilment:
                      <StyledSelect
                        value={o.fulfillmentStatus}
                        onChange={(e) => updateOrder(o.id, { fulfillmentStatus: e.target.value }).catch((err) => alert(err.message))}
                        options={FULFILLMENT_STATUSES}
                        selectClassName="pl-2 pr-7 py-1 rounded text-sm border border-outline-variant bg-surface cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </label>
                    <a
                      href={buildWhatsAppLink(orderWhatsAppMessage(o))}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:text-surface-tint flex items-center gap-1 text-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        if (window.confirm("Delete this order?")) deleteOrder(o.id).catch((err) => alert(err.message));
                      }}
                      className="ml-auto text-outline hover:text-error flex items-center gap-1 text-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
