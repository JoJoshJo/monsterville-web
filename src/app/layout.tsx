import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: "TOWN STUDIOS | Premium Creative Production Company",
  description: "A luxury digital experience by Town Studios. We create, record, film, and inspire state-of-the-art visual and audio experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} h-full antialiased custom-cursor-active`}
    >
      <body className="min-h-full bg-[#080808] text-[#F5F5F5] selection:bg-[#FF5A1F] selection:text-white">
        {/* Grain overlay */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
