// Turns our stored values into nice text for display.

// A Date -> e.g. "18:00"
function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// "2026-06-16T18:00:00", 120  ->  "Tue, 16 Jun, 18:00 - 20:00"
export function formatDateRange(startsAt: string, durationMin: number): string {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + durationMin * 60 * 1000); // convert minutes to milliseconds

  // datePart → formats just the date portion e.g. "Tue, 16 Jun".
  const datePart = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(start);

  return `${datePart}, ${formatTime(start)} - ${formatTime(end)}`;
}
