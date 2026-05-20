"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  glow?: "mint" | "cyan" | "amber" | "coral" | "none";
  animate?: boolean;
};

const glowMap = {
  mint: "border-mint-400/30 shadow-[0_0_30px_rgba(52,232,158,0.15)]",
  cyan: "border-cyan-400/30 shadow-[0_0_30px_rgba(15,245,199,0.15)]",
  amber: "border-amber-400/30 shadow-[0_0_30px_rgba(251,191,36,0.15)]",
  coral: "border-coral-400/30 shadow-[0_0_30px_rgba(255,94,98,0.15)]",
  none: "",
};

export default function GlassCard({
  children,
  className,
  glow = "none",
  animate = true,
}: Props) {
  const Component = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
      }
    : {};

  return (
    <Component
      className={cn("glass p-4", glowMap[glow], className)}
      {...motionProps}
    >
      {children}
    </Component>
  );
}
