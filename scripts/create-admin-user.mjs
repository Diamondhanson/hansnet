#!/usr/bin/env node
/**
 * Create a Supabase Auth user (email + password) with email already confirmed.
 * Same outcome as Authentication → Users → Add user, but scriptable.
 *
 * Requires in .env.local (or env):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  (never commit; never expose to the browser)
 *
 * Usage:
 *   node scripts/create-admin-user.mjs admin@yourdomain.com 'YourSecurePassword'
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvLocal() {
  const p = path.join(root, ".env.local");
  if (!fs.existsSync(p)) return;
  const text = fs.readFileSync(p, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const [email, password] = process.argv.slice(2);

if (!url || !serviceRole) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (check .env.local)."
  );
  process.exit(1);
}

if (!email || !password) {
  console.error(
    "Usage: node scripts/create-admin-user.mjs <email> <password>\n" +
      "Tip: avoid shell history by setting env vars and using a here-doc or 1Password CLI."
  );
  process.exit(1);
}

const api = `${url.replace(/\/$/, "")}/auth/v1/admin/users`;

const res = await fetch(api, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    apikey: serviceRole,
    Authorization: `Bearer ${serviceRole}`,
  },
  body: JSON.stringify({
    email,
    password,
    email_confirm: true,
  }),
});

const body = await res.text();
if (!res.ok) {
  console.error(`HTTP ${res.status}: ${body}`);
  process.exit(1);
}

console.log("Created user (email confirmed). You can sign in at /admin/login.");
console.log(body);
