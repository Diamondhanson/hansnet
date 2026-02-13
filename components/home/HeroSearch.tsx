"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const HERO_NAVY = "#0f172a";

const inputClass =
  "min-h-[48px] h-12 flex-shrink-0 rounded-none border-2 border-white/90 bg-white/95 px-4 text-[#0f172a] font-bold placeholder:text-slate-500 outline-none focus-visible:border-amber-500 focus-visible:ring-0 min-w-0";

export function HeroSearch() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (!trimmed) return;
      router.push(`/track/${encodeURIComponent(trimmed)}`);
    },
    [value, router]
  );

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-stretch">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="ENTER TRACKING OR BILL OF LADING ID..."
        className={cn(inputClass, "flex-1")}
        aria-label="Tracking or bill of lading ID"
      />
      <button
        type="submit"
        style={{ backgroundColor: HERO_NAVY }}
        className="flex min-h-[48px] h-12 flex-shrink-0 items-center justify-center rounded-none border-2 border-white px-6 font-bold text-white uppercase tracking-widest transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
      >
        TRACK SHIPMENT
      </button>
    </form>
  );
}
