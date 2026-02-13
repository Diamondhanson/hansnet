import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, Roboto_Mono } from "next/font/google";
import { COMPANY_NAME, SUPPORT_EMAIL } from "@/constants/config";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${COMPANY_NAME} – Logistics Tracking`,
  description: "Corporate-industrial logistics tracking and shipment visibility",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        <Navbar />
        {children}
        <Toaster />
        <footer className="border-t border-default bg-muted/30 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
            <Link href="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <Image
                src="/logo.png"
                alt={COMPANY_NAME}
                width={220}
                height={56}
                className="h-19 w-auto object-contain"
              />
            </Link>
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} {COMPANY_NAME}.{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="underline hover:text-foreground"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
