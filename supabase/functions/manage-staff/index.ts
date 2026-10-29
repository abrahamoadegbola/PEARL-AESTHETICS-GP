import { corsHeaders } from "../_shared/cors.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { isMailerConfigured, sendMail } from "../_shared/mailer.ts";
import { escapeHtml, renderButton, renderEmailShell } from "../_shared/emailTemplate.ts";

// Staff management for the admin panel's Staff page. Only the super admin
// (public.staff.role = 'super_admin') may call it. Actions:
//   list                     -> { members: [...] }
//   invite  { email, name }  -> creates the login, adds them to public.staff,
//                               emails a "set your password" link
//   resend  { userId }       -> emails a fresh link (expired invite, or a
//                               staff member who forgot their password)
//   remove  { userId }       -> deletes the login and its staff row
//
// Links are generated here and sent through the clinic's own Gmail
// mailer and branded template, not Supabase's built-in auth emails
// (which are heavily rate-limited without extra SMTP setup). The link
// lands on /admin/accept-invite, which must be listed under
// Authentication -> URL Configuration -> Redirect URLs.

const CLIENT_URL = Deno.env.get("CLIENT_URL");

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function findAuthUser(email: string) {
  for (let page = 1; page < 50; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(error.message);
    const match = data.users.find((u) => u.email?.toLowerCase() === email);
    if (match || data.users.length < 200) return match ?? null;
  }
  return null;
}

// "invite" creates a new login; "recovery" works for anyone who already
// has one. Both sign the person in and open the set-password page.
async function setPasswordLink(type: "invite" | "recovery", email: string, redirectTo: string, name?: string) {
  const { data, error } = await supabaseAdmin.auth.admin.generateLink(
    type === "invite"
      ? { type, email, options: { redirectTo, data: { name } } }
      : { type, email, options: { redirectTo } }
  );
  if (error) throw new Error(error.message);
  return { user: data.user, link: data.properties.action_link };
}

async function emailLink(to: string, name: string | null, link: string, invitedBy: string, isNew: boolean) {
  if (!isMailerConfigured()) return false;
  const greeting = name ? `Hi ${escapeHtml(name.split(" ")[0])},` : "Hello,";
  const html = renderEmailShell({
    heading: isNew ? "You're invited to the admin panel" : "Set a new password",
    preheader: isNew ? `${invitedBy} invited you to the clinic's admin panel.` : "Use this link to set a new admin panel password.",
    bodyHtml: `
      <p style="margin:0 0 16px;">${greeting}</p>
      <p style="margin:0 0 16px;">${
        isNew
          ? `${escapeHtml(invitedBy)} has invited you to the clinic's admin panel, where you can manage bookings, orders, products and treatments.`
          : "Here is a link to set a new password for the clinic's admin panel."
      }</p>
      <p style="margin:0 0 20px;">Click the button to choose your password. The link works once and expires after 24 hours.</p>
      ${renderButton(isNew ? "Accept invitation" : "Set new password", link)}
      <p style="margin:24px 0 0;font-size:12px;opacity:0.7;">If you weren't expecting this email, you can ignore it.</p>
    `,
  });
  await sendMail({
    to,
    subject: isNew ? "Your invitation to the clinic admin panel" : "Set a new admin panel password",
    text: `${isNew ? `${invitedBy} has invited you to the clinic's admin panel.` : "Set a new admin panel password."}\n\nChoose your password here (works once, expires in 24 hours):\n${link}`,
    html,
  });
  return true;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const jwt = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
    const { data: auth } = await supabaseAdmin.auth.getUser(jwt);
    const caller = auth?.user;
    if (!caller) return json({ error: "Please sign in again." }, 401);

    const { data: me } = await supabaseAdmin.from("staff").select("role, name, email").eq("user_id", caller.id).maybeSingle();
    if (me?.role !== "super_admin") return json({ error: "Only the super admin can manage staff." }, 403);

    const body = await req.json().catch(() => ({}));
    const origin = CLIENT_URL || req.headers.get("origin") || "";
    const redirectTo = `${origin.replace(/\/$/, "")}/admin/accept-invite`;
    const invitedBy = me.name || me.email || "The clinic";

    if (body.action === "list") {
      const { data: rows, error } = await supabaseAdmin.from("staff").select("*").order("created_at");
      if (error) throw new Error(error.message);
      const members = await Promise.all(
        (rows ?? []).map(async (r) => {
          const { data } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
          const u = data?.user;
          const active = r.role === "super_admin" || Boolean(u?.user_metadata?.password_set);
          return {
            userId: r.user_id,
            email: r.email,
            name: r.name || u?.user_metadata?.name || null,
            role: r.role,
            status: active ? "active" : "invited",
            invitedAt: r.created_at,
            lastSignInAt: u?.last_sign_in_at ?? null,
            isYou: r.user_id === caller.id,
          };
        })
      );
      return json({ members });
    }

    if (body.action === "invite") {
      const email = String(body.email || "").trim().toLowerCase();
      const name = String(body.name || "").trim() || null;
      if (!EMAIL_RE.test(email)) return json({ error: "Enter a valid email address." }, 400);

      const { data: already } = await supabaseAdmin.from("staff").select("user_id").eq("email", email).maybeSingle();
      if (already) return json({ error: "That person is already on the team. Use Resend link instead." }, 409);

      // Someone may already have a login (e.g. created earlier in the
      // Supabase dashboard): add them to the team rather than failing.
      const existing = await findAuthUser(email);
      const { user, link } = existing
        ? await setPasswordLink("recovery", email, redirectTo)
        : await setPasswordLink("invite", email, redirectTo, name ?? undefined);

      const { error } = await supabaseAdmin
        .from("staff")
        .insert({ user_id: user.id, email, name, role: "staff", invited_by: caller.id });
      if (error) throw new Error(error.message);

      const emailed = await emailLink(email, name, link, invitedBy, true).catch((err) => {
        console.error("[manage-staff] invite email failed:", err.message);
        return false;
      });
      // If email isn't set up (or failed), hand the link back so the super
      // admin can send it another way, e.g. WhatsApp.
      return json({ invited: true, emailed, link: emailed ? undefined : link });
    }

    if (body.action === "resend" || body.action === "remove") {
      const { data: member } = await supabaseAdmin.from("staff").select("*").eq("user_id", body.userId).maybeSingle();
      if (!member) return json({ error: "Staff member not found." }, 404);

      if (body.action === "remove") {
        if (member.user_id === caller.id) return json({ error: "You can't remove yourself." }, 400);
        const { error } = await supabaseAdmin.auth.admin.deleteUser(member.user_id);
        if (error) throw new Error(error.message);
        // The staff row goes with the login (on delete cascade).
        return json({ removed: true });
      }

      const { data } = await supabaseAdmin.auth.admin.getUserById(member.user_id);
      const isNew = !data?.user?.user_metadata?.password_set;
      const { link } = await setPasswordLink("recovery", member.email, redirectTo);
      const emailed = await emailLink(member.email, member.name, link, invitedBy, isNew).catch((err) => {
        console.error("[manage-staff] resend email failed:", err.message);
        return false;
      });
      return json({ sent: true, emailed, link: emailed ? undefined : link });
    }

    return json({ error: "Unknown action." }, 400);
  } catch (err) {
    console.error("[manage-staff]", (err as Error).message);
    return json({ error: (err as Error).message }, 500);
  }
});
