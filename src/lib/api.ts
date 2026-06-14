import type { AppConfig, ScheduledWorkshop } from "@/lib/types";
import { joinWorkshopsAndSlots } from "@/lib/schedule";

// Lets the demo force a state, so we can show loading/error/empty on purpose.
export type FetchState = "normal" | "error" | "empty";

// Waits for the given number of milliseconds.
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Pretends to fetch workshops from a server: waits a bit, then returns the data.
// Can be forced to fail or return nothing, so we can show every state.
export async function fetchScheduledWorkshops(
  config: AppConfig,
  state: FetchState = "normal"
): Promise<ScheduledWorkshop[]> {
  await delay(600); // fake network delay, so a loading state is visible

  if (state === "error") {
    throw new Error("Could not load workshops.");
  }

  if (state === "empty") {
    return [];
  }

  return joinWorkshopsAndSlots(config);
}
