import type { Metadata } from "next";
import type { Dict } from "@/content/en";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gabrielmmoura-portfolio.vercel.app";
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
