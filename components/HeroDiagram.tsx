"use client";

/**
 * Animated SVG technical schematic — makingsoftware.com blueprint style.
 * Shows AI agent architecture flow: User → Prompt → Agent → MCP/A2A → Output.
 *
 * - Light gray background with orange dot grid
 * - Departure Mono ALL CAPS, orange monochrome
 * - Pulse dot travels upper path (MCP/Tool route); boxes light up on contact
 * - Dot rendered BEFORE boxes in SVG order so boxes naturally cover it
 */

const O = "#e67e22";
const DUR = "8s";
const BEGIN = "2.5s";

export function HeroDiagram() {
  return (
    <div className="mb-20">
      <svg
        viewBox="0 0 800 450"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Technical diagram: User sends Prompt to Agent, which calls Tools via MCP Server, delegates via A2A, retrieves via RAG, producing Output"
      >
        <defs>
          <pattern
            id="dot-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="0.5" fill={`${O}10`} />
          </pattern>
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
        <rect width="800" height="450" fill="#f8f8f9" rx="6" />
        <rect width="800" height="450" fill="url(#dot-grid)" rx="6" />

        {/* ═══ CORNER LABELS ═══ */}
        <text
          x="24"
          y="28"
          fill={`${O}90`}
          fontSize="11"
          fontFamily="var(--font-mono)"
          className="hero-label"
          style={{ animationDelay: "0.1s" }}
        >
          FIG. 001
        </text>
        <text
          x="780"
          y="225"
          fill={`${O}50`}
          fontSize="11"
          fontFamily="var(--font-mono)"
          textAnchor="middle"
          transform="rotate(90, 780, 225)"
          className="hero-label"
          style={{ animationDelay: "0.1s" }}
        >
          [ AI AGENT ARCHITECTURE ]
        </text>

        {/* ═══ EDGES — solid flow lines ═══ */}

        {/* USER → PROMPT */}
        <line
          x1="125"
          y1="225"
          x2="156"
          y2="225"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="31"
          strokeDashoffset="31"
          style={{ animationDelay: "0.3s" }}
        />
        {/* PROMPT → AGENT */}
        <line
          x1="278"
          y1="225"
          x2="338"
          y2="225"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="60"
          strokeDashoffset="60"
          style={{ animationDelay: "0.6s" }}
        />
        {/* AGENT → OUTPUT */}
        <line
          x1="460"
          y1="225"
          x2="638"
          y2="225"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="178"
          strokeDashoffset="178"
          style={{ animationDelay: "0.9s" }}
        />
        {/* AGENT ↑ MCP */}
        <line
          x1="400"
          y1="204"
          x2="400"
          y2="128"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="76"
          strokeDashoffset="76"
          style={{ animationDelay: "0.9s" }}
        />
        {/* MCP → TOOL */}
        <line
          x1="470"
          y1="105"
          x2="533"
          y2="105"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="63"
          strokeDashoffset="63"
          style={{ animationDelay: "1.2s" }}
        />
        {/* AGENT ↓ A2A */}
        <line
          x1="400"
          y1="246"
          x2="400"
          y2="326"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="80"
          strokeDashoffset="80"
          style={{ animationDelay: "0.9s" }}
        />
        {/* A2A → RAG */}
        <line
          x1="470"
          y1="345"
          x2="533"
          y2="345"
          stroke={O}
          strokeWidth="1"
          markerEnd="url(#arw)"
          className="hero-edge"
          strokeDasharray="63"
          strokeDashoffset="63"
          style={{ animationDelay: "1.2s" }}
        />

        {/* ═══ EDGES — dashed return paths ═══ */}

        {/* TOOL ⤵ OUTPUT */}
        <line
          x1="625"
          y1="110"
          x2="655"
          y2="202"
          stroke={`${O}60`}
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arw-d)"
          className="hero-edge-return"
          style={{ animationDelay: "1.5s" }}
        />
        {/* RAG ⤴ OUTPUT */}
        <line
          x1="625"
          y1="340"
          x2="655"
          y2="248"
          stroke={`${O}60`}
          strokeWidth="1"
          strokeDasharray="4 4"
          markerEnd="url(#arw-d)"
          className="hero-edge-return"
          style={{ animationDelay: "1.5s" }}
        />

        {/* ═══ ANNOTATIONS (leader lines) ═══ */}

        {/* CONTEXT */}
        <g className="hero-label" style={{ animationDelay: "1.7s" }}>
          <text
            x="309"
            y="205"
            fill={`${O}70`}
            fontSize="9"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            CONTEXT
          </text>
          <line
            x1="309"
            y1="209"
            x2="309"
            y2="221"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="309" cy="221" r="1.2" fill={`${O}35`} />
        </g>

        {/* TOOL CALL */}
        <g className="hero-label" style={{ animationDelay: "1.8s" }}>
          <text
            x="348"
            y="162"
            fill={`${O}70`}
            fontSize="9"
            fontFamily="var(--font-mono)"
            textAnchor="end"
          >
            TOOL CALL
          </text>
          <line
            x1="352"
            y1="159"
            x2="396"
            y2="159"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="396" cy="159" r="1.2" fill={`${O}35`} />
        </g>

        {/* HANDOFF */}
        <g className="hero-label" style={{ animationDelay: "1.8s" }}>
          <text
            x="348"
            y="292"
            fill={`${O}70`}
            fontSize="9"
            fontFamily="var(--font-mono)"
            textAnchor="end"
          >
            HANDOFF
          </text>
          <line
            x1="352"
            y1="289"
            x2="396"
            y2="289"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="396" cy="289" r="1.2" fill={`${O}35`} />
        </g>

        {/* RETRIEVAL */}
        <g className="hero-label" style={{ animationDelay: "1.9s" }}>
          <text
            x="503"
            y="333"
            fill={`${O}70`}
            fontSize="9"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            RETRIEVAL
          </text>
          <line
            x1="503"
            y1="337"
            x2="503"
            y2="341"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="503" cy="341" r="1.2" fill={`${O}35`} />
        </g>

        {/* RESPONSE */}
        <g className="hero-label" style={{ animationDelay: "1.9s" }}>
          <text
            x="550"
            y="205"
            fill={`${O}70`}
            fontSize="9"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            RESPONSE
          </text>
          <line
            x1="550"
            y1="209"
            x2="550"
            y2="221"
            stroke={`${O}35`}
            strokeWidth="0.5"
          />
          <circle cx="550" cy="221" r="1.2" fill={`${O}35`} />
        </g>

        {/* ═══ PULSE DOT — only travels on visible lines between boxes ═══ */}
        {/* M = teleport (instant), L = visible travel along connection line */}
        <circle r="4" fill={`${O}99`} className="hero-pulse">
          <animateMotion
            dur={DUR}
            begin={BEGIN}
            repeatCount="indefinite"
            calcMode="linear"
            path="M 125,225 L 156,225 M 278,225 L 338,225 M 400,204 L 400,128 M 470,105 L 533,105 M 625,110 L 655,202"
          />
        </circle>

        {/* ═══ NODE BOXES — on top of pulse, with SMIL highlight animations ═══ */}

        {/* USER — pulse starts here at 0% */}
        <g className="hero-node" style={{ animationDelay: "0.2s" }}>
          <rect
            x="35"
            y="204"
            width="90"
            height="42"
            rx="4"
            fill={`${O}08`}
            stroke={O}
            strokeWidth="1"
          >
            <animate
              attributeName="stroke-width"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.03;0.06;1"
              values="2.5;2.5;1;1"
            />
          </rect>
          <rect
            x="35"
            y="204"
            width="90"
            height="42"
            rx="4"
            fill={O}
            opacity="0"
            pointerEvents="none"
          >
            <animate
              attributeName="opacity"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.03;0.06;1"
              values="0.18;0.18;0;0"
            />
          </rect>
          <text
            x="80"
            y="225"
            textAnchor="middle"
            dy="0.35em"
            fill={O}
            fontSize="13"
            fontFamily="var(--font-mono)"
          >
            USER
          </text>
        </g>

        {/* PROMPT — pulse arrives at ~9% */}
        <g className="hero-node" style={{ animationDelay: "0.5s" }}>
          <rect
            x="158"
            y="204"
            width="120"
            height="42"
            rx="4"
            fill={`${O}08`}
            stroke={O}
            strokeWidth="1"
          >
            <animate
              attributeName="stroke-width"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.07;0.09;0.12;1"
              values="1;1;2.5;1;1"
            />
          </rect>
          <rect
            x="158"
            y="204"
            width="120"
            height="42"
            rx="4"
            fill={O}
            opacity="0"
            pointerEvents="none"
          >
            <animate
              attributeName="opacity"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.07;0.09;0.12;1"
              values="0;0;0.18;0;0"
            />
          </rect>
          <text
            x="218"
            y="225"
            textAnchor="middle"
            dy="0.35em"
            fill={O}
            fontSize="13"
            fontFamily="var(--font-mono)"
          >
            PROMPT
          </text>
        </g>

        {/* AGENT — pulse arrives at ~28%, bold */}
        <g className="hero-node" style={{ animationDelay: "0.8s" }}>
          <rect
            x="340"
            y="204"
            width="120"
            height="42"
            rx="4"
            fill={`${O}10`}
            stroke={O}
            strokeWidth="1.5"
          >
            <animate
              attributeName="stroke-width"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.25;0.28;0.31;1"
              values="1.5;1.5;3;1.5;1.5"
            />
          </rect>
          <rect
            x="340"
            y="204"
            width="120"
            height="42"
            rx="4"
            fill={O}
            opacity="0"
            pointerEvents="none"
          >
            <animate
              attributeName="opacity"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.25;0.28;0.31;1"
              values="0;0;0.22;0;0"
            />
          </rect>
          <text
            x="400"
            y="225"
            textAnchor="middle"
            dy="0.35em"
            fill={O}
            fontSize="13"
            fontFamily="var(--font-mono)"
            fontWeight="bold"
          >
            AGENT
          </text>
        </g>

        {/* MCP SERVER — pulse arrives at ~51% */}
        <g className="hero-node" style={{ animationDelay: "1.1s" }}>
          <rect
            x="330"
            y="84"
            width="140"
            height="42"
            rx="4"
            fill={`${O}08`}
            stroke={O}
            strokeWidth="1"
          >
            <animate
              attributeName="stroke-width"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.48;0.51;0.54;1"
              values="1;1;2.5;1;1"
            />
          </rect>
          <rect
            x="330"
            y="84"
            width="140"
            height="42"
            rx="4"
            fill={O}
            opacity="0"
            pointerEvents="none"
          >
            <animate
              attributeName="opacity"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.48;0.51;0.54;1"
              values="0;0;0.18;0;0"
            />
          </rect>
          <text
            x="400"
            y="105"
            textAnchor="middle"
            dy="0.35em"
            fill={O}
            fontSize="13"
            fontFamily="var(--font-mono)"
          >
            MCP SERVER
          </text>
        </g>

        {/* TOOL — pulse arrives at ~70% */}
        <g className="hero-node" style={{ animationDelay: "1.3s" }}>
          <rect
            x="535"
            y="84"
            width="90"
            height="42"
            rx="4"
            fill={`${O}08`}
            stroke={O}
            strokeWidth="1"
          >
            <animate
              attributeName="stroke-width"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.67;0.70;0.73;1"
              values="1;1;2.5;1;1"
            />
          </rect>
          <rect
            x="535"
            y="84"
            width="90"
            height="42"
            rx="4"
            fill={O}
            opacity="0"
            pointerEvents="none"
          >
            <animate
              attributeName="opacity"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.67;0.70;0.73;1"
              values="0;0;0.18;0;0"
            />
          </rect>
          <text
            x="580"
            y="105"
            textAnchor="middle"
            dy="0.35em"
            fill={O}
            fontSize="13"
            fontFamily="var(--font-mono)"
          >
            TOOL
          </text>
        </g>

        {/* A2A AGENT — no highlight (pulse takes upper path) */}
        <g className="hero-node" style={{ animationDelay: "1.1s" }}>
          <rect
            x="330"
            y="324"
            width="140"
            height="42"
            rx="4"
            fill={`${O}08`}
            stroke={O}
            strokeWidth="1"
          />
          <text
            x="400"
            y="345"
            textAnchor="middle"
            dy="0.35em"
            fill={O}
            fontSize="13"
            fontFamily="var(--font-mono)"
          >
            A2A AGENT
          </text>
        </g>

        {/* RAG — no highlight */}
        <g className="hero-node" style={{ animationDelay: "1.3s" }}>
          <rect
            x="535"
            y="324"
            width="90"
            height="42"
            rx="4"
            fill={`${O}08`}
            stroke={O}
            strokeWidth="1"
          />
          <text
            x="580"
            y="345"
            textAnchor="middle"
            dy="0.35em"
            fill={O}
            fontSize="13"
            fontFamily="var(--font-mono)"
          >
            RAG
          </text>
        </g>

        {/* OUTPUT — pulse hits at ~97%, bold */}
        <g className="hero-node" style={{ animationDelay: "1.5s" }}>
          <rect
            x="640"
            y="204"
            width="110"
            height="42"
            rx="4"
            fill={`${O}10`}
            stroke={O}
            strokeWidth="1.5"
          >
            <animate
              attributeName="stroke-width"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.94;0.97;1"
              values="1.5;1.5;3;1.5"
            />
          </rect>
          <rect
            x="640"
            y="204"
            width="110"
            height="42"
            rx="4"
            fill={O}
            opacity="0"
            pointerEvents="none"
          >
            <animate
              attributeName="opacity"
              dur={DUR}
              begin={BEGIN}
              repeatCount="indefinite"
              keyTimes="0;0.94;0.97;1"
              values="0;0;0.22;0"
            />
          </rect>
          <text
            x="695"
            y="225"
            textAnchor="middle"
            dy="0.35em"
            fill={O}
            fontSize="13"
            fontFamily="var(--font-mono)"
            fontWeight="bold"
          >
            OUTPUT
          </text>
        </g>
      </svg>
    </div>
  );
}
