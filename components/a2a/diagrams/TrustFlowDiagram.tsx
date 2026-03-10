"use client";

import { useEffect, useRef, useState } from "react";

export function TrustFlowDiagram() {
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
            if (count >= 6) clearInterval(interval);
          }, 300);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const boxStyle = (index: number, isAccent?: boolean) => ({
    opacity: visibleCount > index ? 1 : 0,
    transform: visibleCount > index ? "translateY(0)" : "translateY(6px)",
    transition: "all 300ms ease",
    borderColor: isAccent ? "#e67e22" : undefined,
  });

  const arrowVisible = (index: number) => visibleCount > index;

  return (
    <div ref={ref} className="my-8 overflow-x-auto">
      <div className="min-w-[520px]">
        {/* Row 1 */}
        <div className="flex items-center gap-0">
          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(0)}
          >
            Want to delegate
          </div>

          <Arrow visible={arrowVisible(0)} />

          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(1)}
          >
            Read Agent Card
          </div>

          <Arrow visible={arrowVisible(1)} />

          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(2)}
          >
            Check auth scheme
          </div>
        </div>

        {/* Vertical connector */}
        <div className="ml-[430px] flex flex-col items-center">
          <div
            className="h-6 w-px bg-border transition-opacity duration-300"
            style={{ opacity: arrowVisible(2) ? 1 : 0 }}
          />
        </div>

        {/* Row 2 */}
        <div className="ml-[310px] flex items-center gap-0">
          <div
            className="shrink-0 border-2 px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(3, true)}
          >
            Authenticate
          </div>

          <Arrow visible={arrowVisible(3)} />

          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(4)}
          >
            Create Task
          </div>

          <Arrow visible={arrowVisible(4)} />

          <div
            className="shrink-0 border-2 px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(5, true)}
          >
            Monitor
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
