export interface MCPSubsection {
  id: string;
  title: string;
}

export interface MCPSection {
  id: string;
  number: number;
  title: string;
  subsections?: MCPSubsection[];
}

export const mcpSections: MCPSection[] = [
  {
    id: "what-is-mcp",
    number: 1,
    title: "What is MCP & Why It Exists",
    subsections: [
      { id: "the-problem", title: "The Problem" },
      { id: "the-solution", title: "The Solution" },
      { id: "who-adopted", title: "Who Adopted It" },
    ],
  },
  {
    id: "architecture",
    number: 2,
    title: "How It Works",
    subsections: [
      { id: "host-client-server", title: "Host / Client / Server" },
      { id: "transport-layer", title: "Transport Layer" },
    ],
  },
  {
    id: "primitives",
    number: 3,
    title: "Tools, Resources & Prompts",
    subsections: [
      { id: "primitive-resources", title: "Resources" },
      { id: "primitive-prompts", title: "Prompts" },
      { id: "primitive-tools", title: "Tools" },
      { id: "full-flow", title: "The Complete Picture" },
      { id: "mcp-vs-direct-api", title: "MCP vs Direct API" },
    ],
  },
  {
    id: "decisions",
    number: 4,
    title: "Decisions & Trade-offs",
    subsections: [
      { id: "when-to-use", title: "When to Use MCP" },
      { id: "when-not-to-use", title: "When Not to Use" },
      { id: "security-model", title: "Security Model" },
      { id: "cost-model", title: "Cost Model" },
    ],
  },
  {
    id: "quick-reference",
    number: 5,
    title: "Quick Reference",
  },
];
