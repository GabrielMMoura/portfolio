import { pt } from "@/content/pt";
import { buildMetadata, viewport as siteViewport } from "@/lib/site";
import { SitePage } from "@/components/site/SitePage";

export const viewport = siteViewport;
export const metadata = buildMetadata(pt, "/pt");

export default function HomePt() {
  return <SitePage t={pt} />;
}
