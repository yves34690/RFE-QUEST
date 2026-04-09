interface HeartsProps {
  current: number;
  max: number;
}

export default function Hearts({ current, max }: HeartsProps) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`text-2xl transition-transform duration-200 ${
            i < current ? "text-neo-coral scale-100" : "text-gray-300 scale-90"
          }`}
        >
          {i < current ? "\u2665" : "\u2661"}
        </span>
      ))}
    </div>
  );
}
