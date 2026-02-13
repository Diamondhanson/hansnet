"use client";

import Link from "next/link";
import Image from "next/image";
import { COMPANY_NAME } from "@/constants/config";

const navLinkClass =
  "font-mono text-sm font-medium uppercase tracking-wide text-primary rounded-sm px-3 py-2 -mx-3 -my-2 transition-colors duration-200 hover:bg-accent/15 hover:text-accent";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-default bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center rounded-sm px-2 py-2 -mx-2 -my-2 transition-colors duration-200 hover:bg-accent/15"
        >
          <Image
            src="/logo.png"
            alt={COMPANY_NAME}
            width={220}
            height={56}
            className="h-17 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/about" className={navLinkClass}>
            About Us
          </Link>
          <Link href="/faq" className={navLinkClass}>
            FAQ
          </Link>
          <Link href="/contact" className={navLinkClass}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
