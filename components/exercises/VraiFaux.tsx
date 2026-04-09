"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";

interface VraiFauxProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  onSkip: () => void;
}

export default function VraiFaux({ question, onAnswer, onSkip }: VraiFauxProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const correctAnswer = question.answer as string;

  function handleSelect(value: string) {
    if (revealed) return;
    setSelected(value);
    setRevealed(true);
    setTimeout(() => {
      onAnswer(value === correctAnswer);
    }, 1200);
  }

  function handleSkip() {
    setSkipped(true);
    setRevealed(true);
    setTimeout(() => {
      onSkip();
    }, 300);
  }

  function btnStyle(value: string) {
    const base = "neo-border neo-shadow-md neo-hover font-heading font-bold py-4 px-8 text-lg flex-1";
    if (!revealed) return `${base} bg-neo-white`;
    if (value === correctAnswer) return `${base} bg-neo-teal-light`;
    if (value === selected && !skipped) return `${base} bg-neo-coral animate-shake`;
    return `${base} bg-neo-white opacity-50`;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading font-bold text-xl">{question.question}</h2>
      <div className="flex gap-4">
        <button
          onClick={() => handleSelect("vrai")}
          disabled={revealed}
          className={btnStyle("vrai")}
        >
          VRAI
        </button>
        <button
          onClick={() => handleSelect("faux")}
          disabled={revealed}
          className={btnStyle("faux")}
        >
          FAUX
        </button>
      </div>
      {revealed && (
        <div className="neo-border bg-neo-bg p-3 text-sm animate-pop-in">
          {skipped && (
            <p className="font-bold text-neo-teal mb-1">
              Reponse : {correctAnswer === "vrai" ? "VRAI" : "FAUX"}
            </p>
          )}
          <p>{question.explanation}</p>
        </div>
      )}
      {!revealed && (
        <button
          onClick={handleSkip}
          className="neo-border neo-shadow-sm neo-hover font-heading font-bold py-2 px-6 bg-gray-100 text-gray-600 cursor-pointer text-sm self-center"
        >
          Je ne sais pas
        </button>
      )}
    </div>
  );
}
