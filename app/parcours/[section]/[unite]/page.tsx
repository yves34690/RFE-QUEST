import UniteClient from "./UniteClient";

export function generateStaticParams() {
  const params = [];
  const sectionUnites: Record<string, number[]> = {
    "1": [1, 2, 3], "2": [1, 2, 3, 4], "3": [1, 2, 3, 4, 5],
    "4": [1, 2, 3, 4], "5": [1, 2, 3], "6": [1, 2, 3, 4], "7": [1, 2, 3, 4],
  };
  for (const [s, unites] of Object.entries(sectionUnites)) {
    for (const u of unites) {
      params.push({ section: s, unite: String(u) });
    }
  }
  return params;
}

export default function UnitePage() {
  return <UniteClient />;
}
