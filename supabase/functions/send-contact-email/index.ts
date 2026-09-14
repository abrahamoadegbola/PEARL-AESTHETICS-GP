import { corsHeaders } from "../_shared/cors.ts";
import { sendMail } from "../_shared/mailer.ts";
import { renderEmailShell, renderFieldTable } from "../_shared/emailTemplate.ts";

const CLINIC_NOTIFY_EMAIL = Deno.env.get("CLINIC_NOTIFY_EMAIL");

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const form = await req.json();
    if (!form.email || (!form.firstName && !form.lastName)) {
      return new Response(JSON.stringify({ error: "name and email are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!CLINIC_NOTIFY_EMAIL) {
      return new Response(JSON.stringify({ error: "CLINIC_NOTIFY_EMAIL is not configured yet." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fullName = `${form.firstName || ""} ${form.lastName || ""}`.trim();
    const fieldRows: [string, string][] = [
      ["Name", fullName],
      ["Email", form.email ?? ""],
      ["Phone", form.phone ?? ""],
      ["Interest", form.interest ?? ""],
      ["Message", form.message ?? ""],
    ];
    const fieldTableHtml = renderFieldTable(fieldRows);
    const textSummary = fieldRows
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const html = renderEmailShell({
      heading: "New Website Enquiry",
      preheader: `${fullName || "A website visitor"} sent an enquiry.`,
      bodyHtml: `
        <p style="margin:0 0 20px;">A new enquiry came in through the Contact page:</p>
        ${fieldTableHtml}
      `,
    });

    await sendMail({
      to: CLINIC_NOTIFY_EMAIL,
      subject: `New website enquiry - ${form.firstName || "Website visitor"}`,
      text: `New contact form enquiry:\n\n${textSummary}`,
      html,
      replyTo: form.email,
    });

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
