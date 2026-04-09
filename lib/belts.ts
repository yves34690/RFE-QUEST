import type { Parcours } from "./types";

export interface Belt {
  id: string;
  name: string;
  color: string;
  emoji: string;
  requirement: string;
}

export const belts: Belt[] = [
  { id: "blanche", name: "Ceinture Blanche", color: "#FFFFFF", emoji: "🤍", requirement: "Inscription" },
  { id: "jaune", name: "Ceinture Jaune", color: "#FFD700", emoji: "💛", requirement: "Section 1 ≥ 80%" },
  { id: "orange", name: "Ceinture Orange", color: "#F97316", emoji: "🧡", requirement: "Section 2 ≥ 80%" },
  { id: "verte", name: "Ceinture Verte", color: "#22C55E", emoji: "💚", requirement: "Section 3 ≥ 80%" },
  { id: "bleue", name: "Ceinture Bleue", color: "#3B82F6", emoji: "💙", requirement: "Section 4 ≥ 80%" },
  { id: "marron", name: "Ceinture Marron", color: "#92400E", emoji: "🤎", requirement: "Section 5 ≥ 80%" },
  { id: "noire-1", name: "Noire 1er Dan", color: "#000000", emoji: "🖤", requirement: "Section 6 ≥ 80%" },
  { id: "noire-2", name: "Noire 2e Dan", color: "#000000", emoji: "🥋", requirement: "Section 7 ≥ 80%" },
  { id: "noire-3", name: "Noire 3e Dan — Grand Maitre", color: "#000000", emoji: "👑", requirement: "100% partout" },
];

/** Section mapped to each belt (index 1-7 = belts[1]-belts[7]) */
const BELT_SECTION_MAP_CABINET = [1, 2, 3, 4, 5, 6, 7];
const BELT_SECTION_MAP_DIRIGEANT = [1, 2, 3, 4, 5, 7, 7]; // pas de section 6

function getSectionMap(parcours: Parcours): number[] {
  return parcours === "cabinet" ? BELT_SECTION_MAP_CABINET : BELT_SECTION_MAP_DIRIGEANT;
}

/** Calculate score percentage for a section from answers record */
export function getSectionScore(
  sectionId: number,
  answers: Record<string, boolean>
): { correct: number; total: number; pct: number } {
  const sectionAnswers = Object.entries(answers).filter(([qId]) =>
    qId.startsWith(`s${sectionId}-`)
  );
  const total = sectionAnswers.length;
  const correct = sectionAnswers.filter(([, v]) => v === true).length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { correct, total, pct };
}

/** Get the current belt for a player */
export function getCurrentBelt(
  parcours: Parcours,
  answers: Record<string, boolean>
): Belt {
  const sectionMap = getSectionMap(parcours);

  // Check 3e Dan: 100% on ALL sections
  const allSections = parcours === "cabinet" ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 7];
  const allPerfect = allSections.every((s) => {
    const { pct, total } = getSectionScore(s, answers);
    return total > 0 && pct === 100;
  });
  if (allPerfect) return belts[8];

  // Check belts 7 down to 1 (noire-2 down to jaune)
  for (let i = sectionMap.length - 1; i >= 0; i--) {
    const sectionId = sectionMap[i];
    const { pct, total } = getSectionScore(sectionId, answers);
    if (total > 0 && pct >= 80) {
      return belts[i + 1];
    }
  }

  // Default: blanche
  return belts[0];
}

/** Get all belts with their unlock status */
export function getBeltsStatus(
  parcours: Parcours,
  answers: Record<string, boolean>
): { belt: Belt; unlocked: boolean; pct: number }[] {
  const sectionMap = getSectionMap(parcours);
  const allSections = parcours === "cabinet" ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 7];

  const result: { belt: Belt; unlocked: boolean; pct: number }[] = [];

  // Blanche: always unlocked
  result.push({ belt: belts[0], unlocked: true, pct: 100 });

  // Belts 1-7
  for (let i = 0; i < sectionMap.length; i++) {
    const sectionId = sectionMap[i];
    const { pct, total } = getSectionScore(sectionId, answers);
    // For dirigeant, skip belt index 6 (noire-1 = section 6)
    if (parcours === "dirigeant" && i === 5) continue;
    result.push({
      belt: belts[i + 1],
      unlocked: total > 0 && pct >= 80,
      pct,
    });
  }

  // 3e Dan
  const allPerfect = allSections.every((s) => {
    const { pct, total } = getSectionScore(s, answers);
    return total > 0 && pct === 100;
  });
  const minPct = allSections.reduce((min, s) => {
    const { pct } = getSectionScore(s, answers);
    return Math.min(min, pct);
  }, 100);
  result.push({ belt: belts[8], unlocked: allPerfect, pct: minPct });

  return result;
}
