const BRAND = "HANSNET LOGISTICS";
const PRIMARY = "#0f172a";
const PRIMARY_MID = "#1e3a5f";
const ACCENT = "#f59e0b";
const BG = "#f8fafc";
const MUTED = "#64748b";
const TABLE_BORDER = "#cbd5e1";
const ROW_LABEL_BG = "#e8eef5";
const HIGHLIGHT_BG = "#fffbeb";

function baseLayout(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;font-family:system-ui,-apple-system,sans-serif;background:${BG};color:${PRIMARY};padding:24px;line-height:1.5;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:2px solid ${PRIMARY};border-top:4px solid ${ACCENT};">
    <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;">
      <h1 style="margin:0;font-family:ui-monospace,monospace;font-size:18px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:${PRIMARY};">${BRAND}</h1>
    </div>
    <div style="padding:24px;">
      ${content}
    </div>
    <div style="padding:16px 24px;border-top:1px solid #e2e8f0;font-size:12px;color:${MUTED};">
      hansnetlogistics.com
    </div>
  </div>
</body>
</html>`;
}

function escapeHtmlForEmail(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function section(title: string, body: string): string {
  return `
  <p style="margin:0 0 8px;font-family:ui-monospace,monospace;font-size:11px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:${PRIMARY};">${title}</p>
  <p style="margin:0 0 20px;font-size:14px;color:${PRIMARY};">${body}</p>`;
}

/** Two-column table row for shipment-style emails (Gmail-friendly). */
function shipmentTableRow(label: string, valueHtml: string, isLast = false): string {
  const b = isLast ? "none" : `1px solid ${TABLE_BORDER}`;
  return `
  <tr>
    <td valign="top" style="background:${ROW_LABEL_BG};padding:12px 14px;width:34%;max-width:180px;font-family:ui-monospace,monospace;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${PRIMARY_MID};border-bottom:${b};">${label}</td>
    <td valign="top" style="padding:12px 14px;font-size:14px;color:${PRIMARY};border-bottom:${b};line-height:1.5;">${valueHtml}</td>
  </tr>`;
}

function shipmentDetailsTable(rowsHtml: string): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 22px;border:2px solid ${PRIMARY};border-radius:0;box-shadow:0 2px 8px rgba(15,23,42,0.08);">
    <tr>
      <td colspan="2" style="background:${PRIMARY};padding:14px 18px;color:#ffffff;font-family:ui-monospace,monospace;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;border-bottom:3px solid ${ACCENT};">Shipment summary</td>
    </tr>
    ${rowsHtml}
  </table>`;
}

export function contactFormReceived(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const content = `
    <p style="margin:0 0 20px;font-size:15px;">New contact form submission:</p>
    ${section("Name", data.name)}
    ${section("Email", `<a href="mailto:${data.email}" style="color:${PRIMARY};font-weight:600;">${data.email}</a>`)}
    ${section("Subject", data.subject)}
    ${section("Message", data.message.replace(/\n/g, "<br>"))}
  `;
  return baseLayout(content);
}

export function quoteRequestReceived(data: {
  origin: string;
  destination: string;
  weight: string;
  type: string;
  email: string;
}): string {
  const content = `
    <p style="margin:0 0 20px;font-size:15px;">New freight quote request from the website:</p>
    ${section("Inquirer email", data.email ? `<a href="mailto:${data.email}" style="color:${PRIMARY};font-weight:600;">${data.email}</a>` : "—")}
    ${section("Origin", data.origin || "—")}
    ${section("Destination", data.destination || "—")}
    ${section("Weight", data.weight || "—")}
    ${section("Type", data.type || "—")}
  `;
  return baseLayout(content);
}

export function shipmentCreated(data: {
  trackingId: string;
  trackingUrl: string;
  receiverName: string | null;
  summary: string;
  category: string | null;
  serviceType: string | null;
  weight: string | null;
  estimatedDelivery: string | null;
  supportEmail: string;
  productQuantity: string | null;
  productDetails: string | null;
  paymentMethodLabel: string | null;
}): string {
  const detailsHtml = data.productDetails
    ? escapeHtmlForEmail(data.productDetails).replace(/\n/g, "<br>")
    : "";
  const trackingCell = `<span style="font-family:ui-monospace,monospace;font-weight:700;font-size:15px;color:${PRIMARY_MID};letter-spacing:0.02em;">${escapeHtmlForEmail(data.trackingId)}</span>`;

  const rowSpecs: Array<{ label: string; value: string }> = [];
  if (data.receiverName) {
    rowSpecs.push({ label: "Recipient", value: escapeHtmlForEmail(data.receiverName) });
  }
  rowSpecs.push({ label: "Tracking ID", value: trackingCell });
  if (data.category) {
    rowSpecs.push({ label: "Category", value: escapeHtmlForEmail(data.category) });
  }
  if (data.serviceType) {
    rowSpecs.push({
      label: "Service",
      value: `<span style="text-transform:capitalize;">${escapeHtmlForEmail(data.serviceType)}</span>`,
    });
  }
  if (data.weight != null && data.weight !== "") {
    rowSpecs.push({ label: "Weight", value: escapeHtmlForEmail(data.weight) });
  }
  if (data.estimatedDelivery) {
    rowSpecs.push({ label: "Estimated delivery", value: escapeHtmlForEmail(data.estimatedDelivery) });
  }
  if (data.productQuantity != null && data.productQuantity !== "") {
    rowSpecs.push({ label: "Product quantity", value: escapeHtmlForEmail(data.productQuantity) });
  }
  if (data.productDetails) {
    rowSpecs.push({ label: "Product details", value: detailsHtml });
  }
  if (data.paymentMethodLabel) {
    rowSpecs.push({ label: "Payment method", value: escapeHtmlForEmail(data.paymentMethodLabel) });
  }

  const rowsHtml = rowSpecs
    .map((r, i) => shipmentTableRow(r.label, r.value, i === rowSpecs.length - 1))
    .join("");

  const summarySafe = escapeHtmlForEmail(data.summary);
  const content = `
    <p style="margin:0 0 18px;padding:14px 16px;background:${HIGHLIGHT_BG};border-left:4px solid ${ACCENT};font-size:15px;color:${PRIMARY};line-height:1.5;"><strong style="color:${PRIMARY};">Your shipment has been created.</strong> Use the table below for your reference.</p>
    ${shipmentDetailsTable(rowsHtml)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 20px;border:1px solid ${TABLE_BORDER};background:#ffffff;">
      <tr>
        <td style="padding:12px 14px;font-size:12px;font-weight:700;font-family:ui-monospace,monospace;letter-spacing:0.06em;text-transform:uppercase;color:${PRIMARY_MID};background:${ROW_LABEL_BG};width:34%;border-right:1px solid ${TABLE_BORDER};vertical-align:top;">Route</td>
        <td style="padding:12px 14px;font-size:14px;color:${PRIMARY};vertical-align:top;">${summarySafe}</td>
      </tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
      <tr>
        <td style="border-radius:0;">
          <a href="${data.trackingUrl}" style="display:inline-block;padding:14px 28px;background:${PRIMARY};color:#ffffff;text-decoration:none;font-family:ui-monospace,monospace;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;border:2px solid ${ACCENT};">View tracking</a>
        </td>
      </tr>
    </table>
    <p style="margin:20px 0 0;font-size:13px;color:${MUTED};line-height:1.55;">Questions? Email us at <a href="mailto:${data.supportEmail}" style="color:${PRIMARY_MID};font-weight:600;">${data.supportEmail}</a>.</p>
  `;
  return baseLayout(content);
}

export function shipmentUpdated(data: {
  trackingId: string;
  trackingUrl: string;
  status: string;
  location: string | null;
  description: string | null;
  occurredAt: string;
}): string {
  const statusLabel = data.status.replace(/_/g, " ");
  const content = `
    <p style="margin:0 0 16px;font-size:15px;">Your shipment has been updated.</p>
    ${section("Tracking ID", data.trackingId)}
    ${section("Status", statusLabel)}
    ${section("Time", data.occurredAt)}
    ${data.location ? section("Location", data.location) : ""}
    ${data.description ? section("Details", data.description) : ""}
    <p style="margin:20px 0 0;"><a href="${data.trackingUrl}" style="display:inline-block;padding:12px 20px;background:${PRIMARY};color:#fff;text-decoration:none;font-family:ui-monospace,monospace;font-size:12px;font-weight:600;letter-spacing:0.05em;">VIEW TRACKING</a></p>
  `;
  return baseLayout(content);
}
