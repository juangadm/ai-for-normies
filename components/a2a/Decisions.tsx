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
            You have multiple robust, standalone agents — even within the same
            team. United&apos;s Rebooking, Compensation, and Hotel agents each
            have their own capabilities, state, and interfaces
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
            Your &ldquo;agents&rdquo; are thin wrappers around function calls —
            not robust autonomous actors
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
            cases. A2A earns its complexity when you have multiple robust agents
            that need to collaborate — agents with their own capabilities,
            state machines, and interfaces. This can happen across teams, across
            organizations, or even within the same team if the agents are
            complex enough to warrant independence.
          </p>
          <p>
            Frame this for your team: the right question isn&apos;t &ldquo;do
            our agents come from different teams?&rdquo; — it&apos;s &ldquo;are
            our agents truly autonomous actors that need to discover and
            negotiate with each other?&rdquo; If yes, A2A prevents the
            integration spaghetti. If they&apos;re just functions with a fancy
            name, direct calls are simpler.
          </p>
        </div>
        <ComplexitySpectrum />
      </div>
    </SectionCard>
  );
}
