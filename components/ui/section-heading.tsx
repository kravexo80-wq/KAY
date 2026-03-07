import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl space-y-4",
        align === "center" && "mx-auto text-center",
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <div className="space-y-3">
        <h2 className="text-4xl leading-none text-white md:text-6xl">
          <span className="text-gradient">{title}</span>
        </h2>
        <p className="text-base leading-7 text-white/64 md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
