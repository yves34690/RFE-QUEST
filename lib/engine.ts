import type { Question, ExerciseType } from "./types";

/** XP awarded per answer */
export function calculateXP(correct: boolean, firstTry: boolean): number {
  if (!correct) return 0;
  return firstTry ? 15 : 10;
}

/** Bonus XP for a perfect lesson (no errors) */
export const PERFECT_LESSON_BONUS = 50;

/** Shuffle an array (Fisher-Yates) */
export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Pick lesson questions: 8-10 questions from a pool,
 * ensuring no two consecutive questions have the same type.
 */
export function pickLessonQuestions(
  pool: Question[],
  count: number = 8
): Question[] {
  const shuffled = shuffle(pool);
  const picked: Question[] = [];

  // Greedy: pick questions avoiding consecutive same type
  let lastType: ExerciseType | null = null;
  const remaining = [...shuffled];

  while (picked.length < count && remaining.length > 0) {
    const idx = remaining.findIndex((q) => q.type !== lastType);
    if (idx === -1) {
      // No choice, take first available
      picked.push(remaining.shift()!);
    } else {
      picked.push(remaining.splice(idx, 1)[0]);
    }
    lastType = picked[picked.length - 1].type;
  }

  return picked;
}

/** Check if a section is unlocked (previous section completed or first section) */
export function isSectionUnlocked(
  sectionId: number,
  completedSections: number[]
): boolean {
  if (sectionId === 1) return true;
  return completedSections.includes(sectionId - 1);
}

/** Check if a unite is unlocked */
export function isUniteUnlocked(
  sectionId: number,
  uniteId: number,
  completedUnites: string[],
  completedSections: number[]
): boolean {
  if (uniteId === 1) return isSectionUnlocked(sectionId, completedSections);
  return completedUnites.includes(`${sectionId}-${uniteId - 1}`);
}
