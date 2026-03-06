"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalNotes(key: string) {
  const storageKey = `ai-fluency:${key}`;
  const [value, setValue] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setValue(saved);
  }, [storageKey]);

  const update = useCallback(
    (next: string) => {
      setValue(next);
      localStorage.setItem(storageKey, next);
    },
    [storageKey]
  );

  return [value, update] as const;
}
