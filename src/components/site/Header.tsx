import type { Dict } from "@/content/en";
import { Container } from "./primitives";

export function Header({ t }: { t: Dict }) {
  const targetLang = t.lang === "en" ? "pt-BR" : "en";
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        {t.nav.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-[2px]">
        <Container className="flex h-16 items-center justify-between gap-6">
          <a href="#top" className="py-3 font-medium tracking-[-0.01em]">
            Gabriel Moura
          </a>
          <nav aria-label={t.lang === "en" ? "Sections" : "Seções"} className="flex items-center gap-1">
            <ul className="hidden items-center gap-1 md:flex">
              {t.nav.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex h-11 items-center rounded-md px-3 text-[15px] text-muted transition-colors duration-150 hover:bg-surface hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={t.nav.switchHref}
              hrefLang={targetLang}
              lang={targetLang}
              aria-label={t.nav.switchLabel}
              className="ml-2 inline-flex h-11 items-center rounded-md border border-ink/30 px-3.5 font-mono text-[13px] transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-bg"
            >
              {t.nav.switchShort}
            </a>
          </nav>
        </Container>
      </header>
    </>
  );
}
