import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_NAME, SUPPORT_EMAIL, BASE_URL } from "@/constants/config";
import { SERVICES } from "@/constants/services";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about HANSNET LOGISTICS—global freight forwarding, supply chain management, and shipping services. Decades of experience in air, ocean, and ground transport.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | HANSNET LOGISTICS",
    description:
      "Learn about HANSNET LOGISTICS—global freight forwarding, supply chain management, and shipping services.",
    url: "/about",
  },
  twitter: {
    title: "About Us | HANSNET LOGISTICS",
    description: "Global freight forwarding, supply chain management, and shipping services.",
  },
};

export default function AboutPage() {
  const baseUrl = BASE_URL ?? "https://hansnetlogistics.com";
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "About Us", url: `${baseUrl}/about` },
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={breadcrumb} />
      <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-accent sm:text-3xl">
        About Us
      </h1>

      <section className="mt-8 space-y-6 border-b border-default p-10">
        <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
          Who We Are
        </h2>
        <p className="max-w-3xl leading-relaxed text-foreground">
          {COMPANY_NAME} is a global freight forwarding and logistics company with a network of hubs and
          partners worldwide. We combine decades of experience in supply chain management with modern
          tracking and visibility so you know where your goods are from pickup to delivery.
        </p>
        <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
          What We Do
        </h2>
        <p className="max-w-3xl leading-relaxed text-foreground">
          We offer air freight, ocean freight (FCL and LCL), and ground transport with real-time
          tracking and customs clearance support. Whether you ship pallets, containers, or
          specialized cargo, we provide reliable service and clear communication at every step.
        </p>
        <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
          Our Values
        </h2>
        <p className="max-w-3xl leading-relaxed text-foreground">
          Transparency, reliability, and customer focus drive everything we do. We aim to make
          logistics simple and visible so you can run your business with confidence.
        </p>
        <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl mt-10">
          Our Services
        </h2>
        <p className="max-w-3xl leading-relaxed text-foreground mt-3">
          We offer warehouse storage, freight, and specialized transport so you have one partner for
          warehousing, ocean freight shipping, road freight, air cargo, pet relocation, and vehicle
          transport—door-to-door logistics with full visibility.
        </p>
        <ul className="mt-6 space-y-4 max-w-3xl">
          {SERVICES.map(({ id, title, description }) => (
            <li key={id} className="rounded-none border border-default bg-card p-10">
              <h3 className="font-mono text-base font-semibold uppercase tracking-wide text-accent">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-accent sm:text-2xl">
          Policies
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          <div className="rounded-none border border-default bg-card p-6">
            <h3 className="font-mono text-base font-semibold uppercase tracking-wide text-primary">
              Shipping Policy
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Delivery windows depend on service type and origin/destination. We provide estimated
              delivery dates at booking; actual times may vary due to customs, weather, or carrier
              capacity. Liability for loss or damage is subject to our terms of carriage. Claims
              must be reported in writing within the period stated in your contract. For full terms,
              contact us at{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-primary underline hover:text-primary/80">
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </div>
          <div className="rounded-none border border-default bg-card p-6">
            <h3 className="font-mono text-base font-semibold uppercase tracking-wide text-primary">
              Privacy Policy
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We collect contact and shipment data to provide tracking, quotes, and support. We use
              this information only for service delivery and do not sell it to third parties.
              Tracking and cookies help us improve our site and your experience. For details on data
              retention and your rights, contact us at{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-primary underline hover:text-primary/80">
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
        <div className="mt-6 rounded-none border border-default bg-card p-6">
          <h3 className="font-mono text-base font-semibold uppercase tracking-wide text-primary">
            Terms of Service & Claims
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Use of our services is subject to our terms of service and applicable law. Disputes and
            claims are handled according to the terms in your agreement. Full terms are available on
            request; contact us at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-primary underline hover:text-primary/80">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>

      <div className="mt-10">
        <Button asChild variant="outline" className="rounded-none border-2 uppercase tracking-widest">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
