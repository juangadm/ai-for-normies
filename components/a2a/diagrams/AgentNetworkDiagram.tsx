"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const orchestrators = ["Support", "Sales", "Ops"];
const specialists = ["Rebooking", "Compensation", "Hotel", "Analytics", "Billing"];

export function AgentNetworkDiagram() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggle = useCallback(() => {
    setMode((m) => (m === "before" ? "after" : "before"));
  }, []);

  const svgW = 600;
  const svgH = 280;
  const orchX = 60;
  const specX = 540;
  const hubX = 300;
  const orchSpacing = 60;
  const specSpacing = 42;
  const orchStartY = 80;
  const specStartY = 40;

  const orchPositions = orchestrators.map((_, i) => ({
    x: orchX,
    y: orchStartY + i * orchSpacing,
  }));
  const specPositions = specialists.map((_, i) => ({
    x: specX,
    y: specStartY + i * specSpacing,
  }));
  const hubY = svgH / 2;

  const beforeLines = orchPositions.flatMap((o, oi) =>
    specPositions.map((s, si) => ({
      x1: o.x + 50,
      y1: o.y,
      x2: s.x - 60,
      y2: s.y,
      key: `b-${oi}-${si}`,
    }))
  );

  const afterLines = [
    ...orchPositions.map((o, i) => ({
      x1: o.x + 50,
      y1: o.y,
      x2: hubX - 28,
      y2: hubY,
      key: `a-orch-${i}`,
    })),
    ...specPositions.map((s, i) => ({
      x1: hubX + 28,
      y1: hubY,
      x2: s.x - 60,
      y2: s.y,
      key: `a-spec-${i}`,
    })),
  ];

  const isBefore = mode === "before";
  const lineCount = isBefore
    ? orchestrators.length * specialists.length
    : orchestrators.length + specialists.length;
  const label = isBefore
    ? `${lineCount} custom protocols`
    : "1 shared protocol";

  return (
    <div ref={ref} className="my-8">
      <div
        className="cursor-pointer overflow-x-auto"
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
        aria-label={`Toggle between Before A2A and With A2A views. Currently showing: ${isBefore ? "Before A2A" : "With A2A"}`}
      >
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="mx-auto w-full max-w-2xl">
          {/* Before: spaghetti lines */}
          {beforeLines.map((l, i) => (
            <line
              key={l.key}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="black"
              strokeOpacity={isBefore ? 0.12 : 0}
              strokeWidth={0.5}
              className="transition-all duration-500"
              style={{
                strokeDasharray: "400",
                strokeDashoffset: visible && isBefore ? 0 : 400,
                transitionDelay: visible && isBefore ? `${i * 30}ms` : "0ms",
                transitionDuration: "600ms",
              }}
            />
          ))}

          {/* After: hub-spoke lines */}
          {afterLines.map((l, i) => (
            <line
              key={l.key}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="black"
              strokeOpacity={!isBefore ? 0.2 : 0}
              strokeWidth={1}
              className="transition-all duration-500"
              style={{
                strokeDasharray: "300",
                strokeDashoffset: !isBefore ? 0 : 300,
                transitionDelay: !isBefore ? `${i * 60}ms` : "0ms",
                transitionDuration: "500ms",
              }}
            />
          ))}

          {/* Animated dots traveling along hub lines when in "after" mode */}
          {!isBefore &&
            afterLines.map((l, i) => (
              <circle key={`dot-${i}`} r={3} fill="#e67e22" fillOpacity={0.6}>
                <animateMotion
                  dur={`${2 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M ${l.x1},${l.y1} L ${l.x2},${l.y2}`}
                />
              </circle>
            ))}

          {/* A2A hub node */}
          <g
            style={{
              opacity: !isBefore ? 1 : 0,
              transition: "opacity 400ms ease",
            }}
          >
            <rect
              x={hubX - 24}
              y={hubY - 16}
              width={48}
              height={32}
              rx={2}
              fill="white"
              stroke="#e67e22"
              strokeOpacity={0.6}
              strokeWidth={1.5}
            />
            <text
              x={hubX}
              y={hubY + 4}
              textAnchor="middle"
              fill="#e67e22"
              style={{
                fontFamily: "Departure Mono, monospace",
                fontSize: "11px",
              }}
            >
              A2A
            </text>
          </g>

          {/* Orchestrator nodes */}
          {orchestrators.map((name, i) => {
            const pos = orchPositions[i];
            return (
              <g key={name}>
                <rect
                  x={pos.x - 40}
                  y={pos.y - 14}
                  width={90}
                  height={28}
                  rx={2}
                  fill="white"
                  stroke="black"
                  strokeOpacity={0.08}
                />
                <text
                  x={pos.x + 5}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fill="black"
                  style={{
                    fontFamily: "Departure Mono, monospace",
                    fontSize: "10px",
                  }}
                >
                  {name}
                </text>
              </g>
            );
          })}

          {/* Specialist nodes */}
          {specialists.map((name, i) => {
            const pos = specPositions[i];
            return (
              <g key={name}>
                <rect
                  x={pos.x - 60}
                  y={pos.y - 14}
                  width={110}
                  height={28}
                  rx={2}
                  fill="white"
                  stroke="black"
                  strokeOpacity={0.08}
                />
                <text
                  x={pos.x - 5}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fill="black"
                  style={{
                    fontFamily: "Departure Mono, monospace",
                    fontSize: "10px",
                  }}
                >
                  {name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Counter + label */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          onClick={toggle}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light transition-colors hover:text-ink"
        >
          {isBefore ? "Before A2A" : "With A2A"} — {label}
        </button>
        <span className="font-mono text-[10px] text-ink-muted">
          click to toggle
        </span>
      </div>
    </div>
  );
}
