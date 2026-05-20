"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Wind } from "lucide-react";
import NavBar from "@/components/NavBar";
import { leaderboard } from "@/data/mock";

const tabs = ["Weekly", "Monthly", "All Time"];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("Weekly");

  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <main className="min-h-dvh pb-24">
      {/* Header */}
      <header className="max-w-lg mx-auto px-5 pt-5">
        <div className="text-xs text-emerald-100/40">Leaderboard</div>
        <div className="font-bold text-white font-display text-lg">Top Eco Walkers</div>
      </header>

      {/* Tabs */}
      <section className="max-w-lg mx-auto px-5 mt-4">
        <div className="glass p-1 grid grid-cols-3 gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`py-2 rounded-lg text-xs font-medium transition ${
                activeTab === t
                  ? "bg-emerald-400 text-emerald-950"
                  : "text-emerald-100/50 hover:text-emerald-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Top 3 podium */}
      <section className="max-w-lg mx-auto px-5 mt-6">
        <div className="grid grid-cols-3 items-end gap-3">
          {/* 2nd */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-4xl mb-1">{topThree[1].avatar}</div>
            <div className="text-xs font-semibold text-white truncate">{topThree[1].name}</div>
            <div className="text-[10px] text-emerald-400 font-mono">{topThree[1].xp.toLocaleString()} XP</div>
            <div className="mt-2 h-20 bg-gradient-to-t from-emerald-400/30 to-emerald-400/5 rounded-t-lg flex items-center justify-center text-3xl font-bold font-display text-emerald-200">
              2
            </div>
          </motion.div>
          {/* 1st */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="text-2xl mb-1">👑</div>
            <div className="text-5xl mb-1">{topThree[0].avatar}</div>
            <div className="text-sm font-bold text-white truncate">{topThree[0].name}</div>
            <div className="text-[10px] text-amber-400 font-mono">{topThree[0].xp.toLocaleString()} XP</div>
            <div className="mt-2 h-28 bg-gradient-to-t from-amber-400/40 to-amber-400/5 rounded-t-lg flex items-center justify-center text-4xl font-bold font-display text-amber-300">
              1
            </div>
          </motion.div>
          {/* 3rd */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-4xl mb-1">{topThree[2].avatar}</div>
            <div className="text-xs font-semibold text-white truncate">{topThree[2].name}</div>
            <div className="text-[10px] text-cyan-400 font-mono">{topThree[2].xp.toLocaleString()} XP</div>
            <div className="mt-2 h-16 bg-gradient-to-t from-cyan-400/30 to-cyan-400/5 rounded-t-lg flex items-center justify-center text-2xl font-bold font-display text-cyan-200">
              3
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rest of leaderboard */}
      <section className="max-w-lg mx-auto px-5 mt-6 space-y-2">
        {rest.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
            className={`glass p-3 flex items-center gap-3 ${
              entry.isCurrentUser ? "border-emerald-400/40 bg-emerald-900/30" : ""
            }`}
          >
            <div className="w-8 text-center">
              <div className={`text-base font-bold font-display ${
                entry.isCurrentUser ? "text-emerald-400" : "text-emerald-100/40"
              }`}>
                {entry.rank}
              </div>
            </div>
            <div className="text-2xl">{entry.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-sm truncate ${
                entry.isCurrentUser ? "text-emerald-400" : "text-white"
              }`}>
                {entry.name} {entry.isCurrentUser && <span className="text-[10px] text-emerald-100/50">(you)</span>}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-100/40">
                <span className="flex items-center gap-0.5"><Trophy className="w-2.5 h-2.5" />{entry.badges} NFTs</span>
                <span>·</span>
                <span className="flex items-center gap-0.5"><Wind className="w-2.5 h-2.5" />{entry.cleanAir}m clean</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold font-mono text-emerald-400">{entry.xp.toLocaleString()}</div>
              <div className="text-[10px] text-emerald-100/40 flex items-center justify-end gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> XP
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <NavBar />
    </main>
  );
}
