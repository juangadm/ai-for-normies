"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

interface SidebarSubItem {
  id: string;
  title: string;
}

interface SidebarItem {
  id: string;
  number: number;
  title: string;
  subsections?: SidebarSubItem[];
}

export function SidebarNav({ items }: { items: SidebarItem[] }) {
  const activeId = useActiveSection(items.map((i) => i.id));

  return (
    <nav className="sticky top-12 hidden h-[calc(100vh-3rem)] w-48 shrink-0 overflow-y-auto pt-20 lg:block">
      <div className="flex flex-col gap-5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div key={item.id} className="flex flex-col">
              <a
                href={`#${item.id}`}
                className={cn(
                  "group flex flex-col transition-colors",
                  isActive ? "text-ink" : "text-ink-light hover:text-ink"
                )}
              >
                <span className="font-mono text-[11px] tracking-[0.15em]">
                  {String(item.number).padStart(2, "0")}
                </span>
                <span className="font-serif text-[14px] leading-snug">
                  {item.title}
                </span>
              </a>
              {isActive && item.subsections && (
                <div className="mt-2 flex flex-col gap-1.5 border-l border-border/40 pl-3">
                  {item.subsections.map((sub) => (
                    <a
                      key={sub.id}
                      href={`#${sub.id}`}
                      className="font-sans text-[12px] text-ink-light transition-colors hover:text-ink"
                    >
                      {sub.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
