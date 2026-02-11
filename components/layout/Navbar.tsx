"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COMPANY_NAME } from "@/constants/config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const router = useRouter();
  const [trackId, setTrackId] = useState("");

  const handleTrackSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const id = trackId.trim();
      if (id) router.push(`/track/${encodeURIComponent(id)}`);
    },
    [trackId, router]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-default bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-bold uppercase tracking-tight text-primary hover:text-primary/90"
        >
          {COMPANY_NAME}
        </Link>

        <form
          onSubmit={handleTrackSubmit}
          className="flex flex-1 items-center justify-center gap-2 px-4 max-w-md"
        >
          <label htmlFor="quick-track" className="sr-only">
            Track by ID
          </label>
          <Input
            id="quick-track"
            type="text"
            placeholder="Quick Track — Enter ID"
            value={trackId}
            onChange={(e) => setTrackId(e.target.value)}
            className={cn("border-default h-9")}
          />
        </form>

        <Link href="/admin" className="shrink-0">
          <Button variant="outline" size="default" className="border-default">
            Admin Login
          </Button>
        </Link>
      </nav>
    </header>
  );
}
