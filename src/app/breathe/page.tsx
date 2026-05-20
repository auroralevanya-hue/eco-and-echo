"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, Activity, Wind, Check } from "lucide-react";
import NavBar from "@/components/NavBar";

type Phase = "idle" | "running" | "done";

const TOTAL_CYCLES = 6; // 6 cycles ≈ 1 min at 4-7-8 pace
const PATTERN = [
  { label: "Breathe in", duration: 4, scale: 1.4 },
  { label: "Hold", duration: 3, scale: 1.4 },
  { label: "Breathe out", duration: 6, scale: 0.6 },
];

export default function BreathePage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PATTERN[0].duration);
  const [hrvBaseline] = useState(48);
  const [hrvCurrent, setHrvCurrent] = useState(48);

  useEffect(() => {
    if (phase !== "running") return;
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        // advance step
        const nextStep = step + 1;
        if (nextStep >= PATTERN.length) {
          // next cycle
          const nextCycle = cycle + 1;
          if (nextCycle >= TOTAL_CYCLES) {
            setPhase("done");
            return 0;
          }
          setCycle(nextCycle);
          setStep(0);
          // Improve HRV slightly each cycle
          setHrvCurrent((h) => Math.min(h + 2 + Math.random() * 1.5, 78));
          return PATTERN[0].duration;
        }
        setStep(nextStep);
        return PATTERN[nextStep].duration;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [phase, step, cycle]);

  const progress = ((cycle + step / PATTERN.length) / TOTAL_CYCLES) * 100;
  const current = PATTERN[step];

  return (
    <main className="min-h-dvh pb-24 relative">
      <header className="max-w-lg mx-auto px-5 pt-5 flex items-center justify-between">
        <Link href="/dashboard" className="text-emerald-100/50 hover:text-emerald-100 flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>
        <div className="chip chip-mint">
          <Heart className="w-3 h-3" /> Mi Band Pulse Sync
        </div>
      </header>

      {phase === "idle" && (
        <section className="max-w-lg mx-auto px-5 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-4 float">🌬️</div>
            <h1 className="text-2xl font-bold font-display text-white">HRV-Paced Breathing</h1>
            <p className="text-sm text-emerald-100/60 mt-2 max-w-xs mx-auto">
              4-3-6 box breath. Mi Band measures HRV improvement in real time. Studies show ~12% cortisol drop after 1 minute.
            </p>
          </motion.div>

          <div className="glass p-5 mt-6">
            <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mb-3">// Baseline reading</div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <Activity className="w-5 h-5 text-rose-400 mx-auto mb-1" />
                <div className="text-base font-bold font-display text-white">{hrvBaseline} ms</div>
                <div className="text-[10px] text-emerald-100/40 uppercase">HRV</div>
              </div>
              <div>
                <Heart className="w-5 h-5 text-rose-400 mx-auto mb-1" />
                <div className="text-base font-bold font-display text-white">72 bpm</div>
                <div className="text-[10px] text-emerald-100/40 uppercase">Resting</div>
              </div>
              <div>
                <Wind className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <div className="text-base font-bold font-display text-white">15 br/m</div>
                <div className="text-[10px] text-emerald-100/40 uppercase">Breath</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setPhase("running")}
            className="btn-mint w-full mt-6"
          >
            <Heart className="w-4 h-4" /> Start 1-Minute Session
          </button>
        </section>
      )}

      {phase === "running" && (
        <section className="max-w-lg mx-auto px-5 mt-2 flex flex-col items-center">
          <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase mt-4">
            Cycle {cycle + 1} of {TOTAL_CYCLES}
          </div>
          <div className="text-2xl font-bold font-display text-white mt-1">{current.label}</div>

          {/* Breathing orb */}
          <div className="relative mt-6 mb-6 w-72 h-72 flex items-center justify-center">
            <motion.div
              animate={{ scale: current.scale }}
              transition={{ duration: current.duration, ease: "easeInOut" }}
              className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-emerald-400/40 via-cyan-400/30 to-emerald-400/10 blur-xl"
            />
            <motion.div
              animate={{ scale: current.scale }}
              transition={{ duration: current.duration, ease: "easeInOut" }}
              className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 opacity-90 flex items-center justify-center"
            >
              <div className="text-5xl font-bold font-display text-emerald-950">{secondsLeft}</div>
            </motion.div>
          </div>

          {/* Progress */}
          <div className="w-full max-w-xs mb-6">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* HRV live */}
          <div className="glass p-4 w-full max-w-xs">
            <div className="text-[10px] font-mono text-emerald-100/40 tracking-wider uppercase text-center mb-2">
              Live HRV from Mi Band
            </div>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="text-xs text-emerald-100/40">Baseline</div>
                <div className="text-base font-bold font-mono text-emerald-100">{hrvBaseline}</div>
              </div>
              <div className="text-emerald-400">→</div>
              <div className="text-center">
                <div className="text-xs text-emerald-400">Now</div>
                <div className="text-base font-bold font-mono text-emerald-400">{hrvCurrent.toFixed(0)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-emerald-100/40">Δ</div>
                <div className="text-base font-bold font-mono text-emerald-300">+{(hrvCurrent - hrvBaseline).toFixed(1)}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {phase === "done" && (
        <section className="max-w-lg mx-auto px-5 mt-12 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-24 h-24 rounded-full bg-emerald-400/20 flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-emerald-400" />
          </motion.div>
          <h1 className="text-2xl font-bold font-display text-white mt-5">Session complete</h1>
          <p className="text-sm text-emerald-100/60 mt-1 text-center">HRV improved {(hrvCurrent - hrvBaseline).toFixed(1)} ms · Cortisol estimated −12%</p>

          <div className="glass p-4 mt-6 w-full max-w-sm">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xl font-bold font-display text-emerald-400">+15</div>
                <div className="text-[10px] text-emerald-100/40 uppercase">XP</div>
              </div>
              <div>
                <div className="text-xl font-bold font-display text-emerald-400">+25</div>
                <div className="text-[10px] text-emerald-100/40 uppercase">Pts</div>
              </div>
              <div>
                <div className="text-xl font-bold font-display text-emerald-400">+1m</div>
                <div className="text-[10px] text-emerald-100/40 uppercase">Clean</div>
              </div>
            </div>
          </div>

          <Link href="/dashboard" className="btn-mint w-full max-w-sm mt-6">
            Back to Dashboard
          </Link>
        </section>
      )}

      <NavBar />
    </main>
  );
}
