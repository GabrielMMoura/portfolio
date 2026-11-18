import "../globals.css";
import { RootDocument } from "@/components/site/RootDocument";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
