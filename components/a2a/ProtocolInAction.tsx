import { SectionCard } from "@/components/layout/SectionCard";
import { ComparisonTable } from "@/components/shared/ComparisonTable";
import { UnitedOrchestrationFlow } from "./diagrams/UnitedOrchestrationFlow";
import { UnitedSupportExample } from "./diagrams/UnitedSupportExample";
import { a2aVsCustom } from "@/content/a2a/united-example";

export function ProtocolInAction() {
  return (
    <SectionCard id="protocol-in-action">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 3
      </div>
      <h2 className="mb-2 font-serif text-[24px] font-semibold text-ink">
        The Protocol in Action
      </h2>
      <p className="mb-6 text-[14px] leading-[1.8] text-ink-light">
        All four concepts working together — one scenario, end to end.
      </p>

      {/* Scene-setting user message */}
      <div id="united-scenario" className="mb-10 border-l-2 border-border py-3 pl-5">
        <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
          Passenger message
        </div>
        <p className="font-serif text-[16px] italic text-ink">
          &ldquo;My flight UA 837 to Tokyo just got canceled — what are my
          options?&rdquo;
        </p>
      </div>

      {/* Discovery */}
      <div className="mb-8 space-y-4 text-[14px] leading-[1.8] text-ink-light">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Discovery
        </h3>
        <p>
          The Support Agent reads Agent Cards for three specialists: the
          Rebooking Agent (skills: search-flights, rebook-passenger), the
          Compensation Agent (skills: check-eligibility, issue-credit), and the
          Hotel Voucher Agent (skills: search-hotels, issue-voucher). Each
          card tells the Support Agent exactly what that specialist can do and
          how to authenticate.
        </p>
      </div>

      {/* Delegation */}
      <div className="mb-8 space-y-4 text-[14px] leading-[1.8] text-ink-light">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Delegation
        </h3>
        <p>
          Three tasks created in parallel: &ldquo;Find alternative flights
          SFO→NRT,&rdquo; &ldquo;Calculate compensation eligibility,&rdquo;
          and &ldquo;Check hotel voucher availability near SFO.&rdquo; Each
          task starts in SUBMITTED and immediately transitions to WORKING as
          the specialist picks it up.
        </p>
      </div>

      {/* Collaboration */}
      <div className="mb-8 space-y-4 text-[14px] leading-[1.8] text-ink-light">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Collaboration
        </h3>
        <p>
          The Rebooking Agent enters INPUT_REQUIRED:{" "}
          <em>
            &ldquo;I found 3 options. Window or aisle? Direct only or
            connections OK?&rdquo;
          </em>{" "}
          The Support Agent relays the question, gets the passenger&apos;s
          preference, and responds. Meanwhile, the Compensation Agent and Hotel
          Agent are working independently — no blocking.
        </p>
      </div>

      {/* Delivery */}
      <div className="mb-10 space-y-4 text-[14px] leading-[1.8] text-ink-light">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Delivery
        </h3>
        <p>
          Artifacts flow back: a new boarding pass (UA 892, departs 6:15 PM,
          seat 14A), a $200 travel credit, and a Hyatt SFO voucher for one
          night. Each specialist&apos;s task transitions to COMPLETED with its
          artifact attached.
        </p>
      </div>

      {/* Full orchestration diagram */}
      <div id="full-orchestration">
        <h3 className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          The Complete Picture
        </h3>
        <p className="mb-4 text-[14px] leading-[1.8] text-ink-light">
          Watch the full United scenario play out — discovery, delegation,
          collaboration, and delivery in one flow.
        </p>
        <UnitedOrchestrationFlow />
      </div>

      <UnitedSupportExample />

      {/* A2A vs Custom Integration */}
      <div id="a2a-vs-custom">
        <h3 className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          A2A vs. Custom Agent Integration
        </h3>
        <ComparisonTable
          headers={["Custom Integration", "With A2A"]}
          rows={a2aVsCustom}
        />
      </div>
    </SectionCard>
  );
}
