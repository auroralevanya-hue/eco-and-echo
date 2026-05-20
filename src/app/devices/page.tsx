"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Bluetooth, RefreshCw, Plus, Wifi } from "lucide-react";
import NavBar from "@/components/NavBar";
import { miDevices } from "@/data/mock";

export default function DevicesPage() {
  return (
    <main className="min-h-dvh pb-24">
      <header className="max-w-lg mx-auto px-5 pt-5 flex items-center justify-between">
        <Link href="/dashboard" className="text-emerald-100/50 hover:text-emerald-100 flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <div className="text-xs text-emerald-100/40">My Mi Ecosystem</div>
        <button className="text-emerald-400">
          <RefreshCw className="w-4 h-4" />
        </button>
      </header>

      {/* Hub status */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong p-5 relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 w-32 h-32 mi-orange-bg opacity-15 rounded-full blur-3xl" />
          <div className="relative flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl mi-orange-bg flex items-center justify-center pulse-mint">
              <span className="text-xl font-bold font-display text-white">Mi</span>
            </div>
            <div className="flex-1">
              <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider">Mi Home Hub</div>
              <div className="font-bold text-white font-display text-base">Apartment · Sudirman</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <div className="text-xs text-emerald-400">All systems online · 4 devices</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-emerald-400/10">
            <div className="text-center">
              <div className="text-base font-bold font-mono text-emerald-400">12</div>
              <div className="text-[10px] text-emerald-100/40 uppercase">Indoor PM2.5</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold font-mono text-cyan-400">42%</div>
              <div className="text-[10px] text-emerald-100/40 uppercase">Humidity</div>
            </div>
            <div className="text-center">
              <div className="text-base font-bold font-mono text-amber-400">26°C</div>
              <div className="text-[10px] text-emerald-100/40 uppercase">Temp</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Devices list */}
      <section className="max-w-lg mx-auto px-5 mt-5 space-y-3">
        <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mb-1">// Connected Devices</div>
        {miDevices.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="glass p-4 flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-900/40 flex items-center justify-center text-2xl">
              {d.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white text-sm">{d.name}</div>
              {d.reading && (
                <div className="text-[11px] text-emerald-100/50 mt-0.5">
                  {d.reading.label}: <span className="text-emerald-400 font-mono">{d.reading.value}</span>
                </div>
              )}
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1 text-[10px] text-emerald-100/40">
                  <Wifi className="w-2.5 h-2.5" /> Online
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-100/40">
                  <Bluetooth className="w-2.5 h-2.5" /> Paired
                </div>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-mint" />
          </motion.div>
        ))}

        <button className="glass-strong w-full p-4 border-dashed border-emerald-400/30 flex items-center justify-center gap-2 text-emerald-400 text-sm hover:bg-emerald-900/30">
          <Plus className="w-4 h-4" /> Pair another Mi device
        </button>
      </section>

      <NavBar />
    </main>
  );
}
