import type { ProductMedia, ProductTone } from "@/types/product";

import { cn } from "@/lib/utils";

interface ProductMediaFrameProps {
  media: ProductMedia;
  className?: string;
  showNote?: boolean;
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
}: ProductMediaFrameProps) {
  const tone = toneStyles[media.tone];

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.55)]",
        tone.shell,
        className,
      )}
    >
      <div className={cn("absolute inset-0 opacity-90", tone.haze)} />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
      <div className="absolute inset-x-[24%] top-[14%] bottom-[8%] rounded-[42%_42%_16%_16%/12%_12%_12%_12%] border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.42)]">
        <div className={cn("absolute inset-0 rounded-[inherit]", tone.garment)} />
        <div className="absolute left-1/2 top-[6%] h-8 w-8 -translate-x-1/2 rounded-full border border-white/16 bg-black/20" />
        <div className="absolute left-[45%] top-[16%] h-[56%] w-px bg-white/18" />
        <div className="absolute left-[-6%] top-[20%] h-[34%] w-[34%] rotate-[-18deg] rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(0,0,0,0.45))]" />
        <div className="absolute right-[-6%] top-[20%] h-[34%] w-[34%] rotate-[18deg] rounded-full border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(0,0,0,0.45))]" />
        <div className={cn("absolute inset-x-[18%] top-0 h-16 rounded-b-[2rem] blur-md", tone.trim)} />
      </div>
      <div className="absolute inset-x-[16%] bottom-[8%] h-20 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.55),transparent_72%)] blur-xl" />

      <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/55">
        {media.label}
      </div>
      <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/60">
        {media.angle}
      </div>
      {showNote ? (
        <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/48">
          {media.note}
        </div>
      ) : null}
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.03))]" />
      </div>
    </div>
  );
}
