import type { Metadata } from "next";
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
