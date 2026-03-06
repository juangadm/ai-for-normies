import { SectionCard } from "@/components/layout/SectionCard";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { ArchitectureSVG } from "./diagrams/ArchitectureSVG";
import { TermDefinition } from "@/components/shared/TermDefinition";
import { mcpGlossary } from "@/content/mcp/glossary";

export function Architecture() {
  return (
    <SectionCard id="architecture">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 2
      </div>
      <h2 className="mb-6 font-serif text-[24px] font-semibold text-ink">How It Works</h2>

      <p className="mb-6 text-[14px] leading-[1.8] text-ink-light">
        MCP has three roles. Hover over each to learn more.
      </p>

      <div className="mb-8">
        <ArchitectureSVG />
      </div>

      <div id="host-client-server" className="mb-8 space-y-4 text-[14px] leading-[1.8] text-ink-light">
        <p>
          The{" "}
          <TermDefinition term="Host" definition={mcpGlossary.Host} /> is the
          AI application — Claude Desktop, Cursor, or your own app. It runs the
          LLM and manages connections.
        </p>
        <p>
          The{" "}
          <TermDefinition term="Client" definition={mcpGlossary.Client} />{" "}
          lives inside the host. Each client maintains a 1:1 connection with one
          server. A host can have many clients running simultaneously.
        </p>
        <p>
          The{" "}
          <TermDefinition term="Server" definition={mcpGlossary.Server} /> is
          what you build. It&apos;s a lightweight program that exposes your
          product&apos;s capabilities — tools, resources, and prompts — via
          MCP.
        </p>
      </div>

      {/* Transport Layer — surfaced from old WhatIsMCP expandable */}
      <div id="transport-layer" className="mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Transport Layer
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            MCP messages use{" "}
            <TermDefinition term="JSON-RPC" definition={mcpGlossary["JSON-RPC"]} />{" "}
            — a simple request/response format. But how those messages travel
            between client and server depends on the{" "}
            <TermDefinition term="transport" definition={mcpGlossary.Transport} />.
          </p>
          <p>
            <strong>
              <TermDefinition term="stdio" definition={mcpGlossary.stdio} />
            </strong>{" "}
            — The host runs the server as a local subprocess. Messages flow over
            standard input/output. Simple, fast, no network needed. Great for
            local tools.
          </p>
          <p>
            <strong>
              <TermDefinition
                term="Streamable HTTP"
                definition={mcpGlossary["Streamable HTTP"]}
              />
            </strong>{" "}
            — The server runs remotely. Messages travel over HTTP, with optional
            Server-Sent Events for streaming. This is how you&apos;d deploy an MCP
            server for your product.
          </p>
        </div>
      </div>

      <CalloutBox variant="insight" title="Key Insight for PMs">
        As a PM, you own the server layer. You decide what to expose (which
        tools, which data), how to expose it (what the AI sees), and what
        guardrails to set (permissions, rate limits). The host and client are
        someone else&apos;s problem.
      </CalloutBox>
    </SectionCard>
  );
}
