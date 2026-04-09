"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { pickLessonQuestions } from "@/lib/engine";
import LessonRunner from "@/components/LessonRunner";
import s1 from "@/data/questions/section-1.json";
import s2 from "@/data/questions/section-2.json";
import s3 from "@/data/questions/section-3.json";
import s4 from "@/data/questions/section-4.json";
import s5 from "@/data/questions/section-5.json";
import s6 from "@/data/questions/section-6.json";
import s7 from "@/data/questions/section-7.json";
import type { Question } from "@/lib/types";

const allQuestions = [...s1, ...s2, ...s3, ...s4, ...s5, ...s6, ...s7] as Question[];

export default function UnitePage() {
  const params = useParams();
  const router = useRouter();
  const sectionId = Number(params.section);
  const uniteId = Number(params.unite);

  const lessonQuestions = useMemo(() => {
    const pool = allQuestions.filter(
      (q) => q.section === sectionId && q.unite === uniteId
    );
    if (pool.length === 0) return [];
    return pickLessonQuestions(pool, Math.min(8, pool.length));
  }, [sectionId, uniteId]);

  if (lessonQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 p-8 gap-4">
        <p className="font-display font-extrabold text-2xl">
          Pas encore de questions pour cette unite !
        </p>
        <p className="font-body text-gray-600">
          Le contenu sera bientot disponible.
        </p>
        <button
          onClick={() => router.push(`/parcours/${sectionId}`)}
          className="neo-border neo-shadow-md neo-hover bg-neo-orange font-heading font-bold py-3 px-6 cursor-pointer"
        >
          ← Retour
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 p-6">
      <LessonRunner
        questions={lessonQuestions}
        sectionId={sectionId}
        uniteId={uniteId}
        onComplete={() => router.push(`/parcours/${sectionId}`)}
      />
    </div>
  );
}
