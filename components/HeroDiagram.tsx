"use client";

/**
 * An animated SVG constellation diagram for the landing page hero.
 * Nodes represent AI concepts; lines show how they connect.
 * Pure CSS animations — lines draw in, nodes fade up, then a slow breathe.
 */

const nodes = [
  { id: "prompt", label: "Prompt", cx: 138, cy: 62 },
  { id: "llm", label: "LLM", cx: 370, cy: 95 },
  { id: "agent", label: "Agent", cx: 580, cy: 55 },
  { id: "tool", label: "Tool", cx: 250, cy: 195 },
  { id: "api", label: "API", cx: 490, cy: 200 },
  { id: "context", label: "Context", cx: 140, cy: 280 },
  { id: "output", label: "Output", cx: 580, cy: 285 },
  { id: "memory", label: "Memory", cx: 370, cy: 310 },
] as const;

// Connections between nodes — [fromIndex, toIndex]
const edges: [number, number][] = [
  [0, 1], // Prompt → LLM
  [1, 2], // LLM → Agent
  [1, 3], // LLM → Tool
  [2, 4], // Agent → API
  [3, 4], // Tool → API
  [3, 5], // Tool → Context
  [4, 6], // API → Output
  [5, 7], // Context → Memory
  [7, 6], // Memory → Output
  [0, 5], // Prompt → Context
  [2, 6], // Agent → Output
];

export function HeroDiagram() {
  return (
    <div className="mb-20">
      <svg
        viewBox="0 0 720 370"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Diagram showing how AI concepts — Prompt, LLM, Agent, Tool, API, Context, Memory, and Output — connect together"
      >
        {/* Edges */}
        {edges.map(([from, to], i) => {
          const a = nodes[from];
          const b = nodes[to];
          // Approximate line length for dash animation
          const dx = b.cx - a.cx;
          const dy = b.cy - a.cy;
          const len = Math.sqrt(dx * dx + dy * dy);

          return (
            <line
              key={`edge-${i}`}
              x1={a.cx}
              y1={a.cy}
              x2={b.cx}
              y2={b.cy}
              stroke="var(--color-border)"
              strokeWidth="1"
              strokeDasharray={len}
              strokeDashoffset={len}
              className="hero-edge"
              style={{
                animationDelay: `${0.3 + i * 0.1}s`,
              }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g
            key={node.id}
            className="hero-node"
            style={{ animationDelay: `${1.0 + i * 0.09}s` }}
          >
            {/* Outer ring — breathe animation */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="22"
              stroke="var(--color-border)"
              strokeWidth="1"
              fill="var(--color-cream)"
              className="hero-ring"
              style={{ animationDelay: `${2.5 + i * 0.15}s` }}
            />
            {/* Inner dot */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="var(--color-ink-muted)"
            />
            {/* Label */}
            <text
              x={node.cx}
              y={node.cy + 36}
              textAnchor="middle"
              fill="var(--color-ink-muted)"
              fontSize="11"
              fontFamily="var(--font-mono)"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
