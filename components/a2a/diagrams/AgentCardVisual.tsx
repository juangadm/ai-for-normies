"use client";

import { useState, useEffect, useRef } from "react";

export function AgentCardVisual() {
  const [flipped, setFlipped] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="my-8">
      <div
        className="mx-auto w-full max-w-sm cursor-pointer"
        style={{
          perspective: "800px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 500ms ease, transform 500ms ease",
        }}
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
        aria-label="Agent Card — hover or click to flip"
      >
        {/* A4 aspect ratio: 1 : 1.414 */}
        <div
          className="relative w-full"
          style={{
            aspectRatio: "1 / 1.414",
            transformStyle: "preserve-3d",
            transition: "transform 600ms ease-in-out",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 flex flex-col border border-border bg-white px-7 py-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Header */}
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border font-mono text-[16px] text-ink-light">
                RA
              </div>
              <div>
                <div className="font-mono text-[15px] font-semibold text-ink">
                  Rebooking Agent
                </div>
                <div className="font-mono text-[11px] text-ink-muted">
                  United Airlines
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="mb-6 text-[14px] leading-[1.8] text-ink-light">
              Finds alternative flights and rebooks passengers on canceled or
              delayed routes. Supports multi-turn negotiation for seat
              preferences and connection constraints.
            </p>

            {/* Skills */}
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
              Skills
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              {["search-flights", "rebook-passenger", "check-availability"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="border border-border px-2.5 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            {/* Endpoint preview */}
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
              Endpoint
            </div>
            <div className="mb-auto font-mono text-[11px] text-ink-light">
              agents.united.com/rebooking
            </div>

            <div className="mt-4 font-mono text-[10px] text-ink-muted">
              hover to flip
            </div>
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 flex flex-col border border-border bg-white px-7 py-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="mb-5 font-mono text-[12px] uppercase tracking-[0.15em] text-ink-light">
              Agent Card Details
            </div>
            <div className="space-y-4">
              <Field
                label="Endpoint"
                value="https://agents.united.com/rebooking"
              />
              <Field
                label="Authentication"
                value="OAuth 2.0 (scope: flights.rebook)"
              />
              <Field
                label="Skills"
                value="search-flights, rebook-passenger, check-availability"
              />
              <Field
                label="Supported Input"
                value="text/plain, application/json"
              />
              <Field
                label="Supported Output"
                value="application/json, application/pdf"
              />
              <Field label="Protocol Version" value="1.2.0" />
              <Field
                label="Published At"
                value="/.well-known/agent.json"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p
        className="mt-4 text-center text-[13px] leading-[1.7] text-ink-light transition-opacity duration-500"
        style={{ opacity: visible ? 1 : 0, transitionDelay: "300ms" }}
      >
        Every A2A agent publishes one of these. The support agent reads it to
        decide who to call.
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
        {label}
      </div>
      <div className="font-mono text-[12px] leading-[1.6] text-ink-light">
        {value}
      </div>
    </div>
  );
}
