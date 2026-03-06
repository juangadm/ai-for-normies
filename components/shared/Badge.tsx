import { cn } from "@/lib/utils";

export function Badge({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.1em]",
        className
      )}
      style={color ? { color } : { color: "#9b9fa7" }}
    >
      [{children}]
    </span>
  );
}
