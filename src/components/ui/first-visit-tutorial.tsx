"use client";

import { WelcomeTutorial } from "./welcome-tutorial";

/**
 * Thin client wrapper that mounts WelcomeTutorial in auto mode.
 * Shows the tutorial once for first-time visitors, then never again.
 * Drop this into any server component page.
 */
export function FirstVisitTutorial() {
  return <WelcomeTutorial mode="auto" />;
}
