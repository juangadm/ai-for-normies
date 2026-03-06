"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { modules } from "@/content/modules";
import { MODULE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-cream">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-[17px] tracking-tight text-ink"
        >
          AI for Normies
        </Link>

        <div className="flex items-center gap-4">
          {modules.map((m) => {
            const isActive = pathname === `/${m.slug}`;
            const color = MODULE_COLORS[m.slug];
            return (
              <Link
                key={m.slug}
                href={m.status === "live" ? `/${m.slug}` : "#"}
                className={cn(
                  "font-mono text-[12px] uppercase tracking-wider transition-colors",
                  isActive
                    ? "text-ink"
                    : m.status === "live"
                      ? "text-ink-light hover:text-ink"
                      : "cursor-default text-ink-light/40"
                )}
                style={isActive ? { color: color.accent } : undefined}
                onClick={m.status === "coming" ? (e) => e.preventDefault() : undefined}
              >
                {m.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
