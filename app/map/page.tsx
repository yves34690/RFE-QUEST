"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGameStore } from "@/lib/store";
import { sections } from "@/data/sections";
import { isSectionUnlocked } from "@/lib/engine";
import NeoCard from "@/components/ui/NeoCard";
import XPCounter from "@/components/ui/XPCounter";
import NeoButton from "@/components/ui/NeoButton";
import BeltBadge from "@/components/ui/BeltBadge";
import { getCurrentBelt } from "@/lib/belts";

import HydrationGuard from "@/components/HydrationGuard";

function MapContent() {
  const router = useRouter();
  const { parcours, xp, sectionsCompleted, unitesCompleted, currentStreak, answers, resetProgress } =
    useGameStore();

  if (!parcours) {
    router.push("/");
    return null;
  }

  const currentBelt = getCurrentBelt(parcours, answers);

  const visibleSections = sections.filter(
    (s) => !s.cabinetOnly || parcours === "cabinet"
  );

  function handleSectionClick(sectionId: number) {
    if (!isSectionUnlocked(sectionId, sectionsCompleted)) return;
    router.push(`/parcours/${sectionId}`);
  }

  // Count correct/total answers per section from the store
  function getSectionStats(sectionId: number) {
    const sectionAnswers = Object.entries(answers).filter(([qId]) =>
      qId.startsWith(`s${sectionId}-`)
    );
    const total = sectionAnswers.length;
    const correct = sectionAnswers.filter(([, v]) => v === true).length;
    const wrong = sectionAnswers.filter(([, v]) => v === false).length;
    return { total, correct, wrong };
  }

  return (
    <div className="flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="neo-border neo-shadow-sm neo-hover bg-neo-white px-2 py-1 cursor-pointer text-lg leading-none"
            title="Accueil"
          >
            🏠
          </Link>
          <div>
            <Link href="/" className="font-display font-extrabold text-3xl hover:text-neo-teal transition-colors">
              RFE QUEST
            </Link>
            <p className="font-mono text-sm text-gray-500">
              Parcours {parcours === "cabinet" ? "Expert-Comptable" : "Dirigeant"}
              {currentStreak > 0 && ` · 🔥 ${currentStreak}j`}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <XPCounter xp={xp} />
          <Link href="/profil" className="cursor-pointer">
            <BeltBadge belt={currentBelt} size="sm" />
          </Link>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-4">
        {visibleSections.map((section) => {
          const unlocked = isSectionUnlocked(section.id, sectionsCompleted);
          const completed = sectionsCompleted.includes(section.id);
          const unitesInSection = section.unites.length;
          const unitesComplete = section.unites.filter((u) =>
            unitesCompleted.includes(`${section.id}-${u.id}`)
          ).length;
          const stats = getSectionStats(section.id);

          return (
            <NeoCard
              key={section.id}
              hoverable={unlocked}
              color={completed ? "teal" : unlocked ? "white" : "white"}
              className={!unlocked ? "opacity-50" : ""}
            >
              <div className="flex items-start gap-4">
                <span className="font-display font-extrabold text-4xl opacity-30">
                  {section.id}
                </span>
                <div className="flex-1">
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    disabled={!unlocked}
                    className="w-full text-left cursor-pointer disabled:cursor-not-allowed"
                  >
                    <h2 className={`font-heading font-bold text-lg ${completed ? "text-white" : ""}`}>
                      {section.title}
                      {completed && " ✓"}
                      {!unlocked && " 🔒"}
                    </h2>
                    <p className={`font-body text-sm ${completed ? "text-white/80" : "text-gray-600"}`}>
                      {section.subtitle}
                    </p>
                  </button>

                  {unlocked && (
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <span className={`font-mono text-xs ${completed ? "text-white/70" : "text-gray-400"}`}>
                        {unitesComplete}/{unitesInSection} unites
                      </span>
                      {stats.total > 0 && (
                        <span className={`font-mono text-xs ${completed ? "text-white/90" : "text-neo-teal"}`}>
                          ✓ {stats.correct}/{stats.total} reponses
                        </span>
                      )}
                      {stats.wrong > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/revision/${section.id}`);
                          }}
                          className={`font-mono text-xs underline cursor-pointer ${
                            completed
                              ? "text-neo-orange font-bold hover:text-white"
                              : "text-neo-coral hover:text-neo-orange"
                          }`}
                        >
                          {stats.wrong} a revoir →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </NeoCard>
          );
        })}
      </div>

      {/* Reset */}
      <div className="mt-8 text-center">
        <NeoButton
          variant="secondary"
          size="sm"
          onClick={() => {
            resetProgress();
            router.push("/");
          }}
        >
          Recommencer a zero
        </NeoButton>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <HydrationGuard>
      <MapContent />
    </HydrationGuard>
  );
}
