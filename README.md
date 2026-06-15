# Daisy Booking Widget

A booking widget that artists add to their own website. It shows upcoming workshop classes in a horizontal carousel that clients can browse and book, and it can be adapted to the look of any site.

- **Live demo:** https://daisy-booking-widget.vercel.app
- **The widget on its own (what a client sees on an artist's site):** https://daisy-booking-widget.vercel.app/carousel
- **Admin / configurator:** https://daisy-booking-widget.vercel.app/admin

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Routes:
- `/` is the landing page with links.
- `/carousel` is the bare widget (the page you would load inside an `<iframe>`).
- `/admin` is a what would be in "Daisy Pro" to configure the widget (theme, workshops, time slots).

## The component API

The widget is one component, `BookingWidget`. It takes everything it needs through props and keeps no data of its own, so it can be dropped into any project.

| Prop | Type | Purpose |
|---|---|---|
| `workshops` | `ScheduledWorkshop[]` | The scheduled workshops to show. |
| `theme` | `WidgetTheme` | Colors: `background`, `cardBackground`, `text`, `primary`. Defaults to Daisy violet. |
| `state` | `"normal" \| "error" \| "empty"` | Force a state for the demo. "error" makes the fake fetch fail; "empty" returns no workshops. |
| `className` | `string` | Extra CSS classes for the widget's outer box, for example to make it fill the whole screen or sit inside a card. |

`workshops` is the only required prop. If you leave out the others, the widget uses default values.

Example:

```tsx
<BookingWidget workshops={workshops} theme={{ primary: "#C0703C" }} />
```

## How it's structured, and why

**The widget, and the demo around it** The real product is the widget. It lives in `components/widget/` and is built from small pieces that fit together: `BookingWidget` holds the `WorkshopCarousel` , which holds the `WorkshopCard`s, which open the `BookingDialog`.
The `/admin` page and `lib/storage` are just a demo built around the widget. They give the widget its data, but the widget does not need them to work. So the widget can be copied into any other project on its own, and it stays easy to read.

**One simple state at a time.** Instead of juggling lots of true/false flags, `BookingWidget` keeps a single value called `status`. It can be `loading`, `error`, `empty`, or `ready`, and the widget shows one screen for each. This is how the four required states (loading, empty, error, success) are handled. The booking pop-up has its own small version of this, with `ready`, `booking`, and `success`.

**Colors come from CSS variables.** The `theme` prop is turned into CSS variables (like `--widget-primary`) on the widget's top element, and the smaller parts read those variables. Tailwind cannot build a class from a value that is only known while the app runs, so CSS variables are used to set colors from a prop. The text on the buttons and the price is automatically set to black or white, based on how bright the chosen color is, so it stays easy to read on any background.

**Each card is one date.** A card shows one workshop on one date, so picking a card is the same as picking the time slot. This matches how Daisy's real widget works. Workshops and their dates are stored separately (`Workshop` and `Slot`) and joined together for display in `lib/schedule.ts`. Because of this, editing a workshop once updates every date it runs on.

**No backend, on purpose.** On Vercel, the server's files are wiped between requests, so saving data there would need a real database, which this demo does not need. Instead the data is saved in the browser with `localStorage`. It starts from example data on the first visit, and a "Reset demo data" button brings it back. All of the saving and loading lives in `lib/storage.ts` and `lib/api.ts` (a pretend server call with a short delay, so the loading and error screens are real). To use a real backend later, only those two files need to change.

## A call I hesitated on

The brief only asked for one color to be changeable, the primary color, but I wanted the widget to be a bit more customizable so an artist can really make it match their own site. So instead of only a primary color, I let them change four: the background, the cards, the text, and the primary. They all go in a single `theme` prop, which keeps the component simple to use even though it can do more. The trade-off is a slightly bigger API than the strict minimum.

## Stack

Next.js (App Router), TypeScript, TailwindCSS, shadcn/ui.
