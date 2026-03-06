import { SectionCard } from "@/components/layout/SectionCard";
import { SecurityFlow } from "./diagrams/SecurityFlow";
import { TokenCostVisual } from "./diagrams/TokenCostVisual";

export function Decisions() {
  return (
    <SectionCard id="decisions">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 4
      </div>
      <h2 className="mb-6 font-serif text-[24px] font-semibold text-ink">
        Decisions & Trade-offs
      </h2>

      {/* When to use */}
      <div id="when-to-use" className="mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          When MCP makes sense
        </h3>
        <ul className="space-y-2 text-[14px] leading-[1.8] text-ink-light">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">+</span>
            You want your product to work with multiple AI apps, not just one
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">+</span>
            You want the AI to dynamically discover what it can do with your
            product
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">+</span>
            You need a clear permission model for AI-initiated actions
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">+</span>
            You want to leverage pre-built MCP servers in the ecosystem
          </li>
        </ul>
      </div>

      {/* When not to use */}
      <div id="when-not-to-use" className="mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          When it probably doesn&apos;t (yet)
        </h3>
        <ul className="space-y-2 text-[14px] leading-[1.8] text-ink-light">
          <li className="flex gap-2">
            <span className="shrink-0 text-ink-muted">&minus;</span>
            You only need to connect to one AI app (a direct integration may
            be simpler)
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-ink-muted">&minus;</span>
            Your use case is purely internal with no external AI exposure
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-ink-muted">&minus;</span>
            You need sub-millisecond latency (the protocol adds overhead)
          </li>
        </ul>
      </div>

      {/* Security Model */}
      <div id="security-model" className="mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Security Model
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            Every Tool you expose via MCP is a <strong>permission grant</strong>.
            You&apos;re giving the AI the ability to perform that action on behalf
            of the user. Treat every tool like an API endpoint with its own auth scope.
          </p>
          <p>
            The approval flow has two modes: <strong>per-call</strong> (the user
            approves every tool invocation) and <strong>allowlists</strong> (pre-approved
            tools run without prompting). Most teams start with per-call and graduate
            to allowlists once they trust the setup.
          </p>
          <p>
            Start narrow and expand — it&apos;s easier to add tools than to revoke
            them. Servers should implement authentication, and hosts should show
            users exactly what tools are being called.
          </p>
        </div>
        <SecurityFlow />
      </div>

      {/* Cost Model */}
      <div id="cost-model">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Cost Model
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            Every tool you expose gets described in the AI&apos;s context window.
            10 tools with detailed descriptions can use <strong>2,000+ tokens</strong>{" "}
            before the conversation even starts.
          </p>
          <p>
            A focused set of <strong>5 tools often outperforms a sprawling set of 50</strong>.
            Be intentional about what you expose. More tools means more tokens per request,
            higher latency, and more opportunities for the AI to choose the wrong tool.
          </p>
          <p>
            Frame this for your engineering team: every tool you add has a per-request
            cost in tokens and a quality cost in tool-selection accuracy. Audit your
            tool set regularly.
          </p>
        </div>
        <TokenCostVisual />
      </div>
    </SectionCard>
  );
}
