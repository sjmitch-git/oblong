import type { Metadata } from "next";

export const AppConfig = {
  name: "Oblong IT Services",
  shortName: "Oblong",
  title: "Oblong – IT Services & Portfolio",
  description:
    "Oblong offers professional IT services, web development, and digital solutions. Explore our portfolio and discover how we can help your business grow.",
  keywords: "IT services, web development, portfolio, digital solutions, consulting, Oblong",
  author: "Stephen Mitchell",
  authorUrl: "https://www.linkedin.com/in/stephen-m-52a3a4192/",
  authorEmail: "oblongdigital@proton.me",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/",
};

export const MetaData: Metadata = {
  title: {
    template: `%s | ${AppConfig.name}`,
    default: AppConfig.name,
  },
  description: AppConfig.description,
  keywords: AppConfig.keywords,
  authors: [{ name: AppConfig.author, url: AppConfig.authorUrl }],
  creator: AppConfig.author,
  manifest: "/manifest.json",
  openGraph: {
    title: AppConfig.title,
    description: AppConfig.description,
    type: "website",
    url: AppConfig.baseUrl,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}icon.png`,
        alt: `${AppConfig.name} logo`,
        width: 603,
        height: 603,
      },
    ],
    siteName: AppConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: AppConfig.title,
    description: AppConfig.description,
    creator: AppConfig.author,
  },
  other: {
    "og:logo": `${process.env.NEXT_PUBLIC_API_URL}logo.png`,
    "theme-color": "#000000",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
  metadataBase: new URL(AppConfig.baseUrl),
  alternates: {
    canonical: AppConfig.baseUrl,
  },
  icons: {
    icon: [
      {
        url: "/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        url: "/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};
