import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { COMPANY_NAME, SUPPORT_EMAIL } from "@/constants/config";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `FAQ – ${COMPANY_NAME}`,
  description: `Common questions about ${COMPANY_NAME} freight quotes, shipment tracking, services, and support.`,
};

type FaqCategory = "getting-started" | "services-delivery" | "support";

const FAQ_ITEMS: Array<{
  question: string;
  answer: string;
  category: FaqCategory;
}> = [
  {
    question: "How do I get a freight quote?",
    answer:
      "Use the quote form on our home page to submit your origin, destination, weight, and cargo type. We also offer a full quote form at /quote. Our team will respond with options and pricing. You can also contact us directly for complex or high-volume shipments.",
    category: "getting-started",
  },
  {
    question: "How can I track my shipment?",
    answer:
      "Once your shipment is created, you receive a tracking ID and a tracking link. Visit our track page and enter your tracking ID to see status updates, location, and estimated delivery. You can also receive email updates if you provide a receiver email when the shipment is created.",
    category: "getting-started",
  },
  {
    question: "What services do you offer?",
    answer:
      `${COMPANY_NAME} offers warehouse and storage, ocean freight, road freight, air freight, pet transport, and auto transport. We handle packaging, documentation, and customs support where applicable. See our About page or home page for full service details.`,
    category: "services-delivery",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. We ship internationally by air, ocean, and road. We work with customs and documentation for cross-border moves. Delivery times and requirements depend on origin, destination, and service type—get a quote or contact us for specifics.",
    category: "services-delivery",
  },
  {
    question: "What are typical delivery times?",
    answer:
      "Delivery times vary by service and route. Air freight is fastest (often days); ocean and road can take longer depending on distance and customs. We provide an estimated delivery date at booking and update it as the shipment moves. Track your shipment for the latest status.",
    category: "services-delivery",
  },
  {
    question: "Do you handle customs and documentation?",
    answer:
      "Yes. We assist with customs clearance and required documentation for international shipments. Requirements depend on the countries and type of goods. Our team can guide you on what is needed; contact us or mention your route when requesting a quote.",
    category: "services-delivery",
  },
  {
    question: "Do you offer warehouse or storage?",
    answer:
      "Yes. We offer warehouse and storage as part of our services—secure storage, pick-and-pack, and distribution from our network of hubs. This can be combined with our freight services for end-to-end logistics. Ask about storage when requesting a quote.",
    category: "services-delivery",
  },
  {
    question: "How do I contact support?",
    answer:
      `Use our Contact page to send a message, or email us at ${SUPPORT_EMAIL}. We use this for quotes, tracking questions, and general support. For urgent shipment issues, include your tracking ID and we will respond as quickly as possible.`,
    category: "support",
  },
];

const CATEGORY_LABELS: Record<FaqCategory, string> = {
  "getting-started": "Getting started",
  "services-delivery": "Services & delivery",
  support: "Support",
};

const CATEGORY_ORDER: FaqCategory[] = ["getting-started", "services-delivery", "support"];

function getItemsByCategory() {
  const byCategory: Record<FaqCategory, typeof FAQ_ITEMS> = {
    "getting-started": [],
    "services-delivery": [],
    support: [],
  };
  FAQ_ITEMS.forEach((item) => byCategory[item.category].push(item));
  return CATEGORY_ORDER.map((cat) => ({ category: cat, items: byCategory[cat] }));
}

export default function FAQPage() {
  const grouped = getItemsByCategory();
  let globalIndex = 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-mono text-2xl font-bold uppercase tracking-tight text-primary sm:text-3xl">
        Frequently Asked Questions
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Find answers to common questions about our services, tracking, and support.
      </p>

      <section className="relative mt-8 bg-muted/30 bg-blueprint py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {grouped.map(({ category, items }) =>
              items.length === 0 ? null : (
                <div key={category}>
                  <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary sm:text-base">
                    {CATEGORY_LABELS[category]}
                  </h2>
                  <div className="mt-4 space-y-2">
                    {items.map(({ question, answer }) => {
                      globalIndex += 1;
                      const num = String(globalIndex).padStart(2, "0");
                      return (
                        <details
                          key={question}
                          className="group rounded-none border border-default border-l-4 border-l-accent bg-card"
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-mono text-base font-semibold tracking-wide text-primary hover:bg-muted/50 sm:text-lg [&::-webkit-details-marker]:hidden">
                            <span className="flex items-center gap-4">
                              <span className="shrink-0 font-mono text-sm text-accent">
                                {num}
                              </span>
                              <span>{question}</span>
                            </span>
                            <ChevronDown
                              className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                              aria-hidden
                            />
                          </summary>
                          <div className="border-t border-default px-5 pb-5 pt-4">
                            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                              {answer}
                            </p>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
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
