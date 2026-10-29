// Sends WhatsApp messages through Meta's WhatsApp Cloud API - the only
// official way to *send* WhatsApp messages from a server (wa.me links
// only open a chat for a human to press send).
//
// Setup (developers.facebook.com -> your app -> WhatsApp -> API Setup):
//   supabase secrets set WHATSAPP_TOKEN=EAAG...            # permanent System User token
//   supabase secrets set WHATSAPP_PHONE_NUMBER_ID=1234...  # the sending number's ID, not the number itself
//   supabase secrets set CLINIC_WHATSAPP_NUMBER=971559639972  # who gets booking alerts (digits only)
//
// WhatsApp only allows free-form text to someone who has messaged the
// business number in the last 24 hours. For alerts that always arrive,
// create an approved message template and set:
//   supabase secrets set WHATSAPP_BOOKING_TEMPLATE=new_booking_alert
//   supabase secrets set WHATSAPP_TEMPLATE_LANG=en
// The template's body should take the same ordered {{1}}..{{n}} variables
// the caller passes as `params` (see send-booking-email for the list).

const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_TOKEN");
const WHATSAPP_PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
const GRAPH_VERSION = Deno.env.get("WHATSAPP_API_VERSION") || "v21.0";
const TEMPLATE_LANG = Deno.env.get("WHATSAPP_TEMPLATE_LANG") || "en";

export const CLINIC_WHATSAPP_NUMBER = Deno.env.get("CLINIC_WHATSAPP_NUMBER") || "971559639972";

export function isWhatsAppConfigured() {
  return Boolean(WHATSAPP_TOKEN && WHATSAPP_PHONE_NUMBER_ID);
}

// Sends `template` (with `params` filling its body variables) when a
// template name is given, otherwise a plain text message.
export async function sendWhatsApp({
  to,
  text,
  template,
  params = [],
}: {
  to: string;
  text: string;
  template?: string | null;
  params?: string[];
}) {
  if (!isWhatsAppConfigured()) {
    throw new Error("WhatsApp is not configured - WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID are not set.");
  }

  const recipient = to.replace(/\D/g, "");
  const payload = template
    ? {
        messaging_product: "whatsapp",
        to: recipient,
        type: "template",
        template: {
          name: template,
          language: { code: TEMPLATE_LANG },
          components: [
            {
              type: "body",
              // Template variables can't be empty or contain newlines/tabs.
              parameters: params.map((p) => ({ type: "text", text: (p || "-").replace(/[\n\t]+/g, " ") })),
            },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        to: recipient,
        type: "text",
        text: { preview_url: false, body: text },
      };

  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body?.error?.message || `WhatsApp API responded ${res.status}`);
  }
  return body;
}
