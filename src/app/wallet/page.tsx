"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, ExternalLink, Wallet, Wind } from "lucide-react";
import NavBar from "@/components/NavBar";
import { currentUser, badges } from "@/data/mock";

export default function WalletPage() {
  const user = currentUser;
  const [copied, setCopied] = useState(false);

  const totalCO2 = badges.reduce((sum, b) => sum + b.co2Saved, 0);

  return (
    <main className="min-h-dvh pb-24">
      {/* Header */}
      <header className="max-w-lg mx-auto px-5 pt-5">
        <div className="text-xs text-emerald-100/40">My Wallet</div>
        <div className="font-bold text-white font-display text-lg">Eco-NFT Collection</div>
      </header>

      {/* Wallet card */}
      <section className="max-w-lg mx-auto px-5 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-5 relative overflow-hidden"
        >
          <div className="absolute -right-6 -bottom-6 text-9xl opacity-10">🌿</div>
          <div className="flex items-center gap-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-emerald-950" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">Connected</div>
              <div className="flex items-center gap-1.5">
                <div className="font-mono text-sm text-white truncate">{user.walletAddress}</div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("0x7a3E12FF8c00…f92B");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="text-emerald-100/40 hover:text-emerald-400"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {copied && <span className="text-[10px] text-emerald-400">Copied</span>}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-emerald-400/10 relative">
            <div>
              <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">Eco-NFTs</div>
              <div className="text-2xl font-bold font-display text-white">{badges.length}</div>
            </div>
            <div>
              <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">Total CO₂ Offset</div>
              <div className="text-2xl font-bold font-display gradient-text">
                {(totalCO2 / 1000).toFixed(1)} kg
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tabs */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mb-3">
          // Your Eco-NFTs
        </div>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.06 * i }}
              className={`glass p-4 text-center relative overflow-hidden ${
                b.rarity === "legendary"
                  ? "border-amber-400/30"
                  : b.rarity === "epic"
                  ? "border-violet-400/30"
                  : b.rarity === "rare"
                  ? "border-cyan-400/30"
                  : ""
              }`}
            >
              <div className="text-5xl mb-2">{b.image}</div>
              <div className="text-sm font-semibold text-white leading-tight">{b.name}</div>
              <div className="text-[10px] text-emerald-100/40 mt-1 leading-tight">{b.description}</div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span
                  className={`chip text-[9px] ${
                    b.rarity === "common"
                      ? "chip-success"
                      : b.rarity === "rare"
                      ? "chip-cyan"
                      : b.rarity === "epic"
                      ? "chip-violet"
                      : "chip-amber"
                  }`}
                >
                  {b.rarity}
                </span>
                <span className="chip chip-mint text-[9px]">
                  <Wind className="w-2.5 h-2.5" /> {b.co2Saved}g
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-emerald-400/10 flex items-center justify-between">
                <span className="text-[9px] text-emerald-100/40">{b.mintedAt}</span>
                <a className="text-[9px] text-emerald-400 flex items-center gap-0.5 hover:text-emerald-300">
                  Tx <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Empty slots */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mb-3">
          // Locked badges (complete quests to unlock)
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Rooftop Pioneer", emoji: "🌱" },
            { name: "Mangrove Guardian", emoji: "🌳" },
            { name: "Canopy Keeper", emoji: "🌲" },
          ].map((b) => (
            <div key={b.name} className="glass p-3 text-center opacity-50">
              <div className="text-3xl mb-1 grayscale">{b.emoji}</div>
              <div className="text-[10px] text-emerald-100/50">{b.name}</div>
              <div className="text-[9px] text-emerald-100/30 mt-1">Locked</div>
            </div>
          ))}
        </div>
      </section>

      <NavBar />
    </main>
  );
}
