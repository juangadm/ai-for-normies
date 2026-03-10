"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

const phases = [
  { label: "AGENT CARDS", duration: 1800 },
  { label: "TASKS", duration: 1800 },
  { label: "MESSAGES", duration: 2000 },
  { label: "ARTIFACTS", duration: 1800 },
];

interface AgentNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

const supportAgent: AgentNode = { id: "support", label: "Support Agent", x: 260, y: 150 };
const specialists: AgentNode[] = [
  { id: "rebooking", label: "Rebooking", x: 460, y: 60 },
  { id: "compensation", label: "Compensation", x: 480, y: 190 },
  { id: "hotel", label: "Hotel Voucher", x: 380, y: 280 },
];

const SVG_W = 560;
const SVG_H = 340;
const MONO_FONT = { fontFamily: "Departure Mono, monospace", fontSize: "9px" };

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: "#22c55e",
  INPUT_REQ: "#f59e0b",
  WORKING: "#2dd4bf",
};

function getStatusLabels(currentPhase: number): Record<string, string> {
  const labels: Record<string, string> = {};

  if (currentPhase >= 4) {
    // Phase 4+: all completed
    for (const s of specialists) labels[s.id] = "COMPLETED";
  } else if (currentPhase >= 2) {
    // Phase 2-3: all working, rebooking needs input
    for (const s of specialists) labels[s.id] = "WORKING";
    labels["rebooking"] = "INPUT_REQ";
  } else if (currentPhase >= 1) {
    // Phase 1: all working
    for (const s of specialists) labels[s.id] = "WORKING";
  }

  return labels;
}

export function UnitedOrchestrationFlow() {
  const [ref, visible] = useInView(0.2);
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play on first visibility
  useEffect(() => {
    if (visible && !isPlaying && currentPhase === -1) {
      const timer = setTimeout(() => startPlayback(), 500);
      return () => clearTimeout(timer);
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const startPlayback = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentPhase(0);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentPhase < 0) return;

    if (currentPhase >= phases.length) {
      const timer = setTimeout(() => setIsPlaying(false), 1500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentPhase((p) => p + 1);
    }, phases[currentPhase].duration);
    return () => clearTimeout(timer);
  }, [isPlaying, currentPhase]);

  const replay = useCallback(() => {
    setCurrentPhase(-1);
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
      setCurrentPhase(0);
    }, 100);
  }, []);

  const statusLabels = getStatusLabels(currentPhase);

  return (
    <div ref={ref} className="my-8">
      {/* Phase indicator */}
      <div className="mb-3 flex items-center justify-center gap-3">
        {phases.map((p, i) => (
          <span
            key={p.label}
            className="font-mono text-[9px] uppercase tracking-[0.1em] transition-all duration-300"
            style={{
              color: currentPhase === i ? "#e67e22" : currentPhase > i ? "#1d1d1f" : "#9b9fa7",
              fontWeight: currentPhase === i ? 600 : 400,
            }}
          >
            {p.label}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="mx-auto w-full max-w-2xl">
          {/* Phase 1: Discovery lines (dashed) */}
          {specialists.map((spec, i) => (
            <line
              key={`disc-${spec.id}`}
              x1={supportAgent.x + 50} y1={supportAgent.y}
              x2={spec.x - 40} y2={spec.y}
              stroke="black" strokeOpacity={0.15} strokeWidth={1}
              strokeDasharray="4 3"
              className="transition-all duration-600"
              style={{
                strokeDashoffset: currentPhase >= 0 ? 0 : 200,
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 150}ms`,
              }}
            />
          ))}

          {/* Phase 2: Solid lines + task dots traveling outward */}
          {specialists.map((spec, i) => {
            const path = `M ${supportAgent.x + 50} ${supportAgent.y} L ${spec.x - 40} ${spec.y}`;
            return (
              <g key={`task-${spec.id}`}>
                <line
                  x1={supportAgent.x + 50} y1={supportAgent.y}
                  x2={spec.x - 40} y2={spec.y}
                  stroke="black"
                  strokeOpacity={currentPhase >= 1 ? 0.2 : 0}
                  strokeWidth={1.5}
                  className="transition-all duration-500"
                />
                {currentPhase === 1 && (
                  <circle r={4} fill="#e67e22" fillOpacity={0.7}>
                    <animateMotion dur="1s" repeatCount="1" fill="freeze" path={path} />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Phase 3: Message dot from rebooking back to support */}
          {currentPhase === 2 && (
            <circle r={4} fill="#f59e0b" fillOpacity={0.8}>
              <animateMotion
                dur="1s" repeatCount="1" fill="freeze"
                path={`M ${specialists[0].x - 40} ${specialists[0].y} L ${supportAgent.x + 50} ${supportAgent.y}`}
              />
            </circle>
          )}
          {currentPhase === 3 && (
            <circle r={4} fill="#e67e22" fillOpacity={0.7}>
              <animateMotion
                dur="0.8s" repeatCount="1" fill="freeze"
                path={`M ${supportAgent.x + 50} ${supportAgent.y} L ${specialists[0].x - 40} ${specialists[0].y}`}
              />
            </circle>
          )}

          {/* Phase 4: Artifact icons traveling back */}
          {currentPhase >= 4 &&
            specialists.map((spec, i) => (
              <circle key={`art-${spec.id}`} r={4} fill="#22c55e" fillOpacity={0.7}>
                <animateMotion
                  dur="1s" repeatCount="1" fill="freeze"
                  path={`M ${spec.x - 40} ${spec.y} L ${supportAgent.x + 50} ${supportAgent.y}`}
                  begin={`${i * 200}ms`}
                />
              </circle>
            ))}

          {/* Support Agent node */}
          <g>
            <rect
              x={supportAgent.x - 52} y={supportAgent.y - 18}
              width={104} height={36} rx={3}
              fill="white" stroke="#e67e22" strokeOpacity={0.5} strokeWidth={1.5}
            />
            <text
              x={supportAgent.x} y={supportAgent.y + 4}
              textAnchor="middle" fill="#1d1d1f" style={MONO_FONT}
            >
              {supportAgent.label}
            </text>
          </g>

          {/* Specialist nodes */}
          {specialists.map((spec) => {
            const status = statusLabels[spec.id];
            const statusColor = STATUS_COLORS[status] || "#9b9fa7";

            return (
              <g key={spec.id}>
                <rect
                  x={spec.x - 48} y={spec.y - 18}
                  width={96} height={36} rx={3}
                  fill="white" stroke="black" strokeOpacity={0.08} strokeWidth={1}
                />
                <text
                  x={spec.x} y={spec.y + 4}
                  textAnchor="middle" fill="black" style={MONO_FONT}
                >
                  {spec.label}
                </text>
                {status && (
                  <g>
                    <rect
                      x={spec.x - 28} y={spec.y + 22}
                      width={56} height={16} rx={8}
                      fill={statusColor} fillOpacity={0.15}
                      stroke={statusColor} strokeWidth={0.5}
                    />
                    <text
                      x={spec.x} y={spec.y + 33}
                      textAnchor="middle" fill={statusColor}
                      style={{
                        fontFamily: "Departure Mono, monospace",
                        fontSize: "7px",
                        fontWeight: 600,
                      }}
                    >
                      {status}
                    </text>
                    {status === "COMPLETED" && (
                      <text
                        x={spec.x + 34} y={spec.y + 33}
                        textAnchor="middle" fill={statusColor}
                        style={{ fontSize: "8px" }}
                      >
                        ✓
                      </text>
                    )}
                  </g>
                )}
              </g>
            );
          })}

          {/* Phase 3 annotation: "Window or aisle?" */}
          {(currentPhase === 2 || currentPhase === 3) && (
            <text
              x={370} y={38}
              textAnchor="middle" fill="#f59e0b"
              style={{
                fontFamily: "Departure Mono, monospace",
                fontSize: "9px",
                fontStyle: "italic",
              }}
            >
              {currentPhase === 2
                ? "\"Window or aisle?\""
                : "\"Window, connections OK\""}
            </text>
          )}
        </svg>
      </div>

      {/* Replay button */}
      <div className="mt-2 flex justify-center">
        <button
          onClick={replay}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light transition-colors hover:text-ink"
        >
          {isPlaying ? "playing..." : "replay"}
        </button>
      </div>
    </div>
  );
}
