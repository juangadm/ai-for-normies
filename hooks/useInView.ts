"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Observe when an element enters the viewport and fire once.
 *
 * Returns `[ref, visible]` where `visible` flips to `true` the first time
 * the element crosses the given `threshold`.
 *
 * Works for both MCP and A2A diagram components.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.3
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/**
 * Observe when an element enters the viewport, then stagger-reveal items
 * by incrementing a counter on an interval.
 *
 * Returns `[ref, visibleCount]` where `visibleCount` increments from 0
 * to `total` at `intervalMs` spacing after the element becomes visible.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  total: number,
  intervalMs = 300,
  threshold = 0.3
): [React.RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleCount(count);
            if (count >= total) clearInterval(interval);
          }, intervalMs);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [total, intervalMs, threshold]);

  return [ref, visibleCount];
}
