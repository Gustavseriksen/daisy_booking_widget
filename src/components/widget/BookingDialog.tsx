"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";
import { formatDateRange } from "@/lib/format";
import type { ScheduledWorkshop } from "@/lib/types";

type BookingDialogProps = {
  workshop: ScheduledWorkshop;
  trigger: React.ReactNode;
};

// The booking pop-up. Shows a summary, then a short "booking..." step, then a
// success message. The booking is simulated — there is no real payment.
export function BookingDialog({ workshop, trigger }: BookingDialogProps) {
  // ready = showing the summary, booking = in progress, success = confirmed.
  const [status, setStatus] = useState<"ready" | "booking" | "success">("ready");

  async function handleConfirm() {
    setStatus("booking");
    await new Promise((resolve) => setTimeout(resolve, 800)); // pretend we're booking
    setStatus("success");
  }

  // Reset back to the start whenever the dialog closes.
  function handleOpenChange(open: boolean) {
    if (!open) setStatus("ready");
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        {/* Show the success screen, otherwise the confirm screen. */}
        {status === "success" ? (
          <>
            <DialogHeader>
              <CheckCircle2 className="mx-auto size-12 text-green-600" />
              <DialogTitle className="text-center">Booking confirmed!</DialogTitle>
              <DialogDescription className="text-center">
                You&apos;re booked for {workshop.title}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{workshop.title}</DialogTitle>
              <DialogDescription>
                {formatDateRange(workshop.startsAt, workshop.durationMin)} ·{" "}
                {workshop.location}
              </DialogDescription>
            </DialogHeader>

            <p className="text-sm">
              Total: <span className="font-semibold">{workshop.price} €</span>
            </p>

            <DialogFooter>
              <Button
                onClick={handleConfirm}
                disabled={status === "booking"}
                className="w-full"
              >
                {status === "booking" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm booking"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
