"use client";

import { useState, useRef } from "react";

export function TermDefinition({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span className="relative inline-block">
      <span
        ref={ref}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="cursor-help border-b border-dotted border-ink-light/40 font-medium text-ink"
      >
        {term}
      </span>
      {show && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 border border-border bg-cream p-3 text-[13px] leading-[1.8] text-ink-light">
          {definition}
        </span>
      )}
    </span>
  );
}
