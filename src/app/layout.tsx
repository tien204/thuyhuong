import type { Metadata } from "next";
import { Caveat, Inter, Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Đinh Thị Thủy Hương — Branding & Social Media",
  description:
    "Hồ sơ năng lực: Branding Planner, Social Media Executive, Marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn(inter.variable, montserrat.variable, caveat.variable, "font-sans", geist.variable)}
    >
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
