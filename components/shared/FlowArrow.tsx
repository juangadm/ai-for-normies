interface FlowArrowProps {
  visible: boolean;
  label?: string;
}

export function FlowArrow({ visible, label }: FlowArrowProps) {
  return (
    <div
      className="flex shrink-0 items-center transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="h-px w-6 bg-border" />
      {label && (
        <span className="mx-1 font-mono text-[9px] text-ink-muted">
          {label}
        </span>
      )}
      <div
        className="h-0 w-0"
        style={{
          borderTop: "4px solid transparent",
          borderBottom: "4px solid transparent",
          borderLeft: "6px solid #e4e4e7",
        }}
      />
    </div>
  );
}
