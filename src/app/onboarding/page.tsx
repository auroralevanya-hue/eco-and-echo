"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bluetooth, Check, ChevronRight, Loader2 } from "lucide-react";
import { useAppStore } from "@/store/app";
import EchoLogo from "@/components/EchoLogo";
import { miDevices } from "@/data/mock";

export default function OnboardingPage() {
  const router = useRouter();
  const pairMiDevice = useAppStore((s) => s.pairMiDevice);
  const [scanning, setScanning] = useState(false);
  const [pairedIds, setPairedIds] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const startScan = () => {
    setScanning(true);
    miDevices.forEach((d, i) => {
      setTimeout(() => {
        setPairedIds((prev) => [...prev, d.id]);
        if (i === miDevices.length - 1) setScanning(false);
      }, 700 * (i + 1));
    });
  };

  const finish = () => {
    pairMiDevice("Mi Smart Band 9 Pro");
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 700);
  };

  return (
    <main className="relative min-h-dvh flex flex-col">
      <header className="max-w-lg mx-auto w-full px-5 pt-5 flex items-center justify-center">
        <EchoLogo size="sm" />
      </header>

      <section className="flex-1 flex flex-col px-5 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6 mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mi-orange-bg mb-3 pulse-mint">
            <span className="text-2xl font-bold font-display text-white">Mi</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-white">Pair your Xiaomi devices</h1>
          <p className="text-sm text-emerald-100/50 mt-2">
            Demo discovery — your Mi Air ecosystem will sync over Bluetooth.
          </p>
        </motion.div>

        <div className="space-y-3">
          {miDevices.map((d, i) => {
            const paired = pairedIds.includes(d.id);
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{
                  opacity: paired || !scanning ? 1 : 0.4,
                  x: paired || !scanning ? 0 : -16,
                }}
                transition={{ delay: i * 0.05 }}
                className={`glass p-4 flex items-center gap-3 ${
                  paired ? "border-emerald-400/40" : ""
                }`}
              >
                <div className="text-3xl">{d.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{d.name}</div>
                  <div className="text-[11px] text-emerald-100/40 capitalize">{d.type}</div>
                </div>
                {paired ? (
                  <div className="flex items-center gap-1 chip chip-mint">
                    <Check className="w-3 h-3" /> Paired
                  </div>
                ) : scanning ? (
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400/60" />
                ) : (
                  <Bluetooth className="w-4 h-4 text-emerald-100/30" />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-auto pb-8 pt-6">
          {pairedIds.length === 0 && !scanning && (
            <button onClick={startScan} className="btn-mint w-full">
              <Bluetooth className="w-4 h-4" /> Scan for Mi Devices
            </button>
          )}
          {scanning && (
            <button disabled className="btn-mint w-full">
              <Loader2 className="w-4 h-4 animate-spin" /> Scanning…
            </button>
          )}
          {!scanning && pairedIds.length === miDevices.length && (
            <button onClick={finish} className="btn-mint w-full">
              {done ? "Loading dashboard…" : "Continue"} <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs text-emerald-100/40 hover:text-emerald-100/60 mt-3 mx-auto block"
          >
            Skip for now
          </button>
        </div>
      </section>
    </main>
  );
}
