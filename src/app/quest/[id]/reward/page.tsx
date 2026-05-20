"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Loader2, Sparkles, Wind, Trophy, Leaf, ChevronRight } from "lucide-react";
import { getQuestById } from "@/data/mock";
import { notFound } from "next/navigation";
import { useAppStore } from "@/store/app";

type Params = Promise<{ id: string }>;
type MintState = "minting" | "minted";
type Confetti = { x: number; duration: number; delay: number };

export default function RewardPage({ params }: { params: Params }) {
  const { id } = use(params);
  const quest = getQuestById(id);
  if (!quest) notFound();

  const [state, setState] = useState<MintState>("minting");
  const [txHash, setTxHash] = useState("");
  const [mounted, setMounted] = useState(false);
  const addXP = useAppStore((s) => s.addXP);
  const addGreenPoints = useAppStore((s) => s.addGreenPoints);
  const addBadge = useAppStore((s) => s.addBadge);
  const completeQuest = useAppStore((s) => s.completeQuest);

  useEffect(() => setMounted(true), []);

  const confetti = useMemo<Confetti[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 400 - 200,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.5,
    }));
  }, [mounted]);

  useEffect(() => {
    const t = setTimeout(() => {
      const hash =
        "0x" +
        Array.from({ length: 8 })
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("") +
        "…" +
        Array.from({ length: 6 })
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join("");
      setTxHash(hash);
      addXP(quest.rewardXP);
      addGreenPoints(quest.rewardPoints);
      addBadge(quest.badgeId);
      completeQuest(quest.id);
      setState("minted");
    }, 2200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-dvh flex flex-col items-center px-5 py-10 relative overflow-hidden">
      {/* Confetti particles */}
      {state === "minted" && mounted &&
        confetti.map((c, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: c.x, opacity: 1 }}
            animate={{ y: 800, opacity: 0 }}
            transition={{ duration: c.duration, delay: c.delay }}
            className="absolute top-0 left-1/2 text-2xl"
          >
            {["🌿", "✨", "🍃", "💚", "🌱"][i % 5]}
          </motion.div>
        ))}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-sm w-full mt-6"
      >
        {/* Badge frame */}
        <motion.div
          animate={state === "minted" ? { rotate: [0, -8, 8, 0] } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block relative"
        >
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-emerald-400/30 via-cyan-400/20 to-amber-400/20 flex items-center justify-center pulse-mint relative">
            <div className="w-36 h-36 rounded-full bg-emerald-950/60 backdrop-blur flex items-center justify-center text-7xl">
              {state === "minted" ? quest.icon : <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />}
            </div>
            {state === "minted" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/40"
              />
            )}
          </div>
        </motion.div>

        <div className="mt-6">
          {state === "minting" ? (
            <>
              <div className="text-xs text-emerald-100/40 uppercase tracking-wider font-mono mb-1">
                MINTING ECO-NFT
              </div>
              <div className="text-base font-semibold text-white">Writing to Polygon Amoy…</div>
              <div className="text-xs text-emerald-100/50 mt-1">
                Verified by Mi Air Quality Monitor data
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-1 chip chip-mint mb-2">
                  <Sparkles className="w-3 h-3" /> NFT MINTED
                </div>
                <h1 className="text-3xl font-bold font-display gradient-text">{quest.badgeName}</h1>
                <div className="text-sm text-emerald-100/60 mt-2">{quest.title} complete</div>
              </motion.div>

              {/* Rewards */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="glass p-4 mt-6 grid grid-cols-3 gap-3"
              >
                <div className="text-center">
                  <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-base font-bold font-display text-white">+{quest.rewardXP}</div>
                  <div className="text-[9px] text-emerald-100/40 uppercase">XP</div>
                </div>
                <div className="text-center">
                  <Leaf className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-base font-bold font-display text-white">+{quest.rewardPoints}</div>
                  <div className="text-[9px] text-emerald-100/40 uppercase">Pts</div>
                </div>
                <div className="text-center">
                  <Wind className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <div className="text-base font-bold font-display text-white">−{quest.rewardCO2}g</div>
                  <div className="text-[9px] text-emerald-100/40 uppercase">CO₂</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="glass p-3 mt-3 text-left"
              >
                <div className="text-[10px] text-emerald-100/40 uppercase tracking-wider mb-0.5">Tx Hash</div>
                <div className="text-xs font-mono text-emerald-400 break-all">{txHash}</div>
                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-emerald-100/40">
                  <Check className="w-3 h-3 text-emerald-400" />
                  Polygon Amoy testnet · Verified
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {state === "minted" && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-sm mt-6 space-y-2"
        >
          <Link href="/wallet" className="btn-mint w-full">
            View My NFTs <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/dashboard" className="btn-ghost w-full">
            Back to Dashboard
          </Link>
        </motion.div>
      )}
    </main>
  );
}
