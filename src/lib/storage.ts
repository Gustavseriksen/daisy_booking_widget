import type { AppConfig } from "@/lib/types";
import { seedConfig } from "@/data/seed";

// The name we save our data under, like a key in a map.
const STORAGE_KEY = "daisy-widget-config";

// Load the saved config from the browser.
// If nothing is saved yet, fall back to the seed data.
export function loadConfig(): AppConfig {
  // localStorage only exists in the browser, not on the server.
  if (typeof window === "undefined") return seedConfig;

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return seedConfig;

  try {
    return JSON.parse(saved) as AppConfig;
  } catch {
    return seedConfig; // saved text was broken — use the seed instead
  }
}

// Save the config to the browser.
export function saveConfig(config: AppConfig): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

// Delete the saved data, so the next load returns the seed again.
export function resetConfig(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}
