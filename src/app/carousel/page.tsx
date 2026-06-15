"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookingWidget } from "@/components/widget/BookingWidget";
import { useWidgetConfig } from "@/lib/useWidgetConfig";
import { joinWorkshopsAndSlots } from "@/lib/schedule";
import type { FetchState } from "@/lib/api";

function CarouselView() {
  const { config } = useWidgetConfig();
  const searchParams = useSearchParams();
  const state = (searchParams.get("state") as FetchState) ?? "normal";
  const workshops = joinWorkshopsAndSlots(config);

  return (
    <BookingWidget
      workshops={workshops}
      theme={config.theme}
      state={state}
      className="min-h-screen rounded-none"
    />
  );
}

export default function CarouselPage() {
  return (
    <main>
      <Suspense>
        <CarouselView />
      </Suspense>
    </main>
  );
}

