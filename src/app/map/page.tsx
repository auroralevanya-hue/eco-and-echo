"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Navigation, Filter, Wind, Footprints } from "lucide-react";
import NavBar from "@/components/NavBar";
import { quests } from "@/data/mock";
import { aqiCategory } from "@/lib/utils";

const filters = ["All", "Easy", "Medium", "Hard"];

export default function MapPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedQuest, setSelectedQuest] = useState<string | null>(quests[0].id);

  const visible = quests.filter((q) => {
    if (activeFilter === "All") return true;
    return q.difficulty === activeFilter.toLowerCase();
  });

  const selected = quests.find((q) => q.id === selectedQuest);

  return (
    <main className="min-h-dvh pb-24">
      {/* Header */}
      <header className="max-w-lg mx-auto px-5 pt-5 flex items-center justify-between">
        <div>
          <div className="text-xs text-emerald-100/40">Eco Map</div>
          <div className="font-bold text-white font-display">{visible.length} clean-air quests nearby</div>
        </div>
        <button className="btn-ghost text-xs px-3 py-2">
          <Filter className="w-3 h-3" />
        </button>
      </header>

      {/* Filters */}
      <section className="max-w-lg mx-auto px-5 mt-4 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              activeFilter === f
                ? "bg-emerald-400 text-emerald-950"
                : "bg-emerald-900/30 text-emerald-100/60 border border-emerald-400/15"
            }`}
          >
            {f}
          </button>
        ))}
      </section>

      {/* Map */}
      <section className="max-w-lg mx-auto px-5 mt-4">
        <div className="relative h-72 rounded-2xl overflow-hidden border border-emerald-400/15 map-grid bg-emerald-950/40">
          <div className="absolute inset-0 scanline opacity-50" />

          {/* User pin (center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/30 pulse-mint" />
            <div className="text-[9px] text-cyan-300 mt-1 font-mono whitespace-nowrap text-center">YOU</div>
          </div>

          {/* Quest pins */}
          {visible.map((q, i) => {
            const cat = aqiCategory(q.aqi);
            const positions = [
              { left: "22%", top: "28%" },
              { left: "70%", top: "18%" },
              { left: "78%", top: "62%" },
              { left: "18%", top: "70%" },
              { left: "55%", top: "82%" },
            ];
            const pos = positions[i % positions.length];
            const isSelected = q.id === selectedQuest;
            return (
              <button
                key={q.id}
                onClick={() => setSelectedQuest(q.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={pos}
              >
                <motion.div
                  animate={{ scale: isSelected ? 1.2 : 1 }}
                  className="relative"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-base shadow-lg ${
                      isSelected ? "ring-4" : ""
                    }`}
                    style={{
                      background: cat.color + "30",
                      borderColor: cat.color,
                      borderWidth: "2px",
                      borderStyle: "solid",
                      color: cat.color,
                    }}
                  >
                    {q.icon}
                  </div>
                  {isSelected && (
                    <div
                      className="absolute inset-0 rounded-full ping-soft"
                      style={{ background: cat.color + "30", borderColor: cat.color }}
                    />
                  )}
                </motion.div>
              </button>
            );
          })}

          {/* Compass */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      </section>

      {/* Selected quest preview */}
      {selected && (
        <section className="max-w-lg mx-auto px-5 mt-4">
          <Link href={`/quest/${selected.id}`}>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-4 hover:bg-emerald-900/20 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{selected.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white">{selected.title}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-emerald-100/50">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{selected.distance}</span>
                    <span className="flex items-center gap-1"><Wind className="w-3 h-3" />AQI {selected.aqi}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="chip chip-mint text-[10px]">+{selected.rewardXP} XP</span>
                    <span className="chip chip-cyan text-[10px]">+{selected.rewardPoints} pts</span>
                    <span className={`chip text-[10px] ${
                      selected.difficulty === "easy" ? "chip-success" :
                      selected.difficulty === "medium" ? "chip-amber" : "chip-coral"
                    }`}>
                      {selected.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      )}

      {/* Quest list */}
      <section className="max-w-lg mx-auto px-5 mt-4 space-y-2">
        <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mb-1">All Quests</div>
        {visible.map((q, i) => {
          const cat = aqiCategory(q.aqi);
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
            >
              <Link href={`/quest/${q.id}`}>
                <div className="glass p-3 flex items-center gap-3 hover:bg-emerald-900/20 cursor-pointer">
                  <div className="text-2xl">{q.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-white truncate">{q.title}</div>
                    <div className="flex items-center gap-2 text-[10px] text-emerald-100/40 mt-0.5">
                      <span className="flex items-center gap-0.5"><Footprints className="w-2.5 h-2.5" />{q.distance}</span>
                      <span>·</span>
                      <span style={{ color: cat.color }}>AQI {q.aqi} {cat.label}</span>
                    </div>
                  </div>
                  {q.isCompleted && <span className="chip chip-success text-[9px]">Done</span>}
                  {q.isActive && <span className="chip chip-mint text-[9px]">Active</span>}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </section>

      <NavBar />
    </main>
  );
}
