"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface StateNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: { idle: string; active: string };
}

const states: StateNode[] = [
  { id: "submitted", label: "SUBMITTED", x: 80, y: 100, color: { idle: "#e4e4e7", active: "#9b9fa7" } },
  { id: "working-1", label: "WORKING", x: 230, y: 60, color: { idle: "#e4e4e7", active: "#2dd4bf" } },
  { id: "input-required", label: "INPUT\nREQUIRED", x: 380, y: 100, color: { idle: "#e4e4e7", active: "#f59e0b" } },
  { id: "working-2", label: "WORKING", x: 460, y: 180, color: { idle: "#e4e4e7", active: "#2dd4bf" } },
  { id: "completed", label: "COMPLETED", x: 300, y: 230, color: { idle: "#e4e4e7", active: "#22c55e" } },
];

interface Transition {
  from: number;
  to: number;
  label: string;
}

const transitions: Transition[] = [
  { from: 0, to: 1, label: "agent starts" },
  { from: 1, to: 2, label: "needs info" },
  { from: 2, to: 3, label: "user responds" },
  { from: 3, to: 4, label: "task done" },
];

const contextLabels: Record<number, string> = {
  0: "Task created: Rebook passenger on next SFO\u2192NRT",
  1: "Rebooking Agent searching available flights...",
  2: "\"Window or aisle? Direct only or connections?\"",
  3: "Processing: Window seat, connections OK if under 3h",
  4: "New itinerary ready: UA 892, seat 14A",
};

export function TaskStateMachine() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const play = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveIndex(0);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || activeIndex < 0) return;
    if (activeIndex >= states.length) {
      timeoutRef.current = setTimeout(() => {
        setIsPlaying(false);
        setActiveIndex(-1);
      }, 1500);
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((i) => i + 1);
    }, 1400);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, activeIndex]);

  const svgW = 560;
  const svgH = 280;

  return (
    <div ref={ref} className="my-8">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="mx-auto w-full max-w-2xl">
          {/* Transition paths */}
          {transitions.map((t, i) => {
            const from = states[t.from];
            const to = states[t.to];
            const isActive = activeIndex > t.from && activeIndex <= t.to + 1;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 - 20;

            return (
              <g key={`t-${i}`}>
                <path
                  d={`M ${from.x} ${from.y} Q ${midX} ${midY - 10} ${to.x} ${to.y}`}
                  fill="none"
                  stroke="black"
                  strokeOpacity={visible ? 0.12 : 0}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  className="transition-all duration-500"
                />
                {/* Animated dot along path */}
                {isActive && (
                  <circle r={4} fill="#e67e22" fillOpacity={0.8}>
                    <animateMotion
                      dur="0.8s"
                      repeatCount="1"
                      fill="freeze"
                      path={`M ${from.x} ${from.y} Q ${midX} ${midY - 10} ${to.x} ${to.y}`}
                    />
                  </circle>
                )}
                {/* Transition label */}
                <text
                  x={midX}
                  y={midY - 16}
                  textAnchor="middle"
                  fill="black"
                  fillOpacity={visible ? 0.4 : 0}
                  className="transition-opacity duration-500"
                  style={{
                    fontFamily: "Departure Mono, monospace",
                    fontSize: "8px",
                  }}
                >
                  {t.label}
                </text>
              </g>
            );
          })}

          {/* State nodes */}
          {states.map((state, i) => {
            const isActive = activeIndex === i;
            const isPast = activeIndex > i;
            const borderColor = isActive
              ? state.color.active
              : isPast
                ? state.color.active
                : state.color.idle;
            const fillOpacity = isActive ? 0.08 : 0;

            return (
              <g key={state.id}>
                <rect
                  x={state.x - 44}
                  y={state.y - 18}
                  width={88}
                  height={36}
                  rx={18}
                  fill={isActive ? state.color.active : "white"}
                  fillOpacity={isActive ? 0.08 : 1}
                  stroke={borderColor}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-300"
                />
                {/* Pulse ring for active state */}
                {isActive && (
                  <rect
                    x={state.x - 48}
                    y={state.y - 22}
                    width={96}
                    height={44}
                    rx={22}
                    fill="none"
                    stroke={state.color.active}
                    strokeWidth={1}
                    opacity={0.3}
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0.1;0.3"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-width"
                      values="1;2;1"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </rect>
                )}
                {state.label.includes("\n") ? (
                  state.label.split("\n").map((line, li) => (
                    <text
                      key={li}
                      x={state.x}
                      y={state.y + (li - 0.5) * 11 + 2}
                      textAnchor="middle"
                      fill={isActive || isPast ? state.color.active : "#6b6f76"}
                      className="transition-all duration-300"
                      style={{
                        fontFamily: "Departure Mono, monospace",
                        fontSize: "8px",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {line}
                    </text>
                  ))
                ) : (
                  <text
                    x={state.x}
                    y={state.y + 4}
                    textAnchor="middle"
                    fill={isActive || isPast ? state.color.active : "#6b6f76"}
                    className="transition-all duration-300"
                    style={{
                      fontFamily: "Departure Mono, monospace",
                      fontSize: "8px",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {state.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Context label */}
      <div className="mx-auto mt-2 h-8 max-w-md text-center">
        {activeIndex >= 0 && activeIndex < states.length && (
          <p
            className="text-[13px] italic text-ink-light transition-opacity duration-300"
            key={activeIndex}
          >
            {contextLabels[activeIndex]}
          </p>
        )}
      </div>

      {/* Play button */}
      <div className="mt-2 flex justify-center">
        <button
          onClick={play}
          disabled={isPlaying}
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light transition-colors hover:text-ink disabled:opacity-40"
        >
          {isPlaying ? "playing..." : "play lifecycle"}
        </button>
      </div>
    </div>
  );
}
