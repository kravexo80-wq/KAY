import type { ProductMedia, ProductTone } from "@/types/product";

import { cn } from "@/lib/utils";

interface ProductMediaFrameProps {
  media: ProductMedia;
  className?: string;
  showNote?: boolean;
  chrome?: "full" | "minimal";
  emphasis?: "default" | "hero" | "card";
}

const toneStyles: Record<
  ProductTone,
  {
    shell: string;
    haze: string;
    garment: string;
    trim: string;
  }
> = {
  obsidian: {
    shell: "bg-[linear-gradient(180deg,#121214_0%,#080809_48%,#030303_100%)]",
    haze: "bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_50%_78%,rgba(190,169,124,0.2),transparent_54%)]",
    garment:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(72,72,76,0.72)_34%,rgba(6,6,7,0.98)_100%)]",
    trim: "bg-[linear-gradient(180deg,rgba(245,235,215,0.42),transparent)]",
  },
  stone: {
    shell: "bg-[linear-gradient(180deg,#1b1b17_0%,#11110e_48%,#090908_100%)]",
    haze: "bg-[radial-gradient(circle_at_50%_18%,rgba(255,248,231,0.18),transparent_36%),radial-gradient(circle_at_50%_76%,rgba(216,189,145,0.24),transparent_54%)]",
    garment:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(178,163,140,0.72)_34%,rgba(62,54,43,0.96)_100%)]",
    trim: "bg-[linear-gradient(180deg,rgba(255,245,220,0.44),transparent)]",
  },
  bronze: {
    shell: "bg-[linear-gradient(180deg,#191311_0%,#0d0908_48%,#040303_100%)]",
    haze: "bg-[radial-gradient(circle_at_50%_16%,rgba(255,236,212,0.18),transparent_36%),radial-gradient(circle_at_50%_76%,rgba(187,134,74,0.24),transparent_54%)]",
    garment:
      "bg-[linear-gradient(180deg,rgba(255,248,238,0.22)_0%,rgba(160,104,57,0.72)_34%,rgba(47,25,13,0.96)_100%)]",
    trim: "bg-[linear-gradient(180deg,rgba(255,229,184,0.48),transparent)]",
  },
  pearl: {
    shell: "bg-[linear-gradient(180deg,#181614_0%,#0d0b09_48%,#040403_100%)]",
    haze: "bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.2),transparent_38%),radial-gradient(circle_at_50%_74%,rgba(236,226,211,0.2),transparent_56%)]",
    garment:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(212,198,183,0.72)_34%,rgba(113,98,81,0.96)_100%)]",
    trim: "bg-[linear-gradient(180deg,rgba(255,255,255,0.54),transparent)]",
  },
};

export function ProductMediaFrame({
  media,
  className,
  showNote = true,
  chrome = "full",
  emphasis = "default",
}: ProductMediaFrameProps) {
  const tone = toneStyles[media.tone];
  const isMinimal = chrome === "minimal";
  const hasImage = Boolean(media.imageUrl);

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_34px_100px_rgba(0,0,0,0.58)]",
        emphasis === "hero" &&
          "shadow-[0_54px_150px_rgba(0,0,0,0.72),0_0_90px_rgba(190,169,124,0.12)]",
        emphasis === "card" &&
          "shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(190,169,124,0.08)]",
        tone.shell,
        className,
      )}
    >
      <div className="showroom-glow-ring" />
      <div
        className={cn(
          "absolute inset-0 opacity-90",
          tone.haze,
          emphasis === "hero" && "scale-110",
        )}
      />
      {hasImage ? (
        <>
          <div className="absolute inset-[1px] overflow-hidden rounded-[inherit]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.imageUrl ?? undefined}
              alt={media.altText ?? media.label}
              className={cn(
                "h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.03]",
                emphasis === "hero" && "scale-[1.02] group-hover:scale-[1.05]",
              )}
              loading={emphasis === "hero" ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.22),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.12)_24%,rgba(0,0,0,0.42)_72%,rgba(0,0,0,0.76)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),transparent_18%,transparent_82%,rgba(255,255,255,0.04))]" />
          </div>
          <div className="absolute left-1/2 top-[12%] h-[32%] w-[56%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)] blur-[58px]" />
          <div className="absolute inset-x-[12%] bottom-[4%] h-24 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_72%)] blur-[42px]" />
          <div className="absolute inset-x-[10%] top-[7%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)]" />
          <div className="absolute inset-x-[12%] bottom-[7%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.24),transparent)]" />
          <div className="absolute inset-x-[16%] bottom-[8%] h-20 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.56),transparent_72%)] blur-xl" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_22%,transparent_78%,rgba(255,255,255,0.03))]" />
          <div className="absolute left-1/2 top-[12%] h-[38%] w-[62%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)] blur-[52px]" />
          <div className="absolute inset-x-[12%] bottom-[4%] h-20 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)] blur-[40px]" />
          <div className="absolute inset-x-[24%] top-[14%] bottom-[8%] rounded-[42%_42%_16%_16%/12%_12%_12%_12%] border border-white/10 shadow-[0_28px_70px_rgba(0,0,0,0.48)]">
            <div className={cn("absolute inset-0 rounded-[inherit]", tone.garment)} />
            <div className="absolute left-1/2 top-[6%] h-8 w-8 -translate-x-1/2 rounded-full border border-white/16 bg-black/20" />
            <div className="absolute left-[45%] top-[16%] h-[56%] w-px bg-white/18" />
            <div className="absolute left-[-7%] top-[20%] h-[34%] w-[34%] rotate-[-18deg] rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(0,0,0,0.45))]" />
            <div className="absolute right-[-7%] top-[20%] h-[34%] w-[34%] rotate-[18deg] rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(0,0,0,0.45))]" />
            <div className={cn("absolute inset-x-[18%] top-0 h-16 rounded-b-[2rem] blur-md", tone.trim)} />
            <div className="absolute inset-y-[18%] left-[9%] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.18),transparent)]" />
            <div className="absolute inset-y-[18%] right-[9%] w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.14),transparent)]" />
          </div>
          <div className="absolute inset-x-[27%] bottom-[-3%] h-[18%] scale-y-[-1] opacity-28 blur-sm">
            <div className={cn("h-full rounded-[42%_42%_16%_16%/12%_12%_12%_12%]", tone.garment)} />
          </div>
          <div className="absolute inset-x-[16%] bottom-[8%] h-20 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.55),transparent_72%)] blur-xl" />
          <div className="absolute inset-x-[12%] bottom-[7%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]" />
        </>
      )}

      {!isMinimal ? (
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/55">
          {media.label}
        </div>
      ) : null}
      <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/60">
        {media.angle}
      </div>
      {showNote && !isMinimal ? (
        <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/48">
          {media.note}
        </div>
      ) : null}
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.05))]" />
      </div>
    </div>
  );
}
