import type { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { COMPANY_NAME, BASE_URL } from "@/constants/config";
import { SERVICES } from "@/constants/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Warehousing, FCL & LCL ocean freight, road freight, air cargo, pet transport, and vehicle shipping. Door-to-door logistics with real-time tracking.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | HANSNET LOGISTICS",
    description:
      "Warehousing, FCL & LCL ocean freight, road freight, air cargo, pet transport, and vehicle shipping.",
    url: "/services",
  },
  twitter: {
    title: "Our Services | HANSNET LOGISTICS",
    description: "Warehousing, ocean freight, air cargo, pet transport, and vehicle shipping.",
  },
};

export default function ServicesPage() {
  const baseUrl = BASE_URL ?? "https://hansnetlogistics.com";
  const servicesSchema = serviceSchema(
    SERVICES.map((s) => ({ title: s.title, description: s.description, longDescription: s.longDescription })),
    baseUrl,
    COMPANY_NAME
  );
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Our Services", url: `${baseUrl}/services` },
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd data={servicesSchema} />
      <JsonLd data={breadcrumb} />
      <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        Our Services
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground">
        From warehouse and freight to specialized pet and vehicle transport, we offer end-to-end
        logistics with tracking and support at every step.
      </p>

      <div className="mt-12 space-y-16">
        {SERVICES.map(({ id, title, longDescription, image }, index) => (
          <section
            key={id}
            className={cn(
              "grid gap-8 md:grid-cols-2 md:items-center",
              index % 2 === 1 && "md:grid-flow-dense"
            )}
          >
            <div className={cn(index % 2 === 1 && "md:col-start-2")}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none border-2 border-default bg-muted">
                <Image
                  src={image}
                  alt={`${title} - warehousing, freight, and logistics services`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className={cn(index % 2 === 1 && "md:col-start-1 md:row-start-1")}>
              <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-accent sm:text-2xl">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{longDescription}</p>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
