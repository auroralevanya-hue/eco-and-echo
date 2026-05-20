"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Wind, Footprints, Trophy, Leaf,
  Heart, ChevronRight, Sparkles,
} from "lucide-react";
import { getQuestById } from "@/data/mock";
import { aqiCategory } from "@/lib/utils";
import AqiGauge from "@/components/AqiGauge";

type Params = Promise<{ id: string }>;

export default function QuestDetailPage({ params }: { params: Params }) {
  const { id } = use(params);
  const quest = getQuestById(id);
  if (!quest) notFound();

  const cat = aqiCategory(quest.aqi);

  return (
    <main className="min-h-dvh pb-32">
      {/* Header */}
      <header className="max-w-lg mx-auto px-5 pt-5 flex items-center justify-between">
        <Link href="/map" className="text-emerald-100/50 hover:text-emerald-100 flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> Map
        </Link>
        <div className="flex items-center gap-1.5 chip chip-mint">
          <MapPin className="w-3 h-3" /> {quest.distance}
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-5 relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 text-9xl opacity-15">{quest.icon}</div>
          <div className="relative">
            <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mb-1">
              {quest.locationType} · {quest.locationName}
            </div>
            <h1 className="text-2xl font-bold font-display text-white">{quest.title}</h1>
            <p className="text-sm text-emerald-100/60 mt-2">{quest.description}</p>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-emerald-400/10">
              <AqiGauge aqi={quest.aqi} size={70} />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-wider text-emerald-100/40">Local Air</div>
                <div className="text-sm font-bold" style={{ color: cat.color }}>{cat.label}</div>
                <div className="text-[11px] text-emerald-100/50">PM2.5 {quest.pm25Local} µg/m³</div>
                <div className="text-[10px] text-emerald-100/30">target ≤ {quest.pm25Target}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Story */}
      <section className="max-w-lg mx-auto px-5 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-5"
        >
          <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> The Brief
          </div>
          <p className="text-sm text-emerald-100/70 leading-relaxed">{quest.story}</p>
        </motion.div>
      </section>

      {/* Movement goal + progress */}
      <section className="max-w-lg mx-auto px-5 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass p-5"
        >
          <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mb-3">// Movement Goal</div>
          <div className="flex items-center gap-3 mb-3">
            <Footprints className="w-5 h-5 text-emerald-400" />
            <div className="flex-1 text-sm text-white">{quest.movementGoal}</div>
            <div className="text-sm font-bold font-mono text-emerald-400">
              {Math.round(quest.movementProgress * 100)}%
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${quest.movementProgress * 100}%` }} />
          </div>
          <div className="text-[10px] text-emerald-100/40 mt-2">
            Synced from Mi Smart Band 9 Pro · live
          </div>
        </motion.div>
      </section>

      {/* Rewards */}
      <section className="max-w-lg mx-auto px-5 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-5"
        >
          <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mb-3">// Rewards</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <div className="text-base font-bold font-display text-white">+{quest.rewardXP}</div>
              <div className="text-[9px] text-emerald-100/40 uppercase tracking-wider">XP</div>
            </div>
            <div className="text-center">
              <Leaf className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <div className="text-base font-bold font-display text-white">+{quest.rewardPoints}</div>
              <div className="text-[9px] text-emerald-100/40 uppercase tracking-wider">Green Pts</div>
            </div>
            <div className="text-center">
              <Wind className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <div className="text-base font-bold font-display text-white">−{quest.rewardCO2}g</div>
              <div className="text-[9px] text-emerald-100/40 uppercase tracking-wider">CO₂</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-400/10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center text-2xl">
              🏅
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">NFT Badge</div>
              <div className="text-sm font-semibold text-white">{quest.badgeName}</div>
              <div className={`chip text-[9px] mt-0.5 ${
                quest.badgeRarity === "common" ? "chip-success" :
                quest.badgeRarity === "rare" ? "chip-cyan" :
                quest.badgeRarity === "epic" ? "chip-violet" : "chip-amber"
              }`}>
                {quest.badgeRarity}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Wellness option */}
      <section className="max-w-lg mx-auto px-5 mt-4">
        <Link href="/breathe">
          <div className="glass p-4 flex items-center gap-3 hover:bg-emerald-900/20 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-rose-400/15 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">Pre-quest HRV check</div>
              <div className="text-[11px] text-emerald-100/50">Mi Band measures baseline HRV before walk</div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-100/40" />
          </div>
        </Link>
      </section>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 glass-strong border-t border-emerald-400/10 px-5 py-4 z-40">
        <div className="max-w-lg mx-auto">
          <Link href={`/quest/${quest.id}/ar`} className="btn-mint w-full">
            Start Quest <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
