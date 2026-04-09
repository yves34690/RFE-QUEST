"use client";

import { useState, useCallback } from "react";
import type { Question } from "@/lib/types";
import { calculateXP, PERFECT_LESSON_BONUS } from "@/lib/engine";
import { useGameStore } from "@/lib/store";
import QCM from "@/components/exercises/QCM";
import VraiFaux from "@/components/exercises/VraiFaux";
import FillBlank from "@/components/exercises/FillBlank";
import ProgressBar from "@/components/ui/ProgressBar";
import Hearts from "@/components/ui/Hearts";
import XPCounter from "@/components/ui/XPCounter";
import NeoButton from "@/components/ui/NeoButton";
import NeoCard from "@/components/ui/NeoCard";

interface LessonRunnerProps {
  questions: Question[];
  sectionId: number;
  uniteId: number;
  onComplete: () => void;
}

type AnswerResult = {
  question: Question;
  result: "correct" | "wrong" | "skipped";
};

export default function LessonRunner({
  questions,
  sectionId,
  uniteId,
  onComplete,
}: LessonRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [heartsLost, setHeartsLost] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [waitingNext, setWaitingNext] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [showRecap, setShowRecap] = useState(false);

  const { hearts, xp, addXP, loseHeart, resetHearts, completeUnite, recordAnswer, updateStreak } =
    useGameStore();

  const currentQuestion = questions[currentIndex];
  const total = questions.length;

  const handleAnswer = useCallback(
    (correct: boolean) => {
      recordAnswer(currentQuestion.id, correct);
      setResults((r) => [
        ...r,
        { question: currentQuestion, result: correct ? "correct" : "wrong" },
      ]);

      if (correct) {
        const earned = calculateXP(true, true);
        setScore((s) => s + 1);
        setXpGained((x) => x + earned);
        addXP(earned);
      } else {
        loseHeart();
        setHeartsLost((h) => h + 1);
      }

      setWaitingNext(true);
    },
    [currentQuestion, addXP, loseHeart, recordAnswer]
  );

  const handleSkip = useCallback(() => {
    recordAnswer(currentQuestion.id, false);
    setResults((r) => [
      ...r,
      { question: currentQuestion, result: "skipped" },
    ]);
    setWaitingNext(true);
  }, [currentQuestion, recordAnswer]);

  function finishLesson() {
    if (heartsLost === 0 && results.every((r) => r.result === "correct")) {
      addXP(PERFECT_LESSON_BONUS);
      setXpGained((x) => x + PERFECT_LESSON_BONUS);
    }
    completeUnite(sectionId, uniteId);
    resetHearts();
    updateStreak();
    setIsComplete(true);
  }

  function handleNext() {
    setWaitingNext(false);
    if (currentIndex + 1 >= total) {
      finishLesson();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  const toReview = results.filter((r) => r.result !== "correct");

  // Out of hearts
  if (hearts <= 0 && !isComplete) {
    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <div className="text-6xl">💔</div>
        <h2 className="font-display font-extrabold text-3xl text-center">
          Plus de coeurs !
        </h2>
        <p className="font-body text-center text-lg max-w-md">
          Revise les concepts avant de reessayer.
        </p>
        {toReview.length > 0 && (
          <ReviewList items={toReview} />
        )}
        <div className="flex gap-4">
          <NeoButton
            variant="teal"
            onClick={() => {
              resetHearts();
              setCurrentIndex(0);
              setHeartsLost(0);
              setResults([]);
              setScore(0);
            }}
          >
            Recommencer
          </NeoButton>
          <NeoButton variant="secondary" onClick={onComplete}>
            Retour
          </NeoButton>
        </div>
      </div>
    );
  }

  // Lesson complete — recap view
  if (isComplete && showRecap) {
    return (
      <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto w-full">
        <h2 className="font-display font-extrabold text-2xl">
          Questions a revoir
        </h2>
        <ReviewList items={toReview} />
        <div className="flex gap-4">
          <NeoButton onClick={() => setShowRecap(false)}>← Retour au recap</NeoButton>
          <NeoButton variant="teal" onClick={onComplete}>
            Continuer
          </NeoButton>
        </div>
      </div>
    );
  }

  // Lesson complete screen
  if (isComplete) {
    const perfect = heartsLost === 0 && results.every((r) => r.result === "correct");
    return (
      <div className="flex flex-col items-center gap-6 p-8 animate-pop-in">
        <div className="text-6xl">{perfect ? "🌟" : "✅"}</div>
        <h2 className="font-display font-extrabold text-3xl text-center">
          {perfect ? "Lecon parfaite !" : "Lecon terminee !"}
        </h2>
        <div className="flex gap-8 items-center">
          <div className="text-center">
            <p className="font-mono text-3xl font-bold text-neo-orange">
              +{xpGained}
            </p>
            <p className="text-sm text-gray-600">XP gagnes</p>
          </div>
          <div className="text-center">
            <p className="font-mono text-3xl font-bold text-neo-teal">
              {score}/{total}
            </p>
            <p className="text-sm text-gray-600">Bonnes reponses</p>
          </div>
        </div>
        {perfect && (
          <p className="font-mono text-sm text-neo-orange">
            Bonus lecon parfaite : +{PERFECT_LESSON_BONUS} XP
          </p>
        )}
        <div className="flex gap-4 flex-wrap justify-center">
          {toReview.length > 0 && (
            <NeoButton variant="secondary" onClick={() => setShowRecap(true)}>
              Revoir mes erreurs ({toReview.length})
            </NeoButton>
          )}
          <NeoButton onClick={onComplete}>Continuer</NeoButton>
        </div>
      </div>
    );
  }

  // Render exercise
  function renderExercise() {
    if (!currentQuestion) return null;
    const props = { key: currentQuestion.id, question: currentQuestion, onAnswer: handleAnswer, onSkip: handleSkip };
    switch (currentQuestion.type) {
      case "qcm":
        return <QCM {...props} />;
      case "vrai-faux":
        return <VraiFaux {...props} />;
      case "fill-blank":
        return <FillBlank {...props} />;
      default:
        return <p>Type d&apos;exercice non supporte : {currentQuestion.type}</p>;
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Nav header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <a
            href="/"
            className="neo-border neo-shadow-sm neo-hover bg-neo-white px-2 py-1 cursor-pointer text-lg leading-none"
            title="Accueil"
          >
            🏠
          </a>
          <button
            onClick={() => setShowNav(!showNav)}
            className="neo-border neo-shadow-sm neo-hover bg-neo-white px-3 py-1 font-mono text-sm cursor-pointer"
          >
            ☰
          </button>
        </div>
        <ProgressBar current={currentIndex} total={total} className="flex-1 mx-4" />
        <Hearts current={hearts} max={3} />
        <XPCounter xp={xp} />
      </div>

      {/* Dropdown nav */}
      {showNav && (
        <div className="neo-border neo-shadow-md bg-neo-white p-4 animate-pop-in flex flex-col gap-2">
          <button
            onClick={() => { setShowNav(false); onComplete(); }}
            className="text-left font-body hover:text-neo-teal cursor-pointer py-1"
          >
            ← Retour a la section
          </button>
          <hr className="border-black/10" />
          <p className="font-mono text-xs text-gray-500">
            Question {currentIndex + 1}/{total} · {score} bonnes reponses
          </p>
          {results.length > 0 && (
            <>
              <hr className="border-black/10" />
              <p className="font-mono text-xs text-gray-500">
                ✓ {results.filter(r => r.result === "correct").length} correctes ·
                ✗ {results.filter(r => r.result === "wrong").length} erreurs ·
                ? {results.filter(r => r.result === "skipped").length} passees
              </p>
            </>
          )}
        </div>
      )}

      {/* Question counter */}
      <p className="font-mono text-sm text-gray-500">
        Question {currentIndex + 1} / {total}
      </p>

      {/* Exercise */}
      {renderExercise()}

      {/* Next button (shown after answer) */}
      {waitingNext && (
        <div className="flex justify-end animate-pop-in">
          <NeoButton onClick={handleNext}>Suivant →</NeoButton>
        </div>
      )}
    </div>
  );
}

/** Recap list of questions to review */
function ReviewList({ items }: { items: AnswerResult[] }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {items.map(({ question, result }) => (
        <NeoCard
          key={question.id}
          color="white"
          className={`${result === "skipped" ? "border-l-4 border-l-neo-orange" : "border-l-4 border-l-neo-coral"}`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2 py-0.5 neo-border bg-gray-100">
                {result === "skipped" ? "? Passee" : "✗ Erreur"}
              </span>
              <span className="font-mono text-xs text-gray-400">
                {question.type}
              </span>
            </div>
            <p className="font-heading font-bold text-sm">
              {question.question}
            </p>
            <p className="text-sm text-neo-teal">
              <span className="font-bold">Reponse :</span>{" "}
              {typeof question.answer === "number" && question.options
                ? (question.options as string[])[question.answer]
                : String(question.answer)}
            </p>
            <p className="text-xs text-gray-600">{question.explanation}</p>
          </div>
        </NeoCard>
      ))}
    </div>
  );
}
