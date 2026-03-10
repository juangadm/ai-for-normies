"use client";

import { useEffect, useRef, useState } from "react";

const bars = [
  { label: "1 agent + MCP tools", width: 20, annotation: "80% of use cases" },
  { label: "Orchestrator + internal agents", width: 55, annotation: "Direct calls are fine" },
  { label: "Multi-org agent federation", width: 100, annotation: "A2A shines here" },
];

export function ComplexitySpectrum() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-8 space-y-4">
      {bars.map((bar, i) => {
        const isLast = i === bars.length - 1;
        return (
          <div key={bar.label}>
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-[11px] text-ink-muted">
                {bar.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative h-5 flex-1">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
                  style={{
                    width: visible ? `${bar.width}%` : "0%",
                    transitionDelay: `${i * 150}ms`,
                    backgroundColor: isLast ? "#e67e22" : "rgba(0,0,0,0.8)",
                  }}
                />
              </div>
              <span
                className="w-40 shrink-0 font-mono text-[11px] transition-opacity duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 150 + 400}ms`,
                  color: isLast ? "#e67e22" : "#6b6f76",
                  fontWeight: isLast ? 600 : 400,
                }}
              >
                {bar.annotation}
                {isLast && " \u2190"}
              </span>
            </div>
          </div>
        );
      })}
      <p className="mt-1 font-mono text-[10px] text-ink-muted">
        complexity required vs. architecture type
      </p>
    </div>
  );
}
