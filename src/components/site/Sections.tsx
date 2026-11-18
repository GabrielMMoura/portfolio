import type { Dict } from "@/content/en";
import { REPO_URL } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { Container, ExternalLink, FactRows, Rich, SectionMeta } from "./primitives";

export function AgentOfficeSection({ t }: { t: Dict }) {
  const s = t.agentoffice;
  return (
    <section id="agentoffice" aria-labelledby="ao-title" className="py-20 md:py-28">
      <Container>
        <SectionMeta items={s.meta} />
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="ao-title" className="text-[30px] sm:text-[40px] lg:tracking-[-0.03em]">
              {s.title}
            </h2>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.6]">{s.intro}</p>
            <p className="mt-6 text-[15px]">
              <ExternalLink href={s.link.href} hrefLang="pt-BR" className="inline-block py-2.5 font-medium">
                {s.link.label}
              </ExternalLink>
              <span className="ml-2 text-muted">· {s.linkNote}</span>
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.06em] text-muted">{s.builtTitle}</p>
            <FactRows rows={s.built} />
          </div>
        </div>

        <div className="mt-16 rounded-md border border-ink/20 bg-paper/60 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-[24px]">{s.diagramTitle}</h3>
          </div>
          <ArchitectureDiagram d={s.diagram} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.06em] text-muted">{s.rulesTitle}</p>
            <ol className="border-t border-line">
              {s.rules.map((r, i) => (
                <li key={r} className="grid grid-cols-[40px_1fr] border-b border-line py-3 leading-6">
                  <span className="font-mono text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.06em] text-muted">{s.notYetTitle}</p>
            <ul className="border-t border-line">
              {s.notYet.map((n) => (
                <li key={n} className="flex gap-3 border-b border-line py-3 leading-6 text-muted">
                  <span aria-hidden="true" className="font-mono">
                    ○
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CrnSection({ t }: { t: Dict }) {
  const s = t.crn;
  return (
    <section id="crn" aria-labelledby="crn-title" className="inv bg-inv-bg py-20 text-inv-ink md:py-28">
      <Container>
        <SectionMeta items={s.meta} inverse />
        <h2 id="crn-title" className="mt-10 max-w-[22ch] text-[30px] sm:text-[40px] lg:tracking-[-0.03em]">
          {s.title}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 border-y border-inv-line py-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-inv-muted">{s.figureLabel}</p>
            <p className="mt-3 text-[26px] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[34px] lg:text-[40px]">
              {s.figure}
            </p>
          </div>
          <div className="lg:col-span-4 lg:border-l lg:border-inv-line lg:pl-10">
            <p className="flex flex-wrap items-baseline gap-x-3 text-[34px] font-medium tracking-[-0.02em] lg:text-[40px]">
              <span className="whitespace-nowrap text-inv-muted line-through decoration-1">{s.onboarding.from}</span>
              <span aria-hidden="true" className="text-[24px] text-inv-muted">
                →
              </span>
              <span className="whitespace-nowrap">{s.onboarding.to}</span>
            </p>
            <p className="mt-2 max-w-[32ch] text-[15px] leading-6 text-inv-muted">{s.onboarding.label}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="space-y-4 text-[17px] leading-[1.6] lg:col-span-5">
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="pt-2 text-[15px]">
              <ExternalLink href={s.link.href} hrefLang="pt-BR" className="inline-block py-2.5 font-medium">
                {s.link.label}
              </ExternalLink>
              <span className="ml-2 text-inv-muted">· {s.linkNote}</span>
            </p>
          </div>
          <div className="space-y-10 lg:col-span-7">
            <div>
              <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.06em] text-inv-muted">{s.stackTitle}</p>
              <FactRows rows={s.stack} inverse labelWidth="sm:grid-cols-[96px_1fr]" />
            </div>
            <div>
              <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.06em] text-inv-muted">{s.featuresTitle}</p>
              <ul className="grid grid-cols-1 border-t border-inv-line sm:grid-cols-2 sm:gap-x-8">
                {s.features.map((f) => (
                  <li key={f} className="border-b border-inv-line py-3 leading-6">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProjectsSection({ t }: { t: Dict }) {
  const s = t.projects;
  const e = s.emporio;
  const c = s.crm;
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 md:py-28">
      <Container>
        <SectionMeta items={s.meta} />
        <h2 id="projects-title" className="mt-10 max-w-[24ch] text-[30px] sm:text-[40px] lg:tracking-[-0.03em]">
          {s.title}
        </h2>

        {/* Emporio Agent: decision log */}
        <article aria-labelledby="emporio-title" className="mt-14">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 id="emporio-title" className="text-[24px]">
                {e.name}
              </h3>
              <p className="mt-4 max-w-[60ch] leading-[1.6]">{e.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[13px] text-muted">
                {e.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="mt-3 text-[15px]">
                <ExternalLink href={e.repo} className="inline-block py-2.5 font-medium">
                  {s.repoLabel}
                </ExternalLink>
              </p>
            </div>
            <blockquote className="self-start border-t-2 border-accent pt-5 text-[20px] leading-[1.45] tracking-[-0.01em] lg:col-span-7 lg:mt-1 lg:text-[22px]">
              {e.rule}
            </blockquote>
          </div>

          <div className="mt-10">
            <h4 className="mb-3 font-mono text-[13px] uppercase tracking-[0.06em] text-muted">{e.logTitle}</h4>
            <table className="w-full border-t border-ink/25 text-left text-[15px] leading-6">
              <thead className="sr-only md:not-sr-only">
                <tr className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted">
                  {e.cols.map((col) => (
                    <th key={col} scope="col" className="py-3 pr-6 font-normal">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {e.log.map((row) => (
                  <tr key={row.d} className="grid grid-cols-1 gap-1 border-t border-line py-4 md:table-row md:py-0">
                    <th scope="row" className="font-medium md:w-[28%] md:py-4 md:pr-6 md:align-top">
                      {row.d}
                    </th>
                    <td className="text-muted md:w-[40%] md:py-4 md:pr-6 md:align-top">
                      <span className="font-mono text-[12px] uppercase md:hidden">{e.cols[1]}: </span>
                      <Rich text={row.w} />
                    </td>
                    <td className="md:py-4 md:align-top">
                      <span className="font-mono text-[12px] uppercase text-muted md:hidden">{e.cols[2]}: </span>
                      <Rich text={row.e} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* Mini CRM SDR */}
        <article aria-labelledby="crm-title" className="mt-20 grid grid-cols-1 gap-x-12 gap-y-6 border-t border-ink/25 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h3 id="crm-title" className="text-[24px]">
              {c.name}
            </h3>
            <p className="mt-4 max-w-[60ch] leading-[1.6]">{c.summary}</p>
            <p className="mt-3 flex flex-wrap gap-x-6 text-[15px]">
              <ExternalLink href={c.repo} className="inline-block py-2.5 font-medium">
                {s.repoLabel}
              </ExternalLink>
              <ExternalLink href={c.demo} className="inline-block py-2.5 font-medium">
                {s.demoLabel}
              </ExternalLink>
            </p>
          </div>
          <ul className="border-t border-line lg:col-span-7">
            {c.points.map((p) => (
              <li key={p} className="border-b border-line py-3 leading-6">
                {p}
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </section>
  );
}

export function ExperienceSection({ t }: { t: Dict }) {
  const s = t.experience;
  return (
    <section id="experience" aria-labelledby="exp-title" className="bg-surface/60 py-20 md:py-28">
      <Container>
        <SectionMeta items={s.meta} />
        <h2 id="exp-title" className="mt-10 text-[30px] sm:text-[40px] lg:tracking-[-0.03em]">
          {s.title}
        </h2>
        <ol className="mt-12 border-t border-ink/25">
          {s.rows.map((r) => (
            <li key={r.org + r.when} className="grid grid-cols-1 gap-x-10 gap-y-2 border-b border-line py-6 md:grid-cols-[190px_1fr] lg:grid-cols-[190px_320px_1fr]">
              <p className="font-mono text-[13px] leading-6 text-muted">{r.when}</p>
              <div>
                <p className="text-[17px] font-medium leading-6">{r.role}</p>
                <p className="leading-6">{r.org}</p>
                {r.where ? <p className="text-[14px] leading-6 text-muted">{r.where}</p> : null}
              </div>
              <p className="max-w-[68ch] leading-[1.6] text-ink/90 md:col-start-2 lg:col-start-auto">{r.what}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid grid-cols-1 gap-x-10 md:grid-cols-[190px_1fr]">
          <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.06em] text-muted md:mb-0 md:pt-0.5">{s.eduTitle}</p>
          <ul className="space-y-2 leading-6">
            {s.edu.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function SkillsSection({ t }: { t: Dict }) {
  const s = t.skills;
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 md:py-28">
      <Container>
        <SectionMeta items={s.meta} />
        <h2 id="skills-title" className="mt-10 text-[30px] sm:text-[40px] lg:tracking-[-0.03em]">
          {s.title}
        </h2>
        <FactRows
          className="mt-12"
          labelWidth="md:grid-cols-[190px_1fr] md:gap-x-10"
          rows={s.groups.map((g) => ({ k: g.k, v: <span className="text-[17px] leading-7">{g.v.join(", ")}</span> }))}
        />
      </Container>
    </section>
  );
}

export function ContactSection({ t }: { t: Dict }) {
  const s = t.contact;
  return (
    <section id="contact" aria-labelledby="contact-title" className="inv bg-inv-bg pb-10 pt-20 text-inv-ink md:pt-28">
      <Container>
        <SectionMeta items={s.meta} inverse />
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="contact-title" className="text-[30px] sm:text-[40px] lg:tracking-[-0.03em]">
              {s.title}
            </h2>
            <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.6] text-inv-muted">{s.body}</p>
            <a
              href={`mailto:${s.email}`}
              className={cn(buttonVariants(), "mt-8 h-11 rounded-md bg-accent px-4 text-[15px] font-medium text-white transition-colors duration-150 hover:bg-white hover:text-ink")}
            >
              {t.hero.ctaEmail}
            </a>
          </div>
          <ul className="border-t border-inv-line lg:col-span-6">
            <li className="border-b border-inv-line">
              <a
                href={`mailto:${s.email}`}
                className="group flex items-baseline justify-between gap-4 py-4 transition-colors duration-150 hover:text-white"
              >
                <span className="font-mono text-[13px] text-inv-muted">E-mail</span>
                <span className="break-all text-right text-[17px] underline decoration-inv-muted/50 underline-offset-4 group-hover:decoration-current sm:text-[20px]">
                  {s.email}
                </span>
              </a>
            </li>
            {s.links.map((l) => (
              <li key={l.label} className="border-b border-inv-line">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-4 transition-colors duration-150 hover:text-white"
                >
                  <span className="font-mono text-[13px] text-inv-muted">{l.label}</span>
                  <span className="text-right text-[17px] underline decoration-inv-muted/50 underline-offset-4 group-hover:decoration-current sm:text-[20px]">
                    {l.href.replace("https://www.", "").replace("https://", "")}
                    <span aria-hidden="true" className="ml-1 text-[0.8em]">
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <footer className="mt-20 flex flex-wrap justify-between gap-4 border-t border-inv-line pt-6 font-mono text-[12px] text-inv-muted">
          <span>© 2026 Gabriel Moura</span>
          <span>
            {s.source}{" "}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="link">
              {s.sourceLink}
            </a>
          </span>
        </footer>
      </Container>
    </section>
  );
}
