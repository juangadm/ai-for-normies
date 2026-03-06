import Link from "next/link";
import { MODULE_COLORS } from "@/lib/constants";
import type { ModuleMeta } from "@/content/modules";

export function ModuleCard({ module }: { module: ModuleMeta }) {
  const color = MODULE_COLORS[module.slug];
  const isLive = module.status === "live";

  const content = (
    <div
      className="group flex h-full flex-col justify-between border-l-[3px] py-5 pl-5 pr-4"
      style={{ borderColor: color.accent }}
    >
      <div>
        <h3 className="mb-1 font-serif text-[18px] text-ink">
          {module.subtitle}
        </h3>
        <p className="text-[14px] leading-[1.8] text-ink-light">
          {module.description}
        </p>
      </div>
      <div className="mt-4 font-mono text-[12px] uppercase tracking-wider">
        {isLive ? (
          <span
            className="flex items-center gap-1.5 transition-all group-hover:gap-2.5"
            style={{ color: color.accent }}
          >
            Start reading →
          </span>
        ) : (
          <span className="text-ink-light/40">Coming soon</span>
        )}
      </div>
    </div>
  );

  if (isLive) {
    return <Link href={`/${module.slug}`}>{content}</Link>;
  }
  return content;
}
