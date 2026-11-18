# Gabriel Moura · portfolio

Personal portfolio of a full stack software engineer (TypeScript, React, Node.js, PostgreSQL) focused on SaaS, AI integrations and real-time apps. English at `/`, Portuguese at `/pt`.

## Stack

- Next.js 16 (App Router) with `output: "export"`; `scripts/strip-react.mjs` then removes the React runtime from `out/`, so the site ships as plain HTML plus the kit's vanilla JS
- Visual system: the [taste-skill](https://github.com/Leonxlnx/taste-skill) kit in `public/assets` (MIT, unedited): grid, type, buttons, hero entrance, a `silk-folds` WebGL ground, pulsing diagrams and two scroll moments, all at rest under `prefers-reduced-motion`
- IBM Plex Sans and Mono; real tool logos fetched with the kit's `icons.mjs` (credits in `public/assets/icons/icons-credits.json`)

## Structure

```
src/app/(en)/        English root layout and page  ->  /
src/app/(pt)/pt/     Portuguese root layout and page  ->  /pt
src/content/         en.ts and pt.ts: every word on the site, same shape
src/components/site/ RootDocument (head, kit CSS and scripts) and SitePage (the sections)
public/site.css      page CSS for what the kit lacks, kit tokens only
DESIGN.md            visual direction, the deal and the rules for this site
```

## Content rule

Every number, project and technology on the site comes from the resume, the public repositories ([emporio-agent](https://github.com/GabrielMMoura/emporio-agent), [mini-crm-sdr-ai](https://github.com/GabrielMMoura/mini-crm-sdr-ai)) or the product sites ([appcrn.com.br](https://www.appcrn.com.br), [useagentoffice.com](https://useagentoffice.com)). No testimonials, client logos or phone number.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

Set `NEXT_PUBLIC_SITE_URL` to the final domain so canonical and hreflang URLs point to it.
