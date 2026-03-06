"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const apps = ["Claude", "Cursor", "ChatGPT", "VS Code"];
const tools = ["GitHub", "Slack", "Drive", "Postgres", "Jira", "Stripe"];

export function IntegrationDiagram() {
  const [mode, setMode] = useState<"before" | "after">("before");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
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
  const appX = 60;
  const toolX = 540;
  const mcpX = 300;
  const appSpacing = 50;
  const toolSpacing = 36;
  const appStartY = 60;
  const toolStartY = 40;

  const appPositions = apps.map((_, i) => ({ x: appX, y: appStartY + i * appSpacing }));
  const toolPositions = tools.map((_, i) => ({ x: toolX, y: toolStartY + i * toolSpacing }));
  const mcpY = svgH / 2;

  const beforeLines = appPositions.flatMap((a, ai) =>
    toolPositions.map((t, ti) => ({ x1: a.x + 50, y1: a.y, x2: t.x - 50, y2: t.y, key: `b-${ai}-${ti}` }))
  );

  const afterLines = [
    ...appPositions.map((a, i) => ({ x1: a.x + 50, y1: a.y, x2: mcpX - 30, y2: mcpY, key: `a-app-${i}` })),
    ...toolPositions.map((t, i) => ({ x1: mcpX + 30, y1: mcpY, x2: t.x - 50, y2: t.y, key: `a-tool-${i}` })),
  ];

  const isBefore = mode === "before";
  const lineCount = isBefore ? beforeLines.length : afterLines.length;

  return (
    <div ref={ref} className="my-8">
      <div
        className="cursor-pointer overflow-x-auto"
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
        aria-label={`Toggle between Before MCP and With MCP views. Currently showing: ${isBefore ? "Before MCP" : "With MCP"}`}
      >
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="mx-auto w-full max-w-2xl">
          {/* Before lines */}
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
                transitionDelay: visible && isBefore ? `${i * 40}ms` : "0ms",
                transitionDuration: "600ms",
              }}
            />
          ))}

          {/* After lines */}
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

          {/* MCP hub node */}
          <g
            style={{
              opacity: !isBefore ? 1 : 0,
              transition: "opacity 400ms ease",
            }}
          >
            <rect
              x={mcpX - 28} y={mcpY - 16}
              width={56} height={32}
              rx={2}
              fill="white"
              stroke="black"
              strokeOpacity={0.2}
              strokeWidth={1.5}
            />
            <text
              x={mcpX} y={mcpY + 4}
              textAnchor="middle"
              fill="black"
              style={{ fontFamily: "Departure Mono, monospace", fontSize: "11px" }}
            >
              MCP
            </text>
          </g>

          {/* App nodes */}
          {apps.map((name, i) => {
            const pos = appPositions[i];
            return (
              <g key={name}>
                <rect
                  x={pos.x - 40} y={pos.y - 14}
                  width={90} height={28}
                  rx={2}
                  fill="white"
                  stroke="black"
                  strokeOpacity={0.08}
                />
                <text
                  x={pos.x + 5} y={pos.y + 4}
                  textAnchor="middle"
                  fill="black"
                  style={{ fontFamily: "Departure Mono, monospace", fontSize: "10px" }}
                >
                  {name}
                </text>
              </g>
            );
          })}

          {/* Tool nodes */}
          {tools.map((name, i) => {
            const pos = toolPositions[i];
            return (
              <g key={name}>
                <rect
                  x={pos.x - 50} y={pos.y - 14}
                  width={90} height={28}
                  rx={2}
                  fill="white"
                  stroke="black"
                  strokeOpacity={0.08}
                />
                <text
                  x={pos.x - 5} y={pos.y + 4}
                  textAnchor="middle"
                  fill="black"
                  style={{ fontFamily: "Departure Mono, monospace", fontSize: "10px" }}
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
          {isBefore ? "Before MCP" : "With MCP"} — {lineCount} integrations
        </button>
        <span className="font-mono text-[10px] text-ink-muted">
          click to toggle
        </span>
      </div>
    </div>
  );
}
