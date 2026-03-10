import { SectionCard } from "@/components/layout/SectionCard";
import { TrustFlowDiagram } from "./diagrams/TrustFlowDiagram";
import { ComplexitySpectrum } from "./diagrams/ComplexitySpectrum";

export function Decisions() {
  return (
    <SectionCard id="a2a-decisions">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 4
      </div>
      <h2 className="mb-6 font-serif text-[24px] font-semibold text-ink">
        Decisions & Trade-offs
      </h2>

      {/* When to use */}
      <div id="a2a-when-to-use" className="mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          When A2A makes sense
        </h3>
        <ul className="space-y-2 text-[14px] leading-[1.8] text-ink-light">
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">+</span>
            Agents are owned by different teams or organizations — like
            United&apos;s separate support, rebooking, and compensation teams
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">+</span>
            You need multi-turn negotiation between agents — not just
            fire-and-forget delegation
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">+</span>
            Your agent ecosystem is growing and you want to avoid N&times;M
            custom integrations
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-accent">+</span>
            You want standardized discovery — any agent can find and collaborate
            with any other agent
          </li>
        </ul>
      </div>

      {/* When not to use */}
      <div id="a2a-when-not-to-use" className="mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          When it probably doesn&apos;t
        </h3>
        <ul className="space-y-2 text-[14px] leading-[1.8] text-ink-light">
          <li className="flex gap-2">
            <span className="shrink-0 text-ink-muted">&minus;</span>
            All agents are owned by one team — just call functions directly
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-ink-muted">&minus;</span>
            Single-agent system with MCP tools handles the use case (80% of
            scenarios)
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-ink-muted">&minus;</span>
            Agents need to share memory or state tightly — A2A is for loosely
            coupled collaboration
          </li>
        </ul>
      </div>

      {/* Trust & Security */}
      <div id="a2a-trust-security" className="mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Trust & Security
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            Every Agent Card declares its authentication requirements — OAuth
            2.0, API keys, or mTLS. Before delegating a task, the client agent
            must authenticate with the remote agent&apos;s declared scheme.
          </p>
          <p>
            In the United scenario, the Compensation Agent requires its own auth
            scope — you don&apos;t want the Hotel Agent approving $500 travel
            credits. Each agent enforces its own authorization policies. Every
            task has an owner, and every message has a sender.
          </p>
          <p>
            Start with the principle of least privilege: delegate only what each
            agent needs. The Support Agent can read all three specialists&apos;
            Agent Cards, but it can only create tasks within the scopes it&apos;s
            authorized for.
          </p>
        </div>
        <TrustFlowDiagram />
      </div>

      {/* Complexity Budget */}
      <div id="a2a-complexity-budget">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Complexity Budget
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            A single agent with MCP tools handles the vast majority of use
            cases. A2A earns its complexity when you cross organizational
            boundaries — when the agents you need to coordinate with are built
            and maintained by different teams, with different release cycles,
            different auth systems, and different data ownership.
          </p>
          <p>
            Frame this for your team: the right question isn&apos;t &ldquo;should
            we use A2A?&rdquo; — it&apos;s &ldquo;do our agents cross
            organizational boundaries?&rdquo; If yes, A2A prevents the
            integration spaghetti. If no, direct calls are simpler and faster.
          </p>
        </div>
        <ComplexitySpectrum />
      </div>
    </SectionCard>
  );
}
