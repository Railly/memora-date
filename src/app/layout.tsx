import "./globals.css";
import {
  Barlow_Semi_Condensed as FontSans,
  Ubuntu_Mono as FontMono,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layouts/sidebar";
import { useEffect } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import ValidateSession from "@/components/validateSession";
import { cookies } from "next/headers";

export const fontSans = FontSans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabaseRsc = createServerComponentClient({ cookies });

  // const {
  //   data: { session },
  // } = await supabaseRsc.auth.getSession();

  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans font-medium antialiased",
          fontMono.variable,
          fontSans.variable
        )}
      >
        {children}
        {/* <ValidateSession serverSession={session} /> */}
        <Toaster />
      </body>
    </html>
  );
}
