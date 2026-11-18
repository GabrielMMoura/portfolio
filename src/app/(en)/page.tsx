import { en } from "@/content/en";
import { buildMetadata } from "@/lib/site";
import { SitePage } from "@/components/site/SitePage";

export const metadata = buildMetadata(en, "/");

export default function Home() {
  return <SitePage t={en} />;
}
