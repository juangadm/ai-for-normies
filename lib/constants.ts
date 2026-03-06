export const ACCENT = "#e67e22";

export const MODULE_COLORS = {
  mcp: { accent: ACCENT },
  rag: { accent: ACCENT },
  evals: { accent: ACCENT },
  agents: { accent: ACCENT },
} as const;

export type ModuleSlug = keyof typeof MODULE_COLORS;

export const PRIMITIVE_COLORS = {
  tools: { accent: ACCENT },
  resources: { accent: ACCENT },
  prompts: { accent: ACCENT },
} as const;
