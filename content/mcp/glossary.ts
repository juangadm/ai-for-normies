export const mcpGlossary: Record<string, string> = {
  MCP: "Model Context Protocol — an open standard for connecting AI models to external tools and data sources.",
  Host: "The AI application (like Claude Desktop or an IDE) that runs the LLM and manages client connections.",
  Client: "A connector inside the host that maintains a 1:1 session with a specific MCP server.",
  Server: "A lightweight program that exposes tools, resources, or prompts via the MCP protocol.",
  Tool: "A function the AI can call to perform an action — like sending an email or querying a database.",
  Resource: "Read-only data the AI can access — like a file, database record, or API response.",
  Prompt: "A pre-written template that guides the AI's behavior for a specific task.",
  "JSON-RPC": "The message format MCP uses — a standard way to send requests and responses between systems.",
  Transport: "How messages travel between client and server — either stdio (local) or Streamable HTTP (remote).",
  stdio: "Standard input/output — a local transport where the host runs the server as a subprocess.",
  "Streamable HTTP": "A remote transport using HTTP with optional server-sent events for streaming.",
  "Playwright MCP": "An MCP server that exposes browser automation tools — navigate, click, fill forms, take screenshots — letting AI agents interact with web pages.",
};
