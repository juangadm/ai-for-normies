"use client";

import { useState } from "react";
import type { ModuleSection } from "@/content/modules";

export function SectionPreview({
  sectionCount,
  readMinutes,
  sections,
}: {
  sectionCount: number;
  readMinutes: number;
  sections: ModuleSection[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted transition-colors hover:text-ink-light"
      >
        <span
          className="inline-block transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ↓
        </span>
        <span>
          {sectionCount} sections &middot; ~{readMinutes} min
        </span>
      </button>

      {open && (
        <ol className="mt-2 flex flex-col gap-1 border-l border-border pl-3">
          {sections.map((s, i) => (
            <li
              key={i}
              className="font-mono text-[11px] text-ink-light"
            >
              <span className="text-ink-muted">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {s.title}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
