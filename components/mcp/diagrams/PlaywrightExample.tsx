"use client";

import { useEffect, useRef, useState } from "react";
import {
  playwrightPrompt,
  playwrightResult,
  playwrightSteps,
} from "@/content/mcp/playwright-example";

export function PlaywrightExample() {
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
      setTypedText(playwrightPrompt.slice(0, i));
      if (i >= playwrightPrompt.length) {
        clearInterval(interval);
        setTimeout(() => setPhase(1), 400);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [phase]);

  // Sequential step reveals for phases 1+
  useEffect(() => {
    if (phase < 1 || phase > playwrightSteps.length) return;
    const timer = setTimeout(() => {
      setPhase((p) => p + 1);
    }, 500);
    return () => clearTimeout(timer);
  }, [phase]);

  const showResult = phase > playwrightSteps.length;

  return (
    <div ref={ref} className="my-8">
      <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Concrete Example: Playwright MCP
      </h4>

      {/* Architecture labels */}
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
        <span>User</span>
        <span className="text-border">{"—>"}</span>
        <span>Claude Code [HOST]</span>
        <span className="text-border">{"—>"}</span>
        <span>Playwright MCP [SERVER]</span>
      </div>

      {/* User prompt with typing effect */}
      <div className="mb-4 border-l-2 border-border py-2 pl-4">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
          User
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
        {playwrightSteps.map((step, i) => {
          const isVisible = phase > i;
          return (
            <div
              key={i}
              className="flex items-start gap-3 transition-all duration-400"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(12px)",
                transitionDelay: "0ms",
              }}
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center border border-ink/10 font-mono text-[10px] text-ink-muted">
                {i + 1}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <code className="font-mono text-[12px] text-ink-light">
                    {step.code}
                  </code>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.1em]"
                    style={{ color: step.tag === "TOOL" ? "#e67e22" : "#6b6f76" }}
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
        <p className="text-[14px] text-ink">
          {playwrightResult}
        </p>
      </div>
    </div>
  );
}
