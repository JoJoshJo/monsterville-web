import type { Metadata } from "next";
import { Syne, Outfit, Bodoni_Moda, Space_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Technical voice — all the "01 / SECTION" micro-labels use font-mono; without a
// loaded face they fall back to Courier. Space Mono keeps the archival/technical feel.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Editorial accent voice (DESIGN-DIRECTION.md Move 2) — italic serif, used sparingly.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "TOWN STUDIOS | Premium Creative Production Company",
  description:
    "A luxury digital experience by Town Studios. We create, record, film, and inspire state-of-the-art visual and audio experiences.",
  openGraph: {
    title: "TOWN STUDIOS",
    description:
      "Cinematic vision meets sonic inertia. Recording, mixing, film and creative direction.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${bodoni.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#080808] text-[#F5F5F5] selection:bg-[#FF5A1F] selection:text-white">
        {/* Grain overlay */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
