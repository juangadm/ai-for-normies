"use client";

import { useStaggerReveal } from "@/hooks/useInView";
import { FlowArrow } from "@/components/shared/FlowArrow";

const DIAMOND_CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

export function DecisionFlowMini() {
  const [ref, visibleCount] = useStaggerReveal(7, 250);

  function show(i: number) {
    return {
      opacity: visibleCount > i ? 1 : 0,
      transform: visibleCount > i ? "translateY(0)" : "translateY(6px)",
      transition: "all 300ms ease",
    };
  }

  return (
    <div ref={ref} className="my-6 overflow-x-auto">
      <div className="min-w-[480px]">
        {/* Question 1 */}
        <div className="flex items-center gap-0">
          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[10px] text-ink"
            style={{ ...show(0), clipPath: DIAMOND_CLIP, padding: "14px 20px" }}
          >
            Multiple agents?
          </div>

          <FlowArrow visible={visibleCount > 1} label="Yes" />

          <div
            className="shrink-0 border-2 px-3 py-1.5 font-mono text-[11px] font-semibold"
            style={{ ...show(1), borderColor: "#e67e22", color: "#e67e22" }}
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
            style={{ ...show(3), clipPath: DIAMOND_CLIP, padding: "14px 20px" }}
          >
            Multi-turn dialog?
          </div>

          <FlowArrow visible={visibleCount > 4} label="Yes" />

          <div
            className="shrink-0 border-2 px-3 py-1.5 font-mono text-[11px] font-semibold"
            style={{ ...show(4), borderColor: "#e67e22", color: "#e67e22" }}
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
