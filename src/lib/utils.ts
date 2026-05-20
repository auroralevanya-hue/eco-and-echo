import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPM(v: number): string {
  return v < 10 ? v.toFixed(1) : Math.round(v).toString();
}

export function aqiCategory(aqi: number): {
  label: string;
  color: string;
  chip: string;
} {
  if (aqi <= 50) return { label: "Good", color: "#34e89e", chip: "chip-mint" };
  if (aqi <= 100) return { label: "Moderate", color: "#fbbf24", chip: "chip-amber" };
  if (aqi <= 150)
    return { label: "Unhealthy SG", color: "#ff8533", chip: "chip-amber" };
  if (aqi <= 200) return { label: "Unhealthy", color: "#ff5e62", chip: "chip-coral" };
  return { label: "Hazardous", color: "#a78bfa", chip: "chip-violet" };
}
