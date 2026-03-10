import { SectionCard } from "@/components/layout/SectionCard";
import { TermDefinition } from "@/components/shared/TermDefinition";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { AgentNetworkDiagram } from "./diagrams/AgentNetworkDiagram";
import { A2AAdoptionGrid } from "./diagrams/A2AAdoptionGrid";
import { a2aGlossary } from "@/content/a2a/glossary";

export function WhatIsA2A() {
  return (
    <SectionCard id="what-is-a2a">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 1
      </div>
      <h2 className="mb-2 font-serif text-[24px] font-semibold text-ink">
        What is A2A & Why It Exists
      </h2>
      <p className="mb-6 text-[15px] italic text-ink-light">
        &ldquo;If MCP gives agents their toolbox, A2A gives them a{" "}
        <span className="font-semibold text-ink">conference room</span>.&rdquo;
      </p>

      <div className="mb-6 space-y-4 text-[14px] leading-[1.8] text-ink-light">
        <p>
          The{" "}
          <TermDefinition
            term="Agent-to-Agent Protocol"
            definition={a2aGlossary.A2A}
          />{" "}
          is an open standard that lets AI agents discover each other and
          collaborate on tasks. Instead of building custom integrations between
          every pair of agents, A2A provides one protocol for discovery,
          delegation, and delivery.
        </p>
      </div>

      {/* Running example teaser */}
      <CalloutBox variant="insight" title="Running Example">
        Throughout this page, we&apos;ll make this concrete. Imagine United
        Airlines is building an AI-powered customer support system. A
        passenger&apos;s flight gets canceled — the support agent needs to
        coordinate with a Rebooking Agent, a Compensation Agent, and a Hotel
        Voucher Agent, each owned by different internal teams. What does that
        architecture look like?
      </CalloutBox>

      {/* The Problem */}
      <div id="a2a-the-problem" className="mt-8 mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          The Problem
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            Without a standard, connecting agents is a{" "}
            <strong>multiplication problem</strong>. United&apos;s support team
            has 3 orchestrator agents and 5 specialist agents. Every orchestrator
            needs its own connector for every specialist — that&apos;s 3 &times;
            5 = <strong>15 custom protocols</strong> to build and maintain.
          </p>
          <p>
            Each integration has its own message format, discovery logic,
            authentication, and error handling. When one agent updates its
            interface, every integration that touches it breaks.
          </p>
          <p>
            This is where agent ecosystems were before A2A — every team building
            bespoke bridges between their agents.
          </p>
        </div>
      </div>

      <AgentNetworkDiagram />

      {/* The Solution */}
      <div id="a2a-the-solution" className="mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          The Solution
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            A2A turns that multiplication into <strong>addition</strong>. Each
            agent publishes a card describing what it can do. Any agent can read
            that card and start a collaboration. 3 orchestrators + 5 specialists
            = <strong>8 A2A implementations instead of 15</strong> custom
            protocols.
          </p>
          <p>
            Google created A2A as the natural complement to MCP. Where MCP
            connects agents to tools and data (vertical access), A2A connects
            agents to other agents (horizontal collaboration). Both are now under
            the Linux Foundation.
          </p>
          <p>
            Think of MCP as plugging in a USB drive — your agent gets access to
            files. A2A is joining a conference call — your agent collaborates
            with peers.
          </p>
        </div>
      </div>

      {/* Who's Building With It */}
      <div id="a2a-who-adopted">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Who&apos;s building with it
        </h3>
        <p className="mb-4 text-[14px] leading-[1.8] text-ink-light">
          Google launched A2A with 50+ partners. The protocol now has 150+
          organizations contributing, spanning AI platforms, enterprise software,
          and cloud providers.
        </p>
        <A2AAdoptionGrid />
      </div>
    </SectionCard>
  );
}
