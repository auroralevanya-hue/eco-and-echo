"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  density?: number;
  color?: string;
};

type Particle = { id: number; x: number; delay: number; duration: number; size: number };

export default function AirParticles({ density = 18, color = "#34e89e" }: Props) {
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate on client only — avoids SSR hydration mismatch from Math.random
  useEffect(() => {
    setParticles(
      Array.from({ length: density }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 4,
        size: 2 + Math.random() * 3,
      }))
    );
  }, [density]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "-10%",
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 ${p.size * 3}px ${color}`,
          }}
          animate={{
            y: ["0vh", "-110vh"],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
