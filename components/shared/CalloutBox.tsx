type Variant = "tip" | "warning" | "insight";

const variants: Record<Variant, { border: string; label: string }> = {
  tip: { border: "border-l-accent", label: "TIP" },
  warning: { border: "border-l-accent", label: "CAUTION" },
  insight: { border: "border-l-accent", label: "NOTE" },
};

interface CalloutBoxProps {
  id?: string;
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}

export function CalloutBox({
  id,
  variant = "tip",
  title,
  children,
}: CalloutBoxProps) {
  const v = variants[variant];
  return (
    <div id={id} className={`border-l-2 ${v.border} py-3 pl-5`}>
      <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        {v.label}{title ? ` — ${title}` : ""}
      </p>
      <div className="text-[14px] leading-[1.8] text-ink-light">
        {children}
      </div>
    </div>
  );
}
