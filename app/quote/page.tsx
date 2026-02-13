import Link from "next/link";
import { COMPANY_NAME } from "@/constants/config";
import { Button } from "@/components/ui/button";

export default function QuotePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
