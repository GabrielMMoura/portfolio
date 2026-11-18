import { pt } from "@/content/pt";
import { buildMetadata } from "@/lib/site";
import { SitePage } from "@/components/site/SitePage";

export const metadata = buildMetadata(pt, "/pt");

export default function HomePt() {
  return <SitePage t={pt} />;
}
