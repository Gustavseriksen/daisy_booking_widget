"use client";

import { useEffect, useState } from "react";
import { fetchScheduledWorkshops, type FetchState } from "@/lib/api";
import { WorkshopCarousel } from "@/components/widget/WorkshopCarousel";
import { LoadingState } from "@/components/widget/states/LoadingState";
import { EmptyState } from "@/components/widget/states/EmptyState";
import { ErrorState } from "@/components/widget/states/ErrorState";
import { readableTextColor } from "@/lib/color";
import { cn } from "@/lib/utils";
import type { ScheduledWorkshop, WidgetTheme } from "@/lib/types";

const DEFAULT_THEME: WidgetTheme = {
  background: "#FCF8E8",
  cardBackground: "#FFFFFF",
  text: "#1A1A1A",
  primary: "#800080",
};

type BookingWidgetProps = {
  workshops: ScheduledWorkshop[];
  state?: FetchState;
  theme?: WidgetTheme;
  className?: string;
};

export function BookingWidget({
  workshops,
  state = "normal",
  theme = DEFAULT_THEME,
  className,
}: BookingWidgetProps) {
  const [status, setStatus] = useState<"loading" | "error" | "empty" | "ready">(
    "loading",
  );

  async function load() {
    setStatus("loading");
    try {
      const result = await fetchScheduledWorkshops(workshops, state);
      setStatus(result.length === 0 ? "empty" : "ready");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const themeStyle = {
    "--widget-bg": theme.background,
    "--widget-card": theme.cardBackground,
    "--widget-text": theme.text,
    "--widget-primary": theme.primary,
    "--widget-primary-foreground": readableTextColor(theme.primary),
  } as React.CSSProperties;

  function renderContent() {
    if (status === "error") return <ErrorState onRetry={load} />;
    if (status === "empty") return <EmptyState />;
    return <WorkshopCarousel workshops={workshops} />;
  }

  // Loading is a full white screen, outside the themed container.
  if (status === "loading") return <LoadingState />;

  return (
    <div
      style={themeStyle}
      className={cn("rounded-xl bg-[var(--widget-bg)] p-4", className)}
    >
      {renderContent()}
    </div>
  );
}
