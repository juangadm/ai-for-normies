export interface DecisionNode {
  id: string;
  question: string;
  yes: string; // node id or "USE_A2A" or "DIRECT_CALLS"
  no: string;
}

export const decisionNodes: DecisionNode[] = [
  {
    id: "q1",
    question: "Multiple robust, standalone agents?",
    yes: "USE_A2A",
    no: "q2",
  },
  {
    id: "q2",
    question: "Need multi-turn dialogue between agents?",
    yes: "USE_A2A",
    no: "DIRECT_CALLS",
  },
];
