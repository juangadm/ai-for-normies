"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

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

const SVG_W = 560;
const SVG_H = 280;
const MONO_FONT = { fontFamily: "Departure Mono, monospace", fontSize: "8px" };

function getNodeColor(state: StateNode, activeIndex: number, stateIndex: number): string {
  if (activeIndex >= stateIndex) return state.color.active;
  return state.color.idle;
}

export function TaskStateMachine() {
  const [ref, visible] = useInView();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveIndex(0);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || activeIndex < 0) return;

    if (activeIndex >= states.length) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
        setActiveIndex(-1);
      }, 1500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setActiveIndex((i) => i + 1);
    }, 1400);
    return () => clearTimeout(timer);
  }, [isPlaying, activeIndex]);

  return (
    <div ref={ref} className="my-8">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="mx-auto w-full max-w-2xl">
          {/* Transition paths */}
          {transitions.map((t, i) => {
            const from = states[t.from];
            const to = states[t.to];
            const isActive = activeIndex > t.from && activeIndex <= t.to + 1;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 - 20;
            const pathD = `M ${from.x} ${from.y} Q ${midX} ${midY - 10} ${to.x} ${to.y}`;

            return (
              <g key={`t-${i}`}>
                <path
                  d={pathD}
                  fill="none"
                  stroke="black"
                  strokeOpacity={visible ? 0.12 : 0}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  className="transition-all duration-500"
                />
                {isActive && (
                  <circle r={4} fill="#e67e22" fillOpacity={0.8}>
                    <animateMotion dur="0.8s" repeatCount="1" fill="freeze" path={pathD} />
                  </circle>
                )}
                <text
                  x={midX} y={midY - 16}
                  textAnchor="middle" fill="black"
                  fillOpacity={visible ? 0.4 : 0}
                  className="transition-opacity duration-500"
                  style={MONO_FONT}
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
            const borderColor = getNodeColor(state, activeIndex, i);
            const textFill = (isActive || isPast) ? state.color.active : "#6b6f76";

            return (
              <g key={state.id}>
                <rect
                  x={state.x - 44} y={state.y - 18}
                  width={88} height={36} rx={18}
                  fill={isActive ? state.color.active : "white"}
                  fillOpacity={isActive ? 0.08 : 1}
                  stroke={borderColor}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-300"
                />
                {isActive && (
                  <rect
                    x={state.x - 48} y={state.y - 22}
                    width={96} height={44} rx={22}
                    fill="none" stroke={state.color.active} strokeWidth={1} opacity={0.3}
                  >
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="stroke-width" values="1;2;1" dur="1.5s" repeatCount="indefinite" />
                  </rect>
                )}
                {state.label.includes("\n") ? (
                  state.label.split("\n").map((line, li) => (
                    <text
                      key={li}
                      x={state.x} y={state.y + (li - 0.5) * 11 + 2}
                      textAnchor="middle" fill={textFill}
                      className="transition-all duration-300"
                      style={{ ...MONO_FONT, fontWeight: isActive ? 600 : 400 }}
                    >
                      {line}
                    </text>
                  ))
                ) : (
                  <text
                    x={state.x} y={state.y + 4}
                    textAnchor="middle" fill={textFill}
                    className="transition-all duration-300"
                    style={{ ...MONO_FONT, fontWeight: isActive ? 600 : 400 }}
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
