import { cn } from "@/lib/utils";

interface CartFeedbackPanelProps {
  title: string;
  description: string;
  tone?: "default" | "error";
  className?: string;
}

export function CartFeedbackPanel({
  title,
  description,
  tone = "default",
  className,
}: CartFeedbackPanelProps) {
  return (
    <div
      className={cn(
        "p-4 text-sm leading-7 md:p-5",
        tone === "error" ? "luxury-muted-panel text-white/62" : "showroom-subpanel text-white/62",
        className,
      )}
    >
      <p className="eyebrow">{title}</p>
      <p className="mt-3">{description}</p>
    </div>
  );
}
