"use client";

import { useGameStore } from "@/lib/store";
import NeoButton from "@/components/ui/NeoButton";
import NeoCard from "@/components/ui/NeoCard";
import HydrationGuard from "@/components/HydrationGuard";
import type { Parcours } from "@/lib/types";
import { useRouter } from "next/navigation";

function HomeContent() {
  const { parcours, setParcours } = useGameStore();
  const router = useRouter();

  function handleSelect(p: Parcours) {
    setParcours(p);
    router.push("/map");
  }

  // Already has a parcours selected → go to map
  if (parcours) {
    router.push("/map");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6 gap-8">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-tight mb-4">
          RFE QUEST
        </h1>
        <p className="font-heading text-xl text-neo-teal font-bold mb-2">
          with Pennylane
        </p>
        <p className="font-body text-lg text-gray-700 max-w-lg mx-auto">
          Maitrisez la reforme de la facturation electronique en jouant !
          Sessions de 3 minutes, progression gamifiee, 100% gratuit.
        </p>
      </div>

      {/* Parcours selection */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <NeoCard hoverable color="teal" className="flex-1">
          <div className="flex flex-col gap-4">
            <span className="text-4xl">🏢</span>
            <h2 className="font-heading font-bold text-xl">
              Expert-Comptable
            </h2>
            <p className="text-sm opacity-90">
              7 sections : maitrisez la reforme ET apprenez a accompagner vos
              clients dans la transition.
            </p>
            <NeoButton
              variant="secondary"
              onClick={() => handleSelect("cabinet")}
            >
              Choisir ce parcours
            </NeoButton>
          </div>
        </NeoCard>

        <NeoCard hoverable color="orange" className="flex-1">
          <div className="flex flex-col gap-4">
            <span className="text-4xl">🚀</span>
            <h2 className="font-heading font-bold text-xl">
              Dirigeant TPE/PME
            </h2>
            <p className="text-sm">
              6 sections : comprenez vos obligations et preparez votre
              entreprise a la facturation electronique.
            </p>
            <NeoButton
              variant="secondary"
              onClick={() => handleSelect("dirigeant")}
            >
              Choisir ce parcours
            </NeoButton>
          </div>
        </NeoCard>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <HydrationGuard
      fallback={
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h1 className="font-display font-extrabold text-5xl">RFE QUEST</h1>
          <p className="font-heading text-xl text-neo-teal font-bold mt-4">
            Chargement...
          </p>
        </div>
      }
    >
      <HomeContent />
    </HydrationGuard>
  );
}
