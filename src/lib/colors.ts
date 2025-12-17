// With format option
export function randomColor(format: "hex" | "rgb" | "rgba" = "hex"): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  switch (format) {
    case "rgb":
      return `rgb(${r}, ${g}, ${b})`;
    case "rgba":
      const a = Math.random().toFixed(2);
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    case "hex":
    default:
      const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      return `#${hex}`;
  }
}

// Multiple colors at once
export function randomColors(
  count: number,
  format: "hex" | "rgb" | "rgba" = "hex"
): string[] {
  return Array.from({ length: count }, () => randomColor(format));
}

// Pastel colors
export function randomPastelColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`;
}

// Dark colors
export function randomDarkColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 20%)`;
}

// Vibrant colors
export function randomVibrantColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 50%)`;
}
