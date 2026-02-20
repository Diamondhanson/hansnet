import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_NAME, BASE_URL } from "@/constants/config";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Freight Quote",
  description:
    "Get a free freight quote and shipping rates. Request pricing for ocean freight, air cargo, road transport, and specialized logistics.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Freight Quote | HANSNET LOGISTICS",
    description: "Get a free freight quote and shipping rates for ocean freight, air cargo, and road transport.",
    url: "/quote",
  },
  twitter: {
    title: "Freight Quote | HANSNET LOGISTICS",
    description: "Get a free freight quote and shipping rates.",
  },
};

export default function QuotePage() {
  const baseUrl = BASE_URL ?? "https://hansnetlogistics.com";
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Freight Quote", url: `${baseUrl}/quote` },
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumb} />
      <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        Freight Quote
      </h1>
      <p className="mt-4 text-muted-foreground">
        Full quote form and rate calculator coming soon. Contact {COMPANY_NAME} for immediate pricing.
      </p>
      <Button asChild variant="outline" className="mt-6 rounded-none border-2 uppercase tracking-widest">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
