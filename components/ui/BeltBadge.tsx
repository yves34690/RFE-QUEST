import type { Belt } from "@/lib/belts";

interface BeltBadgeProps {
  belt: Belt;
  size?: "sm" | "md" | "lg";
}

export default function BeltBadge({ belt, size = "md" }: BeltBadgeProps) {
  const sizeStyles = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-1.5",
    lg: "text-lg px-4 py-2",
  };

  return (
    <span
      className={`neo-border neo-shadow-sm font-mono font-bold inline-flex items-center gap-1.5 ${sizeStyles[size]}`}
      style={{ backgroundColor: belt.color, color: belt.color === "#000000" || belt.color === "#92400E" ? "#FFF" : "#000" }}
    >
      {belt.emoji} {belt.name}
    </span>
  );
}
