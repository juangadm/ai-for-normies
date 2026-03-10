"use client";

import { useEffect, useRef, useState } from "react";

export function DecisionFlowMini() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
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

  const show = (i: number) => ({
    opacity: visibleCount > i ? 1 : 0,
    transform: visibleCount > i ? "translateY(0)" : "translateY(6px)",
    transition: "all 300ms ease",
  });

  return (
    <div ref={ref} className="my-6 overflow-x-auto">
      <div className="min-w-[480px]">
        {/* Question 1 */}
        <div className="flex items-center gap-0">
          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[10px] text-ink"
            style={{
              ...show(0),
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              padding: "14px 20px",
            }}
          >
            Multiple agents?
          </div>

          <Arrow visible={visibleCount > 1} label="Yes" />

          <div
            className="shrink-0 border-2 px-3 py-1.5 font-mono text-[11px] font-semibold"
            style={{
              ...show(1),
              borderColor: "#e67e22",
              color: "#e67e22",
            }}
          >
            Use A2A
          </div>
        </div>

        {/* Vertical connector */}
        <div className="ml-[72px] flex flex-col items-center">
          <div
            className="h-4 w-px bg-border transition-opacity duration-300"
            style={{ opacity: visibleCount > 2 ? 1 : 0 }}
          />
          <span
            className="font-mono text-[9px] text-ink-muted transition-opacity duration-300"
            style={{ opacity: visibleCount > 2 ? 1 : 0 }}
          >
            No
          </span>
          <div
            className="h-2 w-px bg-border transition-opacity duration-300"
            style={{ opacity: visibleCount > 2 ? 1 : 0 }}
          />
        </div>

        {/* Question 2 */}
        <div className="ml-[10px] flex items-center gap-0">
          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[10px] text-ink"
            style={{
              ...show(3),
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              padding: "14px 20px",
            }}
          >
            Multi-turn dialog?
          </div>

          <Arrow visible={visibleCount > 4} label="Yes" />

          <div
            className="shrink-0 border-2 px-3 py-1.5 font-mono text-[11px] font-semibold"
            style={{
              ...show(4),
              borderColor: "#e67e22",
              color: "#e67e22",
            }}
          >
            Use A2A
          </div>
        </div>

        {/* Vertical connector */}
        <div className="ml-[82px] flex flex-col items-center">
          <div
            className="h-4 w-px bg-border transition-opacity duration-300"
            style={{ opacity: visibleCount > 5 ? 1 : 0 }}
          />
          <span
            className="font-mono text-[9px] text-ink-muted transition-opacity duration-300"
            style={{ opacity: visibleCount > 5 ? 1 : 0 }}
          >
            No
          </span>
          <div
            className="h-2 w-px bg-border transition-opacity duration-300"
            style={{ opacity: visibleCount > 5 ? 1 : 0 }}
          />
        </div>

        {/* Terminal: Direct calls */}
        <div className="ml-[28px]">
          <div
            className="inline-block shrink-0 border border-ink-muted px-3 py-1.5 font-mono text-[11px] text-ink-muted"
            style={show(6)}
          >
            Direct calls are fine
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
        <span className="mx-1 font-mono text-[9px] text-ink-muted">
          {label}
        </span>
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
