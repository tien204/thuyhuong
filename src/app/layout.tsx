import type { Metadata } from "next";
import { Caveat, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

const siteTitle = "Đinh Thị Thủy Hương — Branding & Social Media";
const siteDescription =
  "Hồ sơ năng lực: Branding Planner, Social Media Executive, Marketing. Case study here.olong, Titan Agency, Eclipse Clothing.";
const ogImageAlt = "Đinh Thị Thủy Hương — Branding & Social Media";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn(inter.variable, caveat.variable, "font-sans")}>
      <body className="overflow-x-hidden">
        <a
          href="#profile"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-pill)] focus:bg-[var(--color-primary)] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[var(--color-on-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-green-accent)] focus:ring-offset-2"
        >
          Bỏ qua tới nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
