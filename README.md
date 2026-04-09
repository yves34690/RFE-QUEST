# RFE Quest with Pennylane

Jeu d'apprentissage gamifie sur la **Reforme de la Facturation Electronique** (RFE), inspire du modele Duolingo.

## Le projet

RFE Quest permet aux collaborateurs de cabinets d'expertise comptable et aux dirigeants de TPE/PME de maitriser la reforme de la facturation electronique par le jeu : sessions courtes (3-5 min), progression gamifiee et feedback pedagogique immediat.

### Fonctionnalites

- **2 parcours** : Expert-Comptable (7 sections) et Dirigeant (6 sections)
- **218 questions** reparties sur 7 sections thematiques
- **3 types d'exercices** : QCM, Vrai/Faux, Completer le trou
- **Systeme de ceintures** (Blanche a Noire 3e Dan) base sur la maitrise par section
- **XP, coeurs et streaks** pour la motivation
- **Bouton "Je ne sais pas"** avec affichage de la reponse et explication pedagogique
- **Revision des erreurs** par section avec recap detaille
- **Design neo-brutaliste** sur palette Pennylane (teal/orange/noir)

### Sections

| # | Section | Contenu |
|---|---|---|
| 1 | Les Fondamentaux | Facture electronique, e-invoicing, e-reporting, archivage a valeur probante |
| 2 | Calendrier & Obligations | Echeances, entreprises concernees, sanctions |
| 3 | L'Ecosysteme Technique | PPF, PA, OD, annuaire central |
| 4 | Formats & Mentions | Factur-X, UBL, CII, mentions obligatoires, cycle de vie |
| 5 | E-reporting | B2C, international, frequences, simplifications LF 2026 |
| 6 | Accompagner ses Clients | Segmentation, methode DIGITAL, cartographie (cabinet uniquement) |
| 7 | Cas Pratiques | Auto-facturation, international, Pennylane, retour Italie |

### Systeme de ceintures

| Ceinture | Seuil | Section |
|---|---|---|
| Blanche | Inscription | — |
| Jaune | >= 80% | Fondamentaux |
| Orange | >= 80% | Calendrier |
| Verte | >= 80% | Ecosysteme |
| Bleue | >= 80% | Formats |
| Marron | >= 80% | E-reporting |
| Noire 1er Dan | >= 80% | Accompagnement |
| Noire 2e Dan | >= 80% | Cas Pratiques |
| Noire 3e Dan | **100%** | Grand Maitre RFE |

## Stack technique

- **Framework** : Next.js 14+ (App Router, TypeScript)
- **Styling** : Tailwind CSS (design neo-brutaliste custom)
- **State** : Zustand avec persistance localStorage
- **Deploiement** : Vercel

## Demarrage rapide

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

```
app/                  # Pages Next.js (App Router)
components/           # Composants React (UI, exercices, LessonRunner)
data/questions/       # Banques de questions JSON (sections 1-7)
lib/                  # Store Zustand, game engine, types, ceintures
```

## Licence

Projet prive — Agentique x Pennylane.
