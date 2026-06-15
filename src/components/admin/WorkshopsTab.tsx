"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminTabProps, Audience, VisibleFields, Workshop } from "@/lib/types";

const AUDIENCES: Audience[] = ["All ages", "Adults", "Children"];

const FIELD_TOGGLES: { key: keyof VisibleFields; label: string }[] = [
  { key: "spots", label: "Spots left" },
  { key: "audience", label: "Audience" },
  { key: "location", label: "Location" },
  { key: "description", label: "Description" },
];

// Admin tab: create, edit and delete workshops, and choose which details
// show on each card.
export function WorkshopsTab({ config, update }: AdminTabProps) {
  // Which workshop is currently being edited.
  const [selectedId, setSelectedId] = useState(config.workshops[0]?.id ?? "");
  const selected = config.workshops.find((w) => w.id === selectedId);

  // Merge some changes into the selected workshop, immutably.
  function updateWorkshop(changes: Partial<Workshop>) {
    update({
      ...config,
      workshops: config.workshops.map((w) =>
        w.id === selectedId ? { ...w, ...changes } : w,
      ),
    });
  }

  // Add a blank workshop and select it for editing.
  function addWorkshop() {
    const newWorkshop: Workshop = {
      id: crypto.randomUUID(),
      title: "New workshop",
      description: "",
      imageUrl: "https://picsum.photos/seed/new/600/400",
      location: "",
      audience: "All ages",
      durationMin: 60,
      price: 0,
      visibleFields: {
        spots: true,
        audience: true,
        location: true,
        description: true,
      },
    };
    update({ ...config, workshops: [...config.workshops, newWorkshop] });
    setSelectedId(newWorkshop.id);
  }

  // Remove the workshop and all of its time slots.
  function deleteWorkshop() {
    update({
      ...config,
      workshops: config.workshops.filter((w) => w.id !== selectedId),
      slots: config.slots.filter((s) => s.workshopId !== selectedId),
    });
    setSelectedId("");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger className="flex-1">
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
        <Button variant="outline" onClick={addWorkshop}>
          Add
        </Button>
      </div>

      {selected ? (
        <div className="space-y-4">
          <FieldRow label="Title">
            <Input
              value={selected.title}
              onChange={(e) => updateWorkshop({ title: e.target.value })}
            />
          </FieldRow>

          <FieldRow label="Description">
            <Textarea
              value={selected.description}
              onChange={(e) => updateWorkshop({ description: e.target.value })}
              className="min-h-24 max-h-60 overflow-y-auto lg:max-h-none"
            />
          </FieldRow>

          <FieldRow label="Image URL">
            <Input
              value={selected.imageUrl}
              onChange={(e) => updateWorkshop({ imageUrl: e.target.value })}
            />
          </FieldRow>

          <FieldRow label="Location">
            <Input
              value={selected.location}
              onChange={(e) => updateWorkshop({ location: e.target.value })}
            />
          </FieldRow>

          <div className="flex gap-4">
            <FieldRow label="Price (€)">
              <Input
                type="number"
                value={selected.price}
                onChange={(e) =>
                  updateWorkshop({ price: Number(e.target.value) })
                }
              />
            </FieldRow>
            <FieldRow label="Duration (min)">
              <Input
                type="number"
                value={selected.durationMin}
                onChange={(e) =>
                  updateWorkshop({ durationMin: Number(e.target.value) })
                }
              />
            </FieldRow>
          </div>

          <FieldRow label="Audience">
            <Select
              value={selected.audience}
              onValueChange={(value) =>
                updateWorkshop({ audience: value as Audience })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AUDIENCES.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldRow>

          <div className="space-y-2">
            <p className="text-sm font-medium">Show on card</p>
            {FIELD_TOGGLES.map((field) => (
              <div key={field.key} className="flex items-center space-x-2">
                <Switch
                  id={field.key}
                  checked={selected.visibleFields[field.key]}
                  onCheckedChange={(value) =>
                    updateWorkshop({
                      visibleFields: {
                        ...selected.visibleFields,
                        [field.key]: value,
                      },
                    })
                  }
                />
                <Label>{field.label}</Label>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button variant="destructive" onClick={deleteWorkshop}>
              Delete workshop
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          Select or add a workshop to edit.
        </p>
      )}
    </div>
  );
}

// Small helper: a label stacked above its input.
function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
