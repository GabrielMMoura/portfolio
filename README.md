# Gabriel Moura · portfolio

Personal portfolio of a full stack software engineer (TypeScript, React, Node.js, PostgreSQL) focused on SaaS, AI integrations and real-time apps. English at `/`, Portuguese at `/pt`.

## Stack

- Next.js 16 (App Router) with `output: "export"`; `scripts/strip-react.mjs` then removes the React runtime from `out/`, so the site ships as plain HTML, one CSS file and one small script
- The page is a brick office building at night, one floor per project. `public/world.js` draws the pixel-art scenes on canvas (about 12 frames a second, only while a scene is on screen), moves the elevator with the scroll and runs the coffee-cup game. Every word stays in HTML, and under `prefers-reduced-motion` each scene holds one still frame
- Big Shoulders Display, Instrument Sans and Pixelify Sans; real tool logos from the taste-skill kit's `icons.mjs` (credits in `public/assets/icons/icons-credits.json`)

## Structure

```
src/app/(en)/        English root layout and page  ->  /
src/app/(pt)/pt/     Portuguese root layout and page  ->  /pt
src/content/         en.ts and pt.ts: every word on the site, same shape
src/components/site/ RootDocument (head, fonts, scripts) and SitePage (the floors)
public/world.css     tokens and page styles
public/world.js      pixel scenes, elevator, HUD and the coffee game
DESIGN.md            visual direction and the rules for this site
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
