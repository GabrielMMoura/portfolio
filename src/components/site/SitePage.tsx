import type { Dict } from "@/content/en";
import { REPO_URL } from "@/lib/site";
import ICONS from "@/content/icons.json";

/* The building (DESIGN.md, 18/11/2026). Every word is HTML from the content files; the pixel
   scenes are canvases drawn by public/world.js, and the overlays (bubbles, coffee cups, doors)
   sit on them through data-anchor names the scene defines. */

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

function Ext({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a className={className ?? "link"} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** An 8x8 pixel coffee cup, the collectible. */
function Cup() {
  return (
    <svg viewBox="0 0 10 10" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="#fffaf0" d="M1 3h6v5H1z" />
      <path fill="#6b3f22" d="M2 3h4v1H2z" />
      <path fill="#fffaf0" d="M7 4h2v3H7zM8 5h-1v1h1z" />
      <path fill="#b9784a" d="M8 5h-1v1h1z" />
      <path fill="#221a15" d="M1 8h6v1H1zM0 3h1v5H0zM7 3h1v1H7zM9 4h1v3H9zM7 7h2v1H7z" />
      <path fill="#e9dcc2" d="M2 0h1v2H2zM4 1h1v1H4z" />
    </svg>
  );
}

function Mug({ id, anchor, label }: { id: number; anchor: string; label: string }) {
  return (
    <button className="mug" type="button" data-mug={id} data-anchor={anchor} aria-label={label} hidden>
      <Cup />
    </button>
  );
}

function Plate({ num, name }: { num: string; name: string }) {
  return (
    <div className="slab" aria-hidden="true">
      <span className="plate">
        <b>{num}</b>
        {name}
      </span>
    </div>
  );
}

export function SitePage({ t }: { t: Dict }) {
  const mail = `mailto:${t.contact.email}`;
  const other = t.lang === "en" ? "pt-BR" : "en";
  const w = t.world;
  const ao = t.agentoffice;
  const floor = (k: keyof typeof w.floors) => w.floors[k];
  const split = (s: string) => {
    const i = s.indexOf(" · ");
    return i < 0 ? { num: "", name: s } : { num: s.slice(0, i), name: s.slice(i + 3) };
  };

  return (
    <>
      <a className="skip" href="#main">
        {t.nav.skip}
      </a>
      <header className="top">
        <a className="brand" href="#top">
          <span className="brand__mark" aria-hidden="true" />
          Gabriel Moura
        </a>
        <nav className="top__nav" aria-label="Main">
          <a href="#agentoffice">AgentOffice</a>
          <a href="#crn">CRN</a>
          <a href="#emporio">{t.lang === "en" ? "Code" : "Código"}</a>
          <a href="#experience">{t.nav.items[0].label}</a>
          <a href={t.nav.switchHref} hrefLang={other} lang={other} className="top__lang">
            {t.nav.switchShort}
            <span className="sr-only"> · {t.nav.switchLabel}</span>
          </a>
        </nav>
        <a className="btn btn--amber btn--sm" href={mail}>
          {t.hero.ctaEmail}
        </a>
      </header>

      <main id="main">
        {/* Street: the building at night */}
        <section className="hero" id="top" data-floor={floor("street")} aria-labelledby="hero-h">
          <div className="hero__scene stage" data-scene="facade">
            <canvas className="layer" data-layer="back" aria-hidden="true" />
            <p className="sign" data-anchor-box="sign" aria-hidden="true">
              {"GABRIEL MOURA".split("").map((c, i) => (
                <span key={i} style={{ "--i": i } as React.CSSProperties}>
                  {c === " " ? " " : c}
                </span>
              ))}
            </p>
            <canvas className="layer" data-layer="front" role="img" aria-label={w.alt.facade} />
            <Mug id={1} anchor="mug-bench" label={w.coffee.mug} />
            <Mug id={2} anchor="mug-awning" label={w.coffee.mug} />
          </div>
          <div className="hero__text">
            <p className="eyebrow">{w.eyebrow}</p>
            <h1 id="hero-h">{t.hero.title}</h1>
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="btn-row">
              <a className="btn btn--amber" href={mail}>
                {t.hero.ctaEmail}
              </a>
              <a className="btn btn--ghost" href="#agentoffice">
                {t.hero.ctaWork}
              </a>
            </div>
            <p className="hero__proof">{t.hero.proof}</p>
          </div>
        </section>

        <div className="building">
          <div className="shaft" aria-hidden="true">
            <div className="car">
              <span className="car__num">3</span>
            </div>
          </div>

          {/* 3F AgentOffice */}
          <section className="floor" id="agentoffice" data-floor={floor("agentoffice")} aria-labelledby="ao-h">
            <Plate {...split(floor("agentoffice"))} />
            <div className="room">
              <div className="stage" data-scene="office">
                <canvas width={256} height={96} role="img" aria-label={w.alt.office} />
                <a className="screen" data-anchor-box="screen" href={ao.link.href} target="_blank" rel="noopener noreferrer" aria-label={w.screenLabel}>
                  <img src="/img/ao-office-full.webp" alt="" width={1600} height={900} loading="lazy" />
                </a>
                {w.agents.map((lines, i) => (
                  <span
                    key={i}
                    className={`bubble${i === 2 ? " bubble--warn" : ""}`}
                    data-anchor={`agent-${i}`}
                    data-lines={JSON.stringify(lines)}
                    aria-hidden="true"
                  >
                    {lines[0]}
                  </span>
                ))}
                <span className="chip" data-anchor="tray" aria-hidden="true">
                  {w.approved}
                </span>
                <Mug id={3} anchor="mug-screen" label={w.coffee.mug} />
                <Mug id={4} anchor="mug-sill" label={w.coffee.mug} />
              </div>
            </div>
            <div className="floor__body">
              <div className="col col--lead">
                <h2 id="ao-h">
                  {ao.title} <span className="muted">{ao.titleMuted}</span>
                </h2>
                <p className="lead">{ao.intro}</p>
                <p>
                  <Ext href={ao.link.href}>{ao.link.label}</Ext>
                </p>
              </div>
              <div className="col">
                <p className="label">{ao.builtTitle}</p>
                <dl className="spec">
                  {ao.built.map((r) => (
                    <div key={r.k}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="col col--wide">
                <p className="label">{t.guarantees.title}</p>
                <dl className="spec spec--two">
                  {t.guarantees.rules.map((r) => (
                    <div key={r.k}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="note">
                  <span className="label">{t.guarantees.notYetTitle}</span> {t.guarantees.notYet}
                </p>
              </div>
            </div>
          </section>

          {/* 2F CRN */}
          <section className="floor floor--store" id="crn" data-floor={floor("crn")} aria-labelledby="crn-h">
            <Plate {...split(floor("crn"))} />
            <div className="room">
              <div className="stage" data-scene="store">
                <canvas width={256} height={96} role="img" aria-label={w.alt.store} />
                <span className="tag" data-anchor="nfe" aria-hidden="true">
                  {w.nfe}
                </span>
                <span className="tag tag--lamp" data-anchor="sefaz" aria-hidden="true">
                  {w.sefaz}
                </span>
                <Mug id={5} anchor="mug-shelf" label={w.coffee.mug} />
                <Mug id={6} anchor="mug-counter" label={w.coffee.mug} />
              </div>
            </div>
            <div className="floor__body">
              <div className="col col--lead">
                <h2 id="crn-h">
                  {t.crn.title} <span className="muted">{t.crn.titleMuted}</span>
                </h2>
                <p className="label">{t.crn.figureLabel}</p>
                <p className="figure">{t.crn.figure}</p>
                <p className="label">{t.crn.onboardingLabel}</p>
                <p className="figure figure--sm">
                  <s aria-hidden="true">{t.crn.onboardingFrom}</s>
                  <span aria-hidden="true"> → {t.crn.onboardingTo}</span>
                  <span className="sr-only">{t.crn.onboardingSr}</span>
                </p>
              </div>
              <div className="col">
                <p>{t.crn.body}</p>
                <p className="label">{t.crn.featuresLabel}</p>
                <p>{t.crn.features}</p>
                <dl className="spec">
                  {t.crn.stack.map((r) => (
                    <div key={r.k}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
                <p>
                  <Ext href={t.crn.link.href}>{t.crn.link.label}</Ext>
                </p>
              </div>
            </div>
          </section>

          {/* The elevator: the rule behind the code */}
          <section className="floor floor--lift" id="statement" data-floor={floor("elevator")} aria-labelledby="st-h">
            <div className="lift">
              <div className="lift__text">
                <h2 id="st-h">{t.statement.title}</h2>
                <p>{t.statement.sub}</p>
              </div>
              <div className="stage lift__stage" data-scene="elevator">
                <canvas width={120} height={96} role="img" aria-label={w.alt.elevator} />
                <Mug id={7} anchor="mug-lift" label={w.coffee.mug} />
              </div>
            </div>
          </section>

          {/* 1F Emporio Agent */}
          <section className="floor" id="emporio" data-floor={floor("emporio")} aria-labelledby="em-h">
            <Plate {...split(floor("emporio"))} />
            <div className="room">
              <div className="stage" data-scene="emporio">
                <canvas width={256} height={96} role="img" aria-label={w.alt.emporio} />
                {w.ci.map((c, i) => (
                  <span key={c} className="tag tag--ok" data-anchor={`ci-${i}`} aria-hidden="true">
                    {c}
                  </span>
                ))}
                <Mug id={8} anchor="mug-jars" label={w.coffee.mug} />
              </div>
            </div>
            <div className="floor__body">
              <div className="col col--lead">
                <h2 id="em-h">
                  {t.emporio.title} <span className="muted">{t.emporio.titleMuted}</span>
                </h2>
                <p className="lead">{t.emporio.lead}</p>
                <ul className="stickies">
                  {t.emporio.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <p>
                  <Ext href={t.emporio.repo}>{t.repoLabel}</Ext>
                </p>
              </div>
              <figure className="phone col" aria-label={t.emporio.transcriptLabel}>
                <div className="phone__screen" lang="pt-BR">
                  <p className="msg msg--me">Oi, quero saber do meu pedido 8</p>
                  <pre className="msg msg--tool" translate="no">{`get_order_status(order_id=8, email_or_phone="")
→ { "verified": false,
    "error": "No e-mail or phone given. Ask the
              customer for one before calling again." }`}</pre>
                  <p className="msg">Claro! Pra eu localizar o pedido 8, me manda o e-mail ou o telefone usado na compra, por favor.</p>
                </div>
                <figcaption className="sr-only">{t.emporio.transcriptLabel}</figcaption>
              </figure>
              <div className="col col--wide">
                <ol className="cork">
                  {t.emporio.log.map((r) => (
                    <li key={r.d} className="card">
                      <h3>{r.d}</h3>
                      <p>
                        <span className="label">{t.emporio.cols[1]}</span>
                        <Rich text={r.w} />
                      </p>
                      <p>
                        <span className="label">{t.emporio.cols[2]}</span>
                        <Rich text={r.e} />
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Mezzanine: Mini CRM */}
          <section className="floor" id="crm" data-floor={floor("crm")} aria-labelledby="crm-h">
            <Plate {...split(floor("crm"))} />
            <div className="room">
              <div className="stage" data-scene="crm">
                <canvas width={256} height={96} role="img" aria-label={w.alt.crm} />
                <Mug id={9} anchor="mug-tray" label={w.coffee.mug} />
              </div>
            </div>
            <div className="floor__body">
              <div className="col col--lead">
                <h2 id="crm-h">
                  {t.crm.title} <span className="muted">{t.crm.titleMuted}</span>
                </h2>
                <p>{t.crm.stack}</p>
                <p className="link-row">
                  <Ext href={t.crm.repo}>{t.repoLabel}</Ext>
                  <Ext href={t.crm.demo}>{t.demoLabel}</Ext>
                </p>
              </div>
              <div className="col">
                <dl className="spec">
                  {t.crm.points.map((r) => (
                    <div key={r.k}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* Lobby: directory, supply room, doors */}
          <section className="floor floor--lobby" id="experience" data-floor={floor("lobby")} aria-labelledby="xp-h">
            <Plate num="L" name={floor("lobby")} />
            <div className="floor__body">
              <div className="col col--wide">
                <h2 id="xp-h">{t.experience.title}</h2>
                <p className="sub">{t.experience.titleMuted}</p>
                <div className="board">
                  <p className="board__title" aria-hidden="true">
                    {w.directory}
                  </p>
                  <ol>
                    {t.experience.rows.map((r) => (
                      <li key={r.org}>
                        <span className="board__when">{r.when}</span>
                        <span className="board__role">{r.role}</span>
                        <span className="board__org">{r.org}</span>
                        <span className="board__what">{r.what}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <p className="edu">{t.experience.edu}</p>
              </div>
              <div className="col col--wide" id="skills">
                <h2>{t.skills.title}</h2>
                <p className="sub">{t.skills.titleMuted}</p>
                <div className="shelves">
                  {t.skills.groups.map((g) => (
                    <div className="shelf" key={g.k}>
                      <p className="shelf__name">{g.k}</p>
                      <ul className="shelf__items">
                        {g.icons.map((id) => (
                          <li key={id}>
                            <img src={`/assets/icons/${id}.svg`} alt="" width={ic(id).w} height={ic(id).h} loading="lazy" />
                            {ICON_NAMES[id] ?? id}
                          </li>
                        ))}
                      </ul>
                      <p className="shelf__extra">{g.extra}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="room room--lobby">
              <div className="stage" data-scene="lobby">
                <canvas width={256} height={96} role="img" aria-label={w.alt.lobby} />
                <a className="door" data-anchor-box="door-0" href={mail}>
                  <span>{w.doors.email}</span>
                </a>
                <a className="door" data-anchor-box="door-1" href={t.contact.linkedin} target="_blank" rel="noopener noreferrer">
                  <span>{w.doors.linkedin}</span>
                </a>
                <a className="door" data-anchor-box="door-2" href={t.contact.github} target="_blank" rel="noopener noreferrer">
                  <span>{w.doors.github}</span>
                </a>
                <button className="talk" type="button" data-anchor-box="gabriel" data-lines={JSON.stringify(w.gabriel.lines)} aria-label={w.gabriel.label} hidden />
                <span className="bubble bubble--talk" data-anchor="gabriel-say" aria-live="polite" />
                <Mug id={10} anchor="mug-plant" label={w.coffee.mug} />
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="street" id="contact" aria-labelledby="close-h">
        <div className="street__inner">
          <h2 id="close-h">{t.contact.title}</h2>
          <p className="lead">{t.contact.lead}</p>
          <div className="btn-row">
            <a className="btn btn--amber" href={mail}>
              {t.contact.email}
            </a>
            <button className="btn btn--ghost" type="button" data-copy={t.contact.email} data-copied={w.copied} hidden>
              {w.copy}
            </button>
          </div>
          <ul className="street__links">
            <li>
              <Ext href={t.contact.linkedin}>LinkedIn</Ext>
            </li>
            <li>
              <Ext href={t.contact.github}>GitHub</Ext>
            </li>
            <li>
              <a href={t.nav.switchHref} hrefLang={other} lang={other}>
                {t.nav.switchLabel}
              </a>
            </li>
          </ul>
          <p className="street__legal">
            <span>&copy; 2026 Gabriel Moura · {t.contact.lede}</span>
            <span>
              {t.contact.trademarks}{" "}
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                {t.contact.source}
              </a>
            </span>
          </p>
        </div>
      </footer>

      <div className="hud" hidden>
        <span className="hud__floor" aria-hidden="true">
          {floor("street")}
        </span>
        <button className="hud__coffee" type="button" aria-label={w.coffee.counter} aria-expanded="false">
          <Cup />
          <b>0</b>/10
        </button>
        <p className="hud__tip" hidden>
          {w.coffee.hint}
        </p>
        <p className="hud__done" hidden>
          {w.coffee.done} <a href={mail}>{w.coffee.doneCta}</a>
        </p>
        <span className="sr-only" aria-live="polite" data-coffee-live data-found={w.coffee.found} />
      </div>
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
