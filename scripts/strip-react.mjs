// After `next build` (output: "export"): remove the React runtime from the exported pages.
// The site has no client state; every behaviour is the taste-skill kit's own vanilla JS in public/assets,
// which mutates the DOM and would otherwise race React's hydration.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const pages = fs.readdirSync(OUT).filter((f) => f.endsWith(".html"));
let removed = 0;
for (const file of pages) {
  const p = path.join(OUT, file);
  let html = fs.readFileSync(p, "utf8");
  const before = html.length;
  html = html
    // Next's chunk scripts and their preloads
    .replace(/<script[^>]*src="\/_next\/static\/[^"]*"[^>]*><\/script>/g, "")
    .replace(/<link[^>]*rel="preload"[^>]*as="script"[^>]*\/?>/g, "")
    .replace(/<link[^>]*as="script"[^>]*rel="preload"[^>]*\/?>/g, "")
    // the RSC payload pushed into self.__next_f
    .replace(/<script>\(self\.__next_f=self\.__next_f\|\|\[\]\)\.push\([\s\S]*?\)<\/script>/g, "")
    .replace(/<script>self\.__next_f\.push\([\s\S]*?\)<\/script>/g, "")
    // Turbopack's chunk loader
    .replace(/<script id="_R_">[\s\S]*?<\/script>/g, "");
  removed += before - html.length;
  fs.writeFileSync(p, html);
}
// the RSC payload files and the JS chunks are only for client navigation and hydration, which no longer exist
const walk = (dir) => {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f.startsWith("__next.") || f.endsWith(".txt")) fs.rmSync(p, { recursive: true, force: true });
    else if (fs.statSync(p).isDirectory() && f !== "assets" && f !== "img") {
      walk(p);
      if (!fs.readdirSync(p).length) fs.rmdirSync(p);
    }
  }
};
fs.rmSync(path.join(OUT, "_next"), { recursive: true, force: true });
walk(OUT);
const left = pages.filter((f) => /_next\/static|__next_f|TURBOPACK/.test(fs.readFileSync(path.join(OUT, f), "utf8")));
if (left.length) throw new Error(`strip-react: runtime still referenced in ${left.join(", ")}`);
console.log(`strip-react: ${pages.length} pages, ${Math.round(removed / 1024)} KB of runtime removed`);
