export interface CheatSheetQA {
  question: string;
  answer: string;
}

export const mcpCheatSheet: CheatSheetQA[] = [
  {
    question: "What is MCP in one sentence?",
    answer:
      "MCP is an open protocol that standardizes how AI applications connect to external tools and data — like USB-C for AI integrations.",
  },
  {
    question: "Why does MCP matter for product teams?",
    answer:
      "Without MCP, every AI-tool integration is a custom build. With MCP, you build one server and any AI host can use it. This cuts integration cost and unlocks an ecosystem of pre-built connectors.",
  },
  {
    question: "What are the three core primitives?",
    answer:
      "Tools (actions the AI can take), Resources (read-only data the AI can access), and Prompts (pre-written templates that guide behavior). Think: hands, eyes, and scripts.",
  },
  {
    question: "What's the difference between a Host, Client, and Server?",
    answer:
      "The Host is the AI app (Claude Desktop, Cursor). The Client is a connector inside the host that talks to one Server. The Server is what you build — it exposes your product's capabilities via MCP.",
  },
  {
    question: "When should a PM choose MCP over a direct API integration?",
    answer:
      "When you want your product to work with multiple AI apps (not just one), when you want the AI to dynamically discover capabilities, or when you want to leverage the growing MCP ecosystem of pre-built servers.",
  },
  {
    question: "What's the security model?",
    answer:
      "Every tool call requires explicit approval — either per-call or via allowlists. Servers should implement authentication, and hosts should show users exactly what tools are being called. Think of each tool as a permission grant.",
  },
  {
    question:
      "How is MCP different from just giving the AI an API key?",
    answer:
      "An API key gives raw access. MCP provides structured, discoverable capabilities with built-in descriptions, type safety, and approval flows. The AI understands what each tool does and can choose the right one contextually.",
  },
  {
    question: "What transport protocols does MCP use?",
    answer:
      "Two main options: stdio (standard input/output) for local servers running as subprocesses, and Streamable HTTP for remote servers. Stdio is simpler; HTTP supports remote deployment and streaming.",
  },
];
