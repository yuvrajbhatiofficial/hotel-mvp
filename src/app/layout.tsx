import type { Metadata } from "next";
import { Urbanist, Gilda_Display } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const gildaDisplay = Gilda_Display({
  variable: "--font-gilda-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE GRAND HAVEN — Boutique Luxury Hotel & Sanctuary",
  description:
    "Discover a place where thoughtful hospitality meets unforgettable experiences. Explore our curated rooms, serene spa, fine dining, and request your stay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${gildaDisplay.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#fdf0e7] text-[#1d1a1c] font-sans selection:bg-[#f7d9c6] selection:text-[#1d1a1c] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
