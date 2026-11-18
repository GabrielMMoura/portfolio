/*
  The page shell is the taste-skill kit (public/assets, copied unedited from the plugin).
  type: software · deal: hero collage, nav-mega, close-word, footer-columns, rhythm dark-band,
  buttons pill, mark dots, ground sand, effect silk-folds (hero frame),
  moments letters-assemble (#statement) and line-carries-colour (#crn).
  React renders the HTML at build time only; scripts/strip-react.mjs removes the React runtime
  from out/, so every behaviour on the page is the kit's own vanilla JS.
*/

const PALETTE = `:root {
  --p-bg: #dfdedb; --p-surface: #d3d2ce; --p-ink: #26251e; --p-muted: #5a5850;
  --p-accent: #2456d6; --p-accent-ink: #ffffff; --p-action: #2456d6; --p-action-ink: #ffffff;
  --p-inv-bg: #26251e; --p-inv-surface: #313029; --p-inv-ink: #dfdedb; --p-inv-muted: #9e9d99;
  --p-inv-accent: #dfdedb; --p-inv-accent-ink: #26251e; --p-inv-action: #dfdedb; --p-inv-action-ink: #26251e;
  --font-display: "IBM Plex Sans", system-ui, sans-serif;
  --font-text: "IBM Plex Sans", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  --display-weight: 500;
  --display-tracking: -0.025em;
  --display-tracking-xl: -0.035em;
  --ly-scale: 0.98;
}`;

const ENTER = `document.documentElement.classList.add('m-enter');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700)`;
const MOMENTS = `document.documentElement.classList.add('mo-js');setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)`;

export function RootDocument({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang} data-type="software" data-radius="soft" data-ground="sand" data-buttons="pill" data-motion="">
      <head>
        <meta name="site-kind" content="software" />
        <meta name="page-type" content="software" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wdth,wght@85..100,400..700&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
        <link rel="stylesheet" href="/assets/system.css" />
        <link rel="stylesheet" href="/assets/ui/cards.css" />
        <link rel="stylesheet" href="/assets/motion/motion.css" />
        <link rel="stylesheet" href="/assets/backgrounds/backgrounds.css" />
        <link rel="stylesheet" href="/assets/layout/layout.css" />
        <link rel="stylesheet" href="/assets/icons/icon.css" />
        <style dangerouslySetInnerHTML={{ __html: PALETTE }} />
        <link rel="stylesheet" href="/assets/diagrams/diagram.css" />
        <link rel="stylesheet" href="/site.css" />
        <script dangerouslySetInnerHTML={{ __html: ENTER }} />
        <script src="/assets/backgrounds/backgrounds.js" />
        <script dangerouslySetInnerHTML={{ __html: MOMENTS }} />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
        <link rel="modulepreload" href="/assets/moments/letters-assemble/moment.js" />
        <link rel="modulepreload" href="/assets/moments/line-carries-colour/moment.js" />
      </head>
      <body>
        {children}
        <script type="module" src="/assets/system.js" />
        <script type="module" src="/assets/motion/motion.js" />
        <script type="module" src="/assets/layout/layout.js" />
        <script type="module" src="/assets/diagrams/mount.js" />
      </body>
    </html>
  );
}
