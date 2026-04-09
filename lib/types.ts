export type ExerciseType =
  | "qcm"
  | "vrai-faux"
  | "fill-blank"
  | "tap-pairs"
  | "order-steps"
  | "scenario"
  | "who-am-i";

export type Parcours = "cabinet" | "dirigeant";

export interface Question {
  id: string;
  type: ExerciseType;
  section: number;
  unite: number;
  difficulty: 1 | 2 | 3;
  question: string;
  /** QCM: 4 options. Vrai/Faux: ["Vrai", "Faux"]. TapPairs: [{left, right}]. OrderSteps: string[]. */
  options?: string[] | { left: string; right: string }[];
  /** Index (QCM), "vrai"/"faux", string (fill-blank), number[] (order-steps) */
  answer: number | string | number[];
  explanation: string;
  /** Only for cabinet parcours */
  cabinetOnly?: boolean;
}

export interface Section {
  id: number;
  title: string;
  subtitle: string;
  unites: Unite[];
  cabinetOnly?: boolean;
}

export interface Unite {
  id: number;
  sectionId: number;
  title: string;
  questionCount: number;
}

export interface UserProgress {
  parcours: Parcours | null;
  xp: number;
  hearts: number;
  maxHearts: number;
  sectionsCompleted: number[];
  unitesCompleted: string[]; // "section-unite" format
  currentStreak: number;
  lastPlayedDate: string | null;
  answers: Record<string, boolean>; // questionId -> correct
}

export interface LessonState {
  questions: Question[];
  currentIndex: number;
  score: number;
  heartsLost: number;
  answers: { questionId: string; correct: boolean }[];
  isComplete: boolean;
}
