# Eco & Echo — Air Quality Quest 🌿

> **Breathe clean. Earn green.**
> AR-powered air-quality questing app with Xiaomi Mi ecosystem integration. Walk to clean-air zones, log PM2.5 readings, solve climate puzzles, mint NFT eco-badges that track real CO₂ offset.

## ✨ Features

- **🗺️ Eco Map** — 5 quest types (rooftop garden, mangrove, urban forest, river greenway, PM2.5 corridor) plotted by AQI severity
- **📡 AR Air Scan** — Xiaomi 14 Ultra simulated camera scans particles, logs readings to the open Eco Echo dataset
- **🧠 Climate Puzzles** — PM2.5 source ID, blue-carbon mangroves, negative-ion wellness, phytoremediation
- **🏅 Eco-NFT Badges** — Polygon Amoy testnet mint, each badge tracks grams of CO₂ offset
- **🫁 HRV Breathing** — 4-3-6 box breath synced to Mi Smart Band 9 Pro, baseline-vs-now HRV delta
- **📱 Mi Hub** — Mi Air Quality Monitor 2 + Mi Air Purifier 4 Pro + Mi Smart Band + Xiaomi 14 Ultra unified
- **🎁 Green Rewards** — plant-based meals, EV fast charging, Mi filter discounts, forest-bath yoga
- **🌍 My Impact** — total CO₂ offset, tree equivalents, weekly steps × AQI heatmap

## 🚀 Tech Stack

- **Next.js 16.2.6** (App Router, React 19, Turbopack)
- **TypeScript 5**
- **Tailwind CSS 3** (custom emerald-mint-cyan eco theme)
- **Framer Motion 12** (page transitions, breathing orb, AR scan animation)
- **Zustand 5** (lightweight global state)
- **Lucide React** (tree-shakeable icons)
- **Polygon Amoy** (testnet — mocked NFT mint)

## 🌐 Routes (15 pages)

| Route | Purpose |
|---|---|
| `/` | Landing — air particles, hero, Xiaomi ecosystem block |
| `/auth` | Wallet connect or email sign-in |
| `/onboarding` | Pair Mi devices via simulated Bluetooth scan |
| `/dashboard` | AQI gauge, level/XP, active quest, Mi devices, badges |
| `/map` | 5 clean-air quest pins, filterable by difficulty |
| `/quest/[id]` | Quest brief, story, movement goal, rewards |
| `/quest/[id]/ar` | AR scan with live PM2.5/PM10/VOC sampling |
| `/quest/[id]/puzzle` | Climate-knowledge puzzle (4 options + explanation) |
| `/quest/[id]/reward` | NFT mint animation + tx hash |
| `/wallet` | Eco-NFT collection, total CO₂ offset, locked badges |
| `/leaderboard` | Top eco walkers podium + ranked list |
| `/rewards` | Green-merchant catalog with category filter |
| `/breathe` | HRV-paced breathing orb, Mi Band live readings |
| `/devices` | Mi ecosystem hub — indoor PM2.5/temp/humidity |
| `/impact` | Lifetime CO₂, tree equivalents, weekly steps × AQI bars |

## 🛠 Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run build && npm run start
# Production preview
```

## 🌱 Concept

Move & Solve taught Web3 safety through walking quests. **Eco & Echo** flips the lens: walking quests earn you NFT badges by **proving** time spent in clean-air zones. The Xiaomi Mi Air ecosystem isn't decorative — Mi Air Quality Monitor 2 streams real PM2.5, Mi Smart Band logs HRV improvement during breathing exercises, Mi Air Purifier 4 Pro auto-ramps on detected indoor spikes, and the Xiaomi 14 Ultra is the AR scanner.

Every quest answers **a real question**: which trees filter NO₂ best, why mangroves are 4× more efficient than rainforest at carbon storage, what causes the daily 17:30 PM2.5 spike. The dataset gets richer as the community walks.

## 📜 License

MIT — fork it, plant trees with it.

---

Built with 💚 by Reyn — powered by Xiaomi Mi Air ecosystem.
