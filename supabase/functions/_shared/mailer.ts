// Sends email via Gmail SMTP, using denomailer (a Deno-native SMTP
// client - Node's nodemailer doesn't run in Deno/Edge Functions).
//
// Setup:
// 1. Turn on 2-Step Verification on the Gmail account you want to send from.
// 2. Create an App Password: https://myaccount.google.com/apppasswords
//    (a 16-character password specifically for this app - not your normal
//    Gmail password, and Google only shows it once).
// 3. supabase secrets set SMTP_USER=youraddress@gmail.com
//    supabase secrets set SMTP_PASS=your-16-character-app-password
//    supabase secrets set CLINIC_NOTIFY_EMAIL=info@pearlaestheticgp.com
//
// Worth knowing: outbound SMTP from serverless/edge runtimes is less
// universally reliable than a plain server (some providers block it
// outright to fight spam). Supabase Edge Functions do allow it, and
// Gmail's SMTP (port 465, implicit TLS) is a well-trodden path here - but
// if you ever see emails silently failing to send, that class of issue is
// the first thing to check.
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const SMTP_USER = Deno.env.get("SMTP_USER");
const SMTP_PASS = Deno.env.get("SMTP_PASS");
const SMTP_FROM = Deno.env.get("SMTP_FROM") || SMTP_USER;

export function isMailerConfigured() {
  return Boolean(SMTP_USER && SMTP_PASS);
}

function getClient() {
  return new SMTPClient({
    connection: {
      hostname: "smtp.gmail.com",
      port: 465,
      tls: true,
      auth: {
        username: SMTP_USER!,
        password: SMTP_PASS!,
      },
    },
  });
}

export async function sendMail({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  if (!isMailerConfigured()) {
    throw new Error("Email sending is not configured - SMTP_USER / SMTP_PASS are not set.");
  }

  const client = getClient();
  try {
    await client.send({
      from: `Pearl Aesthetics <${SMTP_FROM}>`,
      to,
      subject,
      content: text,
      html,
      replyTo,
    });
  } finally {
    // Always close the connection, even if send() throws - otherwise the
    // function can hang until it times out.
    await client.close();
  }
}
