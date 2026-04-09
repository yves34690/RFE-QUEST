# CLAUDE.md — RFE Quest

## Mission

Jeu d'apprentissage gamifie (style Duolingo) sur la Reforme de la Facturation Electronique, brande Pennylane. Cible : collaborateurs EC et dirigeants TPE/PME.

**PRD complet** (archi, design, contenu, phases) : voir `C:\Users\ycloa\.claude\plans\linear-kindling-rivest.md`
**Sources pedagogiques** : documents dans `../` (guide Pennylane, fiches pratiques, normes XP Z12-*)

## Stack

Next.js 14+ (App Router) · TypeScript strict · Tailwind CSS · Zustand · Vitest · Vercel

## Conventions code

- TypeScript `strict: true`, pas de `any`
- Composants fonctionnels, PascalCase, un par fichier
- `'use client'` uniquement quand necessaire
- Tailwind : utiliser les tokens du `tailwind.config.ts`, jamais de hex en dur
- Questions en JSON dans `data/questions/section-N.json`
- Commits atomiques, messages en francais

## Regles contenu

- En cas de doute reglementaire : verifier sur impots.gouv.fr et legifrance.gouv.fr
- Terminologie a jour : "Plateforme Agreee" (PA), pas "PDP"
- Le PPF n'est plus une plateforme de facturation (annuaire + concentrateur uniquement)

---

*Derniere mise a jour : 2026-04-09*
