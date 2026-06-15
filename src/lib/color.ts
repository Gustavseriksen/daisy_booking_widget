// Picks black or white text — whichever is more readable on the given color.
export function readableTextColor(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);

  // How bright the color is, 0 (black) to 1 (white).
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return brightness > 0.6 ? "#000000" : "#ffffff";
}
