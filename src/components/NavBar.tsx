"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Map, Trophy, Wallet, Gift } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/map", icon: Map, label: "Quests" },
  { href: "/leaderboard", icon: Trophy, label: "Ranks" },
  { href: "/wallet", icon: Wallet, label: "NFTs" },
  { href: "/rewards", icon: Gift, label: "Rewards" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-emerald-400/10 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-lg mx-auto flex items-center justify-around relative">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all relative",
                active ? "text-emerald-400" : "text-emerald-100/40 hover:text-emerald-100/70"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  active && "drop-shadow-[0_0_6px_rgba(52,232,158,0.7)]"
                )}
              />
              <span className="text-[10px] font-medium">{label}</span>
              {active && (
                <div className="absolute bottom-0 w-6 h-0.5 bg-emerald-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
