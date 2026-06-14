import type { Metadata } from "next";
import "./globals.css";
import { Header, Marquee } from "@/components/layout";

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
        className="antialiased bg-black min-h-screen"
      >
        <Header />
        <main>
          {children}
        </main>
        <Marquee />
      </body>
    </html>
  );
}
