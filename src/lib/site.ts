import type { Metadata, Viewport } from "next";
import type { Dict } from "@/content/en";

// No custom domain yet: on Vercel, fall back to the project's production URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const REPO_URL = "https://github.com/GabrielMMoura/portfolio";

export function buildMetadata(t: Dict, path: "/" | "/pt"): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: path,
      languages: { en: "/", "pt-BR": "/pt", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      title: t.meta.title,
      description: t.meta.description,
      url: path,
      locale: t.lang === "en" ? "en_US" : "pt_BR",
      images: [{ url: "/img/agentoffice-office-1600.webp", width: 1600, height: 900 }],
    },
  };
}

export const viewport: Viewport = { themeColor: "#dfdedb", colorScheme: "light" };
