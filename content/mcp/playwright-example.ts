export interface PlaywrightStep {
  label: string;
  code: string;
  tag: "TOOL" | "RESOURCE";
}

export const playwrightPrompt =
  "Test the login flow on staging";

export const playwrightResult =
  "Login flow passes — redirect to /dashboard confirmed";

export const playwrightSteps: PlaywrightStep[] = [
  {
    label: "Navigate to login page",
    code: 'browser_navigate("https://staging.app/login")',
    tag: "TOOL",
  },
  {
    label: "Fill credentials",
    code: 'browser_fill_form({ email: "test@co.com", password: "••••" })',
    tag: "TOOL",
  },
  {
    label: "Submit the form",
    code: 'browser_click("Submit")',
    tag: "TOOL",
  },
  {
    label: "Read page state",
    code: "browser_snapshot()",
    tag: "RESOURCE",
  },
  {
    label: "Capture evidence",
    code: "browser_take_screenshot()",
    tag: "TOOL",
  },
];
