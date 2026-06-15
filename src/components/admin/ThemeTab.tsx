"use client";

import { Button } from "@/components/ui/button";
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerEyeDropper,
  ColorPickerHueSlider,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from "@/components/ui/color-picker";
import { Label } from "@/components/ui/label";
import type { AppConfig, WidgetTheme } from "@/lib/types";

const THEME_FIELDS: { key: keyof WidgetTheme; label: string }[] = [
  { key: "primary", label: "Primary (buttons, price)" },
  { key: "background", label: "Background" },
  { key: "cardBackground", label: "Card background" },
  { key: "text", label: "Text" },
];

type ThemeTabProps = {
  config: AppConfig;
  update: (next: AppConfig) => void;
};

export function ThemeTab({ config, update }: ThemeTabProps) {
  function setColor(key: keyof WidgetTheme, value: string) {
    update({ ...config, theme: { ...config.theme, [key]: value } });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">Theme colors</h3>
        <p className="text-muted-foreground text-sm">
          Configure the widget&apos;s color scheme
        </p>
      </div>

      {THEME_FIELDS.map((field) => (
        <div key={field.key} className="flex flex-col gap-2">
          <Label>{field.label}</Label>

          <ColorPicker
            value={config.theme[field.key]}
            onValueChange={(value) => setColor(field.key, value)}
            defaultFormat="hex"
          >
            <ColorPickerTrigger asChild>
              <Button
                variant="outline"
                className="flex w-fit items-center gap-2 px-3"
              >
                <ColorPickerSwatch className="size-4" />
                {config.theme[field.key]}
              </Button>
            </ColorPickerTrigger>

            <ColorPickerContent>
              <ColorPickerArea />
              <div className="flex items-center gap-2">
                <ColorPickerEyeDropper />
                <ColorPickerHueSlider className="flex-1" />
              </div>
              <ColorPickerInput />
            </ColorPickerContent>
          </ColorPicker>
        </div>
      ))}
    </div>
  );
}
