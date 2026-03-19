import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Etthos Journal of Psychology",
    template: "%s | Etthos Journal of Psychology",
  },
  description:
    "Etthos Journal of Psychology (EJP) is a peer-reviewed, open-access academic journal published by Etthos, dedicated to advancing research in psychology and behavioural sciences.",
  metadataBase: new URL("https://journal.etthos.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://journal.etthos.com",
    siteName: "Etthos Journal of Psychology",
    title: "Etthos Journal of Psychology",
    description:
      "A peer-reviewed, open-access journal publishing original research in psychology and behavioural sciences. Published by Etthos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etthos Journal of Psychology",
    description:
      "A peer-reviewed, open-access journal publishing original research in psychology and behavioural sciences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "citation_journal_title": "Etthos Journal of Psychology",
    "citation_publisher": "Etthos",
    "citation_language": "en",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "min-h-full bg-background font-sans text-foreground antialiased",
          playfair.variable,
          inter.variable
        )}
      >
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
