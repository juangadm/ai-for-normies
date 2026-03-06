"use client";

import { useEffect, useRef, useState } from "react";

const categories = [
  {
    label: "AI Apps",
    names: ["Claude Desktop", "Cursor", "VS Code", "Windsurf", "ChatGPT"],
  },
  {
    label: "Tool Providers",
    names: ["GitHub", "Slack", "Google Drive", "PostgreSQL", "Stripe", "Jira"],
  },
  {
    label: "Companies",
    names: ["Block", "Apollo", "Replit", "Sourcegraph", "Zed"],
  },
];

export function AdoptionGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let delayIndex = 0;

  return (
    <div ref={ref} className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.label}>
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
            {cat.label}
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.names.map((name) => {
              const delay = delayIndex * 50;
              delayIndex++;
              return (
                <span
                  key={name}
                  className="border border-border px-2.5 py-1 font-mono text-[11px] text-ink transition-all duration-500"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {name}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
