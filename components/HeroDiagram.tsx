"use client";

/**
 * Animated SVG technical schematic — makingsoftware.com style.
 * Shows how User → Prompt → Agent → MCP/A2A/RAG → Output flow together.
 * Orange monochrome, Departure Mono ALL CAPS, dotted grid, leader lines.
 */

const O = "#e67e22";

export function HeroDiagram() {
  return (
    <div className="mb-20">
      <svg
        viewBox="0 0 780 440"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Technical diagram: User sends a Prompt to an Agent, which calls Tools via MCP, delegates via A2A, retrieves via RAG, and produces Output"
      >
        <defs>
          {/* Dot grid pattern */}
          <pattern
            id="dot-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="0.6" fill={`${O}20`} />
          </pattern>
          {/* Arrowhead */}
          <marker
            id="arw"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path
              d="M0,1.5 L7.5,5 L0,8.5"
              fill="none"
              stroke={O}
              strokeWidth="1.5"
            />
          </marker>
          {/* Arrowhead for dashed/return lines */}
          <marker
            id="arw-d"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path
              d="M0,1.5 L7.5,5 L0,8.5"
              fill="none"
              stroke={`${O}60`}
              strokeWidth="1.5"
            />
          </marker>
        </defs>

        {/* ═══ BACKGROUND ═══ */}
        <rect width="780" height="440" fill={`${O}06`} rx="6" />
        <rect width="780" height="440" fill="url(#dot-grid)" rx="6" />

        {/* ═══ CORNER LABELS ═══ */}
        <text
          x="24"
          y="26"
          fill={`${O}80`}
          fontSize="10"
          fontFamily="var(--font-mono)"
          className="hero-label"
          style={{ animationDelay: "0.1s" }}
        >
          FIG. 001
        </text>
        <text
          x="762"
          y="220"
          fill={`${O}50`}
          fontSize="10"
          fontFamily="var(--font-mono)"
          textAnchor="middle"
          transform="rotate(90, 762, 220)"
          className="hero-label"
          style={{ animationDelay: "0.1s" }}
        >
          [ AI AGENT ARCHITECTURE ]
        </text>

        {/* ═══ EDGES — solid flow lines ═══ */}

        {/* USER → PROMPT */}
        <line
          x1="115"
          y1="220"
          x2="148"
          y2="220"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="33"
          strokeDashoffset="33"
          style={{ animationDelay: "0.3s" }}
        />
        {/* PROMPT → AGENT */}
        <line
          x1="260"
          y1="220"
          x2="333"
          y2="220"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="73"
          strokeDashoffset="73"
          style={{ animationDelay: "0.6s" }}
        />
        {/* AGENT → OUTPUT */}
        <line
          x1="445"
          y1="220"
          x2="618"
          y2="220"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="173"
          strokeDashoffset="173"
          style={{ animationDelay: "0.9s" }}
        />
        {/* AGENT ↑ MCP SERVER */}
        <line
          x1="390"
          y1="201"
          x2="390"
          y2="121"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="80"
          strokeDashoffset="80"
          style={{ animationDelay: "0.9s" }}
        />
        {/* MCP SERVER → TOOL */}
        <line
          x1="453"
          y1="100"
          x2="523"
          y2="100"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="70"
          strokeDashoffset="70"
          style={{ animationDelay: "1.2s" }}
        />
        {/* AGENT ↓ A2A AGENT */}
        <line
          x1="390"
          y1="239"
          x2="390"
          y2="319"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="80"
          strokeDashoffset="80"
          style={{ animationDelay: "0.9s" }}
        />
        {/* A2A AGENT → RAG */}
        <line
          x1="453"
          y1="340"
          x2="523"
          y2="340"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="70"
          strokeDashoffset="70"
          style={{ animationDelay: "1.2s" }}
        />

        {/* ═══ EDGES — dashed return paths ═══ */}

        {/* TOOL ⤵ OUTPUT */}
        <line
          x1="605"
          y1="106"
          x2="652"
          y2="199"
          stroke={`${O}60`}
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arw-d)"
          className="hero-edge-return"
          style={{ animationDelay: "1.5s" }}
        />
        {/* RAG ⤴ OUTPUT */}
        <line
          x1="605"
          y1="334"
          x2="652"
          y2="241"
          stroke={`${O}60`}
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arw-d)"
          className="hero-edge-return"
          style={{ animationDelay: "1.5s" }}
        />

        {/* ═══ ANNOTATION LEADER LINES ═══ */}

        {/* CONTEXT — above PROMPT→AGENT line */}
        <g
          className="hero-label"
          style={{ animationDelay: "1.7s" }}
        >
          <text
            x="297"
            y="192"
            fill={`${O}70`}
            fontSize="8"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            CONTEXT
          </text>
          <line
            x1="297"
            y1="196"
            x2="297"
            y2="216"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="297" cy="216" r="1.2" fill={`${O}35`} />
        </g>

        {/* TOOL CALL — left of AGENT→MCP line */}
        <g
          className="hero-label"
          style={{ animationDelay: "1.8s" }}
        >
          <text
            x="338"
            y="163"
            fill={`${O}70`}
            fontSize="8"
            fontFamily="var(--font-mono)"
            textAnchor="end"
          >
            TOOL CALL
          </text>
          <line
            x1="342"
            y1="160"
            x2="386"
            y2="160"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="386" cy="160" r="1.2" fill={`${O}35`} />
        </g>

        {/* HANDOFF — left of AGENT→A2A line */}
        <g
          className="hero-label"
          style={{ animationDelay: "1.8s" }}
        >
          <text
            x="338"
            y="283"
            fill={`${O}70`}
            fontSize="8"
            fontFamily="var(--font-mono)"
            textAnchor="end"
          >
            HANDOFF
          </text>
          <line
            x1="342"
            y1="280"
            x2="386"
            y2="280"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="386" cy="280" r="1.2" fill={`${O}35`} />
        </g>

        {/* RETRIEVAL — above A2A→RAG line */}
        <g
          className="hero-label"
          style={{ animationDelay: "1.9s" }}
        >
          <text
            x="488"
            y="328"
            fill={`${O}70`}
            fontSize="8"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            RETRIEVAL
          </text>
          <line
            x1="488"
            y1="331"
            x2="488"
            y2="336"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="488" cy="336" r="1.2" fill={`${O}35`} />
        </g>

        {/* RESPONSE — above AGENT→OUTPUT line */}
        <g
          className="hero-label"
          style={{ animationDelay: "1.9s" }}
        >
          <text
            x="532"
            y="206"
            fill={`${O}70`}
            fontSize="8"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            RESPONSE
          </text>
          <line
            x1="532"
            y1="210"
            x2="532"
            y2="216"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="532" cy="216" r="1.2" fill={`${O}35`} />
        </g>

        {/* ═══ NODE BOXES ═══ */}

        {/* USER */}
        <g className="hero-node" style={{ animationDelay: "0.2s" }}>
          <rect
            x="35"
            y="201"
            width="80"
            height="38"
            rx="4"
            fill={`${O}0a`}
            stroke={O}
            strokeWidth="1"
          />
          <text
            x="75"
            y="224"
            fill={O}
            fontSize="11"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            dominantBaseline="central"
          >
            USER
          </text>
        </g>

        {/* PROMPT */}
        <g className="hero-node" style={{ animationDelay: "0.5s" }}>
          <rect
            x="150"
            y="201"
            width="110"
            height="38"
            rx="4"
            fill={`${O}0a`}
            stroke={O}
            strokeWidth="1"
          />
          <text
            x="205"
            y="224"
            fill={O}
            fontSize="11"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            dominantBaseline="central"
          >
            PROMPT
          </text>
        </g>

        {/* AGENT — central node, bolder */}
        <g className="hero-node" style={{ animationDelay: "0.8s" }}>
          <rect
            x="335"
            y="201"
            width="110"
            height="38"
            rx="4"
            fill={`${O}14`}
            stroke={O}
            strokeWidth="1.5"
          />
          <text
            x="390"
            y="224"
            fill={O}
            fontSize="11"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            dominantBaseline="central"
            fontWeight="bold"
          >
            AGENT
          </text>
        </g>

        {/* MCP SERVER */}
        <g className="hero-node" style={{ animationDelay: "1.1s" }}>
          <rect
            x="327"
            y="81"
            width="126"
            height="38"
            rx="4"
            fill={`${O}0a`}
            stroke={O}
            strokeWidth="1"
          />
          <text
            x="390"
            y="104"
            fill={O}
            fontSize="11"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            dominantBaseline="central"
          >
            MCP SERVER
          </text>
        </g>

        {/* TOOL */}
        <g className="hero-node" style={{ animationDelay: "1.3s" }}>
          <rect
            x="525"
            y="81"
            width="80"
            height="38"
            rx="4"
            fill={`${O}0a`}
            stroke={O}
            strokeWidth="1"
          />
          <text
            x="565"
            y="104"
            fill={O}
            fontSize="11"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            dominantBaseline="central"
          >
            TOOL
          </text>
        </g>

        {/* A2A AGENT */}
        <g className="hero-node" style={{ animationDelay: "1.1s" }}>
          <rect
            x="327"
            y="321"
            width="126"
            height="38"
            rx="4"
            fill={`${O}0a`}
            stroke={O}
            strokeWidth="1"
          />
          <text
            x="390"
            y="344"
            fill={O}
            fontSize="11"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            dominantBaseline="central"
          >
            A2A AGENT
          </text>
        </g>

        {/* RAG */}
        <g className="hero-node" style={{ animationDelay: "1.3s" }}>
          <rect
            x="525"
            y="321"
            width="80"
            height="38"
            rx="4"
            fill={`${O}0a`}
            stroke={O}
            strokeWidth="1"
          />
          <text
            x="565"
            y="344"
            fill={O}
            fontSize="11"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            dominantBaseline="central"
          >
            RAG
          </text>
        </g>

        {/* OUTPUT — endpoint, bolder */}
        <g className="hero-node" style={{ animationDelay: "1.5s" }}>
          <rect
            x="620"
            y="201"
            width="100"
            height="38"
            rx="4"
            fill={`${O}14`}
            stroke={O}
            strokeWidth="1.5"
          />
          <text
            x="670"
            y="224"
            fill={O}
            fontSize="11"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
            dominantBaseline="central"
            fontWeight="bold"
          >
            OUTPUT
          </text>
        </g>

        {/* ═══ SIGNAL PULSE ═══ */}
        {/* A small dot traveling the main path on loop */}
        <circle r="3" fill={O} opacity="0.5" className="hero-pulse">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin="2.5s"
            path="M 115,220 L 150,220 260,220 335,220 445,220 620,220"
          />
        </circle>
      </svg>
    </div>
  );
}
