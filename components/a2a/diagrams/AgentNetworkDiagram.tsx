"use client";

import { useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

interface Agent {
  label: string;
  framework: string;
  x: number;
  y: number;
}

const agents: Agent[] = [
  { label: "Support Agent", framework: "ADK", x: 120, y: 80 },
  { label: "Rebooking Agent", framework: "LangGraph", x: 440, y: 50 },
  { label: "Compensation Agent", framework: "CrewAI", x: 500, y: 150 },
  { label: "Hotel Agent", framework: "ADK", x: 420, y: 250 },
  { label: "Triage Agent", framework: "LangGraph", x: 100, y: 200 },
];

const SVG_W = 600;
const SVG_H = 300;
const MONO_FONT = { fontFamily: "Departure Mono, monospace" };

// Pairs that need to communicate
const connections = [
  [0, 1], [0, 2], [0, 3], // Support → specialists
  [4, 1], [4, 2],         // Triage → specialists
];

export function AgentNetworkDiagram() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [ref, visible] = useInView();

  const toggle = useCallback(() => {
    setMode((m) => (m === "before" ? "after" : "before"));
  }, []);

  const isBefore = mode === "before";

  return (
    <div ref={ref} className="my-8">
      <div
        className="cursor-pointer overflow-x-auto"
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
        aria-label={`Toggle between siloed and A2A views. Currently: ${isBefore ? "Siloed" : "With A2A"}`}
      >
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="mx-auto w-full max-w-2xl">
          {/* Before: connections with mismatched styles showing incompatibility */}
          {connections.map(([from, to], i) => {
            const a = agents[from];
            const b = agents[to];
            return (
              <line
                key={`before-${i}`}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="black"
                strokeOpacity={isBefore ? 0.08 : 0}
                strokeWidth={0.5}
                strokeDasharray="3 5"
                className="transition-all duration-500"
                style={{
                  strokeDashoffset: visible && isBefore ? 0 : 200,
                  transitionDelay: visible && isBefore ? `${i * 50}ms` : "0ms",
                  transitionDuration: "600ms",
                }}
              />
            );
          })}

          {/* Before: red X marks on connections showing incompatibility */}
          {isBefore && connections.map(([from, to], i) => {
            const a = agents[from];
            const b = agents[to];
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            return (
              <text
                key={`x-${i}`}
                x={mx} y={my}
                textAnchor="middle"
                fill="#dc2626"
                fillOpacity={visible ? 0.5 : 0}
                className="transition-opacity duration-500"
                style={{ fontSize: "10px", transitionDelay: `${300 + i * 50}ms` }}
              >
                ✗
              </text>
            );
          })}

          {/* After: clean lines with animated message dots */}
          {connections.map(([from, to], i) => {
            const a = agents[from];
            const b = agents[to];
            const path = `M ${a.x},${a.y} L ${b.x},${b.y}`;
            return (
              <g key={`after-${i}`}>
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="black"
                  strokeOpacity={!isBefore ? 0.15 : 0}
                  strokeWidth={1}
                  className="transition-all duration-500"
                  style={{
                    strokeDasharray: "300",
                    strokeDashoffset: !isBefore ? 0 : 300,
                    transitionDelay: !isBefore ? `${i * 80}ms` : "0ms",
                    transitionDuration: "500ms",
                  }}
                />
                {!isBefore && (
                  <circle r={3} fill="#e67e22" fillOpacity={0.6}>
                    <animateMotion
                      dur={`${2 + (i % 3) * 0.5}s`}
                      repeatCount="indefinite"
                      path={path}
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Agent nodes */}
          {agents.map((agent) => {
            const nodeW = 140;
            const nodeH = 36;
            return (
              <g key={agent.label}>
                {/* Silo box (before only) */}
                {isBefore && (
                  <rect
                    x={agent.x - nodeW / 2 - 6} y={agent.y - nodeH / 2 - 6}
                    width={nodeW + 12} height={nodeH + 12}
                    rx={2}
                    fill="none"
                    stroke="#dc2626"
                    strokeOpacity={visible ? 0.15 : 0}
                    strokeDasharray="4 3"
                    className="transition-opacity duration-500"
                  />
                )}
                <rect
                  x={agent.x - nodeW / 2} y={agent.y - nodeH / 2}
                  width={nodeW} height={nodeH}
                  rx={2}
                  fill="white"
                  stroke={!isBefore ? "#e67e22" : "black"}
                  strokeOpacity={!isBefore ? 0.4 : 0.08}
                  strokeWidth={!isBefore ? 1.5 : 1}
                  className="transition-all duration-400"
                />
                <text
                  x={agent.x} y={agent.y - 2}
                  textAnchor="middle" fill="black"
                  style={{ ...MONO_FONT, fontSize: "9px" }}
                >
                  {agent.label}
                </text>
                <text
                  x={agent.x} y={agent.y + 10}
                  textAnchor="middle"
                  fill={isBefore ? "#9b9fa7" : "#e67e22"}
                  className="transition-all duration-400"
                  style={{ ...MONO_FONT, fontSize: "7px" }}
                >
                  {isBefore ? agent.framework : "A2A"}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Label */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          onClick={toggle}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light transition-colors hover:text-ink"
        >
          {isBefore
            ? "Siloed — incompatible frameworks"
            : "With A2A — one shared language"}
        </button>
        <span className="font-mono text-[10px] text-ink-muted">
          click to toggle
        </span>
      </div>
    </div>
  );
}
