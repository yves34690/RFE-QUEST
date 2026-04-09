"use client";

import { useParams, useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { sections } from "@/data/sections";
import NeoCard from "@/components/ui/NeoCard";
import NeoButton from "@/components/ui/NeoButton";
import HydrationGuard from "@/components/HydrationGuard";
import s1 from "@/data/questions/section-1.json";
import s2 from "@/data/questions/section-2.json";
import s3 from "@/data/questions/section-3.json";
import s4 from "@/data/questions/section-4.json";
import s5 from "@/data/questions/section-5.json";
import s6 from "@/data/questions/section-6.json";
import s7 from "@/data/questions/section-7.json";
import type { Question } from "@/lib/types";

const allQuestions = [...s1, ...s2, ...s3, ...s4, ...s5, ...s6, ...s7] as Question[];

function RevisionContent() {
  const params = useParams();
  const router = useRouter();
  const sectionId = Number(params.section);
  const { answers } = useGameStore();

  const section = sections.find((s) => s.id === sectionId);
  if (!section) {
    router.push("/map");
    return null;
  }

  // Get all wrong answers for this section
  const wrongQuestionIds = Object.entries(answers)
    .filter(([qId, correct]) => qId.startsWith(`s${sectionId}-`) && !correct)
    .map(([qId]) => qId);

  const wrongQuestions = allQuestions.filter((q) =>
    wrongQuestionIds.includes(q.id)
  );

  return (
    <div className="flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full gap-6">
      <div className="flex items-center gap-3">
        <a
          href="/map"
          className="neo-border neo-shadow-sm neo-hover bg-neo-white px-2 py-1 cursor-pointer text-lg leading-none"
          title="Carte"
        >
          🏠
        </a>
        <NeoButton variant="secondary" size="sm" onClick={() => router.push("/map")}>
          ← Carte
        </NeoButton>
        <div>
          <h1 className="font-display font-extrabold text-2xl">
            Revision — Section {sectionId}
          </h1>
          <p className="font-body text-sm text-gray-600">
            {section.title} · {wrongQuestions.length} question{wrongQuestions.length > 1 ? "s" : ""} a revoir
          </p>
        </div>
      </div>

      {wrongQuestions.length === 0 ? (
        <div className="neo-border neo-shadow-md bg-neo-teal-light p-6 text-center">
          <p className="font-display font-extrabold text-xl mb-2">
            Aucune question a revoir ! 🌟
          </p>
          <p className="font-body text-sm">
            Tu as tout bon sur cette section.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {wrongQuestions.map((q) => (
            <NeoCard key={q.id} color="white" className="border-l-4 border-l-neo-coral">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 neo-border bg-gray-100">
                    {q.type}
                  </span>
                  <span className="font-mono text-xs text-gray-400">
                    Unite {q.unite}
                  </span>
                </div>
                <p className="font-heading font-bold text-sm">
                  {q.question}
                </p>
                <p className="text-sm text-neo-teal">
                  <span className="font-bold">Reponse : </span>
                  {typeof q.answer === "number" && q.options
                    ? (q.options as string[])[q.answer]
                    : String(q.answer)}
                </p>
                <p className="text-xs text-gray-600">{q.explanation}</p>
              </div>
            </NeoCard>
          ))}
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <NeoButton variant="teal" onClick={() => router.push(`/parcours/${sectionId}`)}>
          Rejouer la section
        </NeoButton>
        <NeoButton variant="secondary" onClick={() => router.push("/map")}>
          Retour a la carte
        </NeoButton>
      </div>
    </div>
  );
}

export default function RevisionPage() {
  return (
    <HydrationGuard>
      <RevisionContent />
    </HydrationGuard>
  );
}
