import { SectionCard } from "@/components/layout/SectionCard";
import { TermDefinition } from "@/components/shared/TermDefinition";
import { CalloutBox } from "@/components/shared/CalloutBox";
import { mcpGlossary } from "@/content/mcp/glossary";

export function WhatIsMCP() {
  return (
    <SectionCard id="what-is-mcp">
      <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Section 1
      </div>
      <h2 className="mb-2 font-serif text-[24px] font-semibold text-ink">
        What is MCP & Why It Exists
      </h2>
      <p className="mb-6 text-[15px] italic text-ink-light">
        &ldquo;Think of MCP as{" "}
        <span className="font-semibold text-ink">USB-C for AI</span>.&rdquo;
      </p>

      <div className="mb-6 space-y-4 text-[14px] leading-[1.8] text-ink-light">
        <p>
          The{" "}
          <TermDefinition term="Model Context Protocol" definition={mcpGlossary.MCP} />{" "}
          is an open standard that gives AI models a universal way to connect to
          tools and data sources. Instead of building a custom integration for
          every combination of AI app and external service, MCP provides one
          protocol that works everywhere.
        </p>
      </div>

      {/* Running example teaser */}
      <CalloutBox variant="insight" title="Running Example">
        Throughout this page, we&apos;ll make this concrete. Imagine Spotify is
        building an AI-powered support chatbot — either with a partner like
        Sierra or internally. What would the technical system look like? How
        would the AI read user data, follow support playbooks, and take actions
        like refreshing a playlist? We&apos;ll trace that scenario step by step.
      </CalloutBox>

      {/* The Problem */}
      <div id="the-problem" className="mt-8 mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          The Problem
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            Without a standard, connecting AI to your tools is a{" "}
            <strong>multiplication problem</strong>. If you have 5 AI apps and 10
            tools, every app needs its own connector for every tool — that&apos;s
            5 &times; 10 = <strong>50 custom integrations</strong> to build and maintain.
          </p>
          <p>
            Each integration has its own authentication, data format, error
            handling, and permission model. When one side updates, the
            integration breaks.
          </p>
          <p>
            This is where the industry was before USB standardized peripheral
            connections — every device had its own proprietary cable.
          </p>
        </div>
      </div>

      {/* The Solution */}
      <div id="the-solution" className="mb-8">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          The Solution
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            MCP turns that multiplication into <strong>addition</strong>. Take
            the same 5 AI apps and 10 tools. Each AI app builds one MCP
            connection (that&apos;s 5). Each tool provider builds one MCP
            integration (that&apos;s 10). Total: 5 + 10 ={" "}
            <strong>15 integrations instead of 50</strong> — and any app can now
            talk to any tool automatically. Add an 11th tool? That&apos;s one
            more integration, not five.
          </p>
          <p>
            The protocol handles discovery (what can this tool do?), invocation
            (call this function with these arguments), and security (does the
            user approve this action?).
          </p>
          <p>
            Build your integration once, and it works with Claude, ChatGPT,
            Cursor, and any other MCP-compatible app.
          </p>
        </div>
      </div>

      {/* Who Adopted It */}
      <div id="who-adopted">
        <h3 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-wider text-ink">
          Who&apos;s already using it
        </h3>
        <div className="space-y-4 text-[14px] leading-[1.8] text-ink-light">
          <p>
            Anthropic created MCP and maintains the spec. AI-powered editors
            like <strong>Cursor, VS Code, and Windsurf</strong> have built MCP
            support directly into their products. On the tool side,{" "}
            <strong>GitHub, Slack, Google Drive, PostgreSQL</strong>, and 50+
            others already have MCP integrations — many community-built.
            Companies like <strong>Block, Apollo, and Replit</strong> are
            building MCP integrations for their own platforms.
          </p>
          <p>
            Official TypeScript and Python SDKs make it straightforward to build
            your own integration in an afternoon.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
