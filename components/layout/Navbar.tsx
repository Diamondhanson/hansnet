"use client";

import Link from "next/link";
import { COMPANY_NAME } from "@/constants/config";

const navLinkClass =
  "font-mono text-sm font-medium uppercase tracking-wide text-primary hover:text-primary/80 transition-colors";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-default bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-bold uppercase tracking-tight text-primary hover:text-primary/90">
          {COMPANY_NAME}
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/about" className={navLinkClass}>
            About Us
          </Link>
          <Link href="/contact" className={navLinkClass}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
