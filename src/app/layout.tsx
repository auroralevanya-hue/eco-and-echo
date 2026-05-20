import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eco & Echo — Air Quality Quest",
  description:
    "Breathe clean. Earn green. AR quest powered by Xiaomi Mi Air ecosystem — explore, breathe, earn NFT eco-badges.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0fb37a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
