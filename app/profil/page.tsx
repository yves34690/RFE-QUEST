"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/store";
import { getCurrentBelt, getBeltsStatus } from "@/lib/belts";
import BeltBadge from "@/components/ui/BeltBadge";
import NeoCard from "@/components/ui/NeoCard";
import NeoButton from "@/components/ui/NeoButton";
import XPCounter from "@/components/ui/XPCounter";
import HydrationGuard from "@/components/HydrationGuard";

function ProfilContent() {
  const router = useRouter();
  const { parcours, xp, answers, currentStreak } = useGameStore();

  if (!parcours) {
    router.push("/");
    return null;
  }

  const currentBelt = getCurrentBelt(parcours, answers);
  const allBelts = getBeltsStatus(parcours, answers);

  return (
    <div className="flex flex-col flex-1 p-6 max-w-2xl mx-auto w-full gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <a
          href="/map"
          className="neo-border neo-shadow-sm neo-hover bg-neo-white px-2 py-1 cursor-pointer text-lg leading-none"
          title="Carte"
        >
          🏠
        </a>
        <h1 className="font-display font-extrabold text-3xl">Mon Profil</h1>
      </div>

      {/* Current belt */}
      <NeoCard color="white" className="text-center">
        <p className="font-mono text-sm text-gray-500 mb-3">Niveau actuel</p>
        <div className="mb-4">
          <BeltBadge belt={currentBelt} size="lg" />
        </div>
        <div className="flex justify-center gap-8">
          <div>
            <XPCounter xp={xp} />
          </div>
          {currentStreak > 0 && (
            <p className="font-mono font-bold text-lg">
              🔥 {currentStreak}j
            </p>
          )}
        </div>
      </NeoCard>

      {/* All belts progression */}
      <h2 className="font-heading font-bold text-xl">Progression des ceintures</h2>
      <div className="flex flex-col gap-3">
        {allBelts.map(({ belt, unlocked, pct }) => (
          <NeoCard
            key={belt.id}
            color="white"
            className={!unlocked ? "opacity-60" : ""}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{unlocked ? belt.emoji : "🔒"}</span>
              <div className="flex-1">
                <p className={`font-heading font-bold ${unlocked ? "" : "text-gray-400"}`}>
                  {belt.name}
                </p>
                <p className="font-mono text-xs text-gray-500">
                  {belt.requirement}
                </p>
              </div>
              <div className="text-right">
                {belt.id === "blanche" ? (
                  <span className="font-mono text-sm text-neo-teal">✓</span>
                ) : belt.id === "noire-3" ? (
                  <span className={`font-mono text-sm ${unlocked ? "text-neo-orange font-bold" : "text-gray-400"}`}>
                    {unlocked ? "👑 100%" : `${pct}%`}
                  </span>
                ) : (
                  <div className="flex flex-col items-end">
                    <span className={`font-mono text-sm ${unlocked ? "text-neo-teal" : "text-gray-400"}`}>
                      {pct > 0 ? `${pct}%` : "—"}
                    </span>
                    {pct > 0 && pct < 80 && (
                      <span className="font-mono text-xs text-neo-coral">
                        {80 - pct}% restants
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </NeoCard>
        ))}
      </div>

      <div className="text-center">
        <NeoButton variant="secondary" onClick={() => router.push("/map")}>
          ← Retour a la carte
        </NeoButton>
      </div>
    </div>
  );
}

export default function ProfilPage() {
  return (
    <HydrationGuard>
      <ProfilContent />
    </HydrationGuard>
  );
}
