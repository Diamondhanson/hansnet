const BRAND = "HANSNET LOGISTICS";
const PRIMARY = "#0f172a";
const ACCENT = "#f59e0b";
const BG = "#f8fafc";
const MUTED = "#64748b";

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

function section(title: string, body: string): string {
  return `
  <p style="margin:0 0 8px;font-family:ui-monospace,monospace;font-size:11px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:${PRIMARY};">${title}</p>
  <p style="margin:0 0 20px;font-size:14px;color:${PRIMARY};">${body}</p>`;
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
}): string {
  const content = `
    <p style="margin:0 0 16px;font-size:15px;">Your shipment has been created.</p>
    ${data.receiverName ? section("Recipient", data.receiverName) : ""}
    ${section("Tracking ID", data.trackingId)}
    ${data.category ? section("Category", data.category) : ""}
    ${data.serviceType ? section("Service", data.serviceType) : ""}
    ${data.weight != null && data.weight !== "" ? section("Weight", data.weight) : ""}
    ${data.estimatedDelivery ? section("Estimated delivery", data.estimatedDelivery) : ""}
    <p style="margin:16px 0 0;font-size:14px;">${data.summary}</p>
    <p style="margin:20px 0 0;"><a href="${data.trackingUrl}" style="display:inline-block;padding:12px 20px;background:${PRIMARY};color:#fff;text-decoration:none;font-family:ui-monospace,monospace;font-size:12px;font-weight:600;letter-spacing:0.05em;">VIEW TRACKING</a></p>
    <p style="margin:24px 0 0;font-size:14px;color:${MUTED};">If you have any questions, contact us at <a href="mailto:${data.supportEmail}" style="color:${PRIMARY};font-weight:600;">${data.supportEmail}</a>.</p>
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
