import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdAegis — Defend and attack in Google Ads, automatically",
  description:
    "AdAegis is a competitive intelligence and automation platform for Google Ads: monitor competitors, defend your brand terms, and launch attack campaigns from one workflow engine. Product demo — mock data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
