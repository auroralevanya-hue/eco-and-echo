"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wind, Leaf, Trophy, Gift, Smartphone, Heart, Sparkles, ArrowRight,
} from "lucide-react";
import EchoLogo from "@/components/EchoLogo";
import AirParticles from "@/components/AirParticles";

const features = [
  {
    icon: <Wind className="w-6 h-6 text-emerald-400" />,
    title: "Breathe",
    desc: "Walk to verified clean-air zones — parks, mangroves, rooftop gardens. Your Mi Band counts steps + minutes breathed clean.",
    color: "border-emerald-400/20",
  },
  {
    icon: <Leaf className="w-6 h-6 text-cyan-400" />,
    title: "Solve",
    desc: "AR-scan trees, log PM2.5 readings, answer climate puzzles. Each correct answer feeds the open Eco Echo dataset.",
    color: "border-cyan-400/20",
  },
  {
    icon: <Trophy className="w-6 h-6 text-amber-400" />,
    title: "Earn",
    desc: "Mint Clean-Air NFT badges on-chain. Each badge tracks the CO₂ offset from your verified walks.",
    color: "border-amber-400/20",
  },
  {
    icon: <Gift className="w-6 h-6 text-rose-400" />,
    title: "Redeem",
    desc: "Trade green points for plant-based meals, EV charging, Mi filter discounts, forest-bath yoga classes.",
    color: "border-rose-400/20",
  },
];

const stats = [
  { label: "Eco Walkers", value: "8,420" },
  { label: "Clean-Air Quests", value: "45,200" },
  { label: "Trees Funded", value: "12,800" },
  { label: "CO₂ Offset (kg)", value: "184k" },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-dvh flex flex-col">
      <AirParticles density={22} />

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full px-5 pt-5 flex items-center justify-between relative z-10">
        <EchoLogo />
        <Link href="/auth" className="btn-ghost text-sm px-4 py-2">
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-5 pt-12 pb-12 relative z-10">
        <div className="max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 chip chip-cyan mb-5">
              <Smartphone className="w-3 h-3" />
              POWERED BY XIAOMI Mi AIR ECOSYSTEM
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight">
              Breathe clean.{" "}
              <span className="gradient-text">Earn green.</span>
            </h1>
            <p className="text-base md:text-lg text-emerald-100/70 mt-4 max-w-xl mx-auto leading-relaxed">
              Map your city's cleanest air, walk to fresh-air harvest points, solve climate puzzles, and mint NFT badges that count real CO₂ offset.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link href="/auth" className="btn-mint text-base px-8 py-3.5">
                Start Eco Quest <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how" className="btn-ghost px-6 py-3.5">
                How It Works
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-12 max-w-2xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass px-3 py-4 text-center">
                <div className="text-2xl md:text-3xl font-bold font-display gradient-text leading-tight">{s.value}</div>
                <div className="text-[10px] text-emerald-100/40 mt-1.5 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="how" className="max-w-5xl mx-auto w-full px-5 pb-16 relative z-10">
        <div className="text-xs font-mono text-emerald-100/40 mb-6 tracking-widest">// HOW IT WORKS</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className={`glass p-5 ${f.color}`}
            >
              <div className="mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-emerald-100/60 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Xiaomi ecosystem */}
      <section className="max-w-4xl mx-auto w-full px-5 pb-12 relative z-10">
        <div className="glass p-6 md:p-8 border-cyan-400/20">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl mi-orange-bg flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold font-display text-white">Mi</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-lg mb-2">
                Plug into your Xiaomi Mi Air ecosystem
              </h3>
              <p className="text-sm text-emerald-100/60 leading-relaxed mb-4">
                Mi Air Quality Monitor 2 streams indoor PM2.5 in real time. Mi Smart Band tracks steps, HRV, and breathing exercises. Mi Air Purifier 4 Pro auto-ramps on detected spikes. Xiaomi 14 Ultra phone is your AR scanner. All four feed Eco & Echo's quest engine.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="chip chip-cyan">Mi Air Quality Monitor 2</span>
                <span className="chip chip-cyan">Mi Smart Band 9 Pro</span>
                <span className="chip chip-cyan">Mi Air Purifier 4 Pro</span>
                <span className="chip chip-cyan">Xiaomi 14 Ultra AR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness link */}
      <section className="max-w-4xl mx-auto w-full px-5 pb-20 relative z-10">
        <div className="glass p-6 md:p-8 border-emerald-400/15">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Heart className="w-12 h-12 text-emerald-400 shrink-0" />
            <div>
              <h3 className="font-semibold text-white text-lg mb-2">Real wellness, real data</h3>
              <p className="text-sm text-emerald-100/60 leading-relaxed">
                Each quest logs HRV pre/post exposure to clean-air zones. The data is yours — anonymized, opt-in, contributing to the open dataset that proves urban green spaces actually move the needle on stress, cortisol, and respiratory health.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-emerald-400/10 py-8 text-center text-xs text-emerald-100/30 relative z-10">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" />
          Eco & Echo — Walk the planet back to health
        </div>
      </footer>
    </main>
  );
}
