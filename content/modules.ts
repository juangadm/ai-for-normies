import type { ModuleSlug } from "@/lib/constants";

export type ModuleStatus = "live" | "coming";

export interface ModuleSection {
  title: string;
}

export interface ModuleMeta {
  slug: ModuleSlug;
  title: string;
  subtitle: string;
  description: string;
  status: ModuleStatus;
  sectionCount?: number;
  readMinutes?: number;
  sections?: ModuleSection[];
}

export const modules: ModuleMeta[] = [
  {
    slug: "mcp",
    title: "MCP",
    subtitle: "The Model Context Protocol",
    description: "How AI connects to tools and data",
    status: "live",
    sectionCount: 5,
    readMinutes: 12,
    sections: [
      { title: "What is MCP & Why It Exists" },
      { title: "How It Works" },
      { title: "Tools, Resources & Prompts" },
      { title: "Decisions & Trade-offs" },
      { title: "Quick Reference" },
    ],
  },
  {
    slug: "a2a",
    title: "A2A",
    subtitle: "The Agent-to-Agent Protocol",
    description: "How AI agents discover and collaborate with each other",
    status: "live",
    sectionCount: 5,
    readMinutes: 14,
    sections: [
      { title: "What is A2A & Why It Exists" },
      { title: "How It Works" },
      { title: "The Protocol in Action" },
      { title: "Decisions & Trade-offs" },
      { title: "Quick Reference" },
    ],
  },
  {
    slug: "rag",
    title: "RAG",
    subtitle: "Retrieval-Augmented Generation",
    description: "When and how to give AI access to your knowledge",
    status: "coming",
  },
  {
    slug: "evals",
    title: "LLM Evals",
    subtitle: "Evaluation & Measurement",
    description: "How to measure if your AI actually works",
    status: "coming",
  },
  {
    slug: "agents",
    title: "Agents",
    subtitle: "Orchestration & Multi-Step Systems",
    description: "Multi-step AI systems, harnesses, and loops",
    status: "coming",
  },
];
