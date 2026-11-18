/*
  The building (DESIGN.md, 18/11/2026). React renders the HTML at build time only;
  scripts/strip-react.mjs removes the React runtime from out/, and public/world.js draws the
  pixel scenes, moves the elevator and runs the coffee game. The page reads fine without it.
*/

const JS_ON = `document.documentElement.classList.add('js')`;

export function RootDocument({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Instrument+Sans:wght@400;500;600&family=Pixelify+Sans:wght@400;600&display=swap"
        />
        <link rel="stylesheet" href="/world.css" />
        <script dangerouslySetInnerHTML={{ __html: JS_ON }} />
      </head>
      <body>
        {children}
        <script src="/world.js" defer />
      </body>
    </html>
  );
}
