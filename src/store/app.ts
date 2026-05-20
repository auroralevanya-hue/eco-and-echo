import { create } from "zustand";

type AppState = {
  isAuthenticated: boolean;
  userName: string;
  walletAddress: string;
  miDevicePaired: boolean;
  miDeviceName: string;
  xp: number;
  level: number;
  greenPoints: number;
  streak: number;
  badges: string[];
  questsCompleted: number;
  cleanAirMinutes: number;
  totalSteps: number;
  activeQuestId: string | null;
  currentStep: number;

  // Actions
  login: (name: string, wallet: string) => void;
  pairMiDevice: (deviceName: string) => void;
  logout: () => void;
  addXP: (amount: number) => void;
  addGreenPoints: (amount: number) => void;
  addBadge: (badgeId: string) => void;
  completeQuest: (questId: string) => void;
  setActiveQuest: (questId: string | null) => void;
  setStep: (step: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  userName: "",
  walletAddress: "",
  miDevicePaired: false,
  miDeviceName: "",
  xp: 0,
  level: 1,
  greenPoints: 0,
  streak: 0,
  badges: [],
  questsCompleted: 0,
  cleanAirMinutes: 0,
  totalSteps: 0,
  activeQuestId: null,
  currentStep: 0,

  login: (name, wallet) =>
    set({
      isAuthenticated: true,
      userName: name,
      walletAddress: wallet,
      xp: 2450,
      level: 5,
      greenPoints: 1280,
      streak: 7,
      badges: ["badge-pm25-pioneer", "badge-tree-planter", "badge-clean-walk"],
      questsCompleted: 12,
      cleanAirMinutes: 184,
      totalSteps: 48230,
    }),

  pairMiDevice: (deviceName) =>
    set({ miDevicePaired: true, miDeviceName: deviceName }),

  logout: () =>
    set({
      isAuthenticated: false,
      userName: "",
      walletAddress: "",
      miDevicePaired: false,
      miDeviceName: "",
      xp: 0,
      level: 1,
      greenPoints: 0,
      streak: 0,
      badges: [],
      questsCompleted: 0,
      cleanAirMinutes: 0,
      totalSteps: 0,
      activeQuestId: null,
      currentStep: 0,
    }),

  addXP: (amount) =>
    set((s) => {
      const newXP = s.xp + amount;
      const newLevel = Math.floor(newXP / 500) + 1;
      return { xp: newXP, level: newLevel };
    }),

  addGreenPoints: (amount) =>
    set((s) => ({ greenPoints: s.greenPoints + amount })),

  addBadge: (badgeId) =>
    set((s) => ({
      badges: s.badges.includes(badgeId) ? s.badges : [...s.badges, badgeId],
    })),

  completeQuest: () =>
    set((s) => ({ questsCompleted: s.questsCompleted + 1, activeQuestId: null })),

  setActiveQuest: (questId) => set({ activeQuestId: questId }),

  setStep: (step) => set({ currentStep: step }),
}));
