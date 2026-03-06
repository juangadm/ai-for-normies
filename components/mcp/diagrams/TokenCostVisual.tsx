"use client";

import { useEffect, useRef, useState } from "react";

const bars = [
  { tools: 5, tokens: "~500", width: 10 },
  { tools: 20, tokens: "~4,000", width: 40 },
  { tools: 50, tokens: "~10,000+", width: 100 },
];

export function TokenCostVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-8 space-y-3">
      {bars.map((bar, i) => (
        <div key={bar.tools} className="flex items-center gap-3">
          <span className="w-16 shrink-0 text-right font-mono text-[11px] text-ink-muted">
            {bar.tools} tools
          </span>
          <div className="relative h-5 flex-1">
            <div
              className="absolute inset-y-0 left-0 bg-ink/80 transition-all duration-700 ease-out"
              style={{
                width: visible ? `${bar.width}%` : "0%",
                transitionDelay: `${i * 150}ms`,
              }}
            />
          </div>
          <span
            className="w-20 shrink-0 font-mono text-[11px] text-ink-light transition-opacity duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transitionDelay: `${i * 150 + 400}ms`,
            }}
          >
            {bar.tokens}
          </span>
        </div>
      ))}
      <p className="mt-1 font-mono text-[10px] text-ink-muted">
        tokens consumed per request just for tool descriptions
      </p>
    </div>
  );
}
