import { en } from "@/content/en";
import { buildMetadata, viewport as siteViewport } from "@/lib/site";
import { SitePage } from "@/components/site/SitePage";

export const viewport = siteViewport;
export const metadata = buildMetadata(en, "/");

export default function Home() {
  return <SitePage t={en} />;
}
