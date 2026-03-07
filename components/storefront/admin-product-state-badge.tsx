import { cn } from "@/lib/utils";

interface AdminProductStateBadgeProps {
  label: string;
  active?: boolean;
  tone?: "neutral" | "success" | "accent";
  className?: string;
}

const toneClasses = {
  neutral: "border-white/10 bg-white/[0.03] text-white/56",
  success: "border-[#8cb18c]/28 bg-[#8cb18c]/10 text-[#d9ecd6]",
  accent: "border-[#b79d67]/26 bg-[#b79d67]/10 text-[#f2e6c3]",
} as const;

export function AdminProductStateBadge({
  label,
  active = false,
  tone = "neutral",
  className,
}: AdminProductStateBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em]",
        active ? toneClasses[tone] : toneClasses.neutral,
        className,
      )}
    >
      {label}
    </span>
  );
}
