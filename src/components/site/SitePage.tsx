import type { Dict } from "@/content/en";
import { REPO_URL } from "@/lib/site";
import ICONS from "@/content/icons.json";

/* Markup follows the taste-skill kit (public/assets): its classes, its section box, its scripts.
   Plan, at 1440x900: hero 1 · agentoffice 2 (g2) · guarantees 1 · crn 1 (line-carries-colour) ·
   statement 1 (letters-assemble) · emporio 1 · crm 1 · experience 1 · skills 1 · closing 1. */

const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

/** `code` spans written with backticks in the content files. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((p, i) =>
        p.startsWith("`") ? (
          <code key={i} translate="no">
            {p.slice(1, -1)}
          </code>
        ) : (
          p
        ),
      )}
    </>
  );
}

function Diagram({ spec }: { spec: object }) {
  return (
    <div className="dg" data-diagram="">
      <script type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(spec) }} />
    </div>
  );
}

function Ext({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a className={className ?? "link"} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function SitePage({ t }: { t: Dict }) {
  const mail = `mailto:${t.contact.email}`;
  const other = t.lang === "en" ? "pt-BR" : "en";
  const ao = t.agentoffice;

  const productSpec = {
    layout: "bowtie",
    alt: ao.diagramProduct.alt,
    sources: [
      { label: ao.diagramProduct.sources[0], icon: "notion" },
      { label: ao.diagramProduct.sources[1], icon: "google-drive" },
      { label: ao.diagramProduct.sources[2], icon: "ui:file-text" },
    ],
    core: { label: ao.diagramProduct.core, icon: "ui:bot" },
    targets: [
      { label: ao.diagramProduct.targets[0].label, icon: "ui:search", sub: ao.diagramProduct.targets[0].sub },
      { label: ao.diagramProduct.targets[1].label, icon: "ui:bar-chart-3", sub: ao.diagramProduct.targets[1].sub },
      { label: ao.diagramProduct.targets[2].label, icon: "linkedin", sub: ao.diagramProduct.targets[2].sub },
    ],
  };
  const systemSpec = {
    layout: "lanes",
    alt: ao.diagramSystem.alt,
    input: { label: ao.diagramSystem.input.label, icon: "ui:list-todo", sub: ao.diagramSystem.input.sub },
    core: { label: ao.diagramSystem.core, icon: "redis" },
    lanes: [
      { label: ao.diagramSystem.lanes[0].label, icon: "langchain", sub: ao.diagramSystem.lanes[0].sub, done: true },
      { label: ao.diagramSystem.lanes[1].label, icon: "postgres", sub: ao.diagramSystem.lanes[1].sub, done: true },
      { label: ao.diagramSystem.lanes[2].label, icon: "logos:socket.io", sub: ao.diagramSystem.lanes[2].sub, done: true },
    ],
  };

  return (
    <>
      <header className="nav">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#top">
            {t.nav.skip}
          </a>
          <a className="nav__logo" href="#top">
            <span className="mark" data-mark="dots" aria-hidden="true" />
            Gabriel Moura
          </a>
          <nav className="nav__links" aria-label={t.nav.work}>
            <div className="nav__item">
              <a className="nav__link" href="#agentoffice">
                {t.nav.work}{" "}
                <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div className="nav__menu">
                <div className="wrap grid">
                  {t.nav.workGroups.map((g) => (
                    <div className="menu-col span-3" key={g.label}>
                      <p className="t-label">{g.label}</p>
                      {g.items.map((it) => (
                        <a href={it.href} key={it.href}>
                          {it.name}
                          <span>{it.line}</span>
                        </a>
                      ))}
                    </div>
                  ))}
                  <a className="menu-card span-3 start-10" href="#guarantees">
                    <div className="panel">
                      <img className="frame__img" src="/img/ao-desks-research.webp" alt="" width={1060} height={330} loading="lazy" />
                    </div>
                    <span className="t-card">{t.nav.card.title}</span>
                    <span className="t-small muted">{t.nav.card.line}</span>
                  </a>
                </div>
              </div>
            </div>
            {t.nav.items.map((it) => (
              <div className="nav__item" key={it.href}>
                <a className="nav__link" href={it.href}>
                  {it.label}
                </a>
              </div>
            ))}
            <div className="nav__item">
              <a className="nav__link" href={t.nav.switchHref} hrefLang={other} lang={other}>
                {t.nav.switchLabel}
              </a>
            </div>
          </nav>
          <div className="nav__actions">
            <a className="btn btn--primary" href={mail}>
              {t.hero.ctaEmail}
            </a>
          </div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-label={t.nav.menu}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero hero--collage" data-enter="" aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text grid hero__grid">
              <div className="hero__text span-5">
                <h1 id="hero-h">{t.hero.title}</h1>
                <p className="hero__lead">{t.hero.lead}</p>
                <div className="btn-row">
                  <a className="btn btn--primary" href={mail}>
                    {t.hero.ctaEmail}
                    <Arrow />
                  </a>
                  <a className="btn btn--secondary" href="#agentoffice">
                    {t.hero.ctaWork}
                  </a>
                </div>
                <p className="hero__proof">{t.hero.proof}</p>
              </div>
              <div className="hero__art span-6 start-7" data-fx="silk-folds" data-fx-seed="7" role="img" aria-label={t.hero.artLabel}>
                <div className="ly-piece ly-piece--main d-win" aria-hidden="true">
                  <div className="d-win__bar">
                    <span className="d-win__dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>{t.hero.windowTitle}</span>
                  </div>
                  <img className="d-win__img" src="/img/ao-window.webp" alt="" width={1060} height={672} fetchPriority="high" />
                </div>
                <div className="ly-piece ly-piece--note d-card" aria-hidden="true" data-ly-steps="700">
                  <div className="d-card__row">
                    <span className="d-card__title">{t.hero.note.title}</span>
                    <span className="d-chip" data-step="" data-step-at="3">
                      {t.hero.note.chip}
                    </span>
                  </div>
                  {t.hero.note.steps.map((s, i) => (
                    <div className="d-note__line" data-step="" key={s}>
                      <i className={i === 1 ? "warn" : undefined}>{i === 1 ? "!" : "✓"}</i>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section g2" id="agentoffice" aria-labelledby="ao-h">
          <div className="wrap">
            <div className="group">
              <div className="section-head">
                <h2 id="ao-h">
                  {ao.title} <span className="muted">{ao.titleMuted}</span>
                </h2>
              </div>
              <div className="grid grid--top">
                <div className="span-5 stack-4">
                  <p className="t-lead">{ao.intro}</p>
                  <p>
                    <Ext href={ao.link.href}>{ao.link.label}</Ext>
                  </p>
                </div>
                <div className="span-6 start-7">
                  <p className="t-label muted rows-label">{ao.builtTitle}</p>
                  <ul className="rows rows--spec">
                    {ao.built.map((r) => (
                      <li key={r.k}>
                        <span className="rows__name">{r.k}</span>
                        <p>{r.v}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid">
              <article className="card card--row card--open span-6">
                <h3>{ao.cardProduct.title}</h3>
                <p>{ao.cardProduct.line}</p>
                <div className="panel">
                  <Diagram spec={productSpec} />
                </div>
              </article>
              <article className="card card--row card--open span-6">
                <h3>{ao.cardSystem.title}</h3>
                <p>{ao.cardSystem.line}</p>
                <div className="panel">
                  <Diagram spec={systemSpec} />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="guarantees" aria-labelledby="gu-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="gu-h">{t.guarantees.title}</h2>
            </div>
            <div className="grid grid--top">
              <div className="span-6">
                <ul className="rows rows--spec">
                  {t.guarantees.rules.map((r) => (
                    <li key={r.k}>
                      <span className="rows__name">{r.k}</span>
                      <p>{r.v}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="span-6 start-7">
                <div className="frame frame--photo shot">
                  <img className="frame__img" src="/img/ao-office-full.webp" alt={t.guarantees.shotAlt} width={1600} height={900} loading="lazy" />
                </div>
                <p className="not-yet">
                  <span className="t-label muted">{t.guarantees.notYetTitle}</span>
                  {t.guarantees.notYet}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section ground-inverse"
          id="crn"
          aria-labelledby="crn-h"
          data-moment="line-carries-colour"
          data-moment-opts='{"from": "base"}'
        >
          <div className="wrap">
            <div className="section-head">
              <h2 id="crn-h">
                {t.crn.title} <span className="muted">{t.crn.titleMuted}</span>
              </h2>
            </div>
            <div className="grid grid--top crn-figures">
              <div className="span-7">
                <p className="t-label muted">{t.crn.figureLabel}</p>
                <p className="crn-figure">{t.crn.figure}</p>
              </div>
              <div className="span-4 start-9">
                <p className="t-label muted">{t.crn.onboardingLabel}</p>
                <p className="crn-figure crn-figure--time">
                  <span className="sr-only">{t.crn.onboardingSr}</span>
                  <span aria-hidden="true">
                    <s>{t.crn.onboardingFrom}</s> → {t.crn.onboardingTo}
                  </span>
                </p>
              </div>
            </div>
            <div className="grid grid--top">
              <div className="span-6 stack-4">
                <p>{t.crn.body}</p>
                <p>
                  <span className="t-label muted">{t.crn.featuresLabel}. </span>
                  {t.crn.features}
                </p>
                <p>
                  <Ext href={t.crn.link.href}>{t.crn.link.label}</Ext>
                </p>
              </div>
              <ul className="rows rows--spec span-6 start-7">
                {t.crn.stack.map((r) => (
                  <li key={r.k}>
                    <span className="rows__name">{r.k}</span>
                    <p>{r.v}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="statement" aria-labelledby="st-h" data-moment="letters-assemble" data-moment-opts='{"spread": 1}'>
          <div className="wrap">
            <h2 id="st-h" className="mo-la__type">
              {t.statement.title}
            </h2>
            <p className="mo-la__sub t-lead measure">{t.statement.sub}</p>
          </div>
        </section>

        <section className="section g2" id="emporio" aria-labelledby="em-h">
          <div className="wrap">
            <div className="group">
              <div className="section-head">
                <h2 id="em-h">
                  {t.emporio.title} <span className="muted">{t.emporio.titleMuted}</span>
                </h2>
              </div>
              <div className="grid grid--top">
                <div className="span-5 stack-4">
                  <p className="t-lead">{t.emporio.lead}</p>
                  <ul className="facts">
                    {t.emporio.facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <p>
                    <Ext href={t.emporio.repo}>{t.repoLabel}</Ext>
                  </p>
                </div>
                <figure className="panel transcript span-6 start-7" aria-label={t.emporio.transcriptLabel}>
                  <div className="d-win">
                    <div className="d-win__bar">
                      <span className="d-win__dots">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span translate="no">examples/03-order-status-with-verification.md</span>
                    </div>
                    <div className="transcript__body" lang="pt-BR">
                      <p className="transcript__msg transcript__msg--me">Oi, quero saber do meu pedido 8</p>
                      <pre className="transcript__tool" translate="no">{`get_order_status(order_id=8, email_or_phone="")
→ { "verified": false,
    "error": "No e-mail or phone given. Ask the
              customer for one before calling again." }`}</pre>
                      <p className="transcript__msg">
                        Claro! Pra eu localizar o pedido 8, me manda o e-mail ou o telefone usado na compra, por favor.
                      </p>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
            <div className="log">
              <table>
                <thead>
                  <tr>
                    {t.emporio.cols.map((c) => (
                      <th scope="col" key={c} className="t-label">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.emporio.log.map((r) => (
                    <tr key={r.d}>
                      <th scope="row">{r.d}</th>
                      <td>
                        <Rich text={r.w} />
                      </td>
                      <td>
                        <Rich text={r.e} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section" id="crm" aria-labelledby="crm-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="crm-h">
                {t.crm.title} <span className="muted">{t.crm.titleMuted}</span>
              </h2>
            </div>
            <div className="grid grid--top">
              <div className="span-5 stack-4">
                <p className="t-lead">{t.crm.stack}</p>
                <div className="link-row">
                  <Ext href={t.crm.repo}>{t.repoLabel}</Ext>
                  <Ext href={t.crm.demo}>{t.demoLabel}</Ext>
                </div>
              </div>
              <ul className="rows rows--spec span-6 start-7">
                {t.crm.points.map((r) => (
                  <li key={r.k}>
                    <span className="rows__name">{r.k}</span>
                    <p>{r.v}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="xp-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="xp-h">
                {t.experience.title}. <span className="muted">{t.experience.titleMuted}</span>
              </h2>
            </div>
            <div>
              <ol className="xp">
                {t.experience.rows.map((r) => (
                  <li key={r.org} className="grid grid--top">
                    <div className="span-6">
                      <p className="xp__when">{r.when}</p>
                      <h3 className="xp__role">{r.role}</h3>
                      <p className="xp__org">{r.org}</p>
                    </div>
                    <p className="span-6 start-7">{r.what}</p>
                  </li>
                ))}
              </ol>
              <p className="xp__edu muted">{t.experience.edu}</p>
            </div>
          </div>
        </section>

        <section className="section" id="skills" aria-labelledby="sk-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="sk-h">
                {t.skills.title}. <span className="muted">{t.skills.titleMuted}</span>
              </h2>
            </div>
            <div className="grid grid--top skills">
              {t.skills.groups.map((g) => (
                <div className="span-6" key={g.k}>
                  <h3 className="skills__name">{g.k}</h3>
                  <div className="ic-chip-row">
                    {g.icons.map((id) => (
                      <span className="ic-chip ic-chip--lg" key={id}>
                        <img
                          className={`ic ${ic(id).cls}`.trim()}
                          src={`/assets/icons/${id}.svg`}
                          alt=""
                          width={Math.round(ic(id).w * 0.55)}
                          height={Math.round(ic(id).h * 0.55)}
                          loading="lazy"
                        />
                        {ICON_NAMES[id] ?? id}
                      </span>
                    ))}
                  </div>
                  <p className="skills__extra">{g.extra}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer closing" id="contact" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--word">
            <div className="section-head--split">
              <div>
                <h2 id="close-h">{t.contact.title}</h2>
                <p className="t-lead">{t.contact.lead}</p>
              </div>
              <a className="btn btn--primary" href={mail}>
                {t.hero.ctaEmail}
                <Arrow />
              </a>
            </div>
            <p className="close__word" aria-hidden="true">
              {t.contact.word}
            </p>
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-4 stack-4">
                <a className="nav__logo" href="#top">
                  <span className="mark" data-mark="dots" aria-hidden="true" />
                  Gabriel Moura
                </a>
                <p className="footer__lede">{t.contact.lede}</p>
              </div>
              <div className="span-2 start-7 footer__col">
                <h3>{t.contact.colWork}</h3>
                <ul>
                  {t.nav.workGroups.flatMap((g) => g.items).map((it) => (
                    <li key={it.href}>
                      <a href={it.href}>{it.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="span-2 footer__col">
                <h3>{t.contact.colAbout}</h3>
                <ul>
                  {t.nav.items.map((it) => (
                    <li key={it.href}>
                      <a href={it.href}>{it.label}</a>
                    </li>
                  ))}
                  <li>
                    <a href={t.nav.switchHref} hrefLang={other} lang={other}>
                      {t.nav.switchLabel}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="span-2 footer__col">
                <h3>{t.contact.colContact}</h3>
                <ul>
                  <li>
                    <a href={mail}>{t.contact.emailLabel}</a>
                  </li>
                  <li>
                    <a href={t.contact.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href={t.contact.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__legal">
              <span>
                &copy; 2026 Gabriel Moura · <a href={mail}>{t.contact.email}</a>
              </span>
              <span>
                {t.contact.trademarks}{" "}
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                  {t.contact.source}
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const ic = (id: string) => (ICONS as Record<string, { w: number; h: number; cls: string; wide: boolean }>)[id];

const ICON_NAMES: Record<string, string> = {
  typescript: "TypeScript",
  react: "React",
  nextjs: "Next.js",
  tailwindcss: "Tailwind CSS",
  nodejs: "Node.js",
  fastify: "Fastify",
  postgres: "PostgreSQL",
  redis: "Redis",
  supabase: "Supabase",
  "socket.io": "Socket.IO",
  openai: "OpenAI",
  anthropic: "Anthropic",
  langchain: "LangChain",
  python: "Python",
  stripe: "Stripe",
  docker: "Docker",
  "github-actions": "GitHub Actions",
  oracle: "Oracle Cloud",
  playwright: "Playwright",
  vitest: "Vitest",
  sentry: "Sentry",
  grafana: "Grafana",
  prometheus: "Prometheus",
};
