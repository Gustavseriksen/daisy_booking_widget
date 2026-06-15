import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  onRetry: () => void;
};

// Shown when loading failed. The Retry button re-runs the fetch.
export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <p className="font-medium">Something went wrong</p>
      <p className="text-muted-foreground text-sm">
        We couldn&apos;t load the workshops.
      </p>
      <Button variant="outline" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
