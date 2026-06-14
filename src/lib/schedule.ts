import type { AppConfig, ScheduledWorkshop } from "@/lib/types";

// Joins each slot with its workshop to build the cards the widget shows,
// sorted by date (soonest first).
export function joinWorkshopsAndSlots(config: AppConfig): ScheduledWorkshop[] {
  const result: ScheduledWorkshop[] = [];

  for (const slot of config.slots) {
    const workshop = config.workshops.find((w) => w.id === slot.workshopId);
    if (!workshop) continue; // skip slots whose workshop was deleted

    // Copy all the workshop info, then add this slot's date and spots.
    result.push({
      ...workshop,
      slotId: slot.id,
      startsAt: slot.startsAt,
      remainingSpots: slot.capacity - slot.booked,
    });
  }

  // Our dates start with the year (like "2026-06-16T18:00"), so sorting them
  // as plain text also puts them in the correct time order.
  result.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  return result;
}
