"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";

interface FillBlankProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  onSkip: () => void;
}

export default function FillBlank({ question, onAnswer, onSkip }: FillBlankProps) {
  const [value, setValue] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const correctAnswer = String(question.answer).toLowerCase().trim();

  function handleValidate() {
    if (revealed || !value.trim()) return;
    setRevealed(true);
    const isCorrect = value.toLowerCase().trim() === correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  }

  function handleSkip() {
    setSkipped(true);
    setRevealed(true);
    setTimeout(() => {
      onSkip();
    }, 300);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleValidate();
  }

  const isCorrect = !skipped && value.toLowerCase().trim() === correctAnswer;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading font-bold text-xl">{question.question}</h2>
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={revealed}
          placeholder="Votre reponse..."
          className={`neo-border neo-shadow-sm p-3 font-body text-lg flex-1 outline-none
            ${
              revealed
                ? skipped
                  ? "bg-gray-100"
                  : isCorrect
                    ? "bg-neo-teal-light"
                    : "bg-neo-coral animate-shake"
                : "bg-neo-white focus:shadow-[5px_5px_0_0_#000] focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all"
            }
          `}
        />
      </div>
      {revealed && (
        <div className="neo-border bg-neo-bg p-3 text-sm animate-pop-in">
          {(skipped || !isCorrect) && (
            <p className="font-bold text-neo-teal mb-1">
              Reponse : {question.answer}
            </p>
          )}
          <p>{question.explanation}</p>
        </div>
      )}
      {!revealed && (
        <div className="flex gap-3">
          <button
            onClick={handleValidate}
            disabled={!value.trim()}
            className={`neo-border neo-shadow-md neo-hover font-heading font-bold py-3 px-6 flex-1 ${
              value.trim()
                ? "bg-neo-orange cursor-pointer"
                : "bg-gray-200 cursor-not-allowed opacity-50"
            }`}
          >
            Valider
          </button>
          <button
            onClick={handleSkip}
            className="neo-border neo-shadow-sm neo-hover font-heading font-bold py-3 px-6 bg-gray-100 text-gray-600 cursor-pointer text-sm"
          >
            Je ne sais pas
          </button>
        </div>
      )}
    </div>
  );
}
