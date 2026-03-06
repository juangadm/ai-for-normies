"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function ExpandableCard({
  id,
  title,
  children,
  defaultOpen = false,
  className,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      setHeight(contentRef.current.scrollHeight);
      const timeout = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timeout);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  return (
    <div
      id={id}
      className={cn(
        "border-t border-border",
        className
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-mono text-[13px] font-normal text-ink">{title}</span>
        <span className="shrink-0 font-mono text-[16px] text-ink-light">
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
        style={{ height: height !== undefined ? `${height}px` : "auto" }}
      >
        <div ref={contentRef}>
          <div className="pb-5 text-[14px] leading-[1.8] text-ink-light">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
