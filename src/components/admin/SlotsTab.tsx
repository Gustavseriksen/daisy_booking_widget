"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateRange } from "@/lib/format";
import type { AppConfig, Slot } from "@/lib/types";

type SlotsTabProps = {
  config: AppConfig;
  update: (next: AppConfig) => void;
};

export function SlotsTab({ config, update }: SlotsTabProps) {
  const [workshopId, setWorkshopId] = useState(config.workshops[0]?.id ?? "");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateOpen, setDateOpen] = useState(false);
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState(8);

  const workshop = config.workshops.find((w) => w.id === workshopId);
  const slots = config.slots
    .filter((s) => s.workshopId === workshopId)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  function addSlot() {
    if (!date || !time) return;
    const dateStr = format(date, "yyyy-MM-dd");
    const newSlot: Slot = {
      id: crypto.randomUUID(),
      workshopId,
      startsAt: `${dateStr}T${time}:00`,
      capacity,
      booked: 0,
    };
    update({ ...config, slots: [...config.slots, newSlot] });
    setDate(undefined);
    setTime("");
  }

  function deleteSlot(id: string) {
    update({ ...config, slots: config.slots.filter((s) => s.id !== id) });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Workshop</Label>
        <Select value={workshopId} onValueChange={setWorkshopId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a workshop" />
          </SelectTrigger>
          <SelectContent>
            {config.workshops.map((w) => (
              <SelectItem key={w.id} value={w.id}>
                {w.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {slots.length === 0 ? (
          <p className="text-muted-foreground text-sm">No time slots yet.</p>
        ) : (
          slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between rounded border p-2"
            >
              <span className="text-sm">
                {formatDateRange(slot.startsAt, workshop?.durationMin ?? 0)} ·{" "}
                {slot.capacity} seats
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteSlot(slot.id)}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="date-picker">Date</Label>
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-40 justify-between font-normal"
              >
                {date ? format(date, "PPP") : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                defaultMonth={date}
                onSelect={(selected) => {
                  setDate(selected);
                  setDateOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="time-picker">Time</Label>
          <Input
            type="time"
            id="time-picker"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="bg-background w-32 appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="cap">Seats</Label>
          <Input
            id="cap"
            type="number"
            min={1}
            className="w-20"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </div>

        <Button onClick={addSlot} disabled={!workshopId || !date || !time}>
          Add slot
        </Button>
      </div>
    </div>
  );
}
