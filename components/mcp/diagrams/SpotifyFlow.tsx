"use client";

import { PRIMITIVE_COLORS } from "@/lib/constants";
import type { FlowStep } from "@/content/mcp/spotify-example";

const primitiveLabel = {
  tool: "TOOL",
  resource: "RESOURCE",
  prompt: "PROMPT",
} as const;

export function SpotifyFlow({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const color = PRIMITIVE_COLORS[`${step.primitive}s` as keyof typeof PRIMITIVE_COLORS];
        return (
          <div key={i} className="flex gap-4">
            {/* Step number + connector line */}
            <div className="flex flex-col items-center">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-ink/15 font-mono text-[12px] text-ink">
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 bg-border" />
              )}
            </div>

            {/* Content */}
            <div className="pb-4">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-[14px] font-semibold text-ink">
                  {step.label}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.1em]"
                  style={{ color: color.accent }}
                >
                  [{primitiveLabel[step.primitive]}]
                </span>
              </div>
              <code className="mb-1 block font-mono text-[12px] text-ink-light/60">
                {step.name}
              </code>
              <p className="text-[14px] leading-[1.8] text-ink-light">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
