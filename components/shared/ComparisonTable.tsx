interface ComparisonTableProps {
  headers: [string, string];
  rows: [string, string][];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-hidden border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink md:border-r">
          {headers[0]}
        </div>
        <div className="border-b border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink">
          {headers[1]}
        </div>
        {rows.map(([left, right], i) => (
          <div key={i} className="contents">
            <div className="border-b border-border px-5 py-3 text-[14px] leading-[1.8] text-ink-light md:border-r last:[&]:border-b-0">
              {left}
            </div>
            <div className="border-b border-border px-5 py-3 text-[14px] leading-[1.8] text-ink-light last:[&]:border-b-0">
              {right}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
