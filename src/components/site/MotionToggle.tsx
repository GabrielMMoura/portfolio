"use client";

import { useRef, useState } from "react";

/** Pause/play for the looping diagram (WCAG 2.2.2). Hidden when the user prefers reduced motion. */
export function MotionToggle({ pauseLabel, playLabel }: { pauseLabel: string; playLabel: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);

  function toggle() {
    const next = !paused;
    setPaused(next);
    ref.current?.closest("[data-diagram-box]")?.classList.toggle("is-paused", next);
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className="motion-toggle hidden h-11 items-center gap-2 rounded-md border border-ink/30 px-3.5 font-mono text-[13px] transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-bg lg:inline-flex"
    >
      <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
      {paused ? playLabel : pauseLabel}
    </button>
  );
}
