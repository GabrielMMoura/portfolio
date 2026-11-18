import type { Dict } from "@/content/en";
import { LiveWhenVisible } from "./LiveWhenVisible";

type D = Dict["agentoffice"]["diagram"];
type NodeKey = "ui" | "api" | "queue" | "worker" | "llm" | "vector" | "approval";

const W = 170;
const H = 64;
const pos: Record<NodeKey, [number, number]> = {
  ui: [20, 40],
  api: [250, 40],
  queue: [480, 40],
  worker: [710, 40],
  approval: [20, 250],
  vector: [480, 250],
  llm: [710, 250],
};

// Paths follow the order a task takes. `d` is the delay inside a 7s loop.
const edges: { id: string; path: string; d: number; kind?: "state" | "approval" }[] = [
  { id: "task", path: "M190 62 H250", d: 0 },
  { id: "enqueue", path: "M420 72 H480", d: 0.7 },
  { id: "dequeue", path: "M650 72 H710", d: 1.4 },
  { id: "model", path: "M830 104 V250", d: 2.1 },
  { id: "retrieve", path: "M710 282 H650", d: 2.8 },
  { id: "state-up", path: "M795 40 V16 H335 V40", d: 3.5, kind: "state" },
  { id: "state-ui", path: "M250 86 H190", d: 4.2, kind: "state" },
  { id: "to-approval", path: "M740 104 V196 H150 V250", d: 4.0, kind: "approval" },
  { id: "approve", path: "M60 250 V104", d: 5.95, kind: "approval" },
];

function Node({ k, label }: { k: NodeKey; label: string[] }) {
  const [x, y] = pos[k];
  return (
    <g className={k === "approval" ? "node-approval" : undefined}>
      <rect x={x} y={y} width={W} height={H} rx={6} fill="var(--paper)" stroke="var(--line)" strokeWidth={1.5} />
      <text x={x + 14} y={y + 27} fontSize={15} fontWeight={500} fill="var(--ink)">
        {label[0]}
      </text>
      <text x={x + 14} y={y + 47} fontSize={11.5} fill="var(--muted)" fontFamily="var(--font-mono)">
        {label[1]}
      </text>
    </g>
  );
}

export function ArchitectureDiagram({ d }: { d: D }) {
  const steps: { k: NodeKey; label: string[] }[] = [
    { k: "ui", label: d.ui },
    { k: "api", label: d.api },
    { k: "queue", label: d.queue },
    { k: "worker", label: d.worker },
    { k: "llm", label: [d.llm[0], `${d.llm[1]} · ${d.vector[1]}`] },
    { k: "approval", label: d.approval },
  ];

  return (
    <>
      {/* Desktop: animated system view. Decorative; the list below carries the same information. */}
      <LiveWhenVisible className="diagram hidden lg:block">
        <svg viewBox="0 0 900 340" role="presentation" aria-hidden="true" className="h-auto w-full font-sans">
          <defs>
            <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L8 4 L0 8 z" fill="var(--muted)" />
            </marker>
          </defs>
          {edges.map((e) => (
            <path
              key={`base-${e.id}`}
              d={e.path}
              fill="none"
              stroke="var(--muted)"
              strokeOpacity={0.55}
              strokeWidth={1.25}
              strokeDasharray={e.kind === "approval" ? "4 4" : undefined}
              markerEnd="url(#arrow)"
            />
          ))}
          {edges.map((e) => (
            <path
              key={`flow-${e.id}`}
              d={e.path}
              pathLength={100}
              className={`flow${e.kind ? ` flow-${e.kind}` : ""}`}
              style={{ "--d": `${e.d}s` } as React.CSSProperties}
            />
          ))}
          <text x={220} y={54} textAnchor="middle" fontSize={11} fill="var(--muted)" fontFamily="var(--font-mono)">
            {d.edgeTask}
          </text>
          <text x={565} y={10} textAnchor="middle" fontSize={11} fill="var(--muted)" fontFamily="var(--font-mono)">
            {d.edgeState} · Socket.IO
          </text>
          {(Object.keys(pos) as NodeKey[]).map((k) => (
            <Node key={k} k={k} label={d[k]} />
          ))}
          <text x={20} y={334} fontSize={12} fill="var(--warn)" fontFamily="var(--font-mono)" className="approval-tag">
            ● {d.waiting}
          </text>
        </svg>
      </LiveWhenVisible>

      {/* Mobile and screen readers: the same flow as an ordered list. */}
      <ol className="relative space-y-3 lg:sr-only">
        {steps.map((s, i) => (
          <li key={s.k} className="relative grid grid-cols-[28px_1fr] items-start gap-3">
            <span className="mt-2.5 font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
            <div
              className="rounded-md border border-line bg-paper px-3.5 py-2.5"
              style={s.k === "approval" ? { borderColor: "var(--warn)" } : undefined}
            >
              <p className="font-medium leading-6">{s.label[0]}</p>
              <p className="font-mono text-[12px] leading-5 text-muted">{s.label[1]}</p>
            </div>
          </li>
        ))}
        <li className="grid grid-cols-[28px_1fr] gap-3">
          <span className="font-mono text-[12px] text-muted" aria-hidden="true">
            ↺
          </span>
          <p className="font-mono text-[12px] leading-5 text-muted">
            {d.edgeState} → {d.ui[0]} · Socket.IO
          </p>
        </li>
      </ol>
    </>
  );
}
