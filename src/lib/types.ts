// The colors an artist can change.
export type WidgetTheme = {
  background: string;
  cardBackground: string;
  text: string;
  primary: string; // the main brand color (buttons, price)
};

// Which parts of a card are shown or hidden.
export type VisibleFields = {
  spots: boolean;
  audience: boolean;
  location: boolean;
  description: boolean;
};

// Who the workshop is for. Only these 3 values are allowed.
export type Audience = "All ages" | "Adults" | "Children";

// A workshop = the template. Example: "Pottery class".
export type Workshop = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  audience: Audience;
  durationMin: number; // minutes
  price: number; // euros
  visibleFields: VisibleFields;
};

// A slot = one date for a workshop. A workshop can have many slots.
export type Slot = {
  id: string;
  workshopId: string; // which workshop this date belongs to
  startsAt: string; // date + time as text, like "2026-06-20T18:00:00"
  capacity: number; // total seats
  booked: number; // seats already taken
};

// A ScheduledWorkshop = one card. It is a workshop + one slot, joined together.
export type ScheduledWorkshop = Workshop & {
  slotId: string;
  startsAt: string;
  remainingSpots: number; // capacity - booked
};

// Everything we save in the browser.
export type AppConfig = {
  theme: WidgetTheme;
  workshops: Workshop[];
  slots: Slot[];
};

// The states the widget can be in. Only one at a time.
export type WidgetStatus =
  | "loading"
  | "error"
  | "empty"
  | "idle"
  | "booking"
  | "success";
