import { LoaderIcon } from "lucide-react";

// A spinner centered over the whole screen while the widget loads.
export function LoadingState() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className="text-muted-foreground size-8 animate-spin"
      />
    </div>
  );
}
