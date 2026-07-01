import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Marquee } from "@/components/layout";

const interDisplay = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-display",
});

export const metadata: Metadata = {
  title: "ERBRANDING.STUDIO | Full Service Design Studio",
  description: "A full service design studio specialized in crafting visual identities, branding, web design, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${interDisplay.variable} antialiased bg-black min-h-screen`}
      >
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Marquee />
      </body>
    </html>
  );
}
