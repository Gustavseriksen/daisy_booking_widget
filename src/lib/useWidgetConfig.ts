"use client";

import { useEffect, useState } from "react";
import type { AppConfig } from "@/lib/types";
import { seedConfig } from "@/data/seed";
import { loadConfig, saveConfig, resetConfig } from "@/lib/storage";

// Keeps the widget config in React state and in sync with the browser.
export function useWidgetConfig() {
  // Start with the seed so the server and browser first show the same thing.
  const [config, setConfig] = useState<AppConfig>(seedConfig);

  // Once we're in the browser, load the real saved data.
  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  // Change the data on screen AND save it to the browser.
  function update(next: AppConfig) {
    setConfig(next);
    saveConfig(next);
  }

  // Go back to the original seed data.
  function reset() {
    resetConfig();
    setConfig(seedConfig);
  }

  return { config, update, reset };
}
