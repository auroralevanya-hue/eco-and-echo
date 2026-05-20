"use client";

import { aqiCategory } from "@/lib/utils";

type Props = {
  aqi: number;
  size?: number;
};

export default function AqiGauge({ aqi, size = 96 }: Props) {
  const cat = aqiCategory(aqi);
  // 0-300 scale → arc 0-270deg
  const pct = Math.min(aqi / 300, 1);
  const circumference = 2 * Math.PI * 38;
  const offset = circumference * (1 - pct * 0.75);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-[135deg]">
        <circle
          cx="50" cy="50" r="38"
          fill="none"
          stroke="rgba(52, 232, 158, 0.1)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
        />
        <circle
          cx="50" cy="50" r="38"
          fill="none"
          stroke={cat.color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75 - offset} ${circumference}`}
          style={{ filter: `drop-shadow(0 0 6px ${cat.color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold font-display" style={{ color: cat.color }}>
          {aqi}
        </div>
        <div className="text-[9px] uppercase tracking-wider text-emerald-100/50">AQI</div>
      </div>
    </div>
  );
}
