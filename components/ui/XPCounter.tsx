interface XPCounterProps {
  xp: number;
  gained?: number;
}

export default function XPCounter({ xp, gained }: XPCounterProps) {
  return (
    <div className="flex items-center gap-2 font-mono font-bold text-neo-orange">
      <span className="text-xl">{xp} XP</span>
      {gained !== undefined && gained > 0 && (
        <span className="text-sm animate-pop-in bg-neo-orange text-neo-black neo-border px-2 py-0.5">
          +{gained}
        </span>
      )}
    </div>
  );
}
