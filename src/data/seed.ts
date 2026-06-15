// Starter data loaded on first visit, so the demo is never empty.
// Identity: "Clay & Co." — a small ceramics studio in Copenhagen.

import type { AppConfig, Workshop, Slot } from "@/lib/types";

// The studio's own brand colors (the widget's default is Daisy violet;
// this shows an artist customizing it).
const defaultTheme = {
  background: "#FBF5EE", // warm off-white
  cardBackground: "#FFFFFF",
  text: "#2B2724",
  primary: "#C0703C", // terracotta
};

const allFieldsVisible = {
  spots: true,
  audience: true,
  location: true,
  description: true,
};

const LOCATION = "Le Marais, Paris 3e";

const workshops: Workshop[] = [
  {
    id: "w1",
    title: "Beginner's Wheel Throwing",
    description:
      "Step up to the pottery wheel and learn the fundamentals of throwing under the guidance of our resident ceramicist. You'll practise wedging and centering the clay, opening the form, and pulling up the walls to shape your very first bowls and cups. All clay, tools, aprons and kiln firing are included, and your finished pieces will be ready to collect two weeks later.",
    imageUrl: "https://images.unsplash.com/photo-1595351298020-038700609878?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: LOCATION,
    audience: "Adults",
    durationMin: 120,
    price: 65,
    visibleFields: allFieldsVisible,
  },
  {
    id: "w2",
    title: "Hand-Building & Pinch Pots",
    description:
      "Discover how much you can create with just your hands — no wheel required. In this relaxed session you'll explore the core hand-building techniques of pinching, coiling and slab work to shape mugs, bowls and small dishes with real character. We'll cover joining, smoothing and adding texture, and every piece you make will be glazed and fired so you can take it home.",
    imageUrl: "https://images.unsplash.com/photo-1590605105526-5c08f63f89aa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: LOCATION,
    audience: "All ages",
    durationMin: 90,
    price: 45,
    visibleFields: allFieldsVisible,
  },
  {
    id: "w3",
    title: "Glazing Masterclass",
    description:
      "Glazing is where your ceramics truly come alive, and this masterclass is dedicated entirely to colour and finish. Bring your own bisque-fired pieces or work on studio blanks as you experiment with layering, dipping, pouring and brushwork using our full palette of studio glazes. We'll explain how glazes behave in the kiln so you can plan your results with confidence.",
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: LOCATION,
    audience: "Adults",
    durationMin: 150,
    price: 75,
    visibleFields: allFieldsVisible,
  },
  {
    id: "w4",
    title: "Kids Clay Club",
    description:
      "A playful, hands-on introduction to clay designed especially for children aged 6 to 12. With plenty of guidance and encouragement, young makers will squish, roll and shape their own animals, little pots, beads and fridge magnets. It's a wonderfully tactile way to spark creativity, and every child goes home with their own glazed and fired creations to be proud of.",
    imageUrl: "https://images.unsplash.com/photo-1607556671927-78a6605e290b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: LOCATION,
    audience: "Children",
    durationMin: 60,
    price: 30,
    visibleFields: allFieldsVisible,
  },
  {
    id: "w5",
    title: "Date Night: Pottery for Two",
    description:
      "Swap dinner and a movie for something far more memorable. Our Date Night is a relaxed evening at the wheel for couples and friends, complete with a welcome glass of wine and a calm, candle-lit studio atmosphere. No experience is needed — our ceramicist guides you through making a pair of cups or bowls together, which we'll glaze, fire and have ready for you to collect.",
    imageUrl: "https://images.unsplash.com/photo-1508269151431-a34449ca161d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: LOCATION,
    audience: "Adults",
    durationMin: 120,
    price: 90,
    visibleFields: allFieldsVisible,
  },
];


const slots: Slot[] = [
  // w1 — Wheel Throwing (capacity 8)
  { id: "s1", workshopId: "w1", startsAt: "2026-06-17T18:00:00", capacity: 8, booked: 6 },
  { id: "s2", workshopId: "w1", startsAt: "2026-06-21T10:00:00", capacity: 8, booked: 8 }, // full
  { id: "s3", workshopId: "w1", startsAt: "2026-06-25T18:00:00", capacity: 8, booked: 3 },
  { id: "s4", workshopId: "w1", startsAt: "2026-06-29T10:00:00", capacity: 8, booked: 0 },
  { id: "s5", workshopId: "w1", startsAt: "2026-07-05T18:00:00", capacity: 8, booked: 5 },

  // w2 — Hand-Building (capacity 10)
  { id: "s6", workshopId: "w2", startsAt: "2026-06-18T14:00:00", capacity: 10, booked: 4 },
  { id: "s7", workshopId: "w2", startsAt: "2026-06-22T14:00:00", capacity: 10, booked: 10 }, // full
  { id: "s8", workshopId: "w2", startsAt: "2026-06-27T11:00:00", capacity: 10, booked: 7 },
  { id: "s9", workshopId: "w2", startsAt: "2026-07-02T14:00:00", capacity: 10, booked: 1 },
  { id: "s10", workshopId: "w2", startsAt: "2026-07-09T11:00:00", capacity: 10, booked: 0 },

  // w3 — Glazing (capacity 8)
  { id: "s11", workshopId: "w3", startsAt: "2026-06-19T18:00:00", capacity: 8, booked: 7 }, // 1 left
  { id: "s12", workshopId: "w3", startsAt: "2026-06-24T18:00:00", capacity: 8, booked: 2 },
  { id: "s13", workshopId: "w3", startsAt: "2026-06-30T18:00:00", capacity: 8, booked: 8 }, // full
  { id: "s14", workshopId: "w3", startsAt: "2026-07-06T14:00:00", capacity: 8, booked: 4 },
  { id: "s15", workshopId: "w3", startsAt: "2026-07-12T14:00:00", capacity: 8, booked: 0 },

  // w4 — Kids Clay Club (capacity 12)
  { id: "s16", workshopId: "w4", startsAt: "2026-06-20T10:00:00", capacity: 12, booked: 9 },
  { id: "s17", workshopId: "w4", startsAt: "2026-06-25T10:00:00", capacity: 12, booked: 12 }, // full
  { id: "s18", workshopId: "w4", startsAt: "2026-06-28T10:00:00", capacity: 12, booked: 5 },
  { id: "s19", workshopId: "w4", startsAt: "2026-07-04T10:00:00", capacity: 12, booked: 0 },
  { id: "s20", workshopId: "w4", startsAt: "2026-07-11T10:00:00", capacity: 12, booked: 6 },

  // w5 — Date Night (capacity 6)
  { id: "s21", workshopId: "w5", startsAt: "2026-06-20T19:00:00", capacity: 6, booked: 4 },
  { id: "s22", workshopId: "w5", startsAt: "2026-06-27T19:00:00", capacity: 6, booked: 6 }, // full
  { id: "s23", workshopId: "w5", startsAt: "2026-07-03T19:00:00", capacity: 6, booked: 2 },
  { id: "s24", workshopId: "w5", startsAt: "2026-07-10T19:00:00", capacity: 6, booked: 5 }, // 1 left
  { id: "s25", workshopId: "w5", startsAt: "2026-07-17T19:00:00", capacity: 6, booked: 0 },
];

export const seedConfig: AppConfig = {
  theme: defaultTheme,
  workshops,
  slots,
};
