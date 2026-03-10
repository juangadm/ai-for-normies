export interface A2ASubsection {
  id: string;
  title: string;
}

export interface A2ASection {
  id: string;
  number: number;
  title: string;
  subsections?: A2ASubsection[];
}

export const a2aSections: A2ASection[] = [
  {
    id: "what-is-a2a",
    number: 1,
    title: "What is A2A & Why It Exists",
    subsections: [
      { id: "a2a-the-problem", title: "The Problem" },
      { id: "a2a-the-solution", title: "The Solution" },
      { id: "a2a-who-adopted", title: "Who's Building With It" },
    ],
  },
  {
    id: "how-it-works",
    number: 2,
    title: "How It Works",
    subsections: [
      { id: "agent-cards", title: "Agent Cards" },
      { id: "tasks", title: "Tasks" },
      { id: "messages-and-parts", title: "Messages & Parts" },
      { id: "artifacts", title: "Artifacts" },
    ],
  },
  {
    id: "protocol-in-action",
    number: 3,
    title: "The Protocol in Action",
    subsections: [
      { id: "united-scenario", title: "The United Scenario" },
      { id: "full-orchestration", title: "The Complete Picture" },
      { id: "a2a-vs-custom", title: "A2A vs Custom Integration" },
    ],
  },
  {
    id: "a2a-decisions",
    number: 4,
    title: "Decisions & Trade-offs",
    subsections: [
      { id: "a2a-when-to-use", title: "When A2A Makes Sense" },
      { id: "a2a-when-not-to-use", title: "When It Doesn't" },
      { id: "a2a-trust-security", title: "Trust & Security" },
      { id: "a2a-complexity-budget", title: "Complexity Budget" },
    ],
  },
  {
    id: "a2a-quick-reference",
    number: 5,
    title: "Quick Reference",
  },
];
