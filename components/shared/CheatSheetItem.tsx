"use client";

import { useState } from "react";

export function CheatSheetItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="pr-4 font-mono text-[13px] text-ink">
          {question}
        </span>
        <span className="shrink-0 font-mono text-[16px] text-ink-light">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="pb-4 text-[14px] leading-[1.8] text-ink-light">
          {answer}
        </div>
      )}
    </div>
  );
}
