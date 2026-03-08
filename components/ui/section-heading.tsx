import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  note?: string;
  isRtl?: boolean;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  note,
  isRtl = false,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-5",
        align === "center" && "mx-auto text-center",
        align !== "center" && isRtl && "text-right",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center",
          align !== "center" && isRtl && "flex-row-reverse justify-start",
        )}
      >
        <span className="h-px w-10 bg-[linear-gradient(90deg,transparent,rgba(190,169,124,0.75),rgba(255,255,255,0.12))]" />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <div className="space-y-4">
        <h2 className="max-w-4xl text-4xl leading-[0.94] text-white md:text-6xl xl:text-7xl">
          <span className="text-gradient">{title}</span>
        </h2>
        <p className="max-w-2xl text-base leading-7 text-white/60 md:text-lg md:leading-8">
          {description}
        </p>
      </div>
      {note ? (
        <div
          className={cn(
            "showroom-subpanel max-w-xl px-4 py-3 text-sm leading-6 text-white/48",
            align === "center" && "mx-auto",
            align !== "center" && isRtl && "text-right",
          )}
        >
          {note}
        </div>
      ) : null}
    </div>
  );
}
