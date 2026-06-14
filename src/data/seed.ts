// Starter data loaded on first visit, so the demo is never empty.

import type { AppConfig, Workshop, Slot } from "@/lib/types";

// Daisy's brand palette, used as the default theme.
const defaultTheme = {
  background: "#FCF8E8", // cream
  cardBackground: "#FFFFFF",
  text: "#1A1A1A",
  primary: "#800080", // violet
};

// Show every section by default; the admin can hide them per workshop.
const allFieldsVisible = {
  location: true,
  audience: true,
  duration: true,
  spots: true,
  description: true,
};

const workshops: Workshop[] = [
  {
    id: "w1",
    title: "Pottery Wheel Workshop",
    description: "Throw your first bowl on the wheel. Clay and tools included.",
    imageUrl: "https://picsum.photos/seed/pottery/600/400",
    location: "Paris 11e",
    audience: "Adults",
    durationMin: 120,
    price: 65,
    visibleFields: allFieldsVisible,
  },
  {
    id: "w2",
    title: "French Croissant Baking",
    description: "Learn to fold and bake real butter croissants from scratch.",
    imageUrl: "https://picsum.photos/seed/croissant/600/400",
    location: "Paris 3e",
    audience: "All ages",
    durationMin: 150,
    price: 95,
    visibleFields: allFieldsVisible,
  },
  {
    id: "w3",
    title: "Kids Watercolor Class",
    description: "A gentle introduction to watercolor painting for children.",
    imageUrl: "https://picsum.photos/seed/watercolor/600/400",
    location: "Lyon",
    audience: "Children",
    durationMin: 90,
    price: 40,
    visibleFields: allFieldsVisible,
  },
];

const slots: Slot[] = [
  { id: "s1", workshopId: "w1", startsAt: "2026-06-16T18:00:00", capacity: 8, booked: 5 },
  { id: "s2", workshopId: "w1", startsAt: "2026-06-18T10:00:00", capacity: 8, booked: 6 },
  { id: "s3", workshopId: "w1", startsAt: "2026-06-21T14:00:00", capacity: 8, booked: 8 },
  { id: "s4", workshopId: "w2", startsAt: "2026-06-17T08:00:00", capacity: 10, booked: 4 },
  { id: "s5", workshopId: "w2", startsAt: "2026-06-20T08:00:00", capacity: 10, booked: 9 },
  { id: "s6", workshopId: "w2", startsAt: "2026-06-24T08:00:00", capacity: 10, booked: 0 },
  { id: "s7", workshopId: "w3", startsAt: "2026-06-19T15:00:00", capacity: 12, booked: 7 },
  { id: "s8", workshopId: "w3", startsAt: "2026-06-22T11:00:00", capacity: 12, booked: 12 },
];

export const seedConfig: AppConfig = {
  theme: defaultTheme,
  workshops: workshops,
  slots: slots,
};
