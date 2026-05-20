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
      <header className="max-w-lg mx-auto px-5 pt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{user.avatar}</div>
          <div>
            <div className="text-xs text-emerald-100/40">Hi,</div>
            <div className="font-bold text-white font-display">{user.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 chip chip-amber">
          <Flame className="w-3.5 h-3.5" />
          {user.streak} day streak
        </div>
      </header>

      {/* AQI banner */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <GlassCard glow="mint" className="flex items-center gap-4">
          <AqiGauge aqi={localAqi} size={86} />
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider text-emerald-100/40 font-mono">Air around you</div>
            <div className="text-base font-semibold text-white">Moderate · Sudirman</div>
            <div className="text-xs text-emerald-100/50 mt-1">
              PM2.5 22 µg/m³ · NO₂ 31 ppb
            </div>
            <Link href="/map" className="text-xs text-emerald-400 mt-1 inline-flex items-center gap-1 hover:text-emerald-300">
              Find clean-air zone <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Level & XP */}
      <section className="max-w-lg mx-auto px-5 mt-4">
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center text-lg font-bold text-emerald-400 font-display">
                {user.level}
              </div>
              <div>
                <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">Level</div>
                <div className="text-sm font-semibold text-white">Forest Walker</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">XP</div>
              <div className="text-sm font-bold font-mono text-emerald-400">{user.xp.toLocaleString()}</div>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
          </div>
          <div className="text-[10px] text-emerald-100/30 mt-1 text-right">
            {user.xp % 500} / 500 XP to Level {user.level + 1}
          </div>
        </GlassCard>
      </section>

      {/* Quick stats */}
      <section className="max-w-lg mx-auto px-5 mt-4 grid grid-cols-3 gap-3">
        {[
          { icon: <Leaf className="w-4 h-4 text-emerald-400" />, label: "Green Pts", value: user.greenPoints.toLocaleString() },
          { icon: <Trophy className="w-4 h-4 text-amber-400" />, label: "Badges", value: user.badges.length },
          { icon: <Wind className="w-4 h-4 text-cyan-400" />, label: "Clean Min", value: user.cleanAirMinutes },
        ].map((s) => (
          <GlassCard key={s.label} animate={false} className="text-center py-3 px-2">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <div className="text-base font-bold font-display text-white">{s.value}</div>
            <div className="text-[10px] text-emerald-100/40">{s.label}</div>
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
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="chip chip-mint text-[10px]">+{activeQuest.rewardXP} XP</span>
                    <span className="chip chip-cyan text-[10px]">+{activeQuest.rewardPoints} pts</span>
                    <span className="chip chip-amber text-[10px]">−{activeQuest.rewardCO2}g CO₂</span>
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
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase">Recent Eco-NFTs</div>
          <Link href="/wallet" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: "🌫️", name: "PM2.5 Pioneer" },
            { emoji: "🌳", name: "Tree Planter" },
            { emoji: "🚶‍♂️", name: "Clean Walker" },
          ].map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 * i }}
              className="glass p-3 text-center"
            >
              <div className="text-3xl mb-1">{b.emoji}</div>
              <div className="text-[10px] text-emerald-100/60 leading-tight">{b.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="max-w-lg mx-auto px-5 mt-5 grid grid-cols-2 gap-3">
        <Link href="/map">
          <GlassCard className="cursor-pointer hover:bg-emerald-900/20 text-center py-5">
            <MapPin className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">Open Map</div>
            <div className="text-[10px] text-emerald-100/40 mt-0.5">Find clean-air zones</div>
          </GlassCard>
        </Link>
        <Link href="/breathe">
          <GlassCard className="cursor-pointer hover:bg-emerald-900/20 text-center py-5">
            <Heart className="w-6 h-6 text-rose-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">Breathe</div>
            <div className="text-[10px] text-emerald-100/40 mt-0.5">HRV-paced breathing</div>
          </GlassCard>
        </Link>
        <Link href="/leaderboard">
          <GlassCard className="cursor-pointer hover:bg-emerald-900/20 text-center py-5">
            <TreePine className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">Leaderboard</div>
            <div className="text-[10px] text-emerald-100/40 mt-0.5">Top eco walkers</div>
          </GlassCard>
        </Link>
        <Link href="/impact">
          <GlassCard className="cursor-pointer hover:bg-emerald-900/20 text-center py-5">
            <Droplet className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white">My Impact</div>
            <div className="text-[10px] text-emerald-100/40 mt-0.5">CO₂ + tree count</div>
          </GlassCard>
        </Link>
      </section>

      <NavBar />
    </main>
  );
}
