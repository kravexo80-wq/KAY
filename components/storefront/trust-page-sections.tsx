import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TrustSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  isRtl?: boolean;
  className?: string;
  children?: ReactNode;
}

export function TrustSection({
  eyebrow,
  title,
  description,
  isRtl = false,
  className,
  children,
}: TrustSectionProps) {
  return (
    <section className={cn("luxury-panel p-6 md:p-8", className)}>
      <div className={cn("space-y-4", isRtl && "text-right")}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="text-3xl leading-none text-white md:text-4xl">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-sm leading-7 text-white/58 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}

interface TrustCardGridProps {
  cards: Array<{
    title: string;
    description: string;
  }>;
  isRtl?: boolean;
  columns?: string;
}

export function TrustCardGrid({
  cards,
  isRtl = false,
  columns = "md:grid-cols-2 xl:grid-cols-3",
}: TrustCardGridProps) {
  return (
    <div className={cn("grid gap-4", columns)}>
      {cards.map((card) => (
        <div
          key={card.title}
          className={cn("luxury-muted-panel p-5", isRtl && "text-right")}
        >
          <h3 className="text-2xl leading-none text-white">{card.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/56">{card.description}</p>
        </div>
      ))}
    </div>
  );
}

interface TrustBulletListProps {
  items: string[];
  isRtl?: boolean;
}

export function TrustBulletList({ items, isRtl = false }: TrustBulletListProps) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div
          key={item}
          className={cn(
            "showroom-subpanel flex items-start gap-3 p-4 text-sm leading-7 text-white/60",
            isRtl && "flex-row-reverse text-right",
          )}
        >
          <span className="mt-2 h-2 w-2 rounded-full bg-[#b79d67]/80" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

interface TrustParagraphStackProps {
  paragraphs: string[];
  isRtl?: boolean;
}

export function TrustParagraphStack({
  paragraphs,
  isRtl = false,
}: TrustParagraphStackProps) {
  return (
    <div
      className={cn(
        "space-y-4 text-sm leading-8 text-white/60 md:text-base",
        isRtl && "text-right",
      )}
    >
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

interface TrustFaqGroupProps {
  title: string;
  description: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
  isRtl?: boolean;
}

export function TrustFaqGroup({
  title,
  description,
  items,
  isRtl = false,
}: TrustFaqGroupProps) {
  return (
    <section className="luxury-panel p-6 md:p-8">
      <div className={cn("space-y-4", isRtl && "text-right")}>
        <h2 className="text-3xl leading-none text-white">{title}</h2>
        <p className="max-w-3xl text-sm leading-7 text-white/56">{description}</p>
      </div>
      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <article
            key={item.question}
            className={cn("showroom-subpanel p-5", isRtl && "text-right")}
          >
            <h3 className="text-xl leading-tight text-white">{item.question}</h3>
            <p className="mt-3 text-sm leading-7 text-white/58">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

interface TrustLegalBlockProps {
  title: string;
  paragraphs: string[];
  items?: string[];
  isRtl?: boolean;
}

export function TrustLegalBlock({
  title,
  paragraphs,
  items,
  isRtl = false,
}: TrustLegalBlockProps) {
  return (
    <section className="luxury-panel p-6 md:p-8">
      <div className={cn("space-y-4", isRtl && "text-right")}>
        <h2 className="text-3xl leading-none text-white">{title}</h2>
        <TrustParagraphStack paragraphs={paragraphs} isRtl={isRtl} />
      </div>
      {items?.length ? (
        <div className="mt-6">
          <TrustBulletList items={items} isRtl={isRtl} />
        </div>
      ) : null}
    </section>
  );
}
