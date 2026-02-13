import Image from "next/image";
import Link from "next/link";
import { Plane, Ship, Truck } from "lucide-react";
import { COMPANY_NAME, SUPPORT_EMAIL } from "@/constants/config";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/home/HeroSearch";
import { AnimatedSection } from "@/components/home/AnimatedSection";
import { AboutCarousel } from "@/components/home/AboutCarousel";
import { HomeQuoteForm } from "@/components/home/HomeQuoteForm";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000";

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

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative w-full overflow-hidden border-b-2 border-primary">
        <div className="relative aspect-[21/9] w-full min-h-[320px] sm:min-h-[400px] md:aspect-[3/1]">
          <Image
            src={HERO_IMAGE_URL}
            alt="Cargo ship and logistics warehouse — global supply chain"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 2000px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blueprint bg-[#0f172a]/50" />
          <AnimatedSection className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="font-mono text-3xl font-bold uppercase tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-4xl md:text-5xl">
              {COMPANY_NAME}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:text-xl">
              Logistics tracking and shipment visibility for modern supply chains
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

      {/* Core Capabilities */}
      <AnimatedSection delay={0.15} className="border-b border-default">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
            Core Capabilities
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="min-h-[220px] rounded-none border border-default border-t-4 border-t-accent bg-card p-10"
              >
                <Icon className="size-14 text-primary" aria-hidden />
                <h3 className="mt-6 font-mono text-lg font-bold uppercase tracking-tight text-primary">
                  {title}
                </h3>
                <p className="mt-3 text-base text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Get a Freight Quote */}
      <AnimatedSection delay={0.2} className="border-b border-default">
        <section className="relative bg-muted/30 bg-blueprint py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
              Get a Freight Quote
            </h2>
            <HomeQuoteForm />
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection delay={0.25} className="border-b border-default">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
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
          <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
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
