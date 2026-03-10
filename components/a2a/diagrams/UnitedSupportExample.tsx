"use client";

import { useEffect, useRef, useState } from "react";
import {
  passengerMessage,
  unitedSteps,
  unitedResult,
} from "@/content/a2a/united-example";

const tagColors: Record<string, string> = {
  DISCOVERY: "#6b6f76",
  TASK: "#e67e22",
  INPUT_REQUIRED: "#f59e0b",
  MESSAGE: "#6b6f76",
  ARTIFACT: "#22c55e",
};

export function UnitedSupportExample() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(-1); // -1 = not started
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPhase(0);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Typing effect for phase 0
  useEffect(() => {
    if (phase !== 0) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedText(passengerMessage.slice(0, i));
      if (i >= passengerMessage.length) {
        clearInterval(interval);
        setTimeout(() => setPhase(1), 400);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [phase]);

  // Sequential step reveals
  useEffect(() => {
    if (phase < 1 || phase > unitedSteps.length) return;
    const timer = setTimeout(() => {
      setPhase((p) => p + 1);
    }, 450);
    return () => clearTimeout(timer);
  }, [phase]);

  const showResult = phase > unitedSteps.length;

  return (
    <div ref={ref} className="my-8">
      <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        United Support: End-to-End
      </h4>

      {/* Architecture labels */}
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
        <span>Passenger</span>
        <span className="text-border">{"\u2192"}</span>
        <span>Support Agent [CLIENT]</span>
        <span className="text-border">{"\u2192"}</span>
        <span>Specialists [SERVERS]</span>
      </div>

      {/* User prompt with typing effect */}
      <div className="mb-4 border-l-2 border-border py-2 pl-4">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
          Passenger
        </div>
        <p className="font-serif text-[15px] italic text-ink">
          &ldquo;{phase >= 0 ? typedText : ""}
          {phase === 0 && (
            <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-ink" />
          )}
          &rdquo;
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {unitedSteps.map((step, i) => {
          const isVisible = phase > i;
          return (
            <div
              key={i}
              className="flex items-start gap-3 transition-all duration-400"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(12px)",
              }}
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center border border-ink/10 font-mono text-[10px] text-ink-muted">
                {i + 1}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <code className="font-mono text-[12px] text-ink-light">
                    {step.label}
                  </code>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.1em]"
                    style={{ color: tagColors[step.tag] || "#6b6f76" }}
                  >
                    [{step.tag}]
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result */}
      <div
        className="mt-4 border-l-2 border-border py-2 pl-4 transition-all duration-500"
        style={{
          opacity: showResult ? 1 : 0,
          transform: showResult ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
          Result
        </div>
        <p className="text-[14px] text-ink">{unitedResult}</p>
      </div>
    </div>
  );
}
