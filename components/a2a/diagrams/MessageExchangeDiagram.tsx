"use client";

import { useStaggerReveal } from "@/hooks/useInView";

interface ChatMessage {
  sender: "CLIENT" | "AGENT";
  text: string;
  context?: string;
}

const messages: ChatMessage[] = [
  {
    sender: "CLIENT",
    text: "Rebook passenger JG-4821 on next available SFO\u2192NRT. Canceled flight: UA 837.",
    context: "Initial task request",
  },
  {
    sender: "AGENT",
    text: "I found 3 options. Seat preference \u2014 window or aisle? Direct flights only, or connections under 3 hours OK?",
    context: "INPUT_REQUIRED \u2014 agent needs more info",
  },
  {
    sender: "CLIENT",
    text: "Window seat. Connections OK if layover is under 3 hours.",
    context: "User responds with preferences",
  },
  {
    sender: "AGENT",
    text: "Rebooked on UA 892, departing 6:15 PM, arriving NRT 9:40 PM +1. Seat 14A (window). Boarding pass attached.",
    context: "COMPLETED \u2014 artifact delivered",
  },
];

export function MessageExchangeDiagram() {
  const [ref, visibleCount] = useStaggerReveal(messages.length, 700);

  return (
    <div ref={ref} className="my-8">
      <div className="mx-auto max-w-lg space-y-3">
        {/* Header labels */}
        <div className="flex items-center justify-between px-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
            Support Agent [CLIENT]
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
            Rebooking Agent [AGENT]
          </span>
        </div>

        {/* Messages */}
        {messages.map((msg, i) => {
          const isVisible = visibleCount > i;
          const isClient = msg.sender === "CLIENT";

          return (
            <div
              key={i}
              className={`flex ${isClient ? "justify-start" : "justify-end"}`}
            >
              <div
                className="max-w-[80%] transition-all duration-400"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateX(0)"
                    : isClient
                      ? "translateX(-16px)"
                      : "translateX(16px)",
                }}
              >
                <div
                  className={`mb-1 font-mono text-[9px] uppercase tracking-[0.1em] ${isClient ? "text-left" : "text-right"}`}
                  style={{ color: isClient ? "#6b6f76" : "#e67e22" }}
                >
                  [{msg.sender}]
                </div>

                <div
                  className={`border px-4 py-3 text-[13px] leading-[1.7] ${
                    isClient
                      ? "border-border bg-white text-ink-light"
                      : "border-border bg-cream text-ink-light"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.context && (
                  <div
                    className={`mt-1 font-mono text-[10px] text-ink-muted ${isClient ? "text-left" : "text-right"}`}
                  >
                    {msg.context}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
