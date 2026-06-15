"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingWidget } from "@/components/widget/BookingWidget";
import { useWidgetConfig } from "@/lib/useWidgetConfig";
import { joinWorkshopsAndSlots } from "@/lib/schedule";
import { ThemeTab } from "@/components/admin/ThemeTab";
import { WorkshopsTab } from "@/components/admin/WorkshopsTab";
import { SlotsTab } from "@/components/admin/SlotsTab";

export default function AdminPage() {
  const { config, update, reset } = useWidgetConfig();
  const workshops = joinWorkshopsAndSlots(config);

  return (
    <main className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Widget settings</h1>
        <Button variant="outline" onClick={reset}>
          Reset demo data
        </Button>
      </div>

      <Card className="w-full max-w-2xl">
        <CardContent>
          <Tabs defaultValue="theme">
            <TabsList>
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="workshops">Workshops</TabsTrigger>
              <TabsTrigger value="slots">Slots</TabsTrigger>
            </TabsList>

            <TabsContent value="theme">
              <ThemeTab config={config} update={update} />
            </TabsContent>
            <TabsContent value="workshops">
              <WorkshopsTab config={config} update={update} />
            </TabsContent>
            <TabsContent value="slots">
              <SlotsTab config={config} update={update} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Live preview</h2>
        <BookingWidget workshops={workshops} theme={config.theme} />
      </div>
    </main>
  );
}
