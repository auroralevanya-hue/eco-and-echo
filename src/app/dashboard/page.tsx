"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Flame, Leaf, MapPin, Trophy, ChevronRight, Wind, Footprints,
  Heart, TreePine, Droplet,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import GlassCard from "@/components/GlassCard";
import AqiGauge from "@/components/AqiGauge";
import { currentUser, quests, miDevices } from "@/data/mock";

export default function DashboardPage() {
  const user = currentUser;
  const activeQuest = quests.find((q) => q.isActive);
  const xpProgress = ((user.xp % 500) / 500) * 100;
  const localAqi = 58; // mock current location AQI

  return (
    <main className="min-h-dvh pb-24">
      {/* Header */}
      <header className="max-w-lg mx-auto px-5 pt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="text-2xl shrink-0">{user.avatar}</div>
          <div className="min-w-0">
            <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">Hi,</div>
            <div className="font-bold text-white font-display text-base truncate">{user.name}</div>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/12 text-amber-300 border border-amber-400/25 text-[11px] font-semibold whitespace-nowrap">
          <Flame className="w-3 h-3" />
          {user.streak}d
        </div>
      </header>

      {/* AQI banner */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <GlassCard glow="mint" className="flex items-center gap-5">
          <div className="shrink-0">
            <AqiGauge aqi={localAqi} size={78} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-emerald-100/40 font-mono">Air around you</div>
            <div className="text-base font-semibold text-white leading-tight">Moderate</div>
            <div className="text-xs text-emerald-100/50">Sudirman · PM2.5 22 · NO₂ 31</div>
            <Link href="/map" className="text-xs text-emerald-400 mt-1.5 inline-flex items-center gap-1 hover:text-emerald-300">
              Find clean-air zone <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Level & XP */}
      <section className="max-w-lg mx-auto px-5 mt-3">
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400/25 to-cyan-400/15 flex items-center justify-center text-lg font-bold text-emerald-400 font-display border border-emerald-400/20 shrink-0">
              {user.level}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">Level {user.level}</div>
              <div className="text-sm font-semibold text-white truncate">Forest Walker</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">XP</div>
              <div className="text-sm font-bold font-mono text-emerald-400">{user.xp.toLocaleString()}</div>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
          </div>
          <div className="text-[10px] text-emerald-100/30 mt-1.5 text-right">
            {user.xp % 500} / 500 XP to Level {user.level + 1}
          </div>
        </GlassCard>
      </section>

      {/* Quick stats */}
      <section className="max-w-lg mx-auto px-5 mt-3 grid grid-cols-3 gap-2.5">
        {[
          { icon: <Leaf className="w-4 h-4 text-emerald-400" />, label: "Green Pts", value: user.greenPoints.toLocaleString() },
          { icon: <Trophy className="w-4 h-4 text-amber-400" />, label: "Badges", value: user.badges.length },
          { icon: <Wind className="w-4 h-4 text-cyan-400" />, label: "Clean Min", value: user.cleanAirMinutes },
        ].map((s) => (
          <GlassCard key={s.label} animate={false} className="text-center py-3 px-2">
            <div className="flex justify-center mb-1.5">{s.icon}</div>
            <div className="text-xl font-bold font-display text-white leading-none">{s.value}</div>
            <div className="text-[10px] text-emerald-100/40 mt-1.5 uppercase tracking-wider">{s.label}</div>
          </GlassCard>
        ))}
      </section>

      {/* Active Quest */}
      {activeQuest && (
        <section className="max-w-lg mx-auto px-5 mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase">Active Quest</div>
            <Link href="/map" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <Link href={`/quest/${activeQuest.id}`}>
            <GlassCard glow="mint" className="cursor-pointer hover:bg-emerald-900/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{activeQuest.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white">{activeQuest.title}</div>
                  <div className="text-xs text-emerald-100/50 mt-1">{activeQuest.movementGoal}</div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-emerald-100/40 mb-1">
                      <span className="flex items-center gap-1">
                        <Footprints className="w-3 h-3" /> Progress
                      </span>
                      <span>{Math.round(activeQuest.movementProgress * 100)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${activeQuest.movementProgress * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className="chip chip-mint text-[10px]">+{activeQuest.rewardXP} XP</span>
                    <span className="chip chip-cyan text-[10px]">+{activeQuest.rewardPoints} pts</span>
                    <span className="chip chip-mint text-[10px]">−{activeQuest.rewardCO2}g CO₂</span>
                    <span className={`chip text-[10px] ${
                      activeQuest.difficulty === "easy" ? "chip-success" :
                      activeQuest.difficulty === "medium" ? "chip-amber" : "chip-coral"
                    }`}>
                      {activeQuest.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        </section>
      )}

      {/* Mi devices */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase">Mi Ecosystem</div>
          <Link href="/devices" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            Manage <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
          {miDevices.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.06 * i }}
              className="glass p-3 min-w-[150px] shrink-0"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl">{d.icon}</div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-mint" />
              </div>
              <div className="text-[11px] font-semibold text-white leading-tight">{d.name}</div>
              {d.reading && (
                <>
                  <div className="text-[9px] text-emerald-100/40 mt-1.5 uppercase tracking-wider">{d.reading.label}</div>
                  <div className="text-sm font-bold font-mono text-emerald-400">{d.reading.value}</div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Badges */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase">Recent Eco-NFTs</div>
          <Link href="/wallet" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { emoji: "🌫️", name: "PM2.5 Pioneer", co2: "80g" },
            { emoji: "🌳", name: "Tree Planter", co2: "1.1kg" },
            { emoji: "🚶", name: "Clean Walker", co2: "320g" },
          ].map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 * i }}
              className="glass py-3 px-2 text-center"
            >
              <div className="text-4xl mb-1.5 leading-none">{b.emoji}</div>
              <div className="text-[11px] text-white font-medium leading-tight">{b.name}</div>
              <div className="text-[9px] text-emerald-400/80 font-mono mt-0.5">−{b.co2} CO₂</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="max-w-lg mx-auto px-5 mt-5 grid grid-cols-2 gap-2.5">
        <Link href="/map">
          <GlassCard className="cursor-pointer hover:bg-emerald-900/20 flex items-center gap-3 py-3 px-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/15 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white leading-tight">Open Map</div>
              <div className="text-[10px] text-emerald-100/40 mt-0.5">5 quests nearby</div>
            </div>
          </GlassCard>
        </Link>
        <Link href="/breathe">
          <GlassCard className="cursor-pointer hover:bg-emerald-900/20 flex items-center gap-3 py-3 px-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-400/15 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-rose-400" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white leading-tight">Breathe</div>
              <div className="text-[10px] text-emerald-100/40 mt-0.5">HRV-paced</div>
            </div>
          </GlassCard>
        </Link>
        <Link href="/leaderboard">
          <GlassCard className="cursor-pointer hover:bg-emerald-900/20 flex items-center gap-3 py-3 px-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center shrink-0">
              <TreePine className="w-5 h-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white leading-tight">Ranks</div>
              <div className="text-[10px] text-emerald-100/40 mt-0.5">You&apos;re #4</div>
            </div>
          </GlassCard>
        </Link>
        <Link href="/impact">
          <GlassCard className="cursor-pointer hover:bg-emerald-900/20 flex items-center gap-3 py-3 px-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/15 flex items-center justify-center shrink-0">
              <Droplet className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white leading-tight">Impact</div>
              <div className="text-[10px] text-emerald-100/40 mt-0.5">1.5 kg CO₂</div>
            </div>
          </GlassCard>
        </Link>
      </section>

      <NavBar />
    </main>
  );
}
