"use client";

import { useLocalNotes } from "@/hooks/useLocalNotes";

interface WorkbookEntryProps {
  storageKey: string;
  prompt: string;
  placeholder?: string;
}

export function WorkbookEntry({
  storageKey,
  prompt,
  placeholder,
}: WorkbookEntryProps) {
  const [value, setValue] = useLocalNotes(storageKey);

  return (
    <div className="pt-6">
      <div className="section-divider mb-6 text-left">
        {"╌".repeat(16)}
      </div>
      <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-light">
        Your Notes
      </div>
      <p className="mb-4 text-[14px] leading-[1.8] text-ink-light">
        {prompt}
      </p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? "Type your answer here..."}
        className="w-full resize-y border border-border bg-transparent px-4 py-3 font-sans text-[14px] leading-[1.8] text-ink placeholder:text-ink-light/40 focus:border-ink-light focus:outline-none"
        rows={3}
      />
    </div>
  );
}
