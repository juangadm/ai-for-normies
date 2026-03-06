export interface FlowStep {
  label: string;
  primitive: "tool" | "resource" | "prompt";
  name: string;
  description: string;
}

export const spotifyScenario = {
  userMessage:
    "My Discover Weekly hasn't updated in 3 weeks. I keep hearing the same songs. Can you fix it?",
  steps: [
    {
      label: "Read user profile",
      primitive: "resource" as const,
      name: "spotify://user/profile",
      description:
        "The agent reads the user's Spotify profile — account tier, region, and preferences. This is read-only data: a Resource.",
    },
    {
      label: "Check playlist status",
      primitive: "resource" as const,
      name: "spotify://playlists/discover-weekly",
      description:
        "The agent reads the Discover Weekly playlist metadata — last refresh date, track count, generation status. Another Resource.",
    },
    {
      label: "Diagnose the issue",
      primitive: "prompt" as const,
      name: "spotify-support-diagnosis",
      description:
        'A pre-written Prompt template kicks in: "Given the user\'s profile and playlist data, diagnose why their Discover Weekly is stale and recommend a fix."',
    },
    {
      label: "Refresh the playlist",
      primitive: "tool" as const,
      name: "refresh_discover_weekly",
      description:
        "Based on the diagnosis, the agent calls a Tool to force-refresh the playlist generation pipeline. This is an action — it changes state.",
    },
    {
      label: "Confirm resolution",
      primitive: "resource" as const,
      name: "spotify://playlists/discover-weekly",
      description:
        "The agent re-reads the playlist Resource to confirm it now shows a new generation timestamp and fresh tracks.",
    },
  ] satisfies FlowStep[],
};

export const mcpVsDirectApi: [string, string][] = [
  [
    "You build N integrations for N AI apps",
    "You build 1 MCP server, all AI apps can use it",
  ],
  [
    "AI needs custom code to call each endpoint",
    "AI discovers available tools automatically",
  ],
  [
    "No standard permission model",
    "Built-in approval flow for every tool call",
  ],
  [
    "Schema changes break every integration",
    "Schema is self-describing and versioned",
  ],
  [
    "Read and write look the same to the AI",
    "Clear separation: Resources (read) vs Tools (write)",
  ],
];
