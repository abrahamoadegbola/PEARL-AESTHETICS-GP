// Notifications sent once an order is confirmed paid by Stripe: an order
// confirmation to the shopper, plus an email and WhatsApp alert to the
// clinic so someone can arrange delivery. Called only by whichever of
// checkout-session-status / stripe-webhook actually flipped the order to
// paid (see markOrderPaid), so each order is announced exactly once.
import { sendMail, isMailerConfigured } from "./mailer.ts";
import { renderEmailShell, renderFieldTable, renderButton, escapeHtml, CLINIC_WHATSAPP_URL } from "./emailTemplate.ts";
import { sendWhatsApp, isWhatsAppConfigured, CLINIC_WHATSAPP_NUMBER } from "./whatsapp.ts";

const CLINIC_NOTIFY_EMAIL = Deno.env.get("CLINIC_NOTIFY_EMAIL");
const WHATSAPP_ORDER_TEMPLATE = Deno.env.get("WHATSAPP_ORDER_TEMPLATE");

type OrderItem = { id: string; name: string; price: number; qty: number };
type Order = {
  id: string;
  items: OrderItem[];
  customer: { name?: string; email?: string; phone?: string; address?: string };
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

function renderItemsTable(order: Order) {
  const rows = order.items
    .map(
      (i) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #e2e3e0;">${escapeHtml(i.name)} &times; ${i.qty}</td>
        <td style="padding:8px 0;border-bottom:1px solid #e2e3e0;text-align:right;white-space:nowrap;">AED ${Number(i.price) * i.qty}</td>
      </tr>`
    )
    .join("");
  const line = (label: string, value: string, bold = false) =>
    `<tr><td style="padding:6px 0;${bold ? "font-weight:bold;" : "color:#5b6360;"}">${label}</td><td style="padding:6px 0;text-align:right;${bold ? "font-weight:bold;" : "color:#5b6360;"}">${value}</td></tr>`;
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px;">
    ${rows}
    ${line("Subtotal", `AED ${order.subtotal}`)}
    ${line("Shipping", Number(order.shipping) === 0 ? "Free" : `AED ${order.shipping}`)}
    ${line("VAT (5%)", `AED ${order.tax}`)}
    ${line("Total paid", `AED ${order.total}`, true)}
  </table>`;
}

export async function sendOrderPaidNotifications(order: Order) {
  const customer = order.customer || {};
  const itemsText = order.items.map((i) => `• ${i.qty} x ${i.name} — AED ${Number(i.price) * i.qty}`).join("\n");
  const jobs: Promise<unknown>[] = [];

  if (isMailerConfigured()) {
    if (customer.email) {
      jobs.push(
        sendMail({
          to: customer.email,
          subject: `Order confirmed - ${order.id}`,
          text: `Thank you${customer.name ? `, ${customer.name}` : ""}! Your payment for order ${order.id} is confirmed.\n\n${itemsText}\n\nTotal paid: AED ${order.total}\nDelivery to: ${customer.address || "-"}\n\nWe'll be in touch shortly to arrange delivery.`,
          html: renderEmailShell({
            heading: `Thank you${customer.name ? `, ${customer.name}` : ""}`,
            preheader: `Your payment for order ${order.id} is confirmed.`,
            bodyHtml: `
              <p style="margin:0 0 20px;">Your payment is confirmed. Here's your order summary:</p>
              ${renderItemsTable(order)}
              <p style="margin:24px 0 8px;">
                Delivering to: <strong>${escapeHtml(customer.address || "-")}</strong><br />
                Our team will be in touch shortly to arrange delivery.
              </p>
              ${renderButton("Questions? WhatsApp us", CLINIC_WHATSAPP_URL, { gold: true })}
              <p style="margin:24px 0 0;color:#5b6360;font-size:13px;">Order reference: ${escapeHtml(order.id)}</p>
            `,
          }),
        })
      );
    }

    if (CLINIC_NOTIFY_EMAIL) {
      jobs.push(
        sendMail({
          to: CLINIC_NOTIFY_EMAIL,
          subject: `Paid order - ${order.id} (AED ${order.total})`,
          text: `New paid order ${order.id}\n\n${itemsText}\n\nTotal: AED ${order.total}\nCustomer: ${customer.name} · ${customer.phone} · ${customer.email}\nAddress: ${customer.address}`,
          replyTo: customer.email,
          html: renderEmailShell({
            heading: "New Paid Order",
            preheader: `${customer.name || "A customer"} paid AED ${order.total}.`,
            bodyHtml: `
              ${renderFieldTable([
                ["Order", order.id],
                ["Customer", customer.name],
                ["Email", customer.email],
                ["Phone", customer.phone],
                ["Address", customer.address],
              ])}
              <div style="height:20px;"></div>
              ${renderItemsTable(order)}
            `,
          }),
        })
      );
    }
  }

  if (isWhatsAppConfigured()) {
    // Template params, in order: order id, customer name, total, phone, address
    jobs.push(
      sendWhatsApp({
        to: CLINIC_WHATSAPP_NUMBER,
        template: WHATSAPP_ORDER_TEMPLATE,
        params: [order.id, customer.name || "-", `AED ${order.total}`, customer.phone || "-", customer.address || "-"],
        text: `💳 Paid order ${order.id}\n\n${itemsText}\n\nTotal: AED ${order.total}\n${customer.name} · ${customer.phone}\n${customer.address}`,
      })
    );
  }

  const results = await Promise.allSettled(jobs);
  for (const r of results) {
    if (r.status === "rejected") console.error("[orderNotifications]", (r.reason as Error).message);
  }
}
