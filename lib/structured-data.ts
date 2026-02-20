/**
 * JSON-LD structured data helpers for SEO.
 * Used for Organization, FAQPage, Service, BreadcrumbList.
 */

export type JsonLdSchema = Record<string, unknown>;

export function organizationSchema(baseUrl: string, logoUrl: string, email: string, name: string): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: baseUrl,
    logo: `${baseUrl}${logoUrl}`,
    email,
    description:
      "International freight, ocean freight, air cargo, and warehousing with real-time shipment tracking.",
  };
}

export function faqPageSchema(
  items: Array<{ question: string; answer: string }>,
  baseUrl: string
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
    url: `${baseUrl}/faq`,
  };
}

export function serviceSchema(
  services: Array<{ title: string; description: string; longDescription?: string }>,
  baseUrl: string,
  providerName: string
): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: (s.longDescription ?? s.description).slice(0, 500),
        provider: { "@type": "Organization", name: providerName },
        url: `${baseUrl}/services`,
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
