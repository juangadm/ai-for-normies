"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { type: "box" as const, label: "AI calls tool" },
  { type: "diamond" as const, label: "On allowlist?" },
  { type: "box" as const, label: "Execute", isTerminal: true },
  { type: "box" as const, label: "Prompt user" },
  { type: "diamond" as const, label: "Approved?" },
  { type: "box" as const, label: "Execute", isTerminal: true },
  { type: "box" as const, label: "Deny", isDeny: true },
];

// Layout: linear flow with a branch at step 1 (diamond)
// Row 1: [AI calls tool] -> [On allowlist?] --Yes--> [Execute]
// Row 2:                          |No
//                          [Prompt user] -> [Approved?] --Yes--> [Execute]
//                                                |No
//                                              [Deny]

export function SecurityFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          // Animate steps in sequentially
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleCount(count);
            if (count >= 7) clearInterval(interval);
          }, 250);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const boxStyle = (index: number, isAccent?: boolean, isDeny?: boolean) => ({
    opacity: visibleCount > index ? 1 : 0,
    transform: visibleCount > index ? "translateY(0)" : "translateY(6px)",
    transition: "all 300ms ease",
    borderColor: isDeny ? "#9b9fa7" : isAccent ? "#e67e22" : undefined,
  });

  const arrowVisible = (index: number) => visibleCount > index;

  return (
    <div ref={ref} className="my-8 overflow-x-auto">
      <div className="min-w-[520px]">
        {/* Row 1 */}
        <div className="flex items-center gap-0">
          {/* Step 0: AI calls tool */}
          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(0)}
          >
            AI calls tool
          </div>

          <Arrow visible={arrowVisible(0)} />

          {/* Step 1: Diamond - On allowlist? */}
          <div
            className="shrink-0 rotate-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={{ ...boxStyle(1), clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", padding: "12px 24px" }}
          >
            Allowlist?
          </div>

          <Arrow visible={arrowVisible(1)} label="Yes" />

          {/* Step 2: Execute (accent) */}
          <div
            className="shrink-0 border-2 px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(2, true)}
          >
            Execute
          </div>
        </div>

        {/* Vertical connector from diamond to row 2 */}
        <div className="ml-[196px] flex flex-col items-center">
          <div
            className="h-6 w-px bg-border transition-opacity duration-300"
            style={{ opacity: arrowVisible(2) ? 1 : 0 }}
          />
          <span
            className="font-mono text-[9px] text-ink-muted transition-opacity duration-300"
            style={{ opacity: arrowVisible(2) ? 1 : 0 }}
          >
            No
          </span>
          <div
            className="h-2 w-px bg-border transition-opacity duration-300"
            style={{ opacity: arrowVisible(2) ? 1 : 0 }}
          />
        </div>

        {/* Row 2 */}
        <div className="ml-[148px] flex items-center gap-0">
          {/* Step 3: Prompt user */}
          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(3)}
          >
            Prompt user
          </div>

          <Arrow visible={arrowVisible(3)} />

          {/* Step 4: Diamond - Approved? */}
          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={{ ...boxStyle(4), clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", padding: "12px 24px" }}
          >
            Approved?
          </div>

          <Arrow visible={arrowVisible(4)} label="Yes" />

          {/* Step 5: Execute (accent) */}
          <div
            className="shrink-0 border-2 px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(5, true)}
          >
            Execute
          </div>
        </div>

        {/* Vertical connector from approved? diamond to Deny */}
        <div className="ml-[345px] flex flex-col items-center">
          <div
            className="h-6 w-px bg-border transition-opacity duration-300"
            style={{ opacity: arrowVisible(5) ? 1 : 0 }}
          />
          <span
            className="font-mono text-[9px] text-ink-muted transition-opacity duration-300"
            style={{ opacity: arrowVisible(5) ? 1 : 0 }}
          >
            No
          </span>
          <div
            className="h-2 w-px bg-border transition-opacity duration-300"
            style={{ opacity: arrowVisible(5) ? 1 : 0 }}
          />
        </div>

        {/* Row 3: Deny */}
        <div className="ml-[315px]">
          <div
            className="inline-block shrink-0 border border-ink-muted px-3 py-1.5 font-mono text-[11px] text-ink-muted"
            style={boxStyle(6, false, true)}
          >
            Deny
          </div>
        </div>
      </div>
    </div>
  );
}

function Arrow({ visible, label }: { visible: boolean; label?: string }) {
  return (
    <div
      className="flex shrink-0 items-center transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="h-px w-6 bg-border" />
      {label && (
        <span className="mx-1 font-mono text-[9px] text-ink-muted">{label}</span>
      )}
      <div
        className="h-0 w-0"
        style={{
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
          borderLeft: "6px solid #e4e4e7",
        }}
      />
    </div>
  );
}
