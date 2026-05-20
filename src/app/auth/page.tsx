"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Wallet, Mail, ArrowLeft, Loader2 } from "lucide-react";
import EchoLogo from "@/components/EchoLogo";
import AirParticles from "@/components/AirParticles";
import { useAppStore } from "@/store/app";

export default function AuthPage() {
  const router = useRouter();
  const login = useAppStore((s) => s.login);
  const [mode, setMode] = useState<"choose" | "email" | "wallet">("choose");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("Reyn");
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    login(name, "0x7a3E…f92B");
    router.push("/onboarding");
  };

  const handleWalletConnect = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    login("Reyn", "0x7a3E…f92B");
    router.push("/onboarding");
  };

  return (
    <main className="relative min-h-dvh flex flex-col">
      <AirParticles density={14} />

      <header className="max-w-lg mx-auto w-full px-5 pt-5 flex items-center justify-between relative z-10">
        <Link href="/" className="text-emerald-100/50 hover:text-emerald-100 flex items-center gap-1 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <EchoLogo size="sm" />
      </header>

      <section className="flex-1 flex items-center justify-center px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {mode === "choose" && (
            <>
              <div className="text-center mb-8">
                <div className="text-5xl mb-3">🌿</div>
                <h1 className="text-2xl font-bold font-display text-white">Welcome to Eco & Echo</h1>
                <p className="text-sm text-emerald-100/50 mt-2">Sign in to start your air-quality quest</p>
              </div>

              <div className="space-y-3">
                <button onClick={() => setMode("wallet")} className="btn-mint w-full py-3.5">
                  <Wallet className="w-4 h-4" /> Connect Wallet
                </button>
                <button onClick={() => setMode("email")} className="btn-ghost w-full py-3.5">
                  <Mail className="w-4 h-4" /> Continue with Email
                </button>
              </div>

              <div className="text-center text-xs text-emerald-100/30 mt-6">
                By signing in you agree to walk responsibly 🌱
              </div>
            </>
          )}

          {mode === "email" && (
            <>
              <button onClick={() => setMode("choose")} className="text-xs text-emerald-100/50 mb-4 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Other options
              </button>
              <div className="glass p-6">
                <h2 className="font-semibold text-white mb-4">Sign in with email</h2>
                <label className="text-xs text-emerald-100/50 mb-1 block">Display name</label>
                <input
                  className="w-full bg-emerald-950/40 border border-emerald-400/20 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400/50 mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="text-xs text-emerald-100/50 mb-1 block">Email</label>
                <input
                  type="email"
                  className="w-full bg-emerald-950/40 border border-emerald-400/20 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400/50 mb-4"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleEmailSignIn}
                  disabled={loading || !name}
                  className="btn-mint w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue"}
                </button>
              </div>
            </>
          )}

          {mode === "wallet" && (
            <>
              <button onClick={() => setMode("choose")} className="text-xs text-emerald-100/50 mb-4 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Other options
              </button>
              <div className="glass p-6 text-center">
                <div className="text-4xl mb-3">{loading ? "🔗" : "👛"}</div>
                <h2 className="font-semibold text-white mb-1">Connect your wallet</h2>
                <p className="text-xs text-emerald-100/50 mb-5">
                  Demo mode — clicking Connect uses a mock wallet 0x7a3E…f92B. NFT badges live on Polygon Amoy testnet.
                </p>
                <button
                  onClick={handleWalletConnect}
                  disabled={loading}
                  className="btn-mint w-full"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Connecting…</> : <>Connect MetaMask</>}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </section>
    </main>
  );
}
