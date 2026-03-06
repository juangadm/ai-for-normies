import { cn } from "@/lib/utils";

interface SectionCardProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export function SectionCard({ id, children, className, divider = true }: SectionCardProps) {
  return (
    <section id={id} className={cn("scroll-mt-16", className)}>
      {children}
      {divider && (
        <div className="section-divider mt-16 md:mt-20">
          {"╌".repeat(24)}
        </div>
      )}
    </section>
  );
}
