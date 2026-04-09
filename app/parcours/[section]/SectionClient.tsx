"use client";

import { useParams, useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { sections } from "@/data/sections";
import { isUniteUnlocked } from "@/lib/engine";
import NeoCard from "@/components/ui/NeoCard";
import NeoButton from "@/components/ui/NeoButton";
import HydrationGuard from "@/components/HydrationGuard";

function SectionContent() {
  const params = useParams();
  const router = useRouter();
  const sectionId = Number(params.section);
  const { unitesCompleted, sectionsCompleted, completeSection } = useGameStore();

  const section = sections.find((s) => s.id === sectionId);
  if (!section) {
    router.push("/map");
    return null;
  }

  function handleUniteClick(uniteId: number) {
    if (!isUniteUnlocked(sectionId, uniteId, unitesCompleted, sectionsCompleted)) return;
    router.push(`/parcours/${sectionId}/${uniteId}`);
  }

  const allComplete = section.unites.every((u) =>
    unitesCompleted.includes(`${sectionId}-${u.id}`)
  );

  if (allComplete && !sectionsCompleted.includes(sectionId)) {
    completeSection(sectionId);
  }

  return (
    <div className="flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full gap-6">
      <div className="flex items-center gap-4">
        <NeoButton variant="secondary" size="sm" onClick={() => router.push("/map")}>
          ← Carte
        </NeoButton>
        <div>
          <h1 className="font-display font-extrabold text-2xl">
            Section {sectionId} : {section.title}
          </h1>
          <p className="font-body text-sm text-gray-600">{section.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {section.unites.map((unite) => {
          const unlocked = isUniteUnlocked(sectionId, unite.id, unitesCompleted, sectionsCompleted);
          const completed = unitesCompleted.includes(`${sectionId}-${unite.id}`);

          return (
            <NeoCard
              key={unite.id}
              hoverable={unlocked}
              color={completed ? "teal-light" : "white"}
              className={!unlocked ? "opacity-50" : ""}
            >
              <button
                onClick={() => handleUniteClick(unite.id)}
                disabled={!unlocked}
                className="w-full text-left cursor-pointer disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-lg w-8">{unite.id}.</span>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold">
                      {unite.title}
                      {completed && " ✓"}
                      {!unlocked && " 🔒"}
                    </h3>
                    <p className="font-mono text-xs text-gray-500">{unite.questionCount} questions</p>
                  </div>
                </div>
              </button>
            </NeoCard>
          );
        })}
      </div>

      {allComplete && (
        <div className="neo-border neo-shadow-lg bg-neo-teal-light p-6 text-center animate-pop-in">
          <p className="font-display font-extrabold text-2xl mb-2">Section terminee ! 🎉</p>
          <NeoButton onClick={() => router.push("/map")}>Retour a la carte</NeoButton>
        </div>
      )}
    </div>
  );
}

export default function SectionClient() {
  return (
    <HydrationGuard>
      <SectionContent />
    </HydrationGuard>
  );
}
