import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6", className)}>{children}</div>;
}

/** RFD-style metadata line that opens every section: "01 · Main project · ..." */
export function SectionMeta({ items, inverse }: { items: string[]; inverse?: boolean }) {
  const [num, ...rest] = items;
  return (
    <p
      className={cn(
        "flex items-baseline gap-x-4 border-t pt-4 font-mono whitespace-pre-wrap text-[13px] uppercase tracking-[0.06em]",
        inverse ? "border-inv-line text-inv-muted" : "border-ink/25 text-muted",
      )}
    >
      <span className={inverse ? "text-inv-ink" : "text-ink"}>{num}</span>
      <span>{rest.join("  ·  ")}</span>
    </p>
  );
}

/** Label/value rows. Becomes stacked pairs on small screens. */
export function FactRows({
  rows,
  inverse,
  className,
  labelWidth = "sm:grid-cols-[148px_1fr]",
}: {
  rows: { k: string; v: React.ReactNode }[];
  inverse?: boolean;
  className?: string;
  labelWidth?: string;
}) {
  return (
    <dl className={cn("border-t", inverse ? "border-inv-line" : "border-line", className)}>
      {rows.map((r) => (
        <div
          key={r.k}
          className={cn(
            "grid grid-cols-1 gap-x-6 gap-y-0.5 border-b py-3",
            labelWidth,
            inverse ? "border-inv-line" : "border-line",
          )}
        >
          <dt className={cn("font-mono text-[13px] leading-6", inverse ? "text-inv-muted" : "text-muted")}>{r.k}</dt>
          <dd className="leading-6">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ExternalLink({
  href,
  children,
  className,
  hrefLang,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  hrefLang?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" hrefLang={hrefLang} className={cn("link", className)}>
      {children}
      <span aria-hidden="true" className="ml-1 inline-block text-[0.85em]">
        ↗
      </span>
    </a>
  );
}

/** Renders `code` spans written with backticks in the content files. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("`") ? (
          <code key={i} className="rounded-sm bg-ink/[0.07] px-1 py-px font-mono text-[0.88em]">
            {p.slice(1, -1)}
          </code>
        ) : (
          p
        ),
      )}
    </>
  );
}
