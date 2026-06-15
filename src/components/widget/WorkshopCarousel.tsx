"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WorkshopCard } from "@/components/widget/WorkshopCard";
import type { ScheduledWorkshop } from "@/lib/types";

type WorkshopCarouselProps = {
  workshops: ScheduledWorkshop[];
};

// Shows all workshops in a horizontal, swipeable row with arrow buttons.
// One card per screen on phones, more on wider screens.
export function WorkshopCarousel({ workshops }: WorkshopCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      {/* Header: title on the left, arrows on the right */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold lg:text-lg">Workshops</h2>
        <div className="flex gap-2">
          <CarouselPrevious className="static size-12 translate-y-0 border-2 [&_svg]:size-3 [&_svg]:[stroke-width:3] lg:size-8 lg:border lg:[&_svg]:size-4 lg:[&_svg]:[stroke-width:2]" />
          <CarouselNext className="static size-12 translate-y-0 border-2 [&_svg]:size-3 [&_svg]:[stroke-width:3] lg:size-8 lg:border lg:[&_svg]:size-4 lg:[&_svg]:[stroke-width:2]" />
        </div>
      </div>

      <CarouselContent>
        {workshops.map((workshop) => (
          <CarouselItem
            key={workshop.slotId}
            className="basis-full sm:basis-1/2 lg:basis-1/5"
          >
            <div className="h-full p-1">
              <WorkshopCard workshop={workshop} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
