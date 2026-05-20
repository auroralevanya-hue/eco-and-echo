"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, TreePine, Wind, Footprints, Heart, Trophy } from "lucide-react";
import NavBar from "@/components/NavBar";
import { currentUser, badges } from "@/data/mock";

export default function ImpactPage() {
  const totalCO2 = badges.reduce((sum, b) => sum + b.co2Saved, 0);
  const treesEquivalent = (totalCO2 / 21000); // ~21kg CO2/yr per tree
  const carKmAvoided = (totalCO2 / 0.12); // 0.12 kg CO2/km avg car
  const stats = [
    { label: "Total CO₂ Offset", value: `${(totalCO2 / 1000).toFixed(1)} kg`, icon: <Wind className="w-5 h-5 text-cyan-400" />, color: "border-cyan-400/20" },
    { label: "Equivalent Trees", value: treesEquivalent.toFixed(2), icon: <TreePine className="w-5 h-5 text-emerald-400" />, color: "border-emerald-400/20" },
    { label: "Car km Avoided", value: carKmAvoided.toFixed(0), icon: <Footprints className="w-5 h-5 text-amber-400" />, color: "border-amber-400/20" },
    { label: "Clean Air Minutes", value: currentUser.cleanAirMinutes, icon: <Heart className="w-5 h-5 text-rose-400" />, color: "border-rose-400/20" },
  ];

  // Mock weekly walk data
  const weekly = [
    { day: "Mon", steps: 7200, aqi: 56 },
    { day: "Tue", steps: 9100, aqi: 42 },
    { day: "Wed", steps: 5800, aqi: 78 },
    { day: "Thu", steps: 8400, aqi: 38 },
    { day: "Fri", steps: 11200, aqi: 32 },
    { day: "Sat", steps: 14000, aqi: 28 },
    { day: "Sun", steps: 6400, aqi: 65 },
  ];
  const maxSteps = Math.max(...weekly.map((w) => w.steps));

  return (
    <main className="min-h-dvh pb-24">
      <header className="max-w-lg mx-auto px-5 pt-5 flex items-center justify-between">
        <Link href="/dashboard" className="text-emerald-100/50 hover:text-emerald-100 flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="text-xs text-emerald-100/40">My Impact</div>
        <div className="w-12" />
      </header>

      {/* Hero stat */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-6 text-center relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 text-9xl opacity-15 spin-slow">🌍</div>
          <div className="text-[10px] uppercase tracking-wider text-emerald-100/40 font-mono">// Lifetime CO₂ Offset</div>
          <div className="text-5xl font-bold font-display gradient-text mt-1">
            {(totalCO2 / 1000).toFixed(2)}
            <span className="text-2xl text-emerald-100/40 ml-1">kg</span>
          </div>
          <div className="text-xs text-emerald-100/50 mt-2">
            That&apos;s ~{(treesEquivalent * 365).toFixed(0)} tree-days of work
          </div>
        </motion.div>
      </section>

      {/* Stats grid */}
      <section className="max-w-lg mx-auto px-5 mt-4 grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className={`glass p-4 ${s.color}`}
          >
            <div className="mb-2">{s.icon}</div>
            <div className="text-xl font-bold font-display text-white">{s.value}</div>
            <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Weekly chart */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase">// This Week</div>
              <div className="text-base font-semibold text-white">Steps & Air Quality</div>
            </div>
            <div className="text-xs text-emerald-100/50">Avg AQI: 48</div>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-32">
            {weekly.map((w, i) => {
              const heightPct = (w.steps / maxSteps) * 100;
              const aqiColor = w.aqi <= 50 ? "#34e89e" : w.aqi <= 100 ? "#fbbf24" : "#ff5e62";
              return (
                <motion.div
                  key={w.day}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  style={{ originY: 1 }}
                  className="flex flex-col items-center justify-end h-full"
                >
                  <div className="text-[9px] text-emerald-100/40 mb-1">{(w.steps / 1000).toFixed(1)}k</div>
                  <div
                    className="w-full rounded-t-md"
                    style={{
                      height: `${heightPct}%`,
                      background: `linear-gradient(to top, ${aqiColor}, ${aqiColor}80)`,
                      boxShadow: `0 0 8px ${aqiColor}40`,
                      minHeight: 6,
                    }}
                  />
                  <div className="text-[10px] text-emerald-100/50 mt-1">{w.day}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-emerald-400/10 text-[10px]">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-emerald-100/50">AQI ≤ 50</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400" /><span className="text-emerald-100/50">≤ 100</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-400" /><span className="text-emerald-100/50">&gt; 100</span></div>
          </div>
        </motion.div>
      </section>

      {/* Achievements summary */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <div className="glass p-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-white">{currentUser.questsCompleted} quests completed</div>
            <div className="text-xs text-emerald-100/50">Walked {(currentUser.totalSteps / 1000).toFixed(1)}k steps · {badges.length} NFTs minted</div>
          </div>
        </div>
      </section>

      <NavBar />
    </main>
  );
}
