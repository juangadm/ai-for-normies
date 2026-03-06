"use client";

import { useEffect, useRef, useState } from "react";
import { PRIMITIVE_COLORS } from "@/lib/constants";

type PrimitiveType = keyof typeof PRIMITIVE_COLORS;

export function PrimitiveCard({
  id,
  type,
  title,
  metaphor,
  description,
  examples,
}: {
  id?: string;
  type: PrimitiveType;
  title: string;
  metaphor: string;
  description: string;
  examples: string[];
}) {
  const color = PRIMITIVE_COLORS[type];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className="border-l-[3px] bg-white py-4 pl-5 pr-4 transition-all duration-600 ease-out"
      style={{
        borderColor: color.accent,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
      }}
    >
      <div
        className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em]"
        style={{ color: color.accent }}
      >
        {title}
      </div>
      <p className="mb-2 font-serif text-[16px] text-ink">
        &ldquo;{metaphor}&rdquo;
      </p>
      <p className="mb-3 text-[14px] leading-[1.8] text-ink-light">
        {description}
      </p>
      <div className="space-y-1">
        {examples.map((ex) => (
          <div key={ex} className="flex items-start gap-2 text-[13px] text-ink-light">
            <span className="mt-0.5 shrink-0 text-ink-light/40">·</span>
            <code className="font-mono text-[12px]">{ex}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
