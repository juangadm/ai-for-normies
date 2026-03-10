export const passengerMessage =
  "My flight UA 837 to Tokyo just got canceled — what are my options?";

export interface UnitedStep {
  label: string;
  code: string;
  tag: "DISCOVERY" | "TASK" | "INPUT_REQUIRED" | "MESSAGE" | "ARTIFACT";
}

export const unitedSteps: UnitedStep[] = [
  {
    label: "Read agent cards for rebooking, compensation, hotel",
    code: "read_agent_cards([rebooking, compensation, hotel])",
    tag: "DISCOVERY",
  },
  {
    label: 'Create task: "Rebook passenger on next SFO\u2192NRT"',
    code: 'create_task(rebooking, "rebook SFO\u2192NRT")',
    tag: "TASK",
  },
  {
    label: 'Create task: "Check compensation eligibility"',
    code: 'create_task(compensation, "check eligibility")',
    tag: "TASK",
  },
  {
    label: 'Create task: "Find hotel voucher near SFO"',
    code: 'create_task(hotel, "find hotel near SFO")',
    tag: "TASK",
  },
  {
    label: 'Rebooking agent asks: "Window or aisle?"',
    code: "rebooking \u2192 INPUT_REQUIRED",
    tag: "INPUT_REQUIRED",
  },
  {
    label: '"Window, connections OK if under 3 hours"',
    code: 'send_message(rebooking, "window, connections OK")',
    tag: "MESSAGE",
  },
  {
    label: "Receive: New boarding pass, UA 892, seat 14A",
    code: "artifact: boarding_pass.pdf",
    tag: "ARTIFACT",
  },
  {
    label: "Receive: $200 travel credit applied",
    code: "artifact: compensation_credit",
    tag: "ARTIFACT",
  },
  {
    label: "Receive: Hyatt SFO voucher, 1 night",
    code: "artifact: hotel_voucher.pdf",
    tag: "ARTIFACT",
  },
];

export const unitedResult =
  "All three specialist agents completed their tasks. Passenger rebooked on UA 892 (seat 14A, window), $200 credit applied, Hyatt SFO voucher issued.";

export const a2aVsCustom: [string, string][] = [
  [
    "Build custom integration for each agent pair",
    "One protocol for discovery, delegation, and delivery",
  ],
  [
    "Each agent pair has its own message format",
    "Standard message format with typed Parts",
  ],
  [
    "No standard way to discover agent capabilities",
    "Agent Cards at /.well-known/agent.json",
  ],
  [
    "No built-in multi-turn negotiation",
    "INPUT_REQUIRED state enables natural back-and-forth",
  ],
  [
    "Custom auth for every agent connection",
    "Auth requirements declared in Agent Cards",
  ],
];
