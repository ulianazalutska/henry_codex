import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://henry-private-showroom.urbanowiczseo.chatgpt.site"),
  title: "HENRY — Private Cinema Seating",
  description: "Premium seating and bespoke furniture created around the private cinema experience.",
  icons: { icon: "/media/henry-logo-gold.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
