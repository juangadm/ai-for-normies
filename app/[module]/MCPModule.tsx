"use client";

import { ModuleHero } from "@/components/modules/ModuleHero";
import { FloatingTOC } from "@/components/layout/FloatingTOC";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { WhatIsMCP } from "@/components/mcp/WhatIsMCP";
import { Architecture } from "@/components/mcp/Architecture";
import { Primitives } from "@/components/mcp/Primitives";
import { Decisions } from "@/components/mcp/Decisions";
import { QuickReference } from "@/components/mcp/QuickReference";
import { mcpSections } from "@/content/mcp/sections";
import { MODULE_COLORS } from "@/lib/constants";

const tocItems = mcpSections.map((s) => ({ id: s.id, label: `${s.number}. ${s.title}` }));

export function MCPModule() {
  return (
    <>
      <ScrollProgress color={MODULE_COLORS.mcp.accent} />
      <FloatingTOC items={tocItems} accentColor={MODULE_COLORS.mcp.accent} />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex">
          <SidebarNav items={mcpSections} />
          <main className="prose-body min-w-0 max-w-[720px] pb-24 lg:pl-12">
            <ModuleHero
              slug="mcp"
              title="MCP: The Model Context Protocol"
              subtitle="How AI connects to tools and data."
            />

            <div className="space-y-20 md:space-y-24">
              <WhatIsMCP />
              <Architecture />
              <Primitives />
              <Decisions />
              <QuickReference />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
