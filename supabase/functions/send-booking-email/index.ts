import { corsHeaders } from "../_shared/cors.ts";
import { sendMail, isMailerConfigured } from "../_shared/mailer.ts";
import {
  renderEmailShell,
  renderFieldTable,
  renderButton,
  CLINIC_MAPS_URL,
  CLINIC_WHATSAPP_URL,
} from "../_shared/emailTemplate.ts";
import { sendWhatsApp, isWhatsAppConfigured, CLINIC_WHATSAPP_NUMBER } from "../_shared/whatsapp.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";

const CLINIC_NOTIFY_EMAIL = Deno.env.get("CLINIC_NOTIFY_EMAIL");
const WHATSAPP_BOOKING_TEMPLATE = Deno.env.get("WHATSAPP_BOOKING_TEMPLATE");

// "2026-11-04" -> "Wednesday, 4 November 2026"; anything unparseable passes through.
function formatDate(value?: string) {
  const m = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return value ?? "";
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// "14:30" -> "2:30 PM"
function formatTime(value?: string) {
  const m = value?.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return value ?? "";
  const h = +m[1];
  return `${h % 12 || 12}:${m[2]} ${h < 12 ? "AM" : "PM"}`;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Sends every notification for a new booking:
//   1. confirmation email to the patient
//   2. notification email to the clinic (CLINIC_NOTIFY_EMAIL)
//   3. WhatsApp alert to the clinic (CLINIC_WHATSAPP_NUMBER)
//
// The browser only sends the booking id. The booking itself is read here
// with the service role key, so this endpoint can't be used to send mail
// to arbitrary addresses, and `notified_at` stops it being re-triggered.
//
// Each channel succeeds or fails on its own - a missing WhatsApp setup
// never stops the patient's email. Responds with
// { email: { sent, error? }, whatsapp: { sent, error? } }.
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { id } = await req.json();
    if (!id) return json({ error: "Booking id is required." }, 400);

    const { data: booking, error } = await supabaseAdmin.from("bookings").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    if (!booking) return json({ error: "Booking not found." }, 404);
    if (booking.notified_at) {
      return json({ email: { sent: true, already: true }, whatsapp: { sent: true, already: true } });
    }

    const fieldRows: [string, string][] = [
      ["Reference", booking.id ?? ""],
      ["Category", booking.category ?? ""],
      ["Doctor", booking.doctor ?? ""],
      ["Preferred date", formatDate(booking.date)],
      ["Preferred time", formatTime(booking.time)],
      ["Name", booking.name ?? ""],
      ["Email", booking.email ?? ""],
      ["Phone", booking.phone ?? ""],
      ["Notes", booking.notes ?? ""],
    ];
    const fieldTableHtml = renderFieldTable(fieldRows);
    const textSummary = fieldRows
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    // --- Emails (patient + clinic) ---
    const emailJob = (async () => {
      if (!isMailerConfigured()) throw new Error("SMTP is not configured.");

      const patientHtml = renderEmailShell({
        heading: `Thank you, ${booking.name}`,
        preheader: "Your consultation request has been received.",
        bodyHtml: `
          <p style="margin:0 0 20px;">
            We've received your consultation request${booking.doctor ? ` with ${booking.doctor}` : ""}.
            Our team will confirm your appointment time shortly, usually the same day.
          </p>
          ${fieldTableHtml}
          <p style="margin:24px 0 8px;">Need to change something, or want a faster confirmation? Message us on WhatsApp.</p>
          ${renderButton("Message us on WhatsApp", CLINIC_WHATSAPP_URL, { gold: true })}
          ${renderButton("Get directions", CLINIC_MAPS_URL)}
          <p style="margin:24px 0 0;color:#5b6360;font-size:13px;">
            Your first consultation is complimentary. If any of these details are incorrect, just reply to this email.
          </p>
        `,
      });

      const sends = [
        sendMail({
          to: booking.email,
          subject: `Booking received - ${booking.category || "Pearl Aesthetics"} (${booking.id})`,
          text: `Thank you, ${booking.name}. We've received your booking request.\n\n${textSummary}\n\nOur team will confirm your appointment shortly. WhatsApp: ${CLINIC_WHATSAPP_URL}`,
          html: patientHtml,
        }),
      ];

      if (CLINIC_NOTIFY_EMAIL) {
        const clinicHtml = renderEmailShell({
          heading: "New Consultation Request",
          preheader: `${booking.name} requested a consultation.`,
          bodyHtml: `
            <p style="margin:0 0 20px;">A new consultation request came in through the website:</p>
            ${fieldTableHtml}
            ${booking.phone ? renderButton("WhatsApp the patient", `https://wa.me/${String(booking.phone).replace(/\D/g, "")}`, { gold: true }) : ""}
          `,
        });
        sends.push(
          sendMail({
            to: CLINIC_NOTIFY_EMAIL,
            subject: `New booking request - ${booking.name}`,
            text: `New consultation booking request:\n\n${textSummary}`,
            html: clinicHtml,
            replyTo: booking.email,
          })
        );
      }

      await Promise.all(sends);
    })();

    // --- WhatsApp alert to the clinic ---
    // Template params, in order: name, category, date, time, phone, reference, doctor
    const whatsappJob = (async () => {
      if (!isWhatsAppConfigured()) throw new Error("WhatsApp is not configured.");
      await sendWhatsApp({
        to: CLINIC_WHATSAPP_NUMBER,
        template: WHATSAPP_BOOKING_TEMPLATE,
        params: [
          booking.name,
          booking.category,
          formatDate(booking.date),
          formatTime(booking.time),
          booking.phone,
          booking.id,
          booking.doctor || "Any available",
        ],
        text: `📅 New booking request\n\n${textSummary}`,
      });
    })();

    const [emailResult, whatsappResult] = await Promise.allSettled([emailJob, whatsappJob]);
    const outcome = (r: PromiseSettledResult<void>) =>
      r.status === "fulfilled" ? { sent: true } : { sent: false, error: (r.reason as Error).message };

    const result = { email: outcome(emailResult), whatsapp: outcome(whatsappResult) };
    if (!result.email.sent) console.error("[send-booking-email] email failed:", result.email.error);
    if (!result.whatsapp.sent) console.error("[send-booking-email] whatsapp failed:", result.whatsapp.error);

    if (result.email.sent || result.whatsapp.sent) {
      const { error: markError } = await supabaseAdmin
        .from("bookings")
        .update({ notified_at: new Date().toISOString() })
        .eq("id", booking.id);
      if (markError) console.error("[send-booking-email] couldn't set notified_at:", markError.message);
    }

    return json(result);
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
