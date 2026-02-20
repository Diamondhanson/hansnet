import type { Metadata } from "next";
import Image from "next/image";
import { BASE_URL } from "@/constants/config";
import Link from "next/link";
import {
  Plane,
  Ship,
  Truck,
  Warehouse,
  Car,
  Dog,
  FileText,
  Package,
  PackagePlus,
  Users,
  Globe,
  TrendingUp,
} from "lucide-react";
import { COMPANY_NAME, SUPPORT_EMAIL } from "@/constants/config";
import { SERVICES } from "@/constants/services";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/home/HeroSearch";
import { AnimatedSection } from "@/components/home/AnimatedSection";
import { AboutCarousel } from "@/components/home/AboutCarousel";
import { HomeQuoteForm } from "@/components/home/HomeQuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const HERO_IMAGE = "/hero.jpg";
// Tiny placeholder for blur effect during load
const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBRIhMQYTQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/ALe2tmjEccEaRxqAqKoAUDoAV//Z";

const RIBBON_STATS = [
  "LIVE SHIPMENTS: 3,402",
  "GLOBAL HUBS: 14",
  "AVG. TRANSIT: 4.2D",
  "SATELLITE SYNC: ACTIVE",
] as const;

const CAPABILITIES = [
  {
    icon: Plane,
    title: "Air Freight",
    description: "Express international air cargo with real-time tracking and customs clearance.",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description: "Full-container and LCL ocean shipping across major trade lanes.",
  },
  {
    icon: Truck,
    title: "Ground Transport",
    description: "Domestic and cross-border road freight with hub-to-hub visibility.",
  },
] as const;

const SERVICE_ICONS: Record<string, typeof Plane> = {
  warehouse: Warehouse,
  "ocean-freight": Ship,
  "road-freight": Truck,
  "air-freight": Plane,
  "pet-transport": Dog,
  "auto-transport": Car,
};

const PROCESS_STEPS = [
  {
    icon: FileText,
    title: "Get Your Quote",
    description:
      "Share your origin, destination, and cargo details. We respond with a clear quote and service options so you can choose what fits.",
  },
  {
    icon: Package,
    title: "We Pick Up",
    description:
      "We collect your goods at your location—warehouse, office, or home. You get a pickup confirmation and tracking from day one.",
  },
  {
    icon: PackagePlus,
    title: "Pack & Prepare",
    description:
      "We handle packaging, labeling, and documentation. Your shipment is secured and ready for the chosen mode of transport.",
  },
  {
    icon: Truck,
    title: "Transport & Deliver",
    description:
      "We move your goods by road, air, or ocean and deliver to the final address. Track the journey in real time until it arrives.",
  },
] as const;

const STATS = [
  { icon: Package, value: "50K+", label: "Products Shipped" },
  { icon: Users, value: "2,500+", label: "Satisfied Clients" },
  { icon: Globe, value: "45+", label: "Countries Served" },
  { icon: TrendingUp, value: "98%", label: "On-Time Delivery" },
] as const;

export default function Home() {
  const baseUrl = BASE_URL ?? "https://hansnetlogistics.com";
  const breadcrumb = breadcrumbSchema([{ name: "Home", url: baseUrl }]);

  return (
    <div className="flex flex-col">
      <JsonLd data={breadcrumb} />
      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b-2 border-primary">
        <div className="relative aspect-[21/9] w-full min-h-[320px] sm:min-h-[400px] md:aspect-[3/1]">
          <Image
            src={HERO_IMAGE}
            alt="Cargo ship and logistics warehouse — global supply chain"
            fill
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 2000px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blueprint bg-[#0f172a]/50" />
          <AnimatedSection className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="font-mono text-3xl font-bold uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl">
              {COMPANY_NAME}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:text-xl">
              International freight, air & ocean shipping with real-time logistics tracking and shipment visibility
            </p>
            <HeroSearch />
          </AnimatedSection>
        </div>
      </section>

      {/* Operations Ribbon */}
      <AnimatedSection delay={0.1}>
        <div className="w-full border-b-2 border-[#0f172a] bg-[#0f172a] py-4">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 sm:px-6 lg:px-8">
            {RIBBON_STATS.map((stat) => (
              <span key={stat} className="font-mono text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
                {stat}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* About Us: carousel left, paragraph right */}
      <AnimatedSection delay={0.12}>
        <AboutCarousel />
      </AnimatedSection>

      {/* Our Services */}
      <AnimatedSection delay={0.14} className="border-b border-default">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
            Our Services
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            From warehouse and freight to specialized pet and vehicle transport, we offer end-to-end
            logistics with tracking and support at every step.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ id, title, description, image }) => {
              const Icon = SERVICE_ICONS[id];
              return (
                <div
                  key={id}
                  className="min-h-[320px] overflow-hidden rounded-none border border-default border-t-4 border-t-accent bg-card"
                >
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={image}
                      alt={`${title} service - ${description}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="size-6 shrink-0 text-primary" aria-hidden />}
                      <h3 className="font-mono text-xl font-bold uppercase tracking-tight text-accent">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </AnimatedSection>

      {/* By the numbers */}
      <AnimatedSection delay={0.15} className="border-b border-default">
        <section className="relative bg-muted/30 bg-blueprint py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-accent sm:text-3xl">
            By the Numbers
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center sm:items-start sm:text-left"
                >
                  <Icon className="size-10 text-primary" aria-hidden />
                  <span className="mt-3 font-mono text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    {value}
                  </span>
                  <span className="mt-1 text-sm font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Process */}
      <AnimatedSection delay={0.16} className="border-b border-default">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
            Our Process
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            From your first quote to final delivery—we handle pickup, packaging, and transport so you
            have one partner and full visibility.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className="rounded-none border border-default border-t-4 border-t-accent bg-card p-8"
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  Step {i + 1}
                </span>
                <Icon className="mt-4 size-12 text-primary" aria-hidden />
                <h3 className="mt-5 font-mono text-xl font-bold uppercase tracking-tight text-accent">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Get a Freight Quote */}
      <AnimatedSection delay={0.2} className="border-b border-default">
        <section className="relative bg-muted/30 bg-blueprint py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-accent sm:text-3xl">
            Get a Freight Quote
            </h2>
            <HomeQuoteForm />
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection delay={0.25} className="border-b border-default">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
            What Our Clients Say
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <blockquote className="rounded-none border border-default border-l-4 border-l-accent bg-card p-6">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                &ldquo;Visibility from pickup to delivery. We switched to {COMPANY_NAME} and never looked back.&rdquo;
              </p>
              <footer className="mt-4 font-mono text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
                — Operations Director, Retail
              </footer>
            </blockquote>
            <blockquote className="rounded-none border border-default border-l-4 border-l-accent bg-card p-6">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                &ldquo;Reliable air and ocean options with one point of contact. Exactly what we needed.&rdquo;
              </p>
              <footer className="mt-4 font-mono text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
                — Supply Chain Manager, Manufacturing
              </footer>
            </blockquote>
            <blockquote className="rounded-none border border-default border-l-4 border-l-accent bg-card p-6 sm:col-span-2 lg:col-span-1">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                &ldquo;On-time, tracked, and transparent. Our go-to partner for international freight.&rdquo;
              </p>
              <footer className="mt-4 font-mono text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm">
                — Logistics Lead, E‑commerce
              </footer>
            </blockquote>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection delay={0.3}>
        <section id="contact" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-accent sm:text-3xl">
            Contact
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get in touch for quotes and support:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="font-mono font-medium text-primary underline hover:text-primary/80">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </section>
      </AnimatedSection>
    </div>
  );
}
