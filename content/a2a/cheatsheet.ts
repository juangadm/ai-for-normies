export interface CheatSheetQA {
  question: string;
  answer: string;
}

export const a2aCheatSheet: CheatSheetQA[] = [
  {
    question: "What is A2A in one sentence?",
    answer:
      "A2A is an open protocol that lets AI agents discover each other and collaborate on tasks — like a conference room where agents can meet and coordinate.",
  },
  {
    question: "Why does A2A matter for product teams?",
    answer:
      "Without A2A, every agent-to-agent integration is custom-built. With A2A, agents from different teams and vendors can collaborate through one shared protocol — dramatically reducing integration cost as your agent ecosystem grows.",
  },
  {
    question: "What are the core primitives?",
    answer:
      "Agent Cards (discovery — who can do what), Tasks (units of work with lifecycle states), Messages (back-and-forth communication within tasks), and Artifacts (immutable outputs delivered on completion).",
  },
  {
    question: "How is A2A different from MCP?",
    answer:
      "MCP connects agents to tools and data (vertical access — like plugging in a USB drive). A2A connects agents to other agents (horizontal collaboration — like joining a conference call). They're complementary: an agent might use MCP to access a database and A2A to delegate work to a specialist agent.",
  },
  {
    question: "What is an Agent Card?",
    answer:
      "A JSON document published at /.well-known/agent.json that acts as a LinkedIn profile for an AI agent — name, description, skills, supported input/output types, authentication requirements, and endpoint URL. Other agents read this to decide whether to collaborate.",
  },
  {
    question: "What are Task states?",
    answer:
      "Tasks move through a state machine: submitted (created), working (agent is processing), input-required (agent needs more information), completed (done, with artifacts), failed (something went wrong), or canceled (aborted). The input-required state enables multi-turn collaboration.",
  },
  {
    question: "When should a PM choose A2A over direct integration?",
    answer:
      "When agents are owned by different teams or organizations, when you need multi-turn negotiation between agents, or when your agent ecosystem is growing and you want to avoid N×M custom integrations. If all agents are owned by one team, direct function calls are simpler.",
  },
  {
    question: "How does A2A handle security?",
    answer:
      "Agent Cards declare their authentication requirements (OAuth 2.0, API keys, mTLS). Every task has an owner. Agents authenticate before delegating work, and each agent can enforce its own authorization policies — like a Compensation Agent requiring elevated permissions to approve credits.",
  },
];
