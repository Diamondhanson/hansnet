import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_NAME, SUPPORT_EMAIL, BASE_URL } from "@/constants/config";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free quote and logistics support. Contact HANSNET LOGISTICS for freight quotes, shipment tracking, and shipping inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | HANSNET LOGISTICS",
    description: "Get a free quote and logistics support. Contact us for freight quotes and shipment tracking.",
    url: "/contact",
  },
  twitter: {
    title: "Contact | HANSNET LOGISTICS",
    description: "Get a free quote and logistics support.",
  },
};

export default function ContactPage() {
  const baseUrl = BASE_URL ?? "https://hansnetlogistics.com";
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Contact", url: `${baseUrl}/contact` },
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumb} />
      <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        Contact
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Get in touch for quotes and support. Fill out the form below or email us directly.
      </p>

      <div className="mt-8 rounded-none border border-default bg-card p-6 sm:p-8 max-w-xl">
        <ContactForm />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Or email us directly:{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="font-mono font-medium text-primary underline hover:text-primary/80"
        >
          {SUPPORT_EMAIL}
        </a>
      </p>

      <div className="mt-10">
        <Button asChild variant="outline" className="rounded-none border-2 uppercase tracking-widest">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
