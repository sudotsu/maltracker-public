import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import { incident } from "@/data/incident";
import { publicSite } from "@/data/public-site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(publicSite.url),
  applicationName: publicSite.title,
  title: publicSite.title,
  description: publicSite.description,
  authors: [{ name: publicSite.responder.name, url: publicSite.responder.url }],
  creator: publicSite.responder.name,
  publisher: publicSite.responder.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "article",
    url: "/",
    title: publicSite.title,
    description: publicSite.description,
    siteName: publicSite.title,
    publishedTime: "2026-08-17",
    modifiedTime: incident.lastReviewed,
    authors: [publicSite.responder.url],
  },
  twitter: {
    card: "summary_large_image",
    title: publicSite.title,
    description: publicSite.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/incident-mark.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
