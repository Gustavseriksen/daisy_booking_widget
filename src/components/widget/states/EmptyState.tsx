// Shown when there are no workshops to display.
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <p className="font-medium">No upcoming workshops</p>
      <p className="text-muted-foreground text-sm">Please check back soon.</p>
    </div>
  );
}