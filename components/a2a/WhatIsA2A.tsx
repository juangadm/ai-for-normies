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
          is an open standard that gives AI agents a common language to discover
          each other and collaborate — regardless of what framework they&apos;re
          built with, what language they&apos;re written in, or where
          they&apos;re deployed.
        </p>
      </div>

      {/* Running example teaser */}
      <CalloutBox variant="insight" title="Running Example">
        Throughout this page, we&apos;ll make this concrete. Imagine United
        Airlines is building an AI-powered customer support system. A
        passenger&apos;s flight gets canceled — the support agent needs to
        coordinate with a Rebooking Agent (built with LangGraph), a Compensation
        Agent (built with CrewAI), and a Hotel Voucher Agent (running on Google
        ADK). Three different frameworks, three opaque systems. How do they talk
        to each other?
      </CalloutBox>

      {/* The Problem */}
      <div id="a2a-the-problem" className="mt-8 mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          The Problem
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            Most agent systems <strong>operate in silos</strong>. They&apos;re
            built on incompatible frameworks, expose custom APIs, and lack any
            shared protocol for communication. United&apos;s Rebooking Agent runs
            on LangGraph. The Compensation Agent uses CrewAI. The Hotel Agent is
            on Google ADK. Each is a{" "}
            <strong>black box</strong> — you can&apos;t see inside it, and you
            shouldn&apos;t have to.
          </p>
          <p>
            But these agents need to collaborate. The Support Agent needs to
            delegate tasks to all three specialists, track progress, handle
            back-and-forth negotiation, and collect results. Without a standard,
            each connection requires fragile, custom integration code that breaks
            whenever either side changes.
          </p>
          <p>
            This isn&apos;t the same problem MCP solves. MCP standardizes how an
            agent accesses tools and data — like a universal plug. The A2A
            problem is different: these are{" "}
            <strong>autonomous, opaque agents</strong> that need to have a
            conversation, not just call a function.
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
            A2A gives agents a <strong>common language</strong> — like HTTP for
            web servers. It doesn&apos;t matter what framework an agent uses
            internally. If it speaks A2A, it can discover other agents, delegate
            tasks, negotiate through multi-turn conversations, and collect
            results. The protocol respects opacity: agents collaborate without
            exposing their internal memory, logic, or tool implementations.
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
            with opaque peers who have their own capabilities and autonomy.
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
