"use client";

import { ModuleHero } from "@/components/modules/ModuleHero";
import { FloatingTOC } from "@/components/layout/FloatingTOC";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { WhatIsA2A } from "@/components/a2a/WhatIsA2A";
import { HowItWorks } from "@/components/a2a/HowItWorks";
import { ProtocolInAction } from "@/components/a2a/ProtocolInAction";
import { Decisions } from "@/components/a2a/Decisions";
import { QuickReference } from "@/components/a2a/QuickReference";
import { a2aSections } from "@/content/a2a/sections";
import { MODULE_COLORS } from "@/lib/constants";

const tocItems = a2aSections.map((s) => ({
  id: s.id,
  label: `${s.number}. ${s.title}`,
}));

export function A2AModule() {
  return (
    <>
      <ScrollProgress color={MODULE_COLORS.a2a.accent} />
      <FloatingTOC items={tocItems} accentColor={MODULE_COLORS.a2a.accent} />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex">
          <SidebarNav items={a2aSections} />
          <main className="prose-body min-w-0 max-w-[720px] pb-24 lg:pl-12">
            <ModuleHero
              slug="a2a"
              title="A2A: The Agent-to-Agent Protocol"
              subtitle="How AI agents discover and collaborate with each other."
            />

            <div className="space-y-20 md:space-y-24">
              <WhatIsA2A />
              <HowItWorks />
              <ProtocolInAction />
              <Decisions />
              <QuickReference />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
