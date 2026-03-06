import { SectionCard } from "@/components/layout/SectionCard";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { ComparisonTable } from "@/components/shared/ComparisonTable";
import { PrimitiveCard } from "./diagrams/PrimitiveCard";
import { SpotifyFlow } from "./diagrams/SpotifyFlow";
import {
  spotifyScenario,
  mcpVsDirectApi,
} from "@/content/mcp/spotify-example";

export function Primitives() {
  return (
    <SectionCard id="primitives">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 3
      </div>
      <h2 className="mb-2 font-serif text-[24px] font-semibold text-ink">
        Tools, Resources & Prompts
      </h2>
      <p className="mb-6 text-[14px] leading-[1.8] text-ink-light">
        MCP servers expose three capabilities. Let&apos;s see each through a real
        scenario — a Spotify support agent.
      </p>

      {/* Scene-setting user message */}
      <div className="mb-10 border-l-2 border-border py-3 pl-5">
        <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
          User message
        </div>
        <p className="font-serif text-[16px] italic text-ink">
          &ldquo;{spotifyScenario.userMessage}&rdquo;
        </p>
      </div>

      {/* Resources */}
      <div id="primitive-resources" className="mb-10">
        <PrimitiveCard
          type="resources"
          title="Resources"
          metaphor="Giving it eyes"
          description="Read-only data the AI can access. Resources don't change anything — they provide context for better decisions."
          examples={[
            "file://docs/api-spec.yaml",
            "db://users/{id}/profile",
            "metrics://dashboard/conversion",
          ]}
        />
        <div className="mt-4 border-l-2 border-border pl-5">
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
            Spotify steps 1 & 2
          </p>
          <p className="text-[14px] leading-[1.8] text-ink-light">
            The agent reads the user&apos;s profile (<code className="font-mono text-[12px]">spotify://user/profile</code>)
            and checks the playlist status (<code className="font-mono text-[12px]">spotify://playlists/discover-weekly</code>).
            Both are read-only Resources — no state changes, just gathering context.
          </p>
        </div>
        <div className="mt-4">
          <CalloutBox variant="tip" title="Start Here">
            Resources are read-only — the safest entry point for MCP adoption. Let
            the AI read your data before giving it the ability to change anything.
          </CalloutBox>
        </div>
      </div>

      {/* Prompts */}
      <div id="primitive-prompts" className="mb-10">
        <PrimitiveCard
          type="prompts"
          title="Prompts"
          metaphor="Giving it a script"
          description="Pre-written templates that guide the AI's behavior for specific tasks. Prompts ensure consistent, high-quality outputs."
          examples={[
            "support-diagnosis(issue, context)",
            "code-review(diff, guidelines)",
            "weekly-report(metrics, period)",
          ]}
        />
        <div className="mt-4 border-l-2 border-border pl-5">
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
            Spotify step 3
          </p>
          <p className="text-[14px] leading-[1.8] text-ink-light">
            A pre-written Prompt template kicks in: <code className="font-mono text-[12px]">spotify-support-diagnosis</code> —
            &ldquo;Given the user&apos;s profile and playlist data, diagnose why their Discover
            Weekly is stale and recommend a fix.&rdquo; SOPs for the AI, ensuring consistency
            across every support interaction.
          </p>
        </div>
      </div>

      {/* Tools */}
      <div id="primitive-tools" className="mb-10">
        <PrimitiveCard
          type="tools"
          title="Tools"
          metaphor="Giving it hands"
          description="Functions the AI can call to perform actions. Tools change state — they send emails, update records, trigger pipelines."
          examples={[
            "send_email(to, subject, body)",
            "create_ticket(title, priority)",
            "deploy_service(env, version)",
          ]}
        />
        <div className="mt-4 border-l-2 border-border pl-5">
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
            Spotify step 4
          </p>
          <p className="text-[14px] leading-[1.8] text-ink-light">
            Based on the diagnosis, the agent calls <code className="font-mono text-[12px]">refresh_discover_weekly</code> —
            a Tool that force-refreshes the playlist generation pipeline. This is an action that changes state.
            Treat tools like API endpoints with auth scopes.
          </p>
        </div>
      </div>

      {/* Full Flow */}
      <div id="full-flow" className="mb-10">
        <h3 className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          The Complete Picture
        </h3>
        <p className="mb-4 text-[14px] leading-[1.8] text-ink-light">
          All five steps together — Resources gather context, a Prompt guides reasoning,
          a Tool takes action, then a Resource confirms the result.
        </p>
        <SpotifyFlow steps={spotifyScenario.steps} />
      </div>

      {/* MCP vs Direct API */}
      <div id="mcp-vs-direct-api">
        <h3 className="mb-4 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          MCP vs. Direct API Integration
        </h3>
        <ComparisonTable
          headers={["Direct API", "With MCP"]}
          rows={mcpVsDirectApi}
        />
      </div>
    </SectionCard>
  );
}
