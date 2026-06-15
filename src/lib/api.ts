import type { ScheduledWorkshop } from "@/lib/types";

// Lets the demo force a state, so we can show loading/error/empty on purpose.
export type FetchState = "normal" | "error" | "empty";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Pretends to fetch from a server: waits a bit, then returns the data
// (or fails / returns nothing, when forced).
export async function fetchScheduledWorkshops(
  workshops: ScheduledWorkshop[],
  state: FetchState = "normal"
): Promise<ScheduledWorkshop[]> {
  await delay(600);
  if (state === "error") throw new Error("Could not load workshops.");
  if (state === "empty") return [];
  return workshops;
}
