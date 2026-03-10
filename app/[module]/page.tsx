import { notFound } from "next/navigation";
import { modules } from "@/content/modules";
import { MCPModule } from "./MCPModule";
import { A2AModule } from "./A2AModule";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const moduleMeta = modules.find(
    (m) => m.slug === module && m.status === "live"
  );

  if (!moduleMeta) notFound();

  if (module === "mcp") return <MCPModule />;
  if (module === "a2a") return <A2AModule />;

  // Future modules will be added here
  notFound();
}
