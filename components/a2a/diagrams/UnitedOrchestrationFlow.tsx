"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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

export function UnitedOrchestrationFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-play on first visibility
  useEffect(() => {
    if (visible && !isPlaying && currentPhase === -1) {
      const timer = setTimeout(() => startPlayback(), 500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const startPlayback = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentPhase(0);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || currentPhase < 0) return;
    if (currentPhase >= phases.length) {
      timeoutRef.current = setTimeout(() => {
        setIsPlaying(false);
      }, 1500);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
    timeoutRef.current = setTimeout(() => {
      setCurrentPhase((p) => p + 1);
    }, phases[currentPhase].duration);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, currentPhase]);

  const replay = useCallback(() => {
    setCurrentPhase(-1);
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
      setCurrentPhase(0);
    }, 100);
  }, []);

  const svgW = 560;
  const svgH = 340;

  const statusLabels: Record<string, string> = {};
  if (currentPhase >= 1) {
    specialists.forEach((s) => {
      statusLabels[s.id] = "WORKING";
    });
  }
  if (currentPhase >= 2) {
    statusLabels["rebooking"] = "INPUT_REQ";
  }
  if (currentPhase >= 3) {
    statusLabels["rebooking"] = "INPUT_REQ";
  }
  if (currentPhase >= 4) {
    specialists.forEach((s) => {
      statusLabels[s.id] = "COMPLETED";
    });
  }

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
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="mx-auto w-full max-w-2xl">
          {/* Phase 1: Discovery lines (dashed) */}
          {specialists.map((spec, i) => (
            <line
              key={`disc-${spec.id}`}
              x1={supportAgent.x + 50}
              y1={supportAgent.y}
              x2={spec.x - 40}
              y2={spec.y}
              stroke="black"
              strokeOpacity={0.15}
              strokeWidth={1}
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
          {specialists.map((spec, i) => (
            <g key={`task-${spec.id}`}>
              <line
                x1={supportAgent.x + 50}
                y1={supportAgent.y}
                x2={spec.x - 40}
                y2={spec.y}
                stroke="black"
                strokeOpacity={currentPhase >= 1 ? 0.2 : 0}
                strokeWidth={1.5}
                className="transition-all duration-500"
              />
              {currentPhase === 1 && (
                <circle r={4} fill="#e67e22" fillOpacity={0.7}>
                  <animateMotion
                    dur="1s"
                    repeatCount="1"
                    fill="freeze"
                    path={`M ${supportAgent.x + 50} ${supportAgent.y} L ${spec.x - 40} ${spec.y}`}
                  />
                </circle>
              )}
            </g>
          ))}

          {/* Phase 3: Message dot from rebooking back to support, then return */}
          {currentPhase === 2 && (
            <>
              <circle r={4} fill="#f59e0b" fillOpacity={0.8}>
                <animateMotion
                  dur="1s"
                  repeatCount="1"
                  fill="freeze"
                  path={`M ${specialists[0].x - 40} ${specialists[0].y} L ${supportAgent.x + 50} ${supportAgent.y}`}
                />
              </circle>
            </>
          )}
          {currentPhase === 3 && (
            <circle r={4} fill="#e67e22" fillOpacity={0.7}>
              <animateMotion
                dur="0.8s"
                repeatCount="1"
                fill="freeze"
                path={`M ${supportAgent.x + 50} ${supportAgent.y} L ${specialists[0].x - 40} ${specialists[0].y}`}
              />
            </circle>
          )}

          {/* Phase 4: Artifact icons traveling back */}
          {currentPhase >= 4 &&
            specialists.map((spec, i) => (
              <circle
                key={`art-${spec.id}`}
                r={4}
                fill="#22c55e"
                fillOpacity={0.7}
              >
                <animateMotion
                  dur="1s"
                  repeatCount="1"
                  fill="freeze"
                  path={`M ${spec.x - 40} ${spec.y} L ${supportAgent.x + 50} ${supportAgent.y}`}
                  begin={`${i * 200}ms`}
                />
              </circle>
            ))}

          {/* Support Agent node */}
          <g>
            <rect
              x={supportAgent.x - 52}
              y={supportAgent.y - 18}
              width={104}
              height={36}
              rx={3}
              fill="white"
              stroke="#e67e22"
              strokeOpacity={0.5}
              strokeWidth={1.5}
            />
            <text
              x={supportAgent.x}
              y={supportAgent.y + 4}
              textAnchor="middle"
              fill="#1d1d1f"
              style={{ fontFamily: "Departure Mono, monospace", fontSize: "9px" }}
            >
              {supportAgent.label}
            </text>
          </g>

          {/* Specialist nodes */}
          {specialists.map((spec) => {
            const status = statusLabels[spec.id];
            const statusColor =
              status === "COMPLETED"
                ? "#22c55e"
                : status === "INPUT_REQ"
                  ? "#f59e0b"
                  : status === "WORKING"
                    ? "#2dd4bf"
                    : "#9b9fa7";

            return (
              <g key={spec.id}>
                <rect
                  x={spec.x - 48}
                  y={spec.y - 18}
                  width={96}
                  height={36}
                  rx={3}
                  fill="white"
                  stroke="black"
                  strokeOpacity={0.08}
                  strokeWidth={1}
                />
                <text
                  x={spec.x}
                  y={spec.y + 4}
                  textAnchor="middle"
                  fill="black"
                  style={{ fontFamily: "Departure Mono, monospace", fontSize: "9px" }}
                >
                  {spec.label}
                </text>
                {/* Status badge */}
                {status && (
                  <g>
                    <rect
                      x={spec.x - 28}
                      y={spec.y + 22}
                      width={56}
                      height={16}
                      rx={8}
                      fill={statusColor}
                      fillOpacity={0.15}
                      stroke={statusColor}
                      strokeWidth={0.5}
                    />
                    <text
                      x={spec.x}
                      y={spec.y + 33}
                      textAnchor="middle"
                      fill={statusColor}
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
                        x={spec.x + 34}
                        y={spec.y + 33}
                        textAnchor="middle"
                        fill={statusColor}
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
              x={370}
              y={38}
              textAnchor="middle"
              fill="#f59e0b"
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
