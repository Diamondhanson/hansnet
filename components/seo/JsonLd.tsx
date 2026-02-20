/**
 * Injects JSON-LD structured data into the page for SEO.
 * Renders a script tag with type="application/ld+json".
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
