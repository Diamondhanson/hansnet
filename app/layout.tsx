import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter, Roboto_Mono } from "next/font/google";
import { COMPANY_NAME, SUPPORT_EMAIL, SUPPORT_PHONE_TEL, BASE_URL } from "@/constants/config";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = BASE_URL ?? "https://hansnetlogistics.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${COMPANY_NAME} | Freight, Shipping & Logistics Tracking`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description:
    "International freight, ocean freight, air cargo, and warehousing with real-time shipment tracking. Trusted logistics partner for supply chain visibility.",
  keywords: [
    "logistics",
    "freight shipping",
    "ocean freight",
    "air cargo",
    "warehousing",
    "shipment tracking",
    "pet transport",
    "vehicle shipping",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: COMPANY_NAME,
    title: `${COMPANY_NAME} | Freight, Shipping & Logistics Tracking`,
    description:
      "International freight, ocean freight, air cargo, and warehousing with real-time shipment tracking.",
    images: [{ url: "/logo.png", width: 220, height: 56, alt: COMPANY_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} | Freight, Shipping & Logistics Tracking`,
    description: "International freight, ocean freight, air cargo, and warehousing with real-time shipment tracking.",
  },
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
  const orgSchema = organizationSchema(baseUrl, "/logo.png", SUPPORT_EMAIL, COMPANY_NAME, SUPPORT_PHONE_TEL);

  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://supabase.co" />
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        <JsonLd data={orgSchema} />
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
