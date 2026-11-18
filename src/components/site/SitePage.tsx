import type { Dict } from "@/content/en";
import { Header } from "./Header";
import { Hero } from "./Hero";
import {
  AgentOfficeSection,
  ContactSection,
  CrnSection,
  ExperienceSection,
  ProjectsSection,
  SkillsSection,
} from "./Sections";

export function SitePage({ t }: { t: Dict }) {
  return (
    <>
      <Header t={t} />
      <main id="main">
        <Hero t={t} />
        <AgentOfficeSection t={t} />
        <CrnSection t={t} />
        <ProjectsSection t={t} />
        <ExperienceSection t={t} />
        <SkillsSection t={t} />
        <ContactSection t={t} />
      </main>
    </>
  );
}
