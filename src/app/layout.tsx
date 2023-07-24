import { siteConfig } from "@/config/site";
import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { fontMono, fontSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
  keywords: [
    "Event Reminders",
    "Birthday Reminders",
    "Anniversary Reminders",
    "Work Reminders",
    "Event Creations",
    "Important Dates Reminders",
  ],
  authors: [
    {
      name: "Railly Hugo",
      url: "https://raillyhugo.com",
    },
    {
      name: "Carlos Tarmeño",
      url: "",
    },
  ],
  creator: "Railly Hugo",
  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: "#1f2937",
    },
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@raillyhugo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontMono.variable,
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
