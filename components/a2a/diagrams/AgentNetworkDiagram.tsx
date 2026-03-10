"use client";

import { useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

const clientAgents = ["Support Agent", "Triage Agent", "Escalation Agent"];
const remoteAgents = ["Rebooking Agent", "Compensation Agent", "Hotel Agent", "Analytics Agent", "Billing Agent"];

const SVG_W = 680;
const SVG_H = 280;
const CLIENT_X = 90;
const REMOTE_X = 590;
const HUB_X = 340;
const HUB_Y = SVG_H / 2;

const clientPositions = clientAgents.map((_, i) => ({
  x: CLIENT_X,
  y: 80 + i * 60,
}));

const remotePositions = remoteAgents.map((_, i) => ({
  x: REMOTE_X,
  y: 40 + i * 42,
}));

const beforeLines = clientPositions.flatMap((c, ci) =>
  remotePositions.map((r, ri) => ({
    x1: c.x + 70,
    y1: c.y,
    x2: r.x - 80,
    y2: r.y,
    key: `b-${ci}-${ri}`,
  }))
);

const afterLines = [
  ...clientPositions.map((c, i) => ({
    x1: c.x + 70,
    y1: c.y,
    x2: HUB_X - 28,
    y2: HUB_Y,
    key: `a-client-${i}`,
  })),
  ...remotePositions.map((r, i) => ({
    x1: HUB_X + 28,
    y1: HUB_Y,
    x2: r.x - 80,
    y2: r.y,
    key: `a-remote-${i}`,
  })),
];

const MONO_FONT = { fontFamily: "Departure Mono, monospace", fontSize: "9px" };

export function AgentNetworkDiagram() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [ref, visible] = useInView();

  const toggle = useCallback(() => {
    setMode((m) => (m === "before" ? "after" : "before"));
  }, []);

  const isBefore = mode === "before";
  const lineCount = isBefore
    ? clientAgents.length * remoteAgents.length
    : clientAgents.length + remoteAgents.length;
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
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="mx-auto w-full max-w-2xl">
          {/* Before: spaghetti lines */}
          {beforeLines.map((l, i) => (
            <line
              key={l.key}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
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
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
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
          <g style={{ opacity: !isBefore ? 1 : 0, transition: "opacity 400ms ease" }}>
            <rect
              x={HUB_X - 24} y={HUB_Y - 16}
              width={48} height={32} rx={2}
              fill="white" stroke="#e67e22" strokeOpacity={0.6} strokeWidth={1.5}
            />
            <text
              x={HUB_X} y={HUB_Y + 4}
              textAnchor="middle" fill="#e67e22"
              style={{ fontFamily: "Departure Mono, monospace", fontSize: "11px" }}
            >
              A2A
            </text>
          </g>

          {/* Client agent nodes */}
          {clientAgents.map((name, i) => (
            <g key={name}>
              <rect
                x={clientPositions[i].x - 60} y={clientPositions[i].y - 14}
                width={130} height={28} rx={2}
                fill="white" stroke="black" strokeOpacity={0.08}
              />
              <text
                x={clientPositions[i].x + 5} y={clientPositions[i].y + 4}
                textAnchor="middle" fill="black" style={MONO_FONT}
              >
                {name}
              </text>
            </g>
          ))}

          {/* Remote agent nodes */}
          {remoteAgents.map((name, i) => (
            <g key={name}>
              <rect
                x={remotePositions[i].x - 80} y={remotePositions[i].y - 14}
                width={150} height={28} rx={2}
                fill="white" stroke="black" strokeOpacity={0.08}
              />
              <text
                x={remotePositions[i].x - 5} y={remotePositions[i].y + 4}
                textAnchor="middle" fill="black" style={MONO_FONT}
              >
                {name}
              </text>
            </g>
          ))}
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
