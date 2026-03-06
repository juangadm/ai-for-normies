"use client";

import { useEffect, useState } from "react";

export function ScrollProgress({ color }: { color: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-[56px] left-0 z-50 h-[2px] w-full">
      <div
        className="h-full transition-[width] duration-100"
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
  );
}
