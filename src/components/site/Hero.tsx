import Image from "next/image";
import type { Dict } from "@/content/en";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container, ExternalLink, FactRows } from "./primitives";

const btn = "h-11 rounded-md px-4 text-[15px] font-medium transition-colors duration-150";

export function Hero({ t }: { t: Dict }) {
  const { hero, contact } = t;
  return (
    <section id="top" aria-labelledby="hero-title" className="pb-20 pt-10 md:pb-24 md:pt-16">
      <Container className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:pt-4">
          <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-5 max-w-[15ch] text-[38px] leading-[1.05] sm:text-[48px] lg:text-[56px] lg:tracking-[-0.035em]">
            {hero.title}
          </h1>
          <div className="mt-7 max-w-[56ch] space-y-3 text-[18px] leading-[1.55]">
            <p>{hero.lead[0]}</p>
            <p className="text-muted">{hero.lead[1]}</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={`mailto:${contact.email}`}
              className={cn(buttonVariants(), btn, "bg-accent text-white hover:bg-ink")}
            >
              {hero.ctaEmail}
            </a>
            {contact.links.map((l) => (
              <ExternalLink key={l.label} href={l.href} className="inline-block py-2.5 text-[15px] font-medium">
                {l.label}
              </ExternalLink>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <figure className="enter overflow-hidden rounded-md border border-ink/20 bg-paper" style={{ "--enter-delay": "120ms" } as React.CSSProperties}>
            <div className="border-b border-ink/15 px-3 py-2 font-mono text-[12px] text-muted">{hero.shotNote}</div>
            <Image
              src="/img/agentoffice-office-1600.webp"
              alt={hero.shotAlt}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="block h-auto w-full"
            />
          </figure>
          <FactRows rows={hero.facts} className="enter mt-8" labelWidth="sm:grid-cols-[120px_1fr]" />
        </div>
      </Container>
    </section>
  );
}
