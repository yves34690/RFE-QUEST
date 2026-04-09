"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Parcours, UserProgress } from "./types";

const INITIAL_STATE: UserProgress = {
  parcours: null,
  xp: 0,
  hearts: 3,
  maxHearts: 3,
  sectionsCompleted: [],
  unitesCompleted: [],
  currentStreak: 0,
  lastPlayedDate: null,
  answers: {},
};

interface GameStore extends UserProgress {
  setParcours: (p: Parcours) => void;
  addXP: (amount: number) => void;
  loseHeart: () => void;
  resetHearts: () => void;
  completeUnite: (sectionId: number, uniteId: number) => void;
  completeSection: (sectionId: number) => void;
  recordAnswer: (questionId: string, correct: boolean) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setParcours: (p) => set({ parcours: p }),

      addXP: (amount) => set((s) => ({ xp: s.xp + amount })),

      loseHeart: () =>
        set((s) => ({ hearts: Math.max(0, s.hearts - 1) })),

      resetHearts: () => set((s) => ({ hearts: s.maxHearts })),

      completeUnite: (sectionId, uniteId) =>
        set((s) => {
          const key = `${sectionId}-${uniteId}`;
          if (s.unitesCompleted.includes(key)) return s;
          return { unitesCompleted: [...s.unitesCompleted, key] };
        }),

      completeSection: (sectionId) =>
        set((s) => {
          if (s.sectionsCompleted.includes(sectionId)) return s;
          return {
            sectionsCompleted: [...s.sectionsCompleted, sectionId],
          };
        }),

      recordAnswer: (questionId, correct) =>
        set((s) => ({
          answers: { ...s.answers, [questionId]: correct },
        })),

      updateStreak: () => {
        const today = new Date().toISOString().split("T")[0];
        const last = get().lastPlayedDate;
        if (last === today) return;

        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0];

        set((s) => ({
          lastPlayedDate: today,
          currentStreak: last === yesterday ? s.currentStreak + 1 : 1,
        }));
      },

      resetProgress: () => set(INITIAL_STATE),
    }),
    { name: "rfe-quest-progress" }
  )
);
