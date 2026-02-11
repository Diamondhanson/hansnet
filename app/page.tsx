import Image from "next/image";
import Link from "next/link";
import { COMPANY_NAME } from "@/constants/config";
import { Button } from "@/components/ui/button";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full overflow-hidden border-b border-default">
        <div className="relative aspect-[21/9] w-full min-h-[320px] sm:min-h-[400px] md:aspect-[3/1]">
          <Image
            src={HERO_IMAGE_URL}
            alt="Cargo ship and logistics warehouse — global supply chain"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 2000px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blueprint bg-primary/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="font-mono text-3xl font-bold uppercase tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
              {COMPANY_NAME}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-white/95 drop-shadow-sm sm:text-xl">
              Logistics tracking and shipment visibility for modern supply chains
            </p>
            <Link href="/track/sample" className="mt-6">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 border-0"
              >
                Track a shipment
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center font-sans text-muted-foreground">
          Use the Quick Track bar above to enter a shipment or tracking ID.
        </p>
      </section>
    </div>
  );
}
