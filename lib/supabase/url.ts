/**
 * Supabase requires a full URL with protocol. Values like "xxx.supabase.co"
 * cause fetch to fail with "Failed to fetch" in the browser.
 */
export function normalizeSupabaseUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
}
