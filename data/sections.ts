import type { Section } from "@/lib/types";

export const sections: Section[] = [
  {
    id: 1,
    title: "Les Fondamentaux",
    subtitle: "Qu'est-ce que la facture electronique ?",
    unites: [
      { id: 1, sectionId: 1, title: "Facture electronique : de quoi parle-t-on ?", questionCount: 8 },
      { id: 2, sectionId: 1, title: "Les 2 piliers : e-invoicing & e-reporting", questionCount: 8 },
      { id: 3, sectionId: 1, title: "Pourquoi cette reforme ?", questionCount: 8 },
    ],
  },
  {
    id: 2,
    title: "Calendrier & Obligations",
    subtitle: "Qui ? Quand ? Quelles sanctions ?",
    unites: [
      { id: 1, sectionId: 2, title: "Qui est concerne ?", questionCount: 8 },
      { id: 2, sectionId: 2, title: "Le calendrier officiel", questionCount: 8 },
      { id: 3, sectionId: 2, title: "Pieges classiques", questionCount: 8 },
      { id: 4, sectionId: 2, title: "Sanctions", questionCount: 8 },
    ],
  },
  {
    id: 3,
    title: "L'Ecosysteme Technique",
    subtitle: "PPF, PA, OD, annuaire...",
    unites: [
      { id: 1, sectionId: 3, title: "Le PPF : annuaire + concentrateur", questionCount: 8 },
      { id: 2, sectionId: 3, title: "Les Plateformes Agreees (PA)", questionCount: 8 },
      { id: 3, sectionId: 3, title: "Les Operateurs de Dematerialisation", questionCount: 8 },
      { id: 4, sectionId: 3, title: "L'annuaire central", questionCount: 8 },
      { id: 5, sectionId: 3, title: "Choisir sa PA", questionCount: 8 },
    ],
  },
  {
    id: 4,
    title: "Formats & Mentions",
    subtitle: "Factur-X, UBL, CII et mentions obligatoires",
    unites: [
      { id: 1, sectionId: 4, title: "Factur-X en detail", questionCount: 8 },
      { id: 2, sectionId: 4, title: "UBL et CII", questionCount: 8 },
      { id: 3, sectionId: 4, title: "Les 4 nouvelles mentions obligatoires", questionCount: 8 },
      { id: 4, sectionId: 4, title: "Cycle de vie d'une facture", questionCount: 8 },
    ],
  },
  {
    id: 5,
    title: "E-reporting",
    subtitle: "B2C, international et declarations",
    unites: [
      { id: 1, sectionId: 5, title: "Qu'est-ce que le e-reporting ?", questionCount: 8 },
      { id: 2, sectionId: 5, title: "Frequence et modalites", questionCount: 8 },
      { id: 3, sectionId: 5, title: "Simplifications recentes", questionCount: 8 },
    ],
  },
  {
    id: 6,
    title: "Accompagner ses Clients",
    subtitle: "Segmentation, methode DIGITAL, cartographie",
    cabinetOnly: true,
    unites: [
      { id: 1, sectionId: 6, title: "Segmenter son portefeuille", questionCount: 8 },
      { id: 2, sectionId: 6, title: "La methode DIGITAL", questionCount: 8 },
      { id: 3, sectionId: 6, title: "Cartographier les flux client", questionCount: 8 },
      { id: 4, sectionId: 6, title: "Recommander la bonne solution", questionCount: 8 },
    ],
  },
  {
    id: 7,
    title: "Cas Pratiques",
    subtitle: "Scenarios avances et mise en situation",
    unites: [
      { id: 1, sectionId: 7, title: "Auto-facturation & affacturage", questionCount: 8 },
      { id: 2, sectionId: 7, title: "Factures internationales", questionCount: 8 },
      { id: 3, sectionId: 7, title: "La facturation dans Pennylane", questionCount: 8 },
      { id: 4, sectionId: 7, title: "Retour d'experience Italie", questionCount: 8 },
    ],
  },
];
