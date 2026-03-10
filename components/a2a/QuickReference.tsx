import { SectionCard } from "@/components/layout/SectionCard";
import { DecisionFlowMini } from "./diagrams/DecisionFlowMini";
import { a2aCheatSheet } from "@/content/a2a/cheatsheet";

export function QuickReference() {
  return (
    <SectionCard id="a2a-quick-reference" divider={false}>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 5
      </div>
      <h2 className="mb-2 font-serif text-[24px] font-semibold text-ink">
        Quick Reference
      </h2>
      <p className="mb-6 text-[14px] leading-[1.8] text-ink-light">
        Should you use A2A? Start here.
      </p>

      {/* Mini decision tree */}
      <DecisionFlowMini />

      {/* Cheat sheet Q&A */}
      <div className="mt-8">
        <h3 className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Common Questions
        </h3>
        <div>
          {a2aCheatSheet.map((item) => (
            <div
              key={item.question}
              className="border-b border-border py-4 last:border-b-0"
            >
              <p className="mb-2 font-mono text-[13px] font-semibold text-ink">
                {item.question}
              </p>
              <p className="text-[14px] leading-[1.8] text-ink-light">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
