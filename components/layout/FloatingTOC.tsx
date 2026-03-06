"use client";

import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  label: string;
}

export function FloatingTOC({
  items,
}: {
  items: TOCItem[];
  accentColor?: string;
}) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(items.map((i) => i.id));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-[60px] right-6 z-40 border border-border bg-cream px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light transition-colors hover:text-ink md:right-8 lg:hidden"
      >
        Contents
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-ink/5"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l border-border bg-cream p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
                Contents
              </span>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-[14px] text-ink-light hover:text-ink"
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-0.5">
              {items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-2 font-serif text-[15px] transition-colors",
                    activeId === item.id
                      ? "text-ink"
                      : "text-ink-light hover:text-ink"
                  )}
                >
                  {activeId === item.id ? "→ " : ""}
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
