export const a2aGlossary: Record<string, string> = {
  A2A: "Agent-to-Agent Protocol — an open standard for AI agents to discover and collaborate with each other across organizational boundaries.",
  "Agent Card":
    "A JSON document published at /.well-known/agent.json that describes an agent's capabilities, skills, auth requirements, and endpoint.",
  Task: "The unit of work in A2A. A client agent creates a task for a remote agent to complete. Tasks move through states: submitted, working, input-required, completed, failed, canceled.",
  Message:
    "A communication unit within a task — the back-and-forth between client and remote agents. Each message contains one or more Parts.",
  Part: "A content block within a message — can be text, a file, structured data, or a reference to another agent's response.",
  Artifact:
    "An immutable output produced by the remote agent — a generated file, report, or structured result delivered when the task completes.",
  Skill:
    "A capability declared in an Agent Card — describes what the agent can do, with input/output schemas.",
  "Push Notification":
    "A mechanism for the remote agent to proactively notify the client about task updates, instead of the client polling.",
};
