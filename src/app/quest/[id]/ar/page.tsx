"use client";

import { use, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Scan, Check, ChevronRight } from "lucide-react";
import { getQuestById } from "@/data/mock";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;
type Phase = "scan" | "detecting" | "found";
type Particle = { id: number; left: string; top: string; size: number; duration: number; delay: number };

export default function ARPage({ params }: { params: Params }) {
  const { id } = use(params);
  const quest = getQuestById(id);
  if (!quest) notFound();

  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("scan");
  const [scanProgress, setScanProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Particles only after mount — avoids hydration mismatch from Math.random
  const particles = useMemo<Particle[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      top: `${Math.random() * 90 + 5}%`,
      size: 3 + Math.random() * 5,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [mounted]);

  useEffect(() => {
    if (phase === "detecting") {
      const interval = setInterval(() => {
        setScanProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase("found"), 350);
            return 100;
          }
          return p + 4;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <main className="min-h-dvh relative overflow-hidden bg-emerald-950">
      {/* Camera-feed simulation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-cyan-900/30 to-emerald-950" />
        <div className="absolute inset-0 map-grid opacity-50" />
        <div className="absolute inset-0 scanline opacity-40" />

        {/* Floating air particles (the "echo" the user is sensing) */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-emerald-400"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 12px #34e89e",
            }}
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}

        {/* Quest target object (centered) */}
        <AnimatePresence>
          {phase !== "found" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl float"
            >
              {quest.icon}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top overlay */}
      <div className="absolute top-0 left-0 right-0 ar-overlay z-10">
        <header className="max-w-lg mx-auto px-5 pt-5 flex items-center justify-between">
          <Link
            href={`/quest/${quest.id}`}
            className="w-9 h-9 rounded-full glass-strong flex items-center justify-center text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="text-xs font-mono text-emerald-300/80 tracking-wider">// AR ECO SCAN</div>
          <div className="w-9 h-9 rounded-full glass-strong flex items-center justify-center">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          </div>
        </header>

        <div className="max-w-lg mx-auto px-5 mt-3 text-center">
          <div className="text-[10px] font-mono text-emerald-300/60 tracking-wider">SCANNING TARGET</div>
          <div className="text-base font-semibold text-white mt-0.5">{quest.locationName}</div>
        </div>
      </div>

      {/* Scan reticle (only in scan/detecting phase) */}
      {phase !== "found" && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative w-64 h-64">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-emerald-400 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-emerald-400 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-emerald-400 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-emerald-400 rounded-br-2xl" />

            {phase === "detecting" && (
              <motion.div
                animate={{ y: [0, 256, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34e89e]"
              />
            )}
          </div>
        </div>
      )}

      {/* Bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 ar-overlay z-10 pt-12 pb-6">
        <div className="max-w-lg mx-auto px-5">
          {phase === "scan" && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="glass-strong p-5 text-center">
                <div className="text-[10px] font-mono text-emerald-300/60 tracking-wider mb-1">XIAOMI 14 ULTRA · AR</div>
                <p className="text-sm text-emerald-100/80 mb-4">
                  Point your camera at the {quest.locationType} target. We&apos;ll detect air-quality particles + log readings to the Eco Echo network.
                </p>
                <button onClick={() => setPhase("detecting")} className="btn-mint w-full">
                  <Scan className="w-4 h-4" /> Start Scanning
                </button>
              </div>
            </motion.div>
          )}

          {phase === "detecting" && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="glass-strong p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-emerald-300 font-medium">Sampling air…</span>
                  <span className="text-xs font-mono text-emerald-400">{scanProgress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${scanProgress}%` }} />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label: "PM2.5", value: scanProgress > 30 ? `${quest.pm25Local}` : "—" },
                    { label: "PM10", value: scanProgress > 50 ? "18" : "—" },
                    { label: "VOC", value: scanProgress > 70 ? "Low" : "—" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-[9px] text-emerald-100/40 uppercase">{s.label}</div>
                      <div className="text-sm font-bold font-mono text-emerald-400">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {phase === "found" && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="glass-strong p-5 border-emerald-400/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-emerald-300/70">Air signal detected</div>
                    <div className="text-base font-bold text-white">{quest.locationName} verified</div>
                  </div>
                </div>
                <p className="text-sm text-emerald-100/70 mb-4">
                  Reading logged to Eco Echo network. Now solve the climate puzzle to complete the quest.
                </p>
                <button
                  onClick={() => router.push(`/quest/${quest.id}/puzzle`)}
                  className="btn-mint w-full"
                >
                  Solve Puzzle <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
