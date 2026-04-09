interface NeoCardProps {
  children: React.ReactNode;
  color?: "white" | "teal" | "teal-light" | "orange";
  hoverable?: boolean;
  className?: string;
}

const colorStyles = {
  white: "bg-neo-white",
  teal: "bg-neo-teal text-neo-white",
  "teal-light": "bg-neo-teal-light",
  orange: "bg-neo-orange",
};

export default function NeoCard({
  children,
  color = "white",
  hoverable = false,
  className = "",
}: NeoCardProps) {
  return (
    <div
      className={`
        neo-border neo-shadow-md p-6
        ${colorStyles[color]}
        ${hoverable ? "neo-hover cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
