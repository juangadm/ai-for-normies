"use client";

import { useInView } from "@/hooks/useInView";

const categories = [
  {
    label: "AI Platforms",
    names: ["Google", "LangChain", "CrewAI", "LlamaIndex", "Genkit"],
  },
  {
    label: "Enterprise",
    names: ["Salesforce", "SAP", "Atlassian", "ServiceNow", "Workday"],
  },
  {
    label: "Cloud",
    names: ["Google Cloud", "AWS", "Azure", "MongoDB", "Elastic"],
  },
];

const COLS = 5;

export function A2AAdoptionGrid() {
  const [ref, visible] = useInView();

  return (
    <div ref={ref} className="space-y-4">
      {categories.map((cat, rowIdx) => (
        <div key={cat.label}>
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
            {cat.label}
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.names.map((name, colIdx) => {
              const delay = (rowIdx * COLS + colIdx) * 40;
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
