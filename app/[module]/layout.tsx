import { notFound } from "next/navigation";
import { modules } from "@/content/modules";

export function generateStaticParams() {
  return modules
    .filter((m) => m.status === "live")
    .map((m) => ({ module: m.slug }));
}

export default async function ModuleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const moduleMeta = modules.find(
    (m) => m.slug === module && m.status === "live"
  );

  if (!moduleMeta) notFound();

  return <>{children}</>;
}
