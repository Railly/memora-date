export const siteConfig = {
  name: "Memora Date",
  url: "https://idk.example.io",
  ogImage:
    "https://raw.githubusercontent.com/Railly/website/main/public/images/og.png",
  description: "Reminders for important dates in your life 🎉",
  links: {
    twitter: "https://twitter.com/raillyhugo",
    github: "https://github.com/Railly/memora-date",
  },
  authors: [
    {
      name: "Railly Hugo",
      url: "https://raillyhugo.com",
    },
    {
      name: "Carlos Tarmeño",
      url: "https://www.linkedin.com/in/carlos-tarmeno/",
    },
    {
      name: "Edward Ramos",
      url: "https://www.linkedin.com/in/edward-junior-ramos-villarreal-550b27230",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
