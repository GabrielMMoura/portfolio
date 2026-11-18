import "../../globals.css";
import { RootDocument } from "@/components/site/RootDocument";

export default function PortugueseLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="pt-BR">{children}</RootDocument>;
}
