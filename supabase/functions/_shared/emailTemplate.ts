// Branded HTML email shell, shared by every email this project sends.
// Email HTML is stuck in ~2005 by necessity - table-based layout, inline
// styles only, web-safe font stacks - because Gmail/Outlook/Apple Mail
// all support wildly different subsets of modern CSS. This is about as
// far as that can be pushed while still rendering consistently.
//
// Colors match src/data/business.js / tailwind.config.js exactly, so if
// the site's palette ever changes, update it in both places.

const COLORS = {
  primary: "#00231c", // deep forest green - header band, headings
  onPrimary: "#ffffff",
  gold: "#fed65b", // secondary-container - accent line, badges
  onGold: "#745c00",
  background: "#f9f9f7",
  surface: "#ffffff",
  text: "#1a1c1b",
  textMuted: "#5b6360",
  border: "#e2e3e0",
};

const HEADING_FONT = "Georgia, 'Times New Roman', serif";
const BODY_FONT = "Helvetica, Arial, sans-serif";

const CLINIC_NAME = "PEARL AESTHETICA";
const CLINIC_FULL_NAME = "Pearl Aesthetics & GP Medical Clinic";
const CLINIC_ADDRESS = "Shop 3, Mayas Geneva Building, JVC, Dubai";
const CLINIC_PHONE = "+971 55 963 9972";
const CLINIC_WEBSITE = "pearlaestheticgp.com";
export const CLINIC_MAPS_URL =
  "https://www.google.com/maps/place/3633%2BMXC+Pearl+Aesthetics+and+GP+Medical+Clinic+L.L.C+-+Al+Barsha+South+Fourth+-+Jumeirah+Village+Circle+-+Dubai/data=!4m2!3m1!1s0x3e5f6d003711c989:0x76aaddfa09b42eb5";
export const CLINIC_WHATSAPP_URL = "https://wa.me/971559639972";

export function escapeHtml(str = "") {
  return String(str).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

// Renders a label/value pair list as a clean two-column table - used for
// booking details, enquiry details, etc. Skips any row whose value is
// falsy so optional fields (like booking notes) don't show up empty.
export function renderFieldTable(rows: [string, string | undefined | null][]) {
  const trs = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid ${COLORS.border};font-family:${BODY_FONT};font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:${COLORS.textMuted};white-space:nowrap;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px 16px;border-bottom:1px solid ${COLORS.border};font-family:${BODY_FONT};font-size:15px;color:${COLORS.text};width:100%;">
            ${escapeHtml(value as string)}
          </td>
        </tr>`
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${COLORS.border};border-radius:8px;overflow:hidden;border-collapse:collapse;">${trs}</table>`;
}

// A bulletproof-ish email button (table cell with a background color, so
// Outlook still renders it as a button even though it ignores padding on <a>).
export function renderButton(label: string, href: string, { gold = false } = {}) {
  const bg = gold ? COLORS.gold : COLORS.primary;
  const fg = gold ? COLORS.onGold : COLORS.onPrimary;
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 8px 0 0;display:inline-table;">
    <tr>
      <td style="background-color:${bg};border-radius:6px;">
        <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 22px;font-family:${BODY_FONT};font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:${fg};text-decoration:none;">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`;
}

// Wraps a block of inner HTML (paragraphs, the field table, etc.) in the
// full branded email shell: header band with the clinic name, a gold
// accent rule, the content area, and a footer with contact details.
export function renderEmailShell({
  heading,
  bodyHtml,
  preheader = "",
}: {
  heading: string;
  bodyHtml: string;
  preheader?: string;
}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${COLORS.background};">
    <!-- Preheader: shows in the inbox preview line, hidden in the email body -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.background};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background-color:${COLORS.surface};border-radius:12px;overflow:hidden;">

            <!-- Header band -->
            <tr>
              <td style="background-color:${COLORS.primary};padding:32px 40px;text-align:center;">
                <span style="font-family:${HEADING_FONT};font-size:22px;letter-spacing:0.12em;color:${COLORS.onPrimary};">
                  ${CLINIC_NAME}
                </span>
                <div style="height:3px;width:48px;background-color:${COLORS.gold};margin:16px auto 0;"></div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                <h1 style="margin:0 0 20px;font-family:${HEADING_FONT};font-size:22px;color:${COLORS.text};font-weight:normal;">
                  ${escapeHtml(heading)}
                </h1>
                <div style="font-family:${BODY_FONT};font-size:15px;line-height:1.6;color:${COLORS.text};">
                  ${bodyHtml}
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:${COLORS.background};padding:28px 40px;text-align:center;border-top:1px solid ${COLORS.border};">
                <p style="margin:0 0 4px;font-family:${BODY_FONT};font-size:13px;color:${COLORS.text};font-weight:bold;">
                  ${CLINIC_FULL_NAME}
                </p>
                <p style="margin:0 0 4px;font-family:${BODY_FONT};font-size:12px;color:${COLORS.textMuted};">
                  <a href="${CLINIC_MAPS_URL}" style="color:${COLORS.textMuted};">${CLINIC_ADDRESS}</a>
                </p>
                <p style="margin:0;font-family:${BODY_FONT};font-size:12px;color:${COLORS.textMuted};">
                  ${CLINIC_PHONE} &nbsp;·&nbsp; ${CLINIC_WEBSITE}
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
