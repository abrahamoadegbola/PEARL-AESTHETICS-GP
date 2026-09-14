import { corsHeaders } from "../_shared/cors.ts";
import { sendMail } from "../_shared/mailer.ts";
import { renderEmailShell, renderFieldTable } from "../_shared/emailTemplate.ts";

const CLINIC_NOTIFY_EMAIL = Deno.env.get("CLINIC_NOTIFY_EMAIL");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking = await req.json();
    if (!booking.name || !booking.email) {
      return new Response(JSON.stringify({ error: "name and email are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fieldRows: [string, string][] = [
      ["Reference", booking.id ?? ""],
      ["Category", booking.category ?? ""],
      ["Preferred date", booking.date ?? ""],
      ["Preferred time", booking.time ?? ""],
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

    // --- Email to the patient ---
    const patientHtml = renderEmailShell({
      heading: `Thank you, ${booking.name}`,
      preheader: "Your consultation request has been received.",
      bodyHtml: `
        <p style="margin:0 0 20px;">
          We've received your consultation request and our team will confirm your appointment shortly.
          Here's a summary of what you submitted:
        </p>
        ${fieldTableHtml}
        <p style="margin:24px 0 0;color:#5b6360;font-size:13px;">
          If any of these details are incorrect, just reply to this email and we'll update them.
        </p>
      `,
    });

    const sends = [
      sendMail({
        to: booking.email,
        subject: `Your consultation request - ${booking.category || "Pearl Aesthetics"}`,
        text: `Thank you, ${booking.name}. We've received your booking request.\n\n${textSummary}\n\nOur team will confirm your appointment shortly.`,
        html: patientHtml,
      }),
    ];

    // --- Internal notification to the clinic ---
    if (CLINIC_NOTIFY_EMAIL) {
      const clinicHtml = renderEmailShell({
        heading: "New Consultation Request",
        preheader: `${booking.name} requested a consultation.`,
        bodyHtml: `
          <p style="margin:0 0 20px;">A new consultation request came in through the website:</p>
          ${fieldTableHtml}
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

    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
