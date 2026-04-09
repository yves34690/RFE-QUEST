import RevisionClient from "./RevisionClient";

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7].map((s) => ({ section: String(s) }));
}

export default function RevisionPage() {
  return <RevisionClient />;
}
