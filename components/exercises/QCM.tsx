"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";

interface QCMProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
  onSkip: () => void;
}

export default function QCM({ question, onAnswer, onSkip }: QCMProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const options = question.options as string[];
  const correctIndex = question.answer as number;

  function handleSelect(index: number) {
    if (revealed) return;
    setSelected(index);
  }

  function handleValidate() {
    if (selected === null || revealed) return;
    setRevealed(true);
    setTimeout(() => {
      onAnswer(selected === correctIndex);
    }, 1200);
  }

  function handleSkip() {
    setSkipped(true);
    setRevealed(true);
    // Don't call onSkip yet — wait for user to click Suivant (handled by LessonRunner via timeout)
    setTimeout(() => {
      onSkip();
    }, 300);
  }

  function optionStyle(index: number) {
    const base =
      "neo-border neo-shadow-sm neo-hover p-4 text-left font-body w-full";
    if (!revealed) {
      return `${base} ${
        selected === index ? "bg-neo-teal-light" : "bg-neo-white"
      }`;
    }
    if (index === correctIndex) return `${base} bg-neo-teal-light`;
    if (index === selected && !skipped) return `${base} bg-neo-coral animate-shake`;
    return `${base} bg-neo-white opacity-50`;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading font-bold text-xl">{question.question}</h2>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={revealed}
            className={optionStyle(i)}
          >
            <span className="font-mono font-bold mr-3">
              {String.fromCharCode(65 + i)})
            </span>
            {opt}
          </button>
        ))}
      </div>
      {revealed && (
        <div className="neo-border bg-neo-bg p-3 text-sm animate-pop-in">
          {skipped && (
            <p className="font-bold text-neo-teal mb-1">
              Reponse : {options[correctIndex]}
            </p>
          )}
          <p>{question.explanation}</p>
        </div>
      )}
      {!revealed && (
        <div className="flex gap-3">
          <button
            onClick={handleValidate}
            disabled={selected === null}
            className={`neo-border neo-shadow-md neo-hover font-heading font-bold py-3 px-6 flex-1 ${
              selected !== null
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
