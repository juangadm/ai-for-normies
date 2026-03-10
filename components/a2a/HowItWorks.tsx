import { SectionCard } from "@/components/layout/SectionCard";
import { TermDefinition } from "@/components/shared/TermDefinition";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { AgentCardVisual } from "./diagrams/AgentCardVisual";
import { TaskStateMachine } from "./diagrams/TaskStateMachine";
import { MessageExchangeDiagram } from "./diagrams/MessageExchangeDiagram";
import { a2aGlossary } from "@/content/a2a/glossary";

export function HowItWorks() {
  return (
    <SectionCard id="how-it-works">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 2
      </div>
      <h2 className="mb-6 font-serif text-[24px] font-semibold text-ink">
        How It Works
      </h2>

      <p className="mb-8 text-[14px] leading-[1.8] text-ink-light">
        A2A has four core concepts. Each one maps to a step in the United
        Airlines support scenario — from discovering which specialist to call, to
        delivering the passenger&apos;s new boarding pass.
      </p>

      {/* Agent Cards */}
      <div id="agent-cards" className="mb-10">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Agent Cards
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            An{" "}
            <TermDefinition
              term="Agent Card"
              definition={a2aGlossary["Agent Card"]}
            />{" "}
            is a JSON document published at{" "}
            <code className="font-mono text-[12px]">
              /.well-known/agent.json
            </code>{" "}
            — think of it as a LinkedIn profile for an AI agent. It lists the
            agent&apos;s name, description, skills, supported input/output types,
            authentication requirements, and endpoint URL.
          </p>
          <p>
            United&apos;s Rebooking Agent publishes a card listing skills like{" "}
            <code className="font-mono text-[12px]">search-flights</code> and{" "}
            <code className="font-mono text-[12px]">rebook-passenger</code>.
            When the Support Agent receives a passenger&apos;s message about a
            canceled flight, it reads the Rebooking Agent&apos;s card to confirm
            it has the right capabilities.
          </p>
        </div>

        <AgentCardVisual />
      </div>

      {/* Tasks */}
      <div id="tasks" className="mb-10">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Tasks
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            A{" "}
            <TermDefinition term="Task" definition={a2aGlossary.Task} /> is the
            unit of work in A2A. The Support Agent creates a task:{" "}
            <em>&ldquo;Rebook passenger JG-4821 on next available SFO→NRT.&rdquo;</em>{" "}
            Tasks have a lifecycle — they move through states as the remote agent
            processes them.
          </p>
          <p>
            The key insight is that tasks aren&apos;t linear. They form a{" "}
            <strong>state machine</strong> with loops. A task can go from
            WORKING to INPUT_REQUIRED (the agent needs more info), back to
            WORKING (the user responded), and finally to COMPLETED. This
            enables natural multi-turn collaboration.
          </p>
        </div>

        <TaskStateMachine />

        <CalloutBox variant="tip" title="Why This Matters for PMs">
          The INPUT_REQUIRED state is what makes A2A different from simple
          fire-and-forget delegation. It means agents can negotiate, ask
          clarifying questions, and collaborate iteratively — just like human
          team members would.
        </CalloutBox>
      </div>

      {/* Messages & Parts */}
      <div id="messages-and-parts" className="mb-10">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Messages & Parts
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            <TermDefinition
              term="Messages"
              definition={a2aGlossary.Message}
            />{" "}
            are the back-and-forth within a task — the actual conversation
            between client and remote agent. Each message contains one or more{" "}
            <TermDefinition term="Parts" definition={a2aGlossary.Part} /> —
            text, files, or structured data.
          </p>
          <p>
            The Rebooking Agent&apos;s message asking{" "}
            <em>&ldquo;Window or aisle? Direct only or connections OK?&rdquo;</em>{" "}
            is a Message with text Parts. The passenger&apos;s preferences come
            back as another Message. This is a conversation, not a one-shot API
            call.
          </p>
        </div>

        <MessageExchangeDiagram />
      </div>

      {/* Artifacts */}
      <div id="artifacts">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Artifacts
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            <TermDefinition
              term="Artifacts"
              definition={a2aGlossary.Artifact}
            />{" "}
            are the immutable outputs a remote agent produces when a task
            completes. They&apos;re the deliverables — the things you actually
            wanted from the collaboration.
          </p>
          <p>
            In the United scenario: the Rebooking Agent produces a new boarding
            pass PDF. The Compensation Agent produces a $200 travel credit
            confirmation. The Hotel Agent produces a Hyatt SFO voucher. Each is
            an Artifact attached to its respective task.
          </p>
        </div>

        <CalloutBox variant="insight" title="Key Insight for PMs">
          As a PM, you define what Artifacts your agent produces. These are
          your agent&apos;s outputs — the value it delivers to the ecosystem. A
          well-defined Artifact schema is the contract between your agent and
          every agent that might delegate work to it.
        </CalloutBox>
      </div>
    </SectionCard>
  );
}
