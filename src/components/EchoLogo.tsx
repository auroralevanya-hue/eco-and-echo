import { Leaf } from "lucide-react";

export default function EchoLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const fontSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  const iconSize = size === "lg" ? "w-7 h-7" : size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className={`font-bold font-display flex items-center gap-2 ${fontSize}`}>
      <div className="relative">
        <Leaf className={`${iconSize} text-emerald-400`} />
        <div className="absolute inset-0 ping-soft">
          <Leaf className={`${iconSize} text-emerald-400/40`} />
        </div>
      </div>
      <span>
        <span className="gradient-text">Eco</span>
        <span className="text-emerald-100/50 mx-0.5">&</span>
        <span className="gradient-text">Echo</span>
      </span>
    </div>
  );
}
