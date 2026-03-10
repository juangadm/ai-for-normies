"use client";

import { useStaggerReveal } from "@/hooks/useInView";
import { FlowArrow } from "@/components/shared/FlowArrow";

export function TrustFlowDiagram() {
  const [ref, visibleCount] = useStaggerReveal(6, 300);

  function boxStyle(index: number, isAccent?: boolean) {
    return {
      opacity: visibleCount > index ? 1 : 0,
      transform: visibleCount > index ? "translateY(0)" : "translateY(6px)",
      transition: "all 300ms ease",
      borderColor: isAccent ? "#e67e22" : undefined,
    };
  }

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

          <FlowArrow visible={visibleCount > 0} />

          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(1)}
          >
            Read Agent Card
          </div>

          <FlowArrow visible={visibleCount > 1} />

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
            style={{ opacity: visibleCount > 2 ? 1 : 0 }}
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

          <FlowArrow visible={visibleCount > 3} />

          <div
            className="shrink-0 border border-border px-3 py-1.5 font-mono text-[11px] text-ink"
            style={boxStyle(4)}
          >
            Create Task
          </div>

          <FlowArrow visible={visibleCount > 4} />

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
