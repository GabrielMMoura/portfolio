# Gabriel Moura · portfolio

Personal portfolio of a full stack software engineer (TypeScript, React, Node.js, PostgreSQL) focused on SaaS, AI integrations and real-time apps. English at `/`, Portuguese at `/pt`.

## Stack

- Next.js 16 (App Router) with `output: "export"`: the whole site is static HTML in `out/`
- Tailwind CSS v4 and shadcn/ui (`button` only); IBM Plex Sans and Mono via `next/font`
- No animation library: the architecture diagram is an SVG animated with CSS, paused off screen with an `IntersectionObserver` and static under `prefers-reduced-motion`

## Structure

```
src/app/(en)/        English root layout and page  →  /
src/app/(pt)/pt/     Portuguese root layout and page  →  /pt
src/content/         en.ts and pt.ts: every word on the site, same shape
src/components/site/ sections, diagram, primitives
DESIGN.md            visual direction, tokens and rules for this site
```

Two route groups give each language its own root layout, so `<html lang>` is correct in the static HTML.

## Content rule

Every number, project and technology on the site comes from the resume, the public repositories ([emporio-agent](https://github.com/GabrielMMoura/emporio-agent), [mini-crm-sdr-ai](https://github.com/GabrielMMoura/mini-crm-sdr-ai)) or the product sites ([appcrn.com.br](https://www.appcrn.com.br), [useagentoffice.com](https://useagentoffice.com)). No testimonials, client logos or phone number.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

Set `NEXT_PUBLIC_SITE_URL` to the final domain so canonical and hreflang URLs point to it.
