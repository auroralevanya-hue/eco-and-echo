"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Lock } from "lucide-react";
import NavBar from "@/components/NavBar";
import { merchantRewards, currentUser } from "@/data/mock";

const categories = ["All", "Plant Food", "EV", "Eco Goods", "Wellness", "Education"];

export default function RewardsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const visible = merchantRewards.filter((r) =>
    activeCategory === "All" ? true : r.category === activeCategory
  );

  return (
    <main className="min-h-dvh pb-24">
      <header className="max-w-lg mx-auto px-5 pt-5 flex items-start justify-between">
        <div>
          <div className="text-xs text-emerald-100/40">Green Rewards</div>
          <div className="font-bold text-white font-display text-lg">Spend your eco-points</div>
        </div>
        <div className="chip chip-mint">
          <Leaf className="w-3 h-3" /> {currentUser.greenPoints.toLocaleString()} pts
        </div>
      </header>

      {/* Categories */}
      <section className="max-w-lg mx-auto px-5 mt-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              activeCategory === c
                ? "bg-emerald-400 text-emerald-950"
                : "bg-emerald-900/30 text-emerald-100/60 border border-emerald-400/15"
            }`}
          >
            {c}
          </button>
        ))}
      </section>

      {/* Rewards grid */}
      <section className="max-w-lg mx-auto px-5 mt-4 grid grid-cols-2 gap-3">
        {visible.map((r, i) => {
          const canAfford = currentUser.greenPoints >= r.requiredPoints;
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i }}
              className={`glass p-4 flex flex-col ${canAfford ? "" : "opacity-70"}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-3xl">{r.merchantIcon}</div>
                {!canAfford && <Lock className="w-3.5 h-3.5 text-emerald-100/30" />}
              </div>
              <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">
                {r.merchantName}
              </div>
              <div className="text-sm font-semibold text-white leading-tight mt-0.5">{r.title}</div>
              <div className="text-[11px] text-emerald-100/50 mt-1.5 leading-snug flex-1">{r.description}</div>
              <div className="mt-3 pt-3 border-t border-emerald-400/10 flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> {r.requiredPoints}
                </span>
                <button
                  disabled={!canAfford}
                  className={`text-[11px] font-medium px-3 py-1 rounded-lg ${
                    canAfford
                      ? "bg-emerald-400 text-emerald-950 hover:opacity-90"
                      : "bg-emerald-900/40 text-emerald-100/40 cursor-not-allowed"
                  }`}
                >
                  {canAfford ? "Redeem" : "Locked"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </section>

      <NavBar />
    </main>
  );
}
