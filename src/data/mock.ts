// ============================================================
// Eco & Echo — Mock Data
// Air-quality questing powered by Xiaomi Mi ecosystem
// ============================================================

export type User = {
  id: string;
  name: string;
  walletAddress: string;
  avatar: string;
  xp: number;
  level: number;
  greenPoints: number;
  streak: number;
  badges: string[];
  questsCompleted: number;
  cleanAirMinutes: number;
  totalSteps: number;
  miDevice: string;
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  story: string;
  locationName: string;
  locationType: "park" | "forest" | "rooftop" | "river" | "garden" | "wetland";
  lat: number;
  lng: number;
  distance: string;
  difficulty: "easy" | "medium" | "hard";
  movementGoal: string;
  movementProgress: number;
  pm25Local: number;
  pm25Target: number;
  aqi: number;
  puzzleId: string;
  rewardPoints: number;
  rewardXP: number;
  rewardCO2: number;
  badgeId: string;
  badgeName: string;
  badgeRarity: "common" | "rare" | "epic" | "legendary";
  isActive: boolean;
  isCompleted: boolean;
  icon: string;
};

export type Puzzle = {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  topic: string;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  mintedAt: string;
  txHash: string;
  questId: string;
  co2Saved: number;
};

export type MerchantReward = {
  id: string;
  merchantName: string;
  merchantIcon: string;
  title: string;
  requiredPoints: number;
  description: string;
  category: "EV" | "Plant Food" | "Eco Goods" | "Wellness" | "Education";
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  badges: number;
  cleanAir: number;
  isCurrentUser: boolean;
};

export type MiDevice = {
  id: string;
  name: string;
  icon: string;
  type: "purifier" | "monitor" | "watch" | "band" | "phone";
  status: "connected" | "syncing" | "offline";
  reading?: { label: string; value: string; trend?: "up" | "down" | "flat" };
};

// ── Current User ──
export const currentUser: User = {
  id: "user-001",
  name: "Reyn",
  walletAddress: "0x7a3E…f92B",
  avatar: "🌿",
  xp: 2450,
  level: 5,
  greenPoints: 1280,
  streak: 7,
  badges: ["badge-pm25-pioneer", "badge-tree-planter", "badge-clean-walk"],
  questsCompleted: 12,
  cleanAirMinutes: 184,
  totalSteps: 48230,
  miDevice: "Xiaomi Smart Band 9 Pro",
};

// ── Mi Devices (connected ecosystem) ──
export const miDevices: MiDevice[] = [
  {
    id: "mi-band-9",
    name: "Mi Smart Band 9 Pro",
    icon: "⌚",
    type: "band",
    status: "connected",
    reading: { label: "Steps today", value: "8,420", trend: "up" },
  },
  {
    id: "mi-air-monitor",
    name: "Mi Air Quality Monitor 2",
    icon: "🟢",
    type: "monitor",
    status: "connected",
    reading: { label: "PM2.5 home", value: "12 µg/m³", trend: "down" },
  },
  {
    id: "mi-purifier-4",
    name: "Mi Air Purifier 4 Pro",
    icon: "💨",
    type: "purifier",
    status: "connected",
    reading: { label: "Filter life", value: "78%", trend: "flat" },
  },
  {
    id: "xiaomi-14",
    name: "Xiaomi 14 Ultra",
    icon: "📱",
    type: "phone",
    status: "connected",
    reading: { label: "GPS lock", value: "9 sat", trend: "flat" },
  },
];

// ── Quests ──
export const quests: Quest[] = [
  {
    id: "quest-rooftop-bloom",
    title: "Rooftop Bloom at Senayan Sky Garden",
    description:
      "A rooftop garden is filtering 30% more air than expected. Walk up to verify.",
    story:
      "Mi Air Quality Monitor data flagged Senayan Sky Garden as a hotspot of unusually clean air at 14:00 daily. Researchers suspect a new moss-wall installation. Your mission: walk up, scan the bloom with AR, log the reading to the network, and earn the Rooftop Pioneer NFT.",
    locationName: "Senayan Sky Garden",
    locationType: "garden",
    lat: -6.2192,
    lng: 106.8014,
    distance: "640m",
    difficulty: "easy",
    movementGoal: "Walk 800 steps + climb 12 floors",
    movementProgress: 0.72,
    pm25Local: 14,
    pm25Target: 18,
    aqi: 42,
    puzzleId: "puzzle-pm25-source",
    rewardPoints: 180,
    rewardXP: 220,
    rewardCO2: 420,
    badgeId: "badge-rooftop-pioneer",
    badgeName: "Rooftop Pioneer",
    badgeRarity: "common",
    isActive: true,
    isCompleted: false,
    icon: "🌱",
  },
  {
    id: "quest-mangrove-walk",
    title: "Mangrove Walk at Pantai Indah Kapuk",
    description:
      "Mangroves capture 4× more CO₂ than rainforest. Sync your steps to plant 1 sapling.",
    story:
      "Pantai Indah Kapuk Mangrove holds 1,400 tons of stored carbon. Each verified visit funds 1 sapling via partner NGO. Walk the boardwalk, breathe through your Mi Band's HRV-paced breathing exercise, mint the Mangrove Guardian badge.",
    locationName: "PIK Mangrove",
    locationType: "wetland",
    lat: -6.1100,
    lng: 106.7400,
    distance: "1.8km",
    difficulty: "medium",
    movementGoal: "Walk 2,000 steps + 5-min HRV breathing",
    movementProgress: 0.30,
    pm25Local: 9,
    pm25Target: 15,
    aqi: 28,
    puzzleId: "puzzle-co2-mangrove",
    rewardPoints: 320,
    rewardXP: 380,
    rewardCO2: 1100,
    badgeId: "badge-mangrove-guardian",
    badgeName: "Mangrove Guardian",
    badgeRarity: "rare",
    isActive: false,
    isCompleted: false,
    icon: "🌳",
  },
  {
    id: "quest-pm25-hunter",
    title: "PM2.5 Hunter at Sudirman Loop",
    description:
      "Map the worst-air corridor downtown so the city can deploy purifier towers.",
    story:
      "Crowdsourced air-quality data from Mi Air Quality Monitor users shows Sudirman has 3 unmapped pollution spikes at peak hours. Walk the loop, capture readings every 200m, contribute to the open Eco Echo dataset.",
    locationName: "Sudirman Loop",
    locationType: "park",
    lat: -6.2250,
    lng: 106.8190,
    distance: "2.4km",
    difficulty: "hard",
    movementGoal: "Walk 3,000 steps along loop + 10 readings",
    movementProgress: 0,
    pm25Local: 68,
    pm25Target: 35,
    aqi: 134,
    puzzleId: "puzzle-pm25-source",
    rewardPoints: 480,
    rewardXP: 560,
    rewardCO2: 80,
    badgeId: "badge-pm25-mapper",
    badgeName: "PM2.5 Mapper",
    badgeRarity: "epic",
    isActive: false,
    isCompleted: false,
    icon: "🛰️",
  },
  {
    id: "quest-river-pulse",
    title: "Ciliwung River Pulse",
    description:
      "Riverside negative-ion zones boost wellness. Capture the morning pulse.",
    story:
      "Negative-ion concentration peaks 6-7 AM along Ciliwung greenway. Mi Band records HRV improvement during exposure. Walk the greenway, log your HRV delta, prove the wellness link, mint Ion Pulse Badge.",
    locationName: "Ciliwung Greenway",
    locationType: "river",
    lat: -6.2050,
    lng: 106.8480,
    distance: "1.2km",
    difficulty: "medium",
    movementGoal: "Walk 1,400 steps + log HRV pre/post",
    movementProgress: 0,
    pm25Local: 22,
    pm25Target: 25,
    aqi: 64,
    puzzleId: "puzzle-negative-ion",
    rewardPoints: 280,
    rewardXP: 340,
    rewardCO2: 320,
    badgeId: "badge-ion-pulse",
    badgeName: "Ion Pulse",
    badgeRarity: "rare",
    isActive: false,
    isCompleted: true,
    icon: "💧",
  },
  {
    id: "quest-urban-forest",
    title: "Urban Forest Census at Hutan Kota GBK",
    description:
      "Census 30 trees with AR — each tree species filters different pollutants.",
    story:
      "Hutan Kota GBK has 200+ tree species. Different species filter different pollutants (NO₂ vs PM2.5 vs O₃). Walk the trail, AR-scan trees to ID species, build the tree-pollutant database. Legendary badge for completion.",
    locationName: "Hutan Kota GBK",
    locationType: "forest",
    lat: -6.2185,
    lng: 106.8030,
    distance: "1.5km",
    difficulty: "hard",
    movementGoal: "Walk 1,800 steps + scan 30 trees",
    movementProgress: 0,
    pm25Local: 11,
    pm25Target: 15,
    aqi: 35,
    puzzleId: "puzzle-tree-filter",
    rewardPoints: 720,
    rewardXP: 880,
    rewardCO2: 1800,
    badgeId: "badge-canopy-keeper",
    badgeName: "Canopy Keeper",
    badgeRarity: "legendary",
    isActive: false,
    isCompleted: false,
    icon: "🌲",
  },
];

// ── Puzzles (climate / air-quality knowledge) ──
export const puzzles: Puzzle[] = [
  {
    id: "puzzle-pm25-source",
    question:
      "Your Mi Air Quality Monitor shows PM2.5 spike to 110 µg/m³ at 17:30 daily. Indoor purifier is on. What's the most likely outdoor source in a tropical city?",
    choices: [
      { label: "A", text: "Industrial smokestack" },
      { label: "B", text: "Rush-hour vehicle exhaust + brake dust" },
      { label: "C", text: "Natural pollen burst" },
      { label: "D", text: "Indoor cooking carry-over" },
    ],
    correctAnswer: "B",
    explanation:
      "PM2.5 spikes timed exactly with rush hour (16:30-19:00) point to vehicle exhaust + brake/tire dust. Industrial sources are flat across the day; pollen is morning-only. Mi Air Purifier 4 Pro auto-detects this and ramps to Strong mode — but reducing personal car use reduces the source itself.",
    topic: "PM2.5 Source Identification",
  },
  {
    id: "puzzle-co2-mangrove",
    question:
      "Mangroves are called 'blue carbon' because they store carbon how much more efficiently than tropical rainforest per hectare?",
    choices: [
      { label: "A", text: "About the same" },
      { label: "B", text: "2× more" },
      { label: "C", text: "4× more" },
      { label: "D", text: "10× more" },
    ],
    correctAnswer: "C",
    explanation:
      "Mangroves sequester carbon ~4× more efficiently than tropical rainforest because they store carbon both above-ground (biomass) and in waterlogged soils where decomposition is slow. Indonesia holds 23% of world mangroves — protecting them is a top-tier climate action.",
    topic: "Blue Carbon",
  },
  {
    id: "puzzle-negative-ion",
    question:
      "Riverside, waterfall, and forest air contains high negative ion concentration. What's the documented physiological effect?",
    choices: [
      { label: "A", text: "Cures diseases instantly" },
      { label: "B", text: "Lower stress hormone (cortisol) and improved HRV" },
      { label: "C", text: "Increases heart rate by 30%" },
      { label: "D", text: "No measurable effect — it's a myth" },
    ],
    correctAnswer: "B",
    explanation:
      "Studies (Perez et al., Int J Mol Sci) show negative ions modestly lower cortisol and improve heart-rate variability (HRV). Mi Smart Band tracks HRV in real time — comparing pre/post exposure is real data. Not magic, just nice physiology.",
    topic: "Wellness & Air",
  },
  {
    id: "puzzle-tree-filter",
    question:
      "Different tree species filter different pollutants. Which species is BEST for filtering urban NO₂ (vehicle pollution)?",
    choices: [
      { label: "A", text: "Coconut palm — wide leaves" },
      { label: "B", text: "Pine — needle leaves with high surface area + waxy resin" },
      { label: "C", text: "Banana — fast growing" },
      { label: "D", text: "Bonsai — concentrated potency" },
    ],
    correctAnswer: "B",
    explanation:
      "Conifers (pine, cypress) excel at NO₂ filtering because needle structure + waxy resin coating trap gaseous pollutants efficiently. Broad-leaf species (oak, ficus) are better for PM. Mixing species in urban canopy is the right strategy — single-species avenues underperform.",
    topic: "Phytoremediation",
  },
];

// ── Badges (Eco NFTs) ──
export const badges: Badge[] = [
  {
    id: "badge-pm25-pioneer",
    name: "PM2.5 Pioneer",
    description: "Logged first 10 air-quality readings to the network",
    image: "🌫️",
    rarity: "common",
    mintedAt: "2026-05-08",
    txHash: "0x4a3e…91bf",
    questId: "quest-pm25-hunter",
    co2Saved: 80,
  },
  {
    id: "badge-tree-planter",
    name: "Tree Planter",
    description: "Funded 5 saplings via verified mangrove walks",
    image: "🌳",
    rarity: "rare",
    mintedAt: "2026-05-12",
    txHash: "0x91cf…7a4d",
    questId: "quest-mangrove-walk",
    co2Saved: 1100,
  },
  {
    id: "badge-clean-walk",
    name: "Clean Walker",
    description: "Walked 50 km in zones with AQI < 50",
    image: "🚶‍♂️",
    rarity: "common",
    mintedAt: "2026-05-15",
    txHash: "0xe53b…2c08",
    questId: "quest-river-pulse",
    co2Saved: 320,
  },
];

// ── Merchant Rewards (green merchants) ──
export const merchantRewards: MerchantReward[] = [
  {
    id: "reward-1",
    merchantName: "Greenly Plant Café",
    merchantIcon: "🥗",
    title: "Free Plant-Based Bowl",
    requiredPoints: 200,
    description: "Any plant-based bowl at Greenly outlets — saves ~3 kg CO₂ vs beef.",
    category: "Plant Food",
  },
  {
    id: "reward-2",
    merchantName: "ChargeGo EV",
    merchantIcon: "⚡",
    title: "30-min Free Fast Charge",
    requiredPoints: 600,
    description: "Free 30-min DC fast charge at any ChargeGo station nationwide.",
    category: "EV",
  },
  {
    id: "reward-3",
    merchantName: "Mi Eco Store",
    merchantIcon: "💨",
    title: "Mi Air Purifier Filter — 50% off",
    requiredPoints: 800,
    description: "Genuine HEPA filter for Mi Air Purifier 3/4/Pro. Free shipping.",
    category: "Eco Goods",
  },
  {
    id: "reward-4",
    merchantName: "ZenFlow Yoga",
    merchantIcon: "🧘",
    title: "Outdoor Forest-Bath Yoga Class",
    requiredPoints: 450,
    description: "Sunrise yoga in Hutan Kota — proven HRV booster (logged via Mi Band).",
    category: "Wellness",
  },
  {
    id: "reward-5",
    merchantName: "Earthly Course",
    merchantIcon: "📚",
    title: "Climate Science 101",
    requiredPoints: 350,
    description: "10-module course on climate, energy, and personal carbon math.",
    category: "Education",
  },
  {
    id: "reward-6",
    merchantName: "BambuFiber",
    merchantIcon: "🎋",
    title: "Bamboo Tee — Eco Edition",
    requiredPoints: 950,
    description: "Limited-run organic bamboo T-shirt. -90% water vs cotton.",
    category: "Eco Goods",
  },
];

// ── Leaderboard ──
export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "MossWalker", avatar: "🌿", xp: 6420, badges: 18, cleanAir: 412, isCurrentUser: false },
  { rank: 2, name: "AirPilot", avatar: "🪂", xp: 5180, badges: 14, cleanAir: 366, isCurrentUser: false },
  { rank: 3, name: "RootRunner", avatar: "🌱", xp: 4720, badges: 12, cleanAir: 298, isCurrentUser: false },
  { rank: 4, name: "Reyn", avatar: "🌿", xp: 2450, badges: 3, cleanAir: 184, isCurrentUser: true },
  { rank: 5, name: "PineStrider", avatar: "🌲", xp: 2310, badges: 9, cleanAir: 171, isCurrentUser: false },
  { rank: 6, name: "MangroveMira", avatar: "🦩", xp: 2050, badges: 7, cleanAir: 158, isCurrentUser: false },
  { rank: 7, name: "TerraBeat", avatar: "🥁", xp: 1810, badges: 6, cleanAir: 142, isCurrentUser: false },
  { rank: 8, name: "EchoLeaf", avatar: "🍃", xp: 1390, badges: 5, cleanAir: 96, isCurrentUser: false },
];

// ── Helpers ──
export function getQuestById(id: string): Quest | undefined {
  return quests.find((q) => q.id === id);
}
export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzles.find((p) => p.id === id);
}
export function getBadgeById(id: string): Badge | undefined {
  return badges.find((b) => b.id === id);
}
