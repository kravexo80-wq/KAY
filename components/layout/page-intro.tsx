import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  actions?: ReactNode;
}

export function PageIntro({
  eyebrow,
  title,
  description,
  note,
  actions,
}: PageIntroProps) {
  return (
    <section className="section-frame pt-8 md:pt-12">
      <div className="luxury-panel overflow-hidden px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="max-w-3xl text-4xl leading-none text-white md:text-6xl">
                <span className="text-gradient">{title}</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/64 md:text-lg">
                {description}
              </p>
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          <div className="luxury-muted-panel p-5">
            <p className="eyebrow">Showroom note</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
