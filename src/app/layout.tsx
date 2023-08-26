import "./globals.css";
import {
  Barlow_Semi_Condensed as FontSans,
  Ubuntu_Mono as FontMono,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ServerThemeProvider } from "@wits/next-themes";

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
    {
      name: "Edward Ramos",
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
    <ServerThemeProvider attribute="class">
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans font-medium antialiased pb-16",
            fontMono.variable,
            fontSans.variable
          )}
        >
          {children}
          {/* <ValidateSession serverSession={session} /> */}
          <Toaster />
          <div className="vertical-fade" />
        </body>
      </html>
    </ServerThemeProvider>
  );
}
