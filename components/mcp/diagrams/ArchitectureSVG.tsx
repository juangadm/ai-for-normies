"use client";

import { useState } from "react";

const nodes = [
  {
    id: "host",
    label: "Host",
    subtitle: "Claude Desktop, Cursor, etc.",
    x: 80,
  },
  {
    id: "client",
    label: "Client",
    subtitle: "MCP connector inside the host",
    x: 300,
  },
  {
    id: "server",
    label: "Server",
    subtitle: "Your product's MCP server",
    x: 520,
  },
];

export function ArchitectureSVG() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 680 160"
        className="mx-auto w-full max-w-2xl"
        role="img"
        aria-label="MCP Architecture: Host connects to Client connects to Server"
      >
        {/* Connection lines */}
        <line
          x1={170}
          y1={70}
          x2={280}
          y2={70}
          stroke="black"
          strokeOpacity={hovered === "host" || hovered === "client" ? 0.3 : 0.12}
          strokeWidth={hovered === "host" || hovered === "client" ? 2 : 1}
          strokeDasharray={hovered === "host" || hovered === "client" ? "0" : "6 4"}
          className="transition-all duration-150"
        />
        <polygon
          points="276,65 286,70 276,75"
          fill="black"
          fillOpacity={0.2}
        />

        <line
          x1={390}
          y1={70}
          x2={500}
          y2={70}
          stroke="black"
          strokeOpacity={hovered === "client" || hovered === "server" ? 0.3 : 0.12}
          strokeWidth={hovered === "client" || hovered === "server" ? 2 : 1}
          strokeDasharray={hovered === "client" || hovered === "server" ? "0" : "6 4"}
          className="transition-all duration-150"
        />
        <polygon
          points="496,65 506,70 496,75"
          fill="black"
          fillOpacity={0.2}
        />

        {/* Bidirectional arrows */}
        <polygon
          points="174,65 164,70 174,75"
          fill="black"
          fillOpacity={0.2}
        />
        <polygon
          points="394,65 384,70 394,75"
          fill="black"
          fillOpacity={0.2}
        />

        {/* Labels on arrows */}
        <text x={225} y={58} textAnchor="middle" fill="#808080" style={{ fontFamily: "Departure Mono, monospace", fontSize: "9px" }}>
          JSON-RPC
        </text>
        <text x={445} y={58} textAnchor="middle" fill="#808080" style={{ fontFamily: "Departure Mono, monospace", fontSize: "9px" }}>
          JSON-RPC
        </text>

        {/* Animated message pulse */}
        <circle r={4} fill="black" fillOpacity={0.15}>
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 170,70 L 286,70 L 390,70 L 506,70"
          />
        </circle>
        <circle r={4} fill="black" fillOpacity={0.15}>
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            begin="1.5s"
            path="M 506,70 L 390,70 L 286,70 L 170,70"
          />
        </circle>

        {/* Nodes */}
        {nodes.map((node) => {
          const isHovered = hovered === node.id;
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <rect
                x={node.x}
                y={40}
                width={90}
                height={60}
                rx={2}
                fill="white"
                stroke="black"
                strokeOpacity={isHovered ? 0.3 : 0.08}
                strokeWidth={isHovered ? 2 : 1}
                className="transition-all duration-150"
              />
              <text
                x={node.x + 45}
                y={66}
                textAnchor="middle"
                fill="black"
                style={{ fontFamily: "Departure Mono, monospace", fontSize: "12px" }}
              >
                {node.label}
              </text>
              <text
                x={node.x + 45}
                y={82}
                textAnchor="middle"
                fill="#808080"
                style={{ fontFamily: "Departure Mono, monospace", fontSize: "9px" }}
              >
                {node.id === "host"
                  ? "AI app"
                  : node.id === "client"
                    ? "Connector"
                    : "Your code"}
              </text>
              {/* Tooltip on hover */}
              {isHovered && (
                <>
                  <rect
                    x={node.x - 20}
                    y={110}
                    width={130}
                    height={32}
                    rx={2}
                    fill="white"
                    stroke="black"
                    strokeOpacity={0.08}
                  />
                  <text
                    x={node.x + 45}
                    y={131}
                    textAnchor="middle"
                    fill="#808080"
                    style={{ fontSize: "10px" }}
                  >
                    {node.subtitle}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
