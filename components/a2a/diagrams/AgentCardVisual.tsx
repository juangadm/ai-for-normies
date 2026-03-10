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
        className="mx-auto max-w-xs cursor-pointer"
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
        <div
          className="relative h-[220px] w-full"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 600ms ease-in-out",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 border border-border bg-white px-6 py-5"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-border font-mono text-[14px] text-ink-light">
                RA
              </div>
              <div>
                <div className="font-mono text-[13px] font-semibold text-ink">
                  Rebooking Agent
                </div>
                <div className="font-mono text-[10px] text-ink-muted">
                  United Airlines
                </div>
              </div>
            </div>
            <p className="mb-4 text-[13px] leading-[1.7] text-ink-light">
              Finds alternative flights and rebooks passengers on canceled or
              delayed routes.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["search-flights", "rebook-passenger", "check-availability"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="border border-border px-2 py-0.5 font-mono text-[10px] text-ink-muted"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
            <div className="mt-4 font-mono text-[10px] text-ink-muted">
              hover to flip
            </div>
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 border border-border bg-white px-6 py-5"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
              Agent Card Details
            </div>
            <div className="space-y-3">
              <Field label="Endpoint" value="https://agents.united.com/rebooking" />
              <Field label="Auth" value="OAuth 2.0 (scope: flights.rebook)" />
              <Field
                label="Skills"
                value="search-flights, rebook-passenger, check-availability"
              />
              <Field label="Input" value="text/plain, application/json" />
              <Field label="Output" value="application/json, application/pdf" />
              <Field label="Version" value="1.2.0" />
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
      <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
        {label}
      </div>
      <div className="font-mono text-[11px] text-ink-light">{value}</div>
    </div>
  );
}
