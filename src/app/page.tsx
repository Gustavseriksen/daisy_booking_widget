import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-3xl font-bold">Daisy Booking Widget</h1>
      <p className="text-muted-foreground">
        An embeddable booking widget for creative workshops. Configure it in the
        admin, then embed it on any site.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/admin" target="_blank" rel="noopener noreferrer">
            Open admin
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/carousel" target="_blank" rel="noopener noreferrer">
            View widget
          </Link>
        </Button>
      </div>
    </main>
  );
}
