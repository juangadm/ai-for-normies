import { SectionCard } from "@/components/layout/SectionCard";
import { mcpCheatSheet } from "@/content/mcp/cheatsheet";

export function QuickReference() {
  return (
    <SectionCard id="quick-reference" divider={false}>
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 5
      </div>
      <h2 className="mb-2 font-serif text-[24px] font-semibold text-ink">
        Quick Reference
      </h2>
      <p className="mb-6 text-[14px] leading-[1.8] text-ink-light">
        Common questions you might face in an AI product interview — answers
        visible, no clicking required.
      </p>

      <div>
        {mcpCheatSheet.map((item) => (
          <div key={item.question} className="border-b border-border py-4 last:border-b-0">
            <p className="mb-2 font-mono text-[13px] font-semibold text-ink">
              {item.question}
            </p>
            <p className="text-[14px] leading-[1.8] text-ink-light">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
