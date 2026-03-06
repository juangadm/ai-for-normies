import { MODULE_COLORS, type ModuleSlug } from "@/lib/constants";

export function ModuleHero({
  slug,
  title,
  subtitle,
}: {
  slug: ModuleSlug;
  title: string;
  subtitle: string;
}) {
  const color = MODULE_COLORS[slug];

  return (
    <div className="pt-20 pb-12 md:pt-24 md:pb-16">
      <div
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em]"
        style={{ color: color.accent }}
      >
        {slug.toUpperCase()}
      </div>
      <h1 className="mb-3 font-serif text-[36px] font-normal tracking-tight text-ink">
        {title}
      </h1>
      <p className="max-w-xl text-[15px] leading-relaxed text-ink-light">
        {subtitle}
      </p>
      <div className="section-divider mt-10 text-left">
        {"╌".repeat(24)}
      </div>
    </div>
  );
}
