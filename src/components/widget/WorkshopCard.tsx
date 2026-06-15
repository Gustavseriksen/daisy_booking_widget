import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Ticket, Users, Calendar } from "lucide-react";
import type { ScheduledWorkshop } from "@/lib/types";
import { formatDateRange } from "@/lib/format";
import { BookingDialog } from "@/components/widget/BookingDialog";

type WorkshopCardProps = {
  workshop: ScheduledWorkshop;
};

// A single workshop card: image, price, title, details and a "Book" button.
// Colors come from the --widget-* CSS variables set by BookingWidget.
export function WorkshopCard({ workshop }: WorkshopCardProps) {
  // No seats left: fade the image and disable the button.
  const isFull = workshop.remainingSpots <= 0;

  return (
    <Card className="flex h-full w-full flex-col bg-[var(--widget-card)] text-[var(--widget-text)]">
      <img
        src={workshop.imageUrl}
        alt={workshop.title}
        className={`aspect-video w-full object-cover ${isFull ? "opacity-60" : ""}`}
      />

      <CardHeader>
        <CardAction>
          <Badge
            variant="secondary"
            className="bg-[var(--widget-primary)] px-3 py-1 text-base text-[var(--widget-primary-foreground)] lg:px-2 lg:py-0.5 lg:text-xs"
          >
            {workshop.price} €
          </Badge>
        </CardAction>
        <CardTitle className="text-xl lg:text-base">
          {workshop.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="-mt-4">
        <ScrollArea className="h-70">
          <CardDescription className="space-y-1.5 text-lg lg:text-sm">
            {/* The date always shows. The rows below can be hidden per workshop. */}
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              {formatDateRange(workshop.startsAt, workshop.durationMin)}
            </div>
            {workshop.visibleFields.spots && (
              <div className="flex items-center gap-2">
                <Ticket className="size-4" />
                {isFull ? "Full" : `${workshop.remainingSpots} spots left`}
              </div>
            )}
            {workshop.visibleFields.audience && (
              <div className="flex items-center gap-2">
                <Users className="size-4" />
                {workshop.audience}
              </div>
            )}
            {workshop.visibleFields.location && (
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                {workshop.location}
              </div>
            )}
          </CardDescription>
          {workshop.visibleFields.description && (
            <p className="text-muted-foreground mt-1 text-lg lg:text-sm">
              {workshop.description}
            </p>
          )}
        </ScrollArea>
      </CardContent>

      <div className="mt-auto flex justify-center px-4">
        <BookingDialog
          workshop={workshop}
          trigger={
            <Button
              className="h-12 w-full bg-[var(--widget-primary)] text-xl text-[var(--widget-primary-foreground)] hover:opacity-90 lg:h-9 lg:text-sm"
              disabled={isFull}
            >
              {isFull ? "Sold out" : "Book"}
            </Button>
          }
        />
      </div>
    </Card>
  );
}
